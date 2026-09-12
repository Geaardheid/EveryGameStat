/* ============================================================
   EGS COMPANION — main process
   Tray-app rond de EGS-adapters. Alleen-lezen: lokale logs en
   lokale API's, nooit game-geheugen (harde ontwerpregel).
   ============================================================ */
const { app, BrowserWindow, Tray, Menu, ipcMain, shell, nativeImage, dialog, globalShortcut, Notification } = require("electron");
const fs = require("fs");
const os = require("os");
const path = require("path");
const config = require("./config");
const api = require("./api");
const RocketLeagueAdapter = require("./adapters/rocketleague");
const ProcessWatchAdapter = require("./adapters/processwatch");
const MinecraftAdapter = require("./adapters/minecraft");
const gamedb = require("./gamedb");
const discord = require("./discord");

/* standaard gevolgde games (exes aanpasbaar in instellingen) */
const DEFAULT_TRACKED = [
  { id: "mw4", label: "MW4 Beta", exes: ["cod.exe", "cod26-cod.exe", "cod26-beta.exe", "mw4.exe", "modernwarfare4.exe"] }
];
/* Alle bekende games uit de exe-database + eigen extra exe's uit instellingen. */
function trackedGames() {
  const cfg = config.get();
  const custom = Array.isArray(cfg.tracked_exes && cfg.tracked_exes.mw4) ? cfg.tracked_exes.mw4 : [];
  const list = gamedb.EXES.map((g, i) => ({ id: "g" + i, label: g.label, exes: g.exes, appid: g.appid || null, art: g.art || null, family: g.family || null, needsWindow: g.family === "cod" }));
  /* eigen procesnamen: elk een eigen item, genoemd naar de exe (niet meer aan CoD geplakt) */
  custom.forEach((e, i) => list.push({ id: "c" + i, label: String(e).replace(/\.exe$/i, ""), exes: [e] }));
  /* venstertitel-gebonden (Java-Minecraft via javaw.exe) */
  (gamedb.TITLE_ONLY || []).forEach((g, i) => list.push({ id: "t" + i, label: g.label, exes: [], titleExes: [g.exe], titleContains: g.contains, art: g.art || null }));
  return list;
}
/* Naam/cover per Steam-appid uit je eigen bibliotheek (voor Steam-detectie én Discord-art). */
let libByAppid = {};
async function refreshLibIndex() {
  try { const r = await api.library(); libByAppid = {}; for (const g of (r && r.games) || []) if (g.platform === "Steam" && /^\d+$/.test(String(g.external_id))) libByAppid[String(g.external_id)] = { name: g.name, cover: g.cover }; } catch (e) {}
}

let win = null;
let tray = null;
let quitting = false;
const adapters = {};
const APP_VERSION = app.getVersion();

/* één instantie tegelijk */
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); }
app.on("second-instance", () => { showWindow(); });

/* Tonen zonder witte flits: verborgen vensters verliezen hun GPU-buffer, dus eerst
   onzichtbaar tonen, één frame laten tekenen, dan pas opacity omhoog. */
function showWindow() {
  if (!win) return createWindow(false);
  if (!win.isVisible()) {
    win.setOpacity(0);
    if (!win.isMaximized()) win.maximize();
    win.show();
    const reveal = () => { try { win.setOpacity(1); } catch (e) {} };
    win.webContents.executeJavaScript("new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))").then(reveal, reveal);
    setTimeout(reveal, 400);
  }
  win.focus();
}

/* Opstart-splash zoals Discord: klein randloos venster met het logo, weg zodra de app klaar is */
let splash = null;
function showSplash() {
  try {
    splash = new BrowserWindow({ width: 380, height: 380, frame: false, transparent: true, resizable: false, movable: true, alwaysOnTop: true, skipTaskbar: true, show: false, icon: path.join(__dirname, "..", "assets", "icon.png"), webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true } });
    splash.loadFile(path.join(__dirname, "renderer", "splash.html"));
    splash.once("ready-to-show", () => { try { splash.show(); } catch (e) {} });
    splash.on("closed", () => { splash = null; });
  } catch (e) { splash = null; }
}
function closeSplash() { if (splash) { try { splash.close(); } catch (e) {} splash = null; } }
/* Venster pas tonen als de eerste render klaar is (show:false + ready-to-show) en
   maximaliseren vóór het tonen: zo geen wit/leeg/klein venster dat drie keer flitst. */
