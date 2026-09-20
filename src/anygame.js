"use strict";
/* ── Elke game, los van de launcher ──
   Steam en de lijst met bekende exe's dekken lang niet alles (Xbox-app/Game Pass, Epic, GOG,
   EA, Ubisoft, losse installaties). Dit bestand kijkt naar wat er echt draait en beslist met
   drie bronnen of iets een game is, en hoe hij heet:

   1. Discords openbare lijst van herkenbare games (exe-naam -> officiële titel). Wekelijks
      opgehaald, teruggebracht tot wat we nodig hebben, lokaal bewaard.
   2. Windows' eigen GameConfigStore: daar houdt Windows bij welke exe's het als game ziet,
      mét het volledige pad. Nodig omdat Windows het pad van een draaiende Game Pass-game
      vaak niet prijsgeeft, maar het register wel.
   3. De map waarin de exe staat: <schijf>\XboxGames\<Titel>\, steamapps\common\<Titel>\,
      Epic Games\<Titel>\ enzovoort. De mapnaam is de titel.

   Niets wordt geraden: geen match in een van deze bronnen = geen game. Launchers, browsers
   en gewone programma's tellen nooit. */
const { execFile } = require("child_process");
const fs = require("fs"), path = require("path");

const norm = (v) => String(v || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const DENY = new Set(["explorer", "chrome", "msedge", "firefox", "opera", "brave", "discord", "discordptb", "discordcanary", "steam", "steamwebhelper",
  "xboxpcapp", "xboxapp", "gamebar", "gamebarftserver", "gamingservices", "epicgameslauncher", "eadesktop", "ealauncher", "origin", "upc", "ubisoftconnect",
  "galaxyclient", "battle.net", "riotclientservices", "riotclientux", "obs64", "obs32", "spotify", "code", "egscompanion", "egs companion", "applicationframehost",
  "systemsettings", "textinputhost", "shellexperiencehost", "searchhost", "startmenuexperiencehost", "taskmgr", "nvidia share", "nvcontainer", "overwolf", "medal",
  "gamelaunchhelper", "bootstrapper", "crashreportclient", "unitycrashhandler64", "easyanticheat", "easyanticheat_eos", "beservice"]);
/* bibliotheekmappen: het stuk direct na deze map is de titel */
const LIB_RE = /[\\/](?:XboxGames|steamapps[\\/]common|Epic Games|GOG Games|GOG Galaxy[\\/]Games|EA Games|Origin Games|Ubisoft Game Launcher[\\/]games|Riot Games|Rockstar Games|Amazon Games[\\/]Library|itch[\\/]apps)[\\/]([^\\/]+)[\\/]/i;
function titleFromPath(p) {
  const m = String(p || "").match(LIB_RE);
  if (!m) return null;
  const t = m[1].replace(/[\u2122\u00ae]/g, "").replace(/\s{2,}/g, " ").trim();
  return !t || /launcher|redistributable|^content$|^common$/i.test(t) ? null : t;
}

/* ── Pakketten uit de Xbox-app / Microsoft Store: ...\WindowsApps\<Pakket>\ ──
   Niet elke game staat in XboxGames; een deel staat als pakket in WindowsApps, waar ook gewone
   apps staan (Rekenmachine, WhatsApp). Het verschil: elke Xbox-pc-game heeft in de pakketmap een
   MicrosoftGame.config. Staat dat bestand er, dan is het een game, ook als hij zo nieuw is dat
   geen enkele lijst zijn exe kent. */
function packageRoot(p) { const m = String(p || "").match(/^(.*[\\/]WindowsApps[\\/][^\\/]+)[\\/]/i); return m ? m[1] : null; }
const cfgCache = new Map();
function readGameConfig(root) {
  if (cfgCache.has(root)) return cfgCache.get(root);
  let r;
  try {
    const buf = fs.readFileSync(path.join(root, "MicrosoftGame.config"));
    const xml = (buf.length > 1 && buf[1] === 0) ? buf.toString("utf16le") : buf.toString("utf8");
    const m = xml.match(/DefaultDisplayName\s*=\s*"([^"]+)"/i);
    const nm = m && !/^ms-resource:/i.test(m[1]) ? m[1].replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, '"').trim() : null;
    r = { isGame: true, name: nm || null };
  } catch (e) { r = { isGame: e && e.code === "ENOENT" ? false : null }; } /* null = mogen we niet lezen: onbekend */
  cfgCache.set(root, r);
  return r;
}

