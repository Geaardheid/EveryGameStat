/* ============================================================
   Adapter: Minecraft (Java) — speeltijd per server uit latest.log
   ------------------------------------------------------------
   Leest alleen .minecraft/logs/latest.log (en de instance-logs van
   CurseForge / Prism / Modrinth). Nooit game-geheugen, geen API.
   Elke "Connecting to host, port" opent een serversegment; een
   singleplayer-wereld opent een wereldsegment; het segment sluit
   bij de volgende join, bij "Stopping server" of als de game stopt.
   Menu-tijd tussen twee servers telt bij de vorige server: dat is
   de enige eerlijke keuze zonder disconnect-regel in de log, en zo
   labelen we het ook ("gemeten door de Companion").
   Bedrock schrijft geen leesbare log: die krijgt hier niets.
   ============================================================ */
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");

const POLL_MS = 5000;
const MIN_SEGMENT_MS = 60000;      /* korter dan 1 min = laadscherm, negeren */
const LOG_STALE_MS = 15 * 60000;   /* log 15 min stil + proces weg = zeker gestopt */

/* ---- logbestanden vinden ---- */
function safeReaddir(dir) { try { return fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return []; } }
function candidateLogs(extra) {
  const home = os.homedir();
  const appdata = process.env.APPDATA || path.join(home, "AppData", "Roaming");
  const out = [path.join(appdata, ".minecraft", "logs", "latest.log")];
  const instanceRoots = [
    [path.join(home, "curseforge", "minecraft", "Instances"), ["logs"]],
    [path.join(appdata, "PrismLauncher", "instances"), [".minecraft", "logs"]],
    [path.join(appdata, "PrismLauncher", "instances"), ["minecraft", "logs"]],
    [path.join(appdata, "ModrinthApp", "profiles"), ["logs"]],
    [path.join(home, ".tlauncher", "legacy", "Minecraft", "game", "logs"), []]
  ];
  for (const [root, sub] of instanceRoots) {
    if (!sub.length) { out.push(path.join(root, "latest.log")); continue; }
    for (const d of safeReaddir(root)) if (d.isDirectory()) out.push(path.join(root, d.name, ...sub, "latest.log"));
  }
  for (const p of extra || []) if (p) out.push(p);
  return [...new Set(out)];
}
/* de log die het laatst is beschreven, wint */
function activeLog(extra) {
  let best = null;
  for (const p of candidateLogs(extra)) {
    try { const st = fs.statSync(p); if (!best || st.mtimeMs > best.mtimeMs) best = { path: p, mtimeMs: st.mtimeMs, size: st.size }; } catch (e) {}
  }
  return best;
}

/* ---- regels ---- */
const RX = {
  connect: /Connecting to ([^,\s]+),\s*(\d+)/,
  world: /Preparing level "?([^"]*)"?/,
  integrated: /Starting integrated minecraft server/,
  stopping: /Stopping server/,
  user: /Setting user:\s*(\S+)/,
  chat: /\[CHAT\]\s*(.*)$/
};
const DEATH_WORDS = /^(was |fell |drowned|blew up|hit the ground|died|burned|walked into|tried to|starved|suffocated|withered|experienced|went |discovered|froze|was killed|was slain|was shot|was fireballed|was pummeled|was pricked|was stung|was squashed|was impaled|was poked|was roasted|was struck|was doomed|was blown up|was skewered|was obliterated)/;
/* host netjes: proxy-subdomeinen (mc., play.) laten staan, poort weg, lowercase */
function cleanHost(h) { return String(h || "").toLowerCase().replace(/\.$/, "").slice(0, 80); }

class MinecraftAdapter {
  /**
   * @param {object} opts
   * @param {() => string[]} [opts.extraLogs]   extra logpaden uit instellingen
   * @param {() => boolean} opts.isRunning       proces-detectie (javaw met venstertitel Minecraft)
   * @param {(s: object) => void} opts.onStatus  {running, server, world, since, user}
   * @param {(session: object) => void} opts.onSession
   */
  constructor(opts) {
    this.opts = opts;
    this.timer = null;
    this.log = null;      /* {path, offset} */
    this.tail = "";       /* onvolledige laatste regel */
    this.seg = null;      /* {kind:'server'|'world', name, host, port, startedAt, deaths, adv} */
    this.user = null;
    this.lastLine = 0;
  }
  start() { if (this.timer) return; this.timer = setInterval(() => this.poll(), POLL_MS); this.poll(); }
  stop() { clearInterval(this.timer); this.timer = null; this.close(Date.now()); }