function createWindow(startHidden) {
  win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 640,
    resizable: true,
    fullscreenable: false,
    autoHideMenuBar: true,
    frame: false,               /* eigen titelbalk (EGS-identiteit) */
    backgroundColor: "#0E0D10",
    icon: path.join(__dirname, "..", "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false,
      devTools: !app.isPackaged || process.argv.includes("--devtools"), /* F12 uit in de gepubliceerde app */
      contextIsolation: true,
      nodeIntegration: false,
      /* DevTools alleen buiten de gebouwde app (of met --devtools): F12 en Ctrl+Shift+I doen niets bij gebruikers */
      devTools: !app.isPackaged || process.argv.includes("--devtools")
    }
  });
  win.webContents.on("before-input-event", (e, input) => {
    if (app.isPackaged && !process.argv.includes("--devtools") && (input.key === "F12" || (input.control && input.shift && /^[IJC]$/i.test(input.key)))) e.preventDefault();
  });
  win.webContents.on("devtools-opened", () => { if (app.isPackaged && !process.argv.includes("--devtools")) win.webContents.closeDevTools(); });
  win.loadFile(path.join(__dirname, "renderer", "index.html"));
  /* Eerste vertoning zonder witte flits: onzichtbaar maximaliseren en tonen, één
     frame laten tekenen, dan pas opacity omhoog (zelfde truc als showWindow). */
  /* eerste vertoning: wachten op "ui-ready" van de renderer (data geladen), dan splash weg en venster in */
  let shown = false;
  const firstShow = () => {
    if (shown || startHidden) return; shown = true;
    win.setOpacity(0);
    win.maximize();
    win.show();
    const reveal = () => { try { win.setOpacity(1); } catch (e) {} closeSplash(); };
    win.webContents.executeJavaScript("new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))").then(reveal, reveal);
    setTimeout(reveal, 500);
  };
  ipcMain.once("ui-ready", firstShow);
  win.once("ready-to-show", () => { setTimeout(firstShow, 6000); }); /* vangnet: nooit langer dan 6 s splash */
  win.on("close", (e) => {
    if (!quitting) { e.preventDefault(); win.hide(); } /* sluiten = naar tray */
  });
  win.on("closed", () => { win = null; });
}

function createTray() {
  const icon = nativeImage.createFromPath(path.join(__dirname, "..", "assets", "tray.png"));
  tray = new Tray(icon);
  tray.setToolTip("EGS Companion");
  const menu = Menu.buildFromTemplate([
    { label: "EGS Companion openen", click: showWindow },
    { label: "Mijn EGS-kaart", click: () => {
        const slug = config.get().slug;
        shell.openExternal(slug ? "https://everygamestat.com/p/" + slug : "https://everygamestat.com");
      } },
    { type: "separator" },
    { label: "Afsluiten", click: () => { quitting = true; app.quit(); } }
  ]);
  tray.setContextMenu(menu);
  tray.on("double-click", showWindow);
}

/* ---------- adapters ---------- */
function sendToUI(channel, payload) {
  if (win && !win.isDestroyed()) win.webContents.send(channel, payload);
}