/* ── Discord-lijst ── */
const LIST_URL = "https://discord.com/api/v10/applications/detectable";
const LIST_MAX_AGE = 7 * 86400000;
let dataDir = null, list = { at: 0, exes: {}, names: {} }, listLoading = false;
function reduceList(raw) {
  const exes = {}, names = {};
  for (const a of raw || []) {
    if (!a || !a.name) continue;
    names[norm(a.name)] = a.name;
    for (const al of a.aliases || []) if (al) names[norm(al)] = names[norm(al)] || a.name;
    for (const e of a.executables || []) {
      if (!e || e.os !== "win32" || e.is_launcher || !e.name) continue;
      const parts = String(e.name).toLowerCase().split("/"); const base = parts[parts.length - 1];
      if (!/\.exe$/.test(base) || base.length < 6) continue;
      (exes[base] = exes[base] || []).push({ n: a.name, d: parts.slice(0, -1).join("/") });
    }
  }
  return { at: Date.now(), exes, names };
}
async function refreshList(force) {
  if (listLoading || (!force && Date.now() - list.at < LIST_MAX_AGE)) return;
  listLoading = true;
  try {
    const r = await fetch(LIST_URL, { signal: AbortSignal.timeout(60000) });
    if (r.ok) { list = reduceList(await r.json()); if (dataDir) try { fs.writeFileSync(path.join(dataDir, "detectable-games.json"), JSON.stringify(list)); } catch (e) {} }
  } catch (e) {}
  listLoading = false;
}
function init(dir) {
  dataDir = dir;
  try { const j = JSON.parse(fs.readFileSync(path.join(dir, "detectable-games.json"), "utf8")); if (j && j.exes && j.names) list = j; } catch (e) {}
  refreshList(false);
}
/* officiële schrijfwijze bij een mapnaam of venstertitel ("SpeedRunners 2- King of Speed" -> met dubbele punt) */
const canonical = (t, L) => (L || list).names[norm(t)] || t;
/* venstertitel -> gametitel: exact, of het begin van precies één titel ("SpeedRunners 2" -> "SpeedRunners 2: King of Speed") */
function nameFromTitle(t, L) {
  const k = norm(t); if (k.length < 4) return null;
  if (L.names[k]) return L.names[k];
  if (k.length < 10) return null;
  let hit = null;
  for (const n in L.names) if (n.startsWith(k)) { if (hit && L.names[n] !== hit) return null; hit = L.names[n]; }
  return hit;
}

/* ── Windows ── */
function run(cmd, args, timeout) {
  return new Promise((resolve) => {
    if (process.platform !== "win32") return resolve("");
    execFile(cmd, args, { windowsHide: true, timeout: timeout || 9000, maxBuffer: 8 * 1024 * 1024 }, (err, out) => resolve(err ? "" : String(out || "")));
  });
}
async function windowedProcs() {
  const ps = "Get-Process | Where-Object { $_.MainWindowHandle -ne 0 } | ForEach-Object { [pscustomobject]@{ n=$_.ProcessName; p=$_.Path; t=$_.MainWindowTitle; d=$_.Product } } | ConvertTo-Json -Compress";
  const out = await run("powershell", ["-NoProfile", "-NonInteractive", "-Command", "[Console]::OutputEncoding=[Text.Encoding]::UTF8; " + ps]);
  try { const j = JSON.parse(out.trim() || "[]"); return Array.isArray(j) ? j : [j]; } catch (e) { return []; }
}
let gcs = { at: 0, map: {} };
function parseGcs(out) {
  const map = {};
  for (const m of String(out).matchAll(/MatchedExeFullPath\s+REG_SZ\s+(.+)/gi)) { const p = m[1].trim(); const b = p.split(/[\\/]/).pop().toLowerCase(); if (b) map[b] = p; }
  return map;
}
async function gameConfigStore() {
  if (Date.now() - gcs.at < 3 * 60000) return gcs.map;
  gcs = { at: Date.now(), map: parseGcs(await run("reg", ["query", "HKCU\\System\\GameConfigStore\\Children", "/s", "/v", "MatchedExeFullPath"], 8000)) };
  return gcs.map;
}