  poll() {
    try {
      /* draait = procesdetectie zegt ja, of de log is de laatste 2 minuten beschreven */
      const running = !!(this.opts.isRunning && this.opts.isRunning()) || (!!this.lastLine && Date.now() - this.lastLine < 120000);
      const best = activeLog(this.opts.extraLogs ? this.opts.extraLogs() : []);
      if (best && (!this.log || this.log.path !== best.path)) {
        /* nieuwe log: alleen vanaf nu lezen (oude sessies zijn niet van nu) */
        this.log = { path: best.path, offset: best.size };
        this.tail = "";
      }
      if (this.log) {
        const st = fs.statSync(this.log.path);
        if (st.size < this.log.offset) { this.log.offset = 0; this.tail = ""; } /* rotatie: nieuw latest.log */
        if (st.mtimeMs > (this.lastMtime || 0)) { this.lastMtime = st.mtimeMs; if (st.size === this.log.offset) this.lastLine = Date.now(); }
        if (st.size > this.log.offset) {
          const fd = fs.openSync(this.log.path, "r");
          const len = Math.min(st.size - this.log.offset, 2 * 1024 * 1024);
          const buf = Buffer.alloc(len);
          fs.readSync(fd, buf, 0, len, this.log.offset);
          fs.closeSync(fd);
          this.log.offset += len;
          const txt = this.tail + buf.toString("utf8");
          const lines = txt.split(/\r?\n/);
          this.tail = lines.pop() || "";
          for (const l of lines) this.line(l, Date.now());
          this.lastLine = Date.now();
        }
      }
      /* game weg: segment sluiten. Zonder proces-detectie: log 15 min stil */
      if (this.seg && !running) this.close(Date.now());
      this.status(running);
    } catch (e) { /* log tijdelijk niet leesbaar: volgende poll */ }
  }
  status(running) {
    if (!this.opts.onStatus) return;
    const s = this.seg;
    this.opts.onStatus({ running, server: s && s.kind === "server" ? s.name : null, world: s && s.kind === "world" ? s.name : null, since: s ? s.startedAt : null, user: this.user });
  }
  line(l, now) {
    let m;
    if ((m = RX.user.exec(l))) { this.user = m[1]; return; }
    if ((m = RX.connect.exec(l))) { this.open("server", cleanHost(m[1]), now, { host: cleanHost(m[1]), port: Number(m[2]) || 25565 }); return; }
    if (RX.integrated.test(l)) { if (!this.seg || this.seg.kind !== "world") this.open("world", null, now, {}); return; }
    if ((m = RX.world.exec(l)) && this.seg && this.seg.kind === "world" && !this.seg.name) { this.seg.name = (m[1] || "").slice(0, 60) || "Singleplayer"; return; }
    if (RX.stopping.test(l) && this.seg && this.seg.kind === "world") { this.close(now); return; }
    if ((m = RX.chat.exec(l)) && this.seg && this.user) {
      const c = m[1].replace(/^\[System\]\s*/, "").replace(/\u00a7./g, "");
      if (c.startsWith(this.user + " ")) {
        const rest = c.slice(this.user.length + 1);
        if (/^has (made the advancement|completed the challenge|reached the goal)/.test(rest)) this.seg.adv++;
        else if (DEATH_WORDS.test(rest) && !/^(joined|left) the game/.test(rest)) this.seg.deaths++;
      }
    }
  }
  open(kind, name, now, extra) {
    this.close(now);
    this.seg = { kind, name: name || null, startedAt: now, deaths: 0, adv: 0, ...extra };
  }
  close(now) {
    const s = this.seg; this.seg = null; if (!s) return;
    if (now - s.startedAt < MIN_SEGMENT_MS) return;
    const session = {
      game: "Minecraft", client_session_id: crypto.randomUUID(),
      started_at: new Date(s.startedAt).toISOString(), ended_at: new Date(now).toISOString(),
      server: s.kind === "server" ? s.name : null, world: s.kind === "world" ? (s.name || "Singleplayer") : null,
      deaths: s.deaths || 0, advancements: s.adv || 0
    };
    if (this.opts.onSession) this.opts.onSession(session);
  }
}

module.exports = MinecraftAdapter;
module.exports._test = { RX, DEATH_WORDS, cleanHost, candidateLogs };