/* ---------- "speelt nu": presence naar EGS ---------- */
const presenceSrc = { proc: null, rl: false };
let presenceSent = null;
let presenceBeat = null;
/* voorrang: Rocket League (live), dan Steam (exacte naam), dan proces-lijst */
function presenceCurrent() {
  return presenceSrc.rl ? "Rocket League" : (presenceSrc.steam || presenceSrc.proc || null);
}
let rlScoreLine = null, rlState = null; /* "menu" | "in_match" — gaat mee naar de site-kaart ("pot bezig") */
let mcStatus = { running: false, server: null, world: null }; /* Minecraft: server/wereld uit latest.log */
const runningLabels = new Set(); /* labels van games die de proceswatcher nu ziet */
async function presencePush(force) {
  if (!config.get().token) return;
  const cur = presenceCurrent();
  /* state + detail: Rocket League (stand) en Minecraft (server); de site toont "pot bezig · 2 - 1" / "op play.hypixel.net" */
  let state = null, detail = null, line = null;
  if (cur === "Rocket League") { state = rlState === "in_match" ? "in_match" : "menu"; detail = state === "in_match" ? rlScoreLine : null; line = rlScoreLine; }
  else if (cur === "Minecraft" && (mcStatus.server || mcStatus.world)) { state = "in_match"; detail = mcStatus.server || mcStatus.world; line = mcStatus.server ? "on " + mcStatus.server : mcStatus.world; }
  if (config.get().discord_rpc !== false) discord.setActivity(cur, line, presenceArt[cur] || null);
  else discord.setActivity(null);
  const sig = cur + "|" + state + "|" + detail + "|" + ((cur && presenceArt[cur]) || "");
  if (!force && sig === presenceSent) return;
  try {
    const r = await api.social("presence_set", { game: cur, state, detail });
    if (r && r.ok) { presenceSent = sig; sendToUI("presence", { game: cur, state, detail, art: (cur && presenceArt[cur]) || null }); }
  } catch (e) {}
}
/* Xbox-presence als titelbron (Game Pass PC): hooguit elke 90 s vragen, alleen als de exe de titel niet verraadt */
let xboxPresCache = { at: 0, title: null };
async function xboxPresenceTitle() {
  if (Date.now() - xboxPresCache.at < 90000) return xboxPresCache.title;
  xboxPresCache.at = Date.now();
  try {
    const r = await api.social("xbox_presence");
    const t = r && r.ok && r.title ? String(r.title).replace(/[\u00ae\u2122]/g, "").replace(/\s+/g, " ").trim() : null;
    xboxPresCache.title = t && /call of duty/i.test(t) && t.toLowerCase() !== "call of duty" ? t : null;
  } catch (e) { xboxPresCache.title = null; }
  return xboxPresCache.title;
}
const coverCache = new Map();
async function coverByName(name) {
  if (!name) return null;
  if (coverCache.has(name)) return coverCache.get(name);
  let url = null;
  try { const r = await api.gameInfo(null, name); url = r && r.ok && r.found && r.meta && /^https:/.test(String(r.meta.cover || "")) ? String(r.meta.cover) : null; } catch (e) {}
  coverCache.set(name, url);
  return url;
}
function presenceUpdate(src, val) {
  presenceSrc[src] = val;
  const cur = presenceCurrent();
  sendToUI("presence-local", { game: cur, art: (cur && presenceArt[cur]) || null });
  presencePush(false);
  if (presenceCurrent() && !presenceBeat) presenceBeat = setInterval(() => presencePush(true), 120 * 1000);
  if (!presenceCurrent() && presenceBeat) { clearInterval(presenceBeat); presenceBeat = null; }
}