/* ── De beslissing (zuiver, testbaar) ── */
function pickGame(procs, gcsMap, lst, cfgReader) {
  const L = lst || list, seen = [], readCfg = cfgReader || readGameConfig;
  for (const pr of procs || []) {
    const pn = String(pr.n || "").toLowerCase(); if (!pn || DENY.has(pn)) continue;
    const exe = pn.endsWith(".exe") ? pn : pn + ".exe";
    const full = pr.p || (gcsMap && gcsMap[exe]) || "";
    if (/[\\/]windows[\\/](system32|syswow64|systemapps)[\\/]/i.test(full)) continue;
    let name = null, source = null;
    const hits = L.exes[exe];
    if (hits && hits.length) {
      /* zelfde exe-naam bij meerdere games: het padstuk uit de lijst moet dan in het echte pad zitten */
      const f = String(full).toLowerCase().replace(/\\/g, "/");
      const byDir = hits.find((h) => h.d && f.includes("/" + h.d + "/"));
      const uniq = [...new Set(hits.map((h) => h.n))];
      if (byDir) { name = byDir.n; source = "discord-list"; }
      else if (uniq.length === 1) { name = uniq[0]; source = "discord-list"; }
    }
    if (!name) { const t = titleFromPath(full); if (t) { name = canonical(t, L); source = pr.p ? "folder" : "folder-via-windows"; } }
    /* Pakket uit de Xbox-app of Store: MicrosoftGame.config beslist of het een game is. De naam komt uit
       de venstertitel als dat een bekende game is (officiële schrijfwijze), anders uit het config-bestand,
       anders de venstertitel zoals hij is. Geen config-bestand: alleen als de titel exact een bekende game is. */
    if (!name) {
      const root = packageRoot(full);
      if (root) {
        const gc = readCfg(root), viaTitle = pr.t ? nameFromTitle(pr.t, L) : null;
        if (gc && gc.isGame) { name = viaTitle || (gc.name && canonical(gc.name, L)) || String(pr.t || "").trim() || String(pr.n || "").trim(); source = "xbox-package"; }
        else if (viaTitle && (!gc || gc.isGame === null || L.names[norm(pr.t)])) { name = viaTitle; source = "store+title"; }
      }
    }
    /* Windows kent hem als game (GameConfigStore) maar de map zegt niets (WindowsApps): venstertitel of productnaam,
       alleen als die exact een bekende gametitel is */
    if (!name && gcsMap && gcsMap[exe]) {
      for (const cand of [pr.t, pr.d]) { const c = cand && nameFromTitle(cand, L); if (c) { name = c; source = "windows+title"; break; } }
    }
    /* Pad verborgen (typisch Game Pass) en Windows' register zegt niets: alleen de venstertitel blijft over.
       Telt alleen als die titel een bekende game is. */
    if (!name && !pr.p) { const c = pr.t && nameFromTitle(pr.t, L); if (c) { name = c; source = "title"; } }
    if (name) seen.push({ name, exe, source, path: full || null, title: pr.t || null });
  }
  /* meerdere kandidaten: lijst-match wint van map, map van titel */
  const rank = { "discord-list": 0, "folder": 1, "folder-via-windows": 1, "xbox-package": 1, "store+title": 2, "windows+title": 2, "title": 3 };
  seen.sort((a, b) => rank[a.source] - rank[b.source]);
  return seen[0] || null;
}
async function detect() {
  refreshList(false);
  const [procs, map] = await Promise.all([windowedProcs(), gameConfigStore()]);
  return pickGame(procs, map, list);
}
/* rapport voor als iets toch niet herkend wordt: precies wat de Companion ziet, zonder te raden */
async function report() {
  const [procs, map] = await Promise.all([windowedProcs(), gameConfigStore()]);
  return { at: new Date().toISOString(), listAgeHours: list.at ? Math.round((Date.now() - list.at) / 3600000) : null, listGames: Object.keys(list.names).length,
    picked: pickGame(procs, map, list), windows: procs.map((p) => ({ n: p.n, p: p.p || null, t: p.t || null, d: p.d || null, knownToWindows: !!map[String(p.n || "").toLowerCase() + ".exe"], xboxPackage: packageRoot(p.p) ? readGameConfig(packageRoot(p.p)) : undefined })),
    windowsGamePaths: Object.values(map).slice(0, 80) };
}
module.exports = { init, detect, report, refreshList, pickGame, reduceList, parseGcs, titleFromPath, packageRoot, readGameConfig };
