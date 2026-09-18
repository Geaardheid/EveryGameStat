/* ============================================================
   Adapter: Rocket League (officiële lokale Stats API) — v3
   ------------------------------------------------------------
   v3 (12 sep 2026), na 21 echte potten die allemaal "unknown" werden:
   - jij wordt herkend zónder instellingen: eerst Game.Target (de speler
     die de camera volgt — buiten goal-replays ben jij dat, meerderheid
     over de hele pot telt), anders je actieve Steam-account (register)
     tegen PrimaryId "Steam|7656…", pas daarna op naam (rl_name, EGS-naam)
   - eenmaal herkend wordt je RL-naam via onLearnName bewaard
   - uitslag uit MatchEnded.WinnerTeamNum, terugval op de stand
   - de API heeft geen playlist-veld: modus afgeleid uit spelersaantal
     (1v1 … 4v4); freeplay/training (geen tegenstander) telt niet als pot
   - MatchInitialized na MatchCreated begint geen nieuwe pot; PodiumStart/
     MatchDestroyed na MatchEnded geven geen dubbele rij
   ------------------------------------------------------------
   ------------------------------------------------------------
   v2, gebouwd op ECHTE raw data van een gespeelde pot:
   - veldnamen casing-tolerant (Players/players, Teams/teams, ...)
   - spelerslijst mag array óf object zijn
   - naam-match negeert clantags ([KET] Tramkuleg == tramkuleg)
   - MatchGuid als dedupe-sleutel + einde-event cooldown
     (MatchEnded én MatchDestroyed vuurden beide → dubbele rij)
   - diagnose: geziene event-namen gaan mee in raw, zodat elke
     echte pot het formaat verder ontcijfert
   ============================================================ */
const net = require("net");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

/* actieve Steam-account uit het register → steamid64 (alleen Windows, best effort) */
let steamIdCache = { at: 0, id: null };
function activeSteamId64() {
  if (process.platform !== "win32") return null;
  if (Date.now() - steamIdCache.at < 60000) return steamIdCache.id;
  let id = null;
  try {
    const out = execFileSync("reg", ["query", "HKCU\\Software\\Valve\\Steam\\ActiveProcess", "/v", "ActiveUser"], { encoding: "utf8", windowsHide: true, timeout: 3000 });
    const m = /ActiveUser\s+REG_DWORD\s+0x([0-9a-f]+)/i.exec(out);
    const acc = m ? parseInt(m[1], 16) : 0;
    if (acc > 0) id = (76561197960265728n + BigInt(acc)).toString();
  } catch (e) {}
  steamIdCache = { at: Date.now(), id };
  return id;
}

const RL_HOST = "127.0.0.1";
const RL_PORT = 49123;
const END_COOLDOWN_MS = 30000;

function makeFramer(onObject) {
  let buf = "", depth = 0, inStr = false, esc = false, start = -1, pos = 0;
  return (chunk) => {
    buf += chunk;
    while (pos < buf.length) {
      const ch = buf[pos];
      if (inStr) {
        if (esc) esc = false;
        else if (ch === "\\") esc = true;
        else if (ch === '"') inStr = false;
      } else if (ch === '"') inStr = true;
      else if (ch === "{") { if (depth === 0) start = pos; depth++; }
      else if (ch === "}") {
        depth--;
        if (depth === 0 && start !== -1) {
          const slice = buf.slice(start, pos + 1);
          try { onObject(JSON.parse(slice)); } catch (_) {}
          buf = buf.slice(pos + 1);
          pos = -1; start = -1;
        }
      }
      pos++;
    }
    if (depth === 0 && start === -1) { buf = ""; pos = 0; }
    if (buf.length > 5_000_000) { buf = ""; pos = 0; depth = 0; inStr = false; esc = false; start = -1; }
  };
}

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };

/* casing-tolerante veldtoegang: pick(obj, "Players") vindt ook players/PLAYERS */
function pick(obj, ...names) {
  if (!obj || typeof obj !== "object") return undefined;
  const lower = {};
  for (const k of Object.keys(obj)) lower[k.toLowerCase()] = obj[k];
  for (const n of names) {
    const v = lower[n.toLowerCase()];
    if (v !== undefined) return v;
  }
  return undefined;
}
/* spelerslijst: array of object-map → array */
function playerList(v) {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") return Object.values(v);
  return [];
}
/* naam normaliseren: clantags [XXX]/(XXX) weg, alleen a-z0-9 */
function normName(s) {
  return String(s || "").replace(/[\[\(][^\]\)]{0,12}[\]\)]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

class RocketLeagueAdapter {
  constructor(opts) {
    this.opts = opts;
    this.sock = null;
    this.stopped = false;
    this.match = null;
    this.retryTimer = null;
    this.lastEnd = { guid: null, at: 0 };
    this.seenEvents = {};
  }