const ART = "https://wcsgosrevyyafnerrhge.supabase.co/storage/v1/object/public/art/";
const steamCover = (appid) => "https://cdn.cloudflare.steamstatic.com/steam/apps/" + appid + "/library_600x900.jpg";
const presenceArt = { "Rocket League": steamCover(252950) }; /* gamenaam → afbeelding voor Discord/kaart/now-playing */
/* Steam: elke Steam-game via RunningAppID (ook games die niet in de exe-lijst staan) */
let steamSession = null, steamTimer = null;
function startSteamWatch() {
  if (steamTimer) return;
  refreshLibIndex(); setInterval(refreshLibIndex, 30 * 60 * 1000);
  steamTimer = setInterval(async () => {
    const appid = await gamedb.steamRunningAppId();
    const now = Date.now();
    if (appid) {
      const lib = libByAppid[String(appid)];
      const name = (lib && lib.name) || ("Steam app " + appid);
      presenceArt[name] = steamCover(appid);
      if (!steamSession || steamSession.appid !== appid) {
        if (steamSession) endSteamSession(now);
        steamSession = { appid, name, startedAt: now };
      }
      presenceUpdate("steam", name);
    } else if (steamSession) { endSteamSession(now); presenceUpdate("steam", null); }
  }, 15000);
}
function endSteamSession(endMs) {
  const s = steamSession; steamSession = null; if (!s || endMs - s.startedAt < 60000) return;
  const session = { game: s.name, client_session_id: require("crypto").randomUUID(), started_at: new Date(s.startedAt).toISOString(), ended_at: new Date(endMs).toISOString() };
  sendToUI("proc-session", session);
  api.ingestSessions([session]).then((r) => { if (!r || !r.ok) config.queueSession(session); }).catch(() => config.queueSession(session));
}
function startAdapters() {
  const cfg = config.get();
  if (!cfg.token) return; /* niet gekoppeld: nog niets starten */
  startSteamWatch();
  if (!adapters.procwatch) {
    const pw = new ProcessWatchAdapter({
      games: trackedGames,
      windowTitles: (exes) => gamedb.windowTitles(exes),
      onStatus: async (id, s) => {
        sendToUI("proc-status", { id, ...s });
        const g = trackedGames().find((x) => x.id === id);
        if (!g) return;
        let label = g.label;
        if (s.running) runningLabels.add(g.label); else runningLabels.delete(g.label);
        if (s.running && g.family === "cod") {
          /* welke CoD? 1) titel-exe (Battle.net/Steam), 2) venstertitel, 3) Xbox-netwerk (Xbox-app: één cod.exe, titel alleen op het netwerk bekend) */
          let codDiag = "";
          try {
            const [titles, cmds] = await Promise.all([gamedb.windowTitles(g.exes), gamedb.processCommandLines(g.exes)]);
            const wt = Object.values(titles)[0]; const cl = Object.values(cmds).join(" ");
            codDiag = cl.replace(/\s+/g, " ").slice(0, 160);
            const t = gamedb.codTitleFrom(wt, null, s.via, cl);
            if (t) { label = t; adapters.procwatch && adapters.procwatch.setLabel(id, t); }
          } catch (e) {}
          if (label === "Call of Duty") {
            /* Xbox-app: titel uit de geladen modules (DLL's uit het titel-pakket op de gamedrive) */
            try {
              const mods = await gamedb.processModules("cod.exe");
              const joined = mods.join(" ").toLowerCase();
              const t = gamedb.codTitleFrom(null, null, null, joined);
              if (t) { label = t; adapters.procwatch && adapters.procwatch.setLabel(id, t); }
              else {
                /* diagnose: modules buiten het COREBase-pakket, zodat een nieuwe titel snel te mappen is */
                const interesting = mods.filter((m) => !/COREBase|\\Windows\\/i.test(m)).slice(0, 6);
                codDiag = (interesting.length ? interesting.join(" ; ") : "geen titelmodules zichtbaar (" + mods.length + " modules)").slice(0, 220);
              }
            } catch (e) {}
          }
          if (label === "Call of Duty") {
            /* Xbox-app zonder titelmodules: het laatst geschreven titelbestand in Documents\Call of Duty\players */
            try {
              const files = gamedb.codRecentFiles();
              const recent = files.filter((f) => Date.now() - f.mtime < 6 * 3600 * 1000);
              const tagged = recent.find((f) => /cod2\d|bo7|bo6|mw4|mw3|blackops|modernwarfare/i.test(require("path").basename(f.file)));
              const t = tagged ? gamedb.codTitleFrom(null, null, null, require("path").basename(tagged.file)) : null;
              if (t) { label = t; adapters.procwatch && adapters.procwatch.setLabel(id, t); }
              else codDiag = "bestanden: " + files.slice(0, 5).map((f) => require("path").basename(f.file) + "@" + new Date(f.mtime).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })).join(" ; ").slice(0, 220);
            } catch (e) {}
          }
          if (label === "Call of Duty" && codDiag) sendToUI("proc-status", { id, ...s, via: (s.via || "") + " · " + codDiag });
        }
        if (s.running) presenceArt[label] = g.appid ? steamCover(g.appid) : (g.art ? ART + g.art : null);
        /* geen eigen art (bijv. CoD-titel via Xbox-app, eigen procesnamen): cover via IGDB op naam, één keer per titel */
        if (s.running && !presenceArt[label]) { const c = await coverByName(label); if (c) { presenceArt[label] = c; presencePush(true); } }
        presenceUpdate("proc", s.running ? label : (presenceSrc.proc && presenceSrc.proc.startsWith(g.label.split(":")[0]) ? null : presenceSrc.proc));
      },
      onSession: async (session) => {
        sendToUI("proc-session", session);
        try {
          const r = await api.ingestSessions([session]);
          if (!r.ok) config.queueSession(session);
          else config.flushQueue(api);
        } catch (e) { config.queueSession(session); }
      }
    });
    adapters.procwatch = pw;
    pw.start();
  }
  if (!adapters.minecraft) {
    const mc = new MinecraftAdapter({
      isRunning: () => runningLabels.has("Minecraft") || presenceSrc.proc === "Minecraft",
      extraLogs: () => (config.get().mc_log_paths || []),
      onStatus: (st) => {
        const changed = st.server !== mcStatus.server || st.world !== mcStatus.world;
        mcStatus = st;
        sendToUI("mc-status", st);
        if (changed) presencePush(true);
      },
      onSession: (session) => {
        sendToUI("proc-session", session);
        api.ingestSessions([session]).then((r) => { if (!r || !r.ok) config.queueSession(session); else config.flushQueue(api); }).catch(() => config.queueSession(session));
      }
    });
    adapters.minecraft = mc;
    mc.start();
  }
  if (!adapters.rocketleague) {
    const a = new RocketLeagueAdapter({
      playerName: () => config.get().rl_name || config.get().display_name || "",
      onLearnName: (name) => { if (name && config.get().rl_name !== name) config.set({ rl_name: name }); },
      onStatus: (s) => {
        sendToUI("adapter-status", { id: "rocketleague", ...s });
        if (s.state) {
          rlState = s.state;
          if (s.state !== "in_match") rlScoreLine = null;
          presenceUpdate("rl", s.state === "connected" || s.state === "in_match");
          presencePush(true); /* state-wissel (menu ↔ pot) direct doorgeven */
        }
      },
      onScore: (goals, myTeam) => {
        /* stand vanuit jouw perspectief als we je team kennen */
        rlScoreLine = (myTeam === 0 || myTeam === 1)
          ? goals[myTeam] + " - " + goals[1 - myTeam]
          : goals[0] + " - " + goals[1];
        presencePush(true);
      },
      onMatch: async (match) => {
        sendToUI("match", { id: "rocketleague", match });
        try {
          const r = await api.ingest("rocketleague", [match]);
          sendToUI("adapter-status", { id: "rocketleague", note: r.ok ? "synced" : "sync_failed" });
          if (r.ok) config.flushQueue(api); /* eerdere offline potten alsnog proberen */
        } catch (e) {
          config.queueMatch("rocketleague", match); /* offline: lokaal bewaren, later opnieuw */
          sendToUI("adapter-status", { id: "rocketleague", note: "queued_offline" });
        }
      }
    });
    adapters.rocketleague = a;
    a.start();
  }
}

