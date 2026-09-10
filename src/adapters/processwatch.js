/* ============================================================
   Adapter: proceswatch — gemeten game-sessies
   ------------------------------------------------------------
   Kijkt alleen of een proces DRAAIT (tasklist/ps). Leest niets
   uit de game zelf; raakt nooit game-geheugen. Meet sessies:
   start, einde, duur. "Niets liegt": dit is speeltijd die we
   zelf meten, en zo wordt hij ook gelabeld.
   ============================================================ */
const { execFile } = require("child_process");
const crypto = require("crypto");

const POLL_MS = 20000;
const MIN_SESSION_MS = 60000; /* korter dan 1 min = opstartfout, negeren */
const GRACE_POLLS = 2;        /* pas na 2 gemiste polls telt de game als gestopt */

function listProcesses() {
  return new Promise((resolve) => {
    if (process.platform === "win32") {
      execFile("tasklist", ["/fo", "csv", "/nh"], { maxBuffer: 8 * 1024 * 1024 }, (err, out) => {
        if (err || !out) return resolve(new Set());
        const set = new Set();
        for (const line of out.split("\n")) {
          const m = line.match(/^"([^"]+)"/);
          if (m) set.add(m[1].toLowerCase());
        }
        resolve(set);
      });
    } else {
      /* linux/mac: alleen voor ontwikkeling/tests */
      execFile("ps", ["-A", "-o", "comm="], { maxBuffer: 8 * 1024 * 1024 }, (err, out) => {
        if (err || !out) return resolve(new Set());
        resolve(new Set(out.split("\n").map((s) => s.trim().toLowerCase()).filter(Boolean)));
      });
    }
  });
}

class ProcessWatchAdapter {
  /**
   * @param {object} opts
   * @param {() => Array<{id:string,label:string,exes:string[]}>} opts.games
   * @param {(id: string, s: object) => void} opts.onStatus  {running, sinceMs}
   * @param {(session: object) => void} opts.onSession  {game, client_session_id, started_at, ended_at}
   * @param {number} [opts.pollMs]
   */
  constructor(opts) {
    this.opts = opts;
    this.pollMs = opts.pollMs || POLL_MS;
    this.timer = null;
    this.state = {}; /* id -> { startedAt: ms, misses: n } */
  }

  start() {
    if (this.timer) return;
    const tick = () => this.poll().catch(() => {});
    this.timer = setInterval(tick, this.pollMs);
    tick();
  }

  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    /* app sluit: lopende sessies netjes afronden */
    const now = Date.now();
    for (const id of Object.keys(this.state)) this.endSession(id, now);
  }

  async poll() {
    const games = this.opts.games() || [];
    if (!games.length) return;
    const procs = await listProcesses();
    const now = Date.now();
    /* titel-gebonden games (Java-Minecraft draait als javaw.exe): alleen de venstertitel
       telt, anders zou elke Java-app als game gelden. PowerShell alleen als zo'n exe draait. */
    let titles = null;
    for (const g of games) {
      const hit = (g.exes || []).find((e) => procs.has(String(e).toLowerCase().trim()));
      let running = !!hit;
      g._via = hit || null;
      /* games waarvan de exe na afsluiten blijft hangen (CoD-bootstrapper): alleen tellen
         als het proces ook echt een venster met titel heeft */
      if (running && g.needsWindow && this.opts.windowTitles) {
        const exes = (g.exes || []).filter((e) => procs.has(String(e).toLowerCase().trim()));
        try { const tt = await this.opts.windowTitles(exes); running = Object.values(tt).some((t) => String(t || "").trim().length > 0); } catch (e) {}
      }
      if (!running && g.titleContains && this.opts.windowTitles) {
        const exes = (g.titleExes || []).filter((e) => procs.has(String(e).toLowerCase().trim()));
        if (exes.length) {
          if (!titles) { try { titles = await this.opts.windowTitles(exes); } catch (e) { titles = {}; } }
          running = Object.values(titles).some((t) => String(t || "").toLowerCase().includes(String(g.titleContains).toLowerCase()));
        if (running) g._via = exes[0] + " \u00b7 " + g.titleContains;
        }
      }
      const st = this.state[g.id];
      if (running) {
        if (!st) {
          this.state[g.id] = { startedAt: now, misses: 0, label: g.label, via: g._via };
          this.emitStatus(g.id, true, 0);
        } else {
          st.misses = 0;
          this.emitStatus(g.id, true, now - st.startedAt);
        }
      } else if (st) {
        st.misses++;
        if (st.misses >= GRACE_POLLS) this.endSession(g.id, now - (st.misses - 1) * this.pollMs);
        else this.emitStatus(g.id, true, now - st.startedAt); /* korte hapering: nog niet stoppen */
      } else {
        this.emitStatus(g.id, false, 0);
      }
    }
    /* opgeruimde games uit state halen */
    const known = new Set(games.map((g) => g.id));
    for (const id of Object.keys(this.state)) if (!known.has(id)) delete this.state[id];
  }

  endSession(id, endMs) {
    const st = this.state[id];
    if (!st) return;
    delete this.state[id];
    this.emitStatus(id, false, 0);
    const dur = endMs - st.startedAt;
    if (dur < MIN_SESSION_MS) return;
    try {
      this.opts.onSession({
        game: st.label || id,
        client_session_id: crypto.randomUUID(),
        started_at: new Date(st.startedAt).toISOString(),
        ended_at: new Date(endMs).toISOString()
      });
    } catch (e) {}
  }

  emitStatus(id, running, sinceMs) {
    const st = this.state[id];
    try { this.opts.onStatus(id, { running, sinceMs, via: st && st.via ? st.via : null }); } catch (e) {}
  }
}

module.exports = ProcessWatchAdapter;