  status(state, note) { try { this.opts.onStatus({ state, note }); } catch (e) {} }
  score(goals, myTeam) { try { this.opts.onScore && this.opts.onScore(goals, myTeam); } catch (e) {} }

  start() { this.stopped = false; this.connect(); }
  stop() {
    this.stopped = true;
    if (this.retryTimer) clearTimeout(this.retryTimer);
    if (this.sock) { try { this.sock.destroy(); } catch (e) {} this.sock = null; }
  }

  connect() {
    if (this.stopped) return;
    const framer = makeFramer((o) => this.onEvent(o));
    const sock = net.createConnection({ host: RL_HOST, port: RL_PORT });
    this.sock = sock;
    sock.setEncoding("utf8");
    sock.on("connect", () => this.status("connected"));
    sock.on("data", framer);
    sock.on("error", () => {});
    sock.on("close", () => {
      if (this.stopped) return;
      this.status("waiting");
      this.retryTimer = setTimeout(() => this.connect(), 5000);
    });
    this.status("waiting");
  }

  newMatch() {
    return {
      clientId: crypto.randomUUID(),
      guid: null,
      startedAt: new Date().toISOString(),
      playlist: null, me: null, myTeam: null, myId: null,
      teamGoals: [0, 0], lastPlayers: null,
      targetVotes: {}, inReplay: false, maxPlayers: 0, winner: null
    };
  }

  /* jouw speler: 1) bekend id (Target-meerderheid), 2) Steam-id, 3) naam */
  findMe(players, m) {
    const list = playerList(players);
    if (!list.length) return null;
    const idOf = (p) => String(pick(p, "Id", "id", "PlayerId", "player_id", "ID") || "");
    if (m && m.myId) { const hit = list.find((p) => idOf(p) === m.myId); if (hit) return hit; }
    if (m && Object.keys(m.targetVotes).length) {
      const best = Object.entries(m.targetVotes).sort((a, b) => b[1] - a[1])[0];
      if (best && best[1] >= 3) { const hit = list.find((p) => idOf(p) === best[0]); if (hit) { m.myId = best[0]; return hit; } }
    }
    const sid = activeSteamId64();
    if (sid) {
      const hit = list.find((p) => String(pick(p, "PrimaryId", "PrimaryID", "primaryId", "primary_id", "PlatformId") || "").includes(sid));
      if (hit) { if (m) m.myId = idOf(hit); return hit; }
    }
    const want = normName(this.opts.playerName());
    if (!want) return null;
    const hit = list.find((p) => { const n = normName(pick(p, "Name", "PlayerName", "player_name", "name")); return n && (n === want || n.includes(want) || want.includes(n)); }) || null;
    if (hit && m) m.myId = idOf(hit);
    return hit;
  }