function stopAdapters() {
  for (const k of Object.keys(adapters)) { try { adapters[k].stop(); } catch (e) {} delete adapters[k]; }
}

/* ---------- IPC ---------- */
ipcMain.handle("get-state", () => {
  const cfg = config.get();
  return {
    linked: !!cfg.token,
    display_name: cfg.display_name || null,
    slug: cfg.slug || null,
    rl_name: cfg.rl_name || "",
    autostart: app.getLoginItemSettings().openAtLogin,
    lang: cfg.lang || "nl",
    mw4_exes: (cfg.tracked_exes && cfg.tracked_exes.mw4) || [],
    discord_rpc: cfg.discord_rpc !== false,
    tracking_paused: cfg.tracking_paused === true,
    version: APP_VERSION,
    queued: (cfg.queue || []).length
  };
});

ipcMain.handle("claim-code", async (_e, code) => {
  const r = await api.claim(code, APP_VERSION);
  if (r.ok) {
    config.set({ token: r.token, display_name: r.display_name, slug: r.slug });
    startAdapters();
  }
  return r;
});

ipcMain.handle("unlink", async () => {
  try { await api.unlink(); } catch (e) {}
  stopAdapters();
  config.set({ token: null, display_name: null, slug: null, queue: [] });
  return { ok: true };
});

/* ---------- screenshot-tracker (OCR, gebruiker bevestigt altijd) ---------- */
let ocrBusy = false;
async function captureScoreboard() {
  if (ocrBusy) return;
  ocrBusy = true;
  sendToUI("ocr-result", { state: "busy" });
  showWindow();
  try {
    const ocr = require("./ocr");
    const playerName = config.get().mw4_name || config.get().display_name || "";
    const r = await ocr.captureAndRead(playerName);
    sendToUI("ocr-result", { state: "done", ...r });
  } catch (e) {
    sendToUI("ocr-result", { state: "error", error: String(e.message || e) });
  }
  ocrBusy = false;
}
ipcMain.handle("capture-scoreboard", () => { captureScoreboard(); });
ipcMain.handle("save-gmatch", async (_e, match) => {
  try { return await api.ingestGmatch(match); } catch (e) { return { ok: false, error: "offline" }; }
});

ipcMain.handle("social", async (_e, action, extra) => {
  try { return await api.social(action, extra); } catch (e) { return { ok: false, error: "offline" }; }
});

/* nieuwe-DM-notificaties: elke 90s ongelezen checken, ook als het venster dicht is */
let lastUnread = -1;
async function pollUnread() {
  if (!config.get().token) return;
  try {
    const r = await api.social("social_overview");
    if (!r || !r.ok) return;
    const total = (r.friends || []).reduce((s, f) => s + (Number(f.unread) || 0), 0);
    sendToUI("social-unread", { total });
    if (lastUnread >= 0 && total > lastUnread && Notification.isSupported()) {
      const wie = (r.friends || []).filter((f) => Number(f.unread) > 0).map((f) => f.name).slice(0, 3).join(", ");
      const n = new Notification({
        title: "EGS Companion",
        body: (config.get().lang === "en" ? "New message from " : "Nieuw bericht van ") + (wie || "?"),
        icon: path.join(__dirname, "..", "assets", "icon.png")
      });
      n.on("click", () => { showWindow(); sendToUI("open-social", {}); });
      n.show();
    }
    lastUnread = total;
  } catch (e) {}
}
setInterval(pollUnread, 90 * 1000);
setTimeout(pollUnread, 8000);

