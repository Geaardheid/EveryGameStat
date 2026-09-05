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
const cod = require("./cod");
const api = require("./api");
const RocketLeagueAdapter = require("./adapters/rocketleague");
const ProcessWatchAdapter = require("./adapters/processwatch");
const discord = require("./discord");

/* standaard gevolgde games (exes aanpasbaar in instellingen) */
const DEFAULT_TRACKED = [
  { id: "mw4", label: "MW4 Beta", exes: ["cod.exe", "cod26-cod.exe", "cod26-beta.exe", "mw4.exe", "modernwarfare4.exe"] }
];
function trackedGames() {
  const cfg = config.get();
  const custom = cfg.tracked_exes && cfg.tracked_exes.mw4;
  return DEFAULT_TRACKED.map((g) => ({
    ...g,
    exes: Array.isArray(custom) && custom.length ? custom : g.exes
  }));
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

function showWindow() {
  if (!win) createWindow();
  win.show();
  win.focus();
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 640,
    resizable: true,
    fullscreenable: false,
    autoHideMenuBar: true,
    frame: false,               /* eigen titelbalk (EGS-identiteit) */
    backgroundColor: "#28282D",
    icon: path.join(__dirname, "..", "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, "renderer", "index.html"));
  win.maximize();
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
function presenceCurrent() {
  return presenceSrc.rl ? "Rocket League" : presenceSrc.proc;
}
let rlScoreLine = null, rlState = null; /* "menu" | "in_match" — gaat mee naar de site-kaart ("pot bezig") */
async function presencePush(force) {
  if (!config.get().token) return;
  const cur = presenceCurrent();
  if (config.get().discord_rpc !== false) discord.setActivity(cur, cur === "Rocket League" ? rlScoreLine : null);
  else discord.setActivity(null);
  /* state + detail alleen voor Rocket League; de site toont "pot bezig · 2 - 1" */
  const state = cur === "Rocket League" ? (rlState === "in_match" ? "in_match" : "menu") : null;
  const detail = cur === "Rocket League" && rlState === "in_match" ? rlScoreLine : null;
  const sig = cur + "|" + state + "|" + detail;
  if (!force && sig === presenceSent) return;
  try {
    const r = await api.social("presence_set", { game: cur, state, detail });
    if (r && r.ok) { presenceSent = sig; sendToUI("presence", { game: cur, state, detail }); }
  } catch (e) {}
}
function presenceUpdate(src, val) {
  presenceSrc[src] = val;
  presencePush(false);
  if (presenceCurrent() && !presenceBeat) presenceBeat = setInterval(() => presencePush(true), 120 * 1000);
  if (!presenceCurrent() && presenceBeat) { clearInterval(presenceBeat); presenceBeat = null; }
}

function startAdapters() {
  const cfg = config.get();
  if (!cfg.token) return; /* niet gekoppeld: nog niets starten */
  if (!adapters.procwatch) {
    const pw = new ProcessWatchAdapter({
      games: trackedGames,
      onStatus: (id, s) => {
        sendToUI("proc-status", { id, ...s });
        const g = trackedGames().find((x) => x.id === id);
        if (g) presenceUpdate("proc", s.running ? g.label : (presenceSrc.proc === g.label ? null : presenceSrc.proc));
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
  /* cod.start() uit: Activision sloot de endpoints (sep 2026) */
  if (!adapters.rocketleague) {
    const a = new RocketLeagueAdapter({
      playerName: () => config.get().rl_name || config.get().display_name || "",
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

ipcMain.handle("recent", async () => {
  try { return await api.recent(15); } catch (e) { return { ok: false, error: "offline" }; }
});

ipcMain.handle("set-setting", (_e, kv) => {
  if (kv.autostart !== undefined) {
    app.setLoginItemSettings({ openAtLogin: !!kv.autostart, args: ["--hidden"] });
    delete kv.autostart;
  }
  config.set(kv);
  return { ok: true };
});

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
ipcMain.handle("cod", async (_e, cmd) => {
  if (cmd === "login") { cod.login(win); return { ok: true }; }
  if (cmd === "sync") return await cod.sync();
  if (cmd === "unlink") { await cod.unlink(); return { ok: true }; }
  return await cod.status();
});
ipcMain.handle("hubs", async () => { try { return await api.hubs(); } catch (e) { return { ok: false, error: "offline" }; } });
ipcMain.handle("web-session", async (_e, path) => {
  try { return await api.social("web_session", { path }); } catch (e) { return { ok: false, error: "offline" }; }
});
ipcMain.handle("game-info", async (_e, steamAppid, name) => {
  try { return await api.gameInfo(steamAppid, name); } catch (e) { return { ok: false, error: "offline" }; }
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
  const startHidden = process.argv.includes("--hidden") && config.get().token;
  createWindow();
  if (startHidden) win.hide();
  startAdapters();
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