  captureState(data) {
    const m = this.match;
    const game = pick(data, "Game", "game") || {};
    const players = pick(data, "Players", "players");
    if (players) { m.lastPlayers = players; m.maxPlayers = Math.max(m.maxPlayers, playerList(players).length); }
    /* Game.Target = de speler die de camera volgt; buiten replays ben jij dat */
    const target = pick(game, "Target", "target");
    if (target && !m.inReplay) { const t = String(target); m.targetVotes[t] = (m.targetVotes[t] || 0) + 1; }
    const me = this.findMe(players, m);
    if (me) {
      m.me = me;
      const tn = num(pick(me, "TeamNum", "Team", "team", "teamnum"));
      if (tn === 0 || tn === 1) m.myTeam = tn;
      const nm = pick(me, "Name", "PlayerName", "player_name", "name");
      if (nm && this.opts.onLearnName && normName(nm) !== normName(this.opts.playerName())) { try { this.opts.onLearnName(String(nm).replace(/^[\[\(][^\]\)]{0,12}[\]\)]\s*/, "")); } catch (e) {} }
    }
    const pl = pick(game, "PlaylistName", "Playlist", "playlist", "playlist_name");
    if (pl) m.playlist = String(pl);
    const guid = pick(game, "MatchGuid", "matchGuid", "match_guid") || pick(data, "MatchGuid", "match_guid");
    if (guid) m.guid = String(guid);
    const teams = pick(game, "Teams", "teams");
    if (Array.isArray(teams) && teams.length >= 2) {
      const g0 = num(pick(teams[0], "Score", "score")), g1 = num(pick(teams[1], "Score", "score"));
      if (g0 != null && g1 != null && (g0 !== this.match.teamGoals[0] || g1 !== this.match.teamGoals[1])) {
        m.teamGoals = [g0, g1];
        this.score(m.teamGoals, m.myTeam);
      }
    }
  }

  onEvent(env) {
    const event = String(pick(env, "Event", "event") || "?");
    const key = event.slice(0, 48);
    this.seenEvents[key] = (this.seenEvents[key] || 0) + 1;
    let data = pick(env, "Data", "data") ?? {};
    if (typeof data === "string") { try { data = JSON.parse(data); } catch (_) {} }

    if (/matchcreated|match_created|matchstarted/i.test(event)) {
      this.match = this.newMatch();
      this.status("in_match");
      this.captureState(data);
      return;
    }
    if (/matchdestroyed|match_destroyed|podium/i.test(event) && !this.match) return; /* na MatchEnded: al afgerond */
    if (!this.match) { this.match = this.newMatch(); this.status("in_match"); }
    const m = this.match;
    if (/goalreplaystart/i.test(event)) { m.inReplay = true; return; }
    if (/goalreplayend/i.test(event)) { m.inReplay = false; return; }

    if (/goalscored/i.test(event)) {
      const scorer = pick(data, "Scorer", "scorer") || data;
      const teamNum = num(pick(scorer, "TeamNum", "Team", "teamnum", "team"));
      if (teamNum === 0 || teamNum === 1) {
        m.teamGoals[teamNum]++;
        this.score(m.teamGoals, m.myTeam);
      }
      this.captureState(data);
      return;
    }
    if (/matchended|match_ended/i.test(event)) {
      this.captureState(data);
      const w = num(pick(data, "WinnerTeamNum", "winnerTeamNum", "winner_team_num", "WinnerTeam"));
      if (w === 0 || w === 1) m.winner = w;
      this.finishMatch(data);
      return;
    }
    if (/matchdestroyed|match_destroyed|podium/i.test(event)) { this.captureState(data); this.finishMatch(data); return; }
    /* alles met spelers/game-info benutten (updatestate, gamestate, tick, ...) */
    if (pick(data, "Players", "players") || pick(data, "Game", "game")) this.captureState(data);
  }

  finishMatch(endData) {
    if (!this.match) return;
    const m = this.match; this.match = null;
    this.status("connected");
    /* dubbele einde-events (MatchEnded + MatchDestroyed) onderdrukken */
    const now = Date.now();
    const guid = m.guid || String(pick(endData || {}, "MatchGuid", "match_guid") || "");
    if (now - this.lastEnd.at < END_COOLDOWN_MS && (!guid || guid === this.lastEnd.guid)) return;
    this.lastEnd = { guid, at: now };

    const me = m.me || this.findMe(pick(endData || {}, "Players", "players"), m) || this.findMe(m.lastPlayers, m) || {};
    /* freeplay/training: één speler, geen tegenstander → geen pot */
    const listAll = playerList(m.lastPlayers);
    const teamsSeen = new Set(listAll.map((p) => num(pick(p, "TeamNum", "Team", "team", "teamnum"))).filter((t) => t === 0 || t === 1));
    if (m.maxPlayers <= 1 || teamsSeen.size < 2) return;
    let result = "unknown";
    if (m.myTeam === 0 || m.myTeam === 1) {
      if (m.winner === 0 || m.winner === 1) result = m.winner === m.myTeam ? "win" : "loss";
      else { const [a, b] = m.teamGoals; if (a !== b) result = ((m.myTeam === 0) === (a > b)) ? "win" : "loss"; }
    }
    const perTeam = Math.max(1, Math.round(m.maxPlayers / 2));
    const mode = m.playlist || (perTeam >= 1 && perTeam <= 4 ? perTeam + "v" + perTeam : null);
    const row = {
      client_match_id: guid || m.clientId,
      played_at: new Date().toISOString(),
      playlist: mode,
      result,
      goals: num(pick(me, "Goals", "goals")),
      assists: num(pick(me, "Assists", "assists")),
      saves: num(pick(me, "Saves", "saves")),
      shots: num(pick(me, "Shots", "ShotsOnGoal", "shots")),
      score: num(pick(me, "Score", "MatchScore", "score")),
      mmr: num(pick(me, "MMR", "mmr")),
      raw: {
        teamGoals: m.teamGoals, myTeam: m.myTeam, winner: m.winner, players: m.maxPlayers, playlist: mode, guid: guid || null,
        me_keys: Object.keys(me || {}).slice(0, 20), me_id: m.myId, target_votes: Object.keys(m.targetVotes).length,
        player_keys: listAll[0] ? Object.keys(listAll[0]).slice(0, 20) : [],
        diag_events: this.seenEvents
      }
    };
    this.seenEvents = {};
    try { this.opts.onMatch(row); } catch (e) {}
  }
}

module.exports = RocketLeagueAdapter;