ipcMain.handle("sessions-summary", async () => {
  try { return await api.sessionsSummary(); } catch (e) { return { ok: false, error: "offline" }; }
});

ipcMain.handle("profile", async () => {
  /* spelerskaart: vers ophalen, bij offline de laatste cache uit config */
  try {
    const r = await api.profile();
    if (r && r.ok) { config.set({ profile_cache: r, display_name: r.name || config.get().display_name, slug: r.slug || config.get().slug }); return r; }
  } catch (e) {}
  const c = config.get().profile_cache;
  return c ? { ...c, cached: true } : { ok: false, error: "offline" };
});

ipcMain.handle("check-updates", async () => {
  try {
    const { autoUpdater } = require("electron-updater");
    sendToUI("update", { state: "checking" });
    await autoUpdater.checkForUpdates();
  } catch (e) { sendToUI("update", { state: "error" }); }
});

ipcMain.handle("restart-update", () => {
  quitting = true;
  /* stil installeren: geen installer-venster, direct herstarten */
  try { require("electron-updater").autoUpdater.quitAndInstall(true, true); } catch (e) {}
});
ipcMain.handle("win", (_e, cmd) => {
  if (!win) return;
  if (cmd === "min") win.minimize();
  else if (cmd === "max") { win.isMaximized() ? win.unmaximize() : win.maximize(); }
  else if (cmd === "close") win.close();        /* = naar tray */
  else if (cmd === "quit") { quitting = true; app.quit(); }
  return win.isMaximized();
});

ipcMain.handle("mc-status", () => mcStatus);
ipcMain.handle("presence-now", () => { const cur = presenceCurrent(); return { game: cur, state: cur === "Rocket League" ? rlState : null, detail: cur === "Rocket League" ? rlScoreLine : null, art: (cur && presenceArt[cur]) || null }; });
ipcMain.handle("recent", async (_e, limit) => {
  try { return await api.recent(Math.min(Math.max(Number(limit) || 15, 1), 50)); } catch (e) { return { ok: false, error: "offline" }; }
});

ipcMain.handle("set-setting", (_e, kv) => {
  if (kv.autostart !== undefined) {
    app.setLoginItemSettings({ openAtLogin: !!kv.autostart, args: ["--hidden"] });
    delete kv.autostart;
  }
  const wasPaused = config.get().tracking_paused === true;
  config.set(kv);
  /* tracking pauzeren/hervatten: adapters stoppen (geen sessies, geen presence) of weer starten */
  if (kv.tracking_paused !== undefined && !!kv.tracking_paused !== wasPaused) {
    if (kv.tracking_paused) { stopAdapters(); if (steamTimer) { clearInterval(steamTimer); steamTimer = null; } steamSession = null; presenceSrc.steam = null; presenceSrc.proc = null; presenceSrc.rl = false; runningLabels.clear(); mcStatus = { running: false, server: null, world: null }; presencePush(true); sendToUI("presence-local", { game: null, art: null }); sendToUI("mc-status", mcStatus); }
    else startAdapters();
  }
  if (kv.discord_rpc !== undefined) presencePush(true);
  return { ok: true };
});
ipcMain.on("ui-ready", () => {});
ipcMain.handle("refresh-now", async () => { try { config.flushQueue(api); } catch (e) {} presencePush(true); return { ok: true }; });

/* Trailer in een eigen app-venster: https-oorsprong, dus YouTube staat het toe
   (behalve als de uitgever embedden uitzet — dan toont YouTube dat zelf). */
