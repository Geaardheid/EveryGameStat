/* ============================================================
   Adapter: Rocket League (officiële lokale Stats API) — v2
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
      playlist: null, me: null, myTeam: null,
      teamGoals: [0, 0], lastPlayers: null
    };
  }

  findMe(players) {
    const list = playerList(players);
    const want = normName(this.opts.playerName());
    if (!want || !list.length) return null;
    return list.find((p) => {
      const n = normName(pick(p, "Name", "PlayerName", "player_name"));
      return n && (n === want || n.includes(want) || want.includes(n));
    }) || null;
  }

  captureState(data) {
    const m = this.match;
    const game = pick(data, "Game", "game") || {};
    const players = pick(data, "Players", "players");
    if (players) m.lastPlayers = players;
    const me = this.findMe(players);
    if (me) {
      m.me = me;
      const tn = num(pick(me, "TeamNum", "Team", "team", "teamnum"));
      if (tn === 0 || tn === 1) m.myTeam = tn;
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

    if (/matchcreated|match_created|matchstarted|initialized/i.test(event)) {
      this.match = this.newMatch();
      this.status("in_match");
      this.captureState(data);
      return;
    }
    if (!this.match) { this.match = this.newMatch(); this.status("in_match"); }
    const m = this.match;

    if (/goal/i.test(event) && !/replay/i.test(event)) {
      const scorer = pick(data, "Scorer", "scorer") || data;
      const teamNum = num(pick(scorer, "TeamNum", "Team", "teamnum", "team"));
      if (teamNum === 0 || teamNum === 1) {
        m.teamGoals[teamNum]++;
        this.score(m.teamGoals, m.myTeam);
      }
      this.captureState(data);
      return;
    }
    if (/matchended|match_ended|matchdestroyed|match_destroyed|podium/i.test(event)) {
      this.captureState(data);
      this.finishMatch(data);
      return;
    }
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

    const me = m.me || this.findMe(pick(endData || {}, "Players", "players")) || this.findMe(m.lastPlayers) || {};
    let result = "unknown";
    if (m.myTeam === 0 || m.myTeam === 1) {
      const [a, b] = m.teamGoals;
      if (a !== b) result = ((m.myTeam === 0) === (a > b)) ? "win" : "loss";
    }
    const row = {
      client_match_id: guid || m.clientId,
      played_at: new Date().toISOString(),
      playlist: m.playlist,
      result,
      goals: num(pick(me, "Goals", "goals")),
      assists: num(pick(me, "Assists", "assists")),
      saves: num(pick(me, "Saves", "saves")),
      shots: num(pick(me, "Shots", "ShotsOnGoal", "shots")),
      score: num(pick(me, "Score", "MatchScore", "score")),
      mmr: num(pick(me, "MMR", "mmr")),
      raw: {
        teamGoals: m.teamGoals, myTeam: m.myTeam, playlist: m.playlist, guid: guid || null,
        me_keys: Object.keys(me || {}).slice(0, 20),
        diag_events: this.seenEvents
      }
    };
    this.seenEvents = {};
    try { this.opts.onMatch(row); } catch (e) {}
  }
}

module.exports = RocketLeagueAdapter;