let videoWin = null;
ipcMain.handle("open-video", (_e, id) => {
  if (!/^[A-Za-z0-9_-]{6,20}$/.test(String(id || ""))) return;
  if (videoWin && !videoWin.isDestroyed()) videoWin.close();
  videoWin = new BrowserWindow({ width: 960, height: 560, parent: win, backgroundColor: "#000", autoHideMenuBar: true, title: "Trailer \u00b7 EGS Companion",
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true } });
  /* YouTube eist een Referer bij embeds (anders "Fout 153") */
  videoWin.loadURL("https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0", { httpReferrer: "https://everygamestat.com/" });
  videoWin.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
});
ipcMain.handle("public-profile", async (_e, slug) => { try { return await api.publicProfile(slug); } catch (e) { return null; } });
ipcMain.handle("hubs", async () => { try { return await api.hubs(); } catch (e) { return { ok: false, error: "offline" }; } });
ipcMain.handle("web-session", async (_e, path) => {
  try { return await api.social("web_session", { path }); } catch (e) { return { ok: false, error: "offline" }; }
});
/* Game-info: IGDB via de site-functie; valt voor Steam-games terug op de Steam Store-API
   (geen sleutel nodig), zodat de sheet ook werkt als IGDB even niet beschikbaar is. */
const steamInfoCache = new Map();
async function steamInfo(appid) {
  if (steamInfoCache.has(appid)) return steamInfoCache.get(appid);
  const r = await fetch("https://store.steampowered.com/api/appdetails?appids=" + appid + "&l=english");
  const j = await r.json(); const d = j && j[appid] && j[appid].success ? j[appid].data : null;
  if (!d) return null;
  const meta = {
    name: d.name, steam_appid: String(appid), source: "steam",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/" + appid + "/library_600x900.jpg",
    summary: String(d.short_description || "").replace(/<[^>]+>/g, ""),
    genres: (d.genres || []).map((g) => g.description).slice(0, 6),
    released: d.release_date && d.release_date.date ? d.release_date.date : null,
    rating: d.metacritic && d.metacritic.score ? d.metacritic.score : null,
    platforms: Object.entries(d.platforms || {}).filter(([, v]) => v).map(([k]) => ({ windows: "PC", mac: "Mac", linux: "Linux" })[k] || k),
    modes: (d.categories || []).map((c) => c.description).filter((x) => /player|co-op|pvp/i.test(x)).slice(0, 4),
    links: { steam: "https://store.steampowered.com/app/" + appid, ...(d.website && /^https:/.test(d.website) ? { official: d.website } : {}) },
    screenshots: (d.screenshots || []).slice(0, 8).map((s) => s.path_full), videos: []
  };
  steamInfoCache.set(appid, meta);
  return meta;
}
ipcMain.handle("game-info", async (_e, steamAppid, name) => {
  let r = null;
  try { r = await api.gameInfo(steamAppid, name); } catch (e) { r = { ok: false, error: "offline" }; }
  if (r && r.ok && r.found) return r;
  if (steamAppid) { try { const meta = await steamInfo(String(steamAppid)); if (meta) return { ok: true, found: true, meta }; } catch (e) {} }
  return r || { ok: false, error: "offline" };
});
ipcMain.handle("open-external", (_e, url) => {
  /* alleen https; game-links (Steam, YouTube, socials, officiële site) komen uit IGDB */
  if (/^https:\/\/[^\s"'<>]+$/.test(String(url || ""))) shell.openExternal(url);
});

/* ---------- Rocket League autosetup: TAStatsAPI.ini schrijven ---------- */
const RL_INI_SECTION = "[TAGame.MatchStatsExporter_TA]";
function rlIniBody(existing) {
  /* bestaande ini respecteren; onze sectie toevoegen of aanvullen */
  let txt = existing || "";
  if (!txt.includes(RL_INI_SECTION)) {
    return (txt.trim() ? txt.trim() + "\r\n\r\n" : "") + RL_INI_SECTION + "\r\nPort=49123\r\nPacketSendRate=30\r\n";
  }
  if (!/^[ \t]*Port[ \t]*=/m.test(txt)) txt = txt.replace(RL_INI_SECTION, RL_INI_SECTION + "\r\nPort=49123");
  else txt = txt.replace(/^[ \t]*Port[ \t]*=[^\r\n]*/m, "Port=49123");
  if (!/^[ \t]*PacketSendRate[ \t]*=/m.test(txt)) txt = txt.replace(RL_INI_SECTION, RL_INI_SECTION + "\r\nPacketSendRate=30");
  return txt;
}
function rlCandidateConfigDirs() {
  const h = os.homedir();
  const docs = ["Documents", "Documenten", "OneDrive\\Documents", "OneDrive\\Documenten"];
  return docs.map((d) => path.join(h, d, "My Games", "Rocket League", "TAGame", "Config"));
}
function rlFindConfigDir() {
  for (const dir of rlCandidateConfigDirs()) {
    if (fs.existsSync(path.dirname(dir)) || fs.existsSync(dir)) return dir; /* TAGame-map bestaat = RL is ooit gestart */
  }
  return null;
}
function rlWriteIni(configDir) {
  fs.mkdirSync(configDir, { recursive: true });
  const ini = path.join(configDir, "TAStatsAPI.ini");
  let existing = "";
  try { existing = fs.readFileSync(ini, "utf8"); } catch (e) {}
  fs.writeFileSync(ini, rlIniBody(existing));
  return ini;
}
function rlIniStatus() {
  for (const dir of rlCandidateConfigDirs()) {
    const ini = path.join(dir, "TAStatsAPI.ini");
    try {
      const txt = fs.readFileSync(ini, "utf8");
      if (txt.includes("Port=49123")) return { configured: true, path: ini };
    } catch (e) {}
  }
  const custom = config.get().rl_ini_path;
  if (custom) {
    try { if (fs.readFileSync(custom, "utf8").includes("Port=49123")) return { configured: true, path: custom }; } catch (e) {}
  }
  return { configured: false };
}
function rlResolvePickedDir(picked) {
  /* gebruiker mag ruwweg alles aanwijzen: we zoeken zelf de juiste Config-map */
  const norm = picked.replace(/\\+$/, "");
  const base = path.basename(norm).toLowerCase();
  if (base === "config" && path.basename(path.dirname(norm)).toLowerCase() === "tagame") return norm;
  if (base === "tagame") return path.join(norm, "Config");
  if (fs.existsSync(path.join(norm, "TAGame"))) return path.join(norm, "TAGame", "Config");
  if (base === "my games" && fs.existsSync(path.join(norm, "Rocket League"))) return path.join(norm, "Rocket League", "TAGame", "Config");
  if (base === "rocket league") return path.join(norm, "TAGame", "Config");
  return null;
}

ipcMain.handle("rl-setup-status", () => rlIniStatus());
ipcMain.handle("rl-setup-auto", () => {
  try {
    const dir = rlFindConfigDir();
    if (!dir) return { ok: false, error: "not_found" };
    const ini = rlWriteIni(dir);
    config.set({ rl_ini_path: ini });
    return { ok: true, path: ini };
  } catch (e) { return { ok: false, error: "write_failed", detail: String(e.message || e) }; }
});
ipcMain.handle("rl-setup-pick", async () => {
  const r = await dialog.showOpenDialog(win, { properties: ["openDirectory"], title: "Rocket League-map" });
  if (r.canceled || !r.filePaths.length) return { ok: false, error: "cancelled" };
  const dir = rlResolvePickedDir(r.filePaths[0]);
  if (!dir) return { ok: false, error: "bad_folder" };
  try {
    const ini = rlWriteIni(dir);
    config.set({ rl_ini_path: ini });
    return { ok: true, path: ini };
  } catch (e) { return { ok: false, error: "write_failed", detail: String(e.message || e) }; }
});

/* ---------- start ---------- */
app.whenReady().then(() => {
  config.init(app.getPath("userData"));
  api.init(config);
  createTray();
  try { globalShortcut.register("F9", () => { if (config.get().token) captureScoreboard(); }); } catch (e) {}
  const startHidden = process.argv.includes("--hidden") && !!config.get().token;
  if (!startHidden) showSplash();
  createWindow(startHidden);
  if (config.get().tracking_paused !== true) startAdapters();
  config.flushQueue(api); /* offline-wachtrij bij opstarten proberen */

  /* auto-updates via GitHub Releases: stil downloaden, zichtbaar in de UI (faalt geruisloos zonder release) */
  try {
    const { autoUpdater } = require("electron-updater");
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.on("error", (err) => sendToUI("update", { state: "error", message: String(err && err.message || err).slice(0, 160) }));
    autoUpdater.on("update-available", (info) => sendToUI("update", { state: "downloading", version: info?.version }));
    autoUpdater.on("update-downloaded", (info) => sendToUI("update", { state: "ready", version: info?.version }));
    autoUpdater.on("update-not-available", () => sendToUI("update", { state: "none" }));
    autoUpdater.checkForUpdates().catch(() => {});
    setInterval(() => autoUpdater.checkForUpdates().catch(() => {}), 6 * 60 * 60 * 1000);
  } catch (e) {}
});

app.on("window-all-closed", (e) => { /* tray-app: niet afsluiten */ });
app.on("before-quit", () => {
  quitting = true;
  stopAdapters();
  try { discord.stop(); } catch (e) {}
  try { if (config.get().token) api.social("presence_set", { game: null }); } catch (e) {}
});
