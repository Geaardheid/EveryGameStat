/* EGS Companion — renderer */
const I18N = {
  en: {
    linkSub: "Local, per-session game stats on your EveryGameStat card.",
    linkStep1: "Open everygamestat.com and sign in",
    linkStep2: "Account → Companion → Generate link code",
    linkStep3: "Type the code below",
    linkBtn: "Link",
    linkOpenSite: "Open everygamestat.com",
    footReadonly: "Read-only · local logs & APIs only · never game memory · open source",
    myCard: "View my card",
    adaptersHead: "Game adapters",
    rlHelp: "Setup",
    sessionHead: "This session",
    noMatches: "No matches yet — play a game and they'll appear here.",
    settingsHead: "Settings",
    setRlName: "Rocket League player name",
    setRlNameHint: "Exactly as shown above your car in-game.",
    setAutostart: "Start with Windows (minimized to tray)",
    setLang: "Language",
    setUnlink: "Unlink this PC",
    setUnlinkHint: "Removes this device from your EGS account. Your synced matches stay.",
    stWaiting: "waiting for Rocket League…",
    stConnected: "connected — play a match",
    stInMatch: "match in progress",
    stSynced: "synced to EGS ✓",
    stQueued: "offline — saved locally, will retry",
    stSyncFailed: "sync failed — will retry",
    queueNote: (n) => n + " match(es) waiting to sync",
    errCodeInvalid: "That code doesn't exist. Check for typos.",
    errCodeUsed: "That code was already used. Generate a new one on the site.",
    errCodeExpired: "That code expired (10 min). Generate a new one on the site.",
    errOffline: "Couldn't reach EveryGameStat. Check your internet connection.",
    sessionLine: (n, w, l) => n + " matches · " + w + "W/" + l + "L",
    rlSetupIntro: "One-time setup: the app writes Rocket League's Stats API config for you.",
    rlSetupAuto: "Set up automatically",
    rlSetupPick: "Point to folder\u2026",
    rlSetupManual: "Do it manually instead",
    rlSetupDone: "Configured \u2713 restart Rocket League if it's running:",
    rlSetupNotFound: "Rocket League folder not found \u2014 point to it yourself (Documents\\My Games\\Rocket League, or the game folder).",
    rlSetupBadFolder: "That doesn't look like a Rocket League folder. Pick 'Rocket League' under Documents\\My Games.",
    rlSetupWriteFailed: "Couldn't write the file: ",
    rlSetupConfigured: "Stats API configured \u2713",
    rlSetupNeeded: "one-time setup needed",
    dbdSoon: "next adapter \u00b7 experimental \u00b7 soon",
    stGames: "games",
    stHours: "hours",
    stAch: "achievements",
    topHead: "Top games",
    updDownloading: (v) => "Update v" + v + " is downloading\u2026",
    updReady: (v) => "Update v" + v + " ready \u2014 installs on restart.",
    updRestart: "Restart now",
    cachedNote: "offline \u2014 showing last known data",
    procTag: "session tracker",
    procOff: "not detected \u2014 start the game",
    procOn: (m) => "running \u2014 " + m + " min this session",
    procTotal: (h, n) => h + " h measured \u00b7 " + n + " session(s)",
    sessSaved: (g, m) => g + " \u00b7 " + m + " min \u2014 saved \u2713",
    capBtn: "\ud83d\udcf7 F9",
    capBusy: "Reading scoreboard\u2026 (screenshot stays on your PC)",
    capDone: "Check the numbers \u2014 OCR guesses, you decide.",
    capError: "Capture failed. Is the game on Borderless? Try again with the scoreboard visible.",
    capKills: "Kills",
    capDeaths: "Deaths",
    capResult: "Result",
    capSave: "Save match",
    capDiscard: "Discard",
    capSaved: (k, d) => "MW4 Beta \u00b7 " + k + "/" + d + " \u2014 saved \u2713",
    capHint: "Press F9 while the scoreboard is on screen.",
    tabHome: "Home", tabSocial: "Social", tabSite: "Site", tabLibrary: "Library", tabBoard: "Ranks",
    libHead: "Your library",
    libSearchPh: "Search games\u2026",
    libSortHours: "Most played", libSortName: "Name", libSortAch: "Achievements", libSortLast: "Recently played",
    libAllPlatforms: "All platforms",
    libLoading: "Loading your library\u2026",
    libCount: (n) => n + " games",
    gsLoading: "Loading game info\u2026", gsNoKey: "Game info is not configured yet.", gsNotFound: "No extra info found for this game.",
    libShowApps: "Show apps (Netflix, Spotify …)",
    tabWeb: "Stats", webMyCard: "My card", webOpen: "Open in browser", setQuit: "Quit app completely", adReport: "Report ad", adRemove: "Remove ads",
    gsViewSteam: "View on Steam", gsBuySteam: "Buy on Steam", gsWishlist: "Wishlist on Steam", gsTrailer: "Trailer", gsScreens: "Screenshots", gsFollow: "Follow on",
    boardHead: "Leaderboard",
    boardHours: "Hours", boardGames: "Games", boardAch: "Achievements",
    nowPlaying: (g) => "Playing now \u00b7 " + g,
    setDiscord: "Discord Rich Presence (show what you're playing, with live RL score)",
    chatPick: "Pick a friend to start chatting",
    updCheck: "Check for updates",
    updChecking: "Checking\u2026",
    updNone: "You're on the latest version \u2713",
    updError: "Couldn't check (no release online yet?)",
    socHead: "Social",
    socSearchPh: "Find players by name\u2026",
    socRequests: "Friend requests",
    socFriends: "Friends",
    socNoFriends: "No friends yet \u2014 search above to add someone.",
    socAdd: "Add",
    socAccept: "Accept",
    socDecline: "Decline",
    socPending: "pending\u2026",
    socRemove: "Remove",
    socSent: "Request sent \u2713",
    socNowFriends: "You're now friends \u2713",
    chatPh: "Type a message\u2026",
    chatSend: "Send",
    chatEmpty: "Say hi \ud83d\udc4b",
    setMw4Exes: "MW4 Beta process names",
    setMw4ExesHint: "Comma-separated .exe names. Only change if the game isn't detected (check Task Manager \u2192 Details).",
    rlHelpText: "One-time Rocket League setup:\n\nCreate or edit this file:\n  Documents\\My Games\\Rocket League\\\n  TAGame\\Config\\TAStatsAPI.ini\n\nPut exactly this in it:\n  [TAGame.MatchStatsExporter_TA]\n  Port=49123\n  PacketSendRate=30\n\nThen restart Rocket League."
  },
  nl: {
    linkSub: "Lokale, per-sessie gamestats op je EveryGameStat-kaart.",
    linkStep1: "Open everygamestat.com en log in",
    linkStep2: "Account → Companion → Koppelcode genereren",
    linkStep3: "Typ de code hieronder",
    linkBtn: "Koppelen",
    linkOpenSite: "Open everygamestat.com",
    footReadonly: "Alleen-lezen · alleen lokale logs & API's · nooit game-geheugen · open source",
    myCard: "Bekijk mijn kaart",
    adaptersHead: "Game-adapters",
    rlHelp: "Instellen",
    sessionHead: "Deze sessie",
    noMatches: "Nog geen potten — speel een game en ze verschijnen hier.",
    settingsHead: "Instellingen",
    setRlName: "Rocket League-spelersnaam",
    setRlNameHint: "Exact zoals hij in-game boven je auto staat.",
    setAutostart: "Starten met Windows (geminimaliseerd in de tray)",
    setLang: "Taal",
    setUnlink: "Deze pc ontkoppelen",
    setUnlinkHint: "Verwijdert dit apparaat van je EGS-account. Je gesyncte potten blijven staan.",
    stWaiting: "wacht op Rocket League…",
    stConnected: "verbonden — speel een pot",
    stInMatch: "pot bezig",
    stSynced: "gesynct naar EGS ✓",
    stQueued: "offline — lokaal bewaard, probeert later opnieuw",
    stSyncFailed: "sync mislukt — probeert opnieuw",
    queueNote: (n) => n + " pot(ten) wachten op sync",
    errCodeInvalid: "Die code bestaat niet. Check op typefouten.",
    errCodeUsed: "Die code is al gebruikt. Genereer een nieuwe op de site.",
    errCodeExpired: "Die code is verlopen (10 min). Genereer een nieuwe op de site.",
    errOffline: "Kon EveryGameStat niet bereiken. Check je internetverbinding.",
    sessionLine: (n, w, l) => n + " potten · " + w + "W/" + l + "L",
    rlSetupIntro: "Eenmalige setup: de app schrijft de Stats API-config van Rocket League voor je.",
    rlSetupAuto: "Automatisch instellen",
    rlSetupPick: "Map aanwijzen\u2026",
    rlSetupManual: "Toch handmatig doen",
    rlSetupDone: "Ingesteld \u2713 herstart Rocket League als hij draait:",
    rlSetupNotFound: "Rocket League-map niet gevonden \u2014 wijs hem zelf aan (Documenten\\My Games\\Rocket League, of de gamemap).",
    rlSetupBadFolder: "Dat lijkt geen Rocket League-map. Kies 'Rocket League' onder Documenten\\My Games.",
    rlSetupWriteFailed: "Kon het bestand niet schrijven: ",
    rlSetupConfigured: "Stats API ingesteld \u2713",
    rlSetupNeeded: "eenmalige setup nodig",
    dbdSoon: "volgende adapter \u00b7 experimenteel \u00b7 binnenkort",
    stGames: "games",
    stHours: "uren",
    stAch: "achievements",
    topHead: "Topgames",
    updDownloading: (v) => "Update v" + v + " wordt gedownload\u2026",
    updReady: (v) => "Update v" + v + " klaar \u2014 installeert bij herstart.",
    updRestart: "Nu herstarten",
    cachedNote: "offline \u2014 laatst bekende data",
    procTag: "sessie-tracker",
    procOff: "niet gedetecteerd \u2014 start de game",
    procOn: (m) => "draait \u2014 " + m + " min deze sessie",
    procTotal: (h, n) => h + " u gemeten \u00b7 " + n + " sessie(s)",
    sessSaved: (g, m) => g + " \u00b7 " + m + " min \u2014 opgeslagen \u2713",
    capBtn: "\ud83d\udcf7 F9",
    capBusy: "Scorebord lezen\u2026 (screenshot blijft op je pc)",
    capDone: "Check de cijfers \u2014 OCR gokt, jij beslist.",
    capError: "Vastleggen mislukt. Staat de game op Borderless? Probeer opnieuw met het scorebord in beeld.",
    capKills: "Kills",
    capDeaths: "Deaths",
    capResult: "Resultaat",
    capSave: "Pot opslaan",
    capDiscard: "Weggooien",
    capSaved: (k, d) => "MW4 Beta \u00b7 " + k + "/" + d + " \u2014 opgeslagen \u2713",
    capHint: "Druk op F9 terwijl het scorebord in beeld staat.",
    tabHome: "Home", tabSocial: "Social", tabSite: "Site", tabLibrary: "Bibliotheek", tabBoard: "Ranks",
    libHead: "Jouw bibliotheek",
    libSearchPh: "Zoek games\u2026",
    libSortHours: "Meest gespeeld", libSortName: "Naam", libSortAch: "Achievements", libSortLast: "Laatst gespeeld",
    libAllPlatforms: "Alle platforms",
    libLoading: "Bibliotheek laden\u2026",
    libCount: (n) => n + " games",
    gsLoading: "Game-info laden\u2026", gsNoKey: "Game-info is nog niet ingesteld.", gsNotFound: "Geen extra info gevonden voor deze game.",
    libShowApps: "Apps tonen (Netflix, Spotify …)",
    tabWeb: "Stats", webMyCard: "Mijn kaart", webOpen: "Open in browser", setQuit: "App volledig afsluiten", adReport: "Meld advertentie", adRemove: "Advertenties verwijderen",
    gsViewSteam: "Bekijk op Steam", gsBuySteam: "Koop op Steam", gsWishlist: "Op Steam-verlanglijst", gsTrailer: "Trailer", gsScreens: "Screenshots", gsFollow: "Volg op",
    boardHead: "Leaderboard",
    boardHours: "Uren", boardGames: "Games", boardAch: "Achievements",
    nowPlaying: (g) => "Speelt nu \u00b7 " + g,
    setDiscord: "Discord Rich Presence (laat zien wat je speelt, met live RL-stand)",
    chatPick: "Kies een vriend om te chatten",
    updCheck: "Check op updates",
    updChecking: "Controleren\u2026",
    updNone: "Je hebt de nieuwste versie \u2713",
    updError: "Kon niet checken (nog geen release online?)",
    socHead: "Social",
    socSearchPh: "Zoek spelers op naam\u2026",
    socRequests: "Vriendschapsverzoeken",
    socFriends: "Vrienden",
    socNoFriends: "Nog geen vrienden \u2014 zoek hierboven om iemand toe te voegen.",
    socAdd: "Toevoegen",
    socAccept: "Accepteren",
    socDecline: "Weigeren",
    socPending: "in afwachting\u2026",
    socRemove: "Verwijderen",
    socSent: "Verzoek verstuurd \u2713",
    socNowFriends: "Jullie zijn nu vrienden \u2713",
    chatPh: "Typ een bericht\u2026",
    chatSend: "Versturen",
    chatEmpty: "Zeg hoi \ud83d\udc4b",
    setMw4Exes: "MW4 Beta-procesnamen",
    setMw4ExesHint: "Komma-gescheiden .exe-namen. Alleen aanpassen als de game niet gedetecteerd wordt (check Taakbeheer \u2192 Details).",
    rlHelpText: "Eenmalige Rocket League-setup:\n\nMaak of bewerk dit bestand:\n  Documenten\\My Games\\Rocket League\\\n  TAGame\\Config\\TAStatsAPI.ini\n\nZet er precies dit in:\n  [TAGame.MatchStatsExporter_TA]\n  Port=49123\n  PacketSendRate=30\n\nHerstart daarna Rocket League."
  }
};
let lang = "nl";
const t = (k) => I18N[lang][k] || I18N.en[k] || k;
function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = t(el.dataset.i18nPh);
    if (typeof v === "string") el.placeholder = v;
  });
}

const $ = (id) => document.getElementById(id);
let state = null;
const session = []; /* potten van deze app-sessie */

const ALL_VIEWS = ["view-link", "view-main", "view-settings", "view-social", "view-library", "view-board"];
function show(view) {
  ALL_VIEWS.forEach((v) => { $(v).hidden = v !== view; });
  const tabbed = view !== "view-link" && state && state.linked;
  $("tabbar").hidden = !tabbed;
  document.body.classList.toggle("tabbed", tabbed);
  document.querySelectorAll("#tabbar .tab[data-tab]").forEach((b) => {
    b.classList.toggle("active", TABMAP[b.dataset.tab] === view);
  });
  if (view !== "view-social" && chatTimer) { clearInterval(chatTimer); chatTimer = null; }
  if (view === "view-social") loadSocial();
  if (view === "view-library") loadLibrary();
  if (view === "view-board") loadBoard();
}
const TABMAP = { home: "view-main", social: "view-social", library: "view-library", board: "view-board" };
document.querySelectorAll("#tabbar .tab[data-tab]").forEach((b) => {
  b.addEventListener("click", () => show(TABMAP[b.dataset.tab]));
});

async function boot() {
  state = await window.egs.getState();
  lang = state.lang || "nl";
  applyI18n();
  $("ver").textContent = "v" + state.version;
  const tv = $("tb-ver"); if (tv) tv.textContent = "v" + state.version;
  updateQueueNote(state.queued);
  if (!state.linked) { show("view-link"); return; }
  fillMain();
  show("view-main");
  loadRecent();
}

function fillMain() {
  $("who-name").textContent = state.display_name || "EGS-account";
  setAdapterState("waiting");
  rlRefreshSetup();
  loadProfile();
  renderMw4Base();
  loadSessionTotals();
}

/* ---- spelerskaart ---- */
function fmtNum(n) { return Number(n || 0).toLocaleString(lang === "nl" ? "nl-NL" : "en-US"); }
function fmtHours(min) { return fmtNum(Math.round((min || 0) / 60)); }
let profileData = null;
async function loadProfile() {
  const btn = $("btn-refresh");
  btn.classList.add("busy");
  try {
    const p = await window.egs.profile();
    if (p && p.ok) {
      profileData = p;
      renderProfile();
    }
  } catch (e) {}
  btn.classList.remove("busy");
}
function renderProfile() {
  const p = profileData;
  if (!p) return;
  if (p.name) $("who-name").textContent = p.name;
  if (p.slug) state.slug = p.slug;
  if (p.avatar) { $("who-avatar").src = p.avatar; const ta = $("tb-avatar"); if (ta) ta.src = p.avatar; }
  $("st-games").textContent = fmtNum(p.totals.games);
  $("st-hours").textContent = fmtHours(p.totals.minutes);
  $("st-ach").textContent = fmtNum(p.totals.ach_earned);
  $("plat-chips").innerHTML = (p.platforms || []).map((x) =>
    '<span class="chip"><b>' + String(x.platform).replace(/[<>&]/g, "") + "</b> \u00b7 " + fmtHours(x.minutes) + " " + t("stHours") + "</span>"
  ).join("");
  const tg = p.top_games || [];
  $("top-panel").hidden = !tg.length;
  $("top-games").innerHTML = tg.map((g) =>
    '<div class="tg">' +
    (g.cover ? '<img src="' + encodeURI(g.cover) + '" alt="">' : "<span></span>") +
    '<span><div class="tg-name">' + String(g.name || "").replace(/[<>&]/g, "") + '</div><div class="tg-plat">' + String(g.platform || "").replace(/[<>&]/g, "") + "</div></span>" +
    '<span class="tg-hours">' + fmtHours(g.minutes) + " " + t("stHours") + "</span></div>"
  ).join("");
  if (p.cached) { $("queue-note").textContent = t("cachedNote"); }
}
$("btn-refresh").addEventListener("click", loadProfile);

/* ---- updater-banner ---- */
window.egs.onUpdate((d) => {
  const b = $("upd-banner");
  if (d.state === "downloading") {
    b.hidden = false;
    $("upd-txt").textContent = t("updDownloading")(d.version || "?");
    $("upd-restart").hidden = true;
  } else if (d.state === "ready") {
    b.hidden = false;
    $("upd-txt").textContent = t("updReady")(d.version || "?");
    $("upd-restart").hidden = false;
  }
  notif.update = d.state === "ready" ? (d.version || "?") : null; refreshBell();
  const tb = $("tb-upd");
  if (tb) { if (d.state === "ready") { tb.hidden = false; tb.textContent = "\u2b06 v" + (d.version || "") + " \u2014 " + (lang === "nl" ? "herstart om te installeren" : "restart to install"); tb.onclick = () => window.egs.restartUpdate(); } else if (d.state === "downloading") { tb.hidden = false; tb.textContent = "\u2b07 v" + (d.version || ""); } else tb.hidden = true; }
  const st = $("upd-status");
  if (st) {
    st.textContent = d.state === "checking" ? t("updChecking")
      : d.state === "none" ? t("updNone")
      : d.state === "downloading" ? t("updDownloading")(d.version || "?")
      : d.state === "ready" ? t("updReady")(d.version || "?")
      : d.state === "error" ? t("updError") : "";
  }
});
$("upd-restart").addEventListener("click", () => window.egs.restartUpdate());
$("upd-check").addEventListener("click", () => window.egs.checkUpdates());

function updateQueueNote(n) {
  $("queue-note").textContent = n > 0 ? t("queueNote")(n) : "";
}

/* ---- koppelen ---- */
$("code").addEventListener("input", (e) => {
  let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  if (v.length > 4) v = v.slice(0, 4) + "-" + v.slice(4);
  e.target.value = v;
});
$("btn-link").addEventListener("click", doLink);
$("code").addEventListener("keydown", (e) => { if (e.key === "Enter") doLink(); });
async function doLink() {
  const code = $("code").value.trim();
  if (code.length < 9) return;
  $("btn-link").disabled = true;
  $("link-err").textContent = "";
  try {
    const r = await window.egs.claimCode(code);
    if (r.ok) {
      state = await window.egs.getState();
      fillMain();
      show("view-main");
      loadRecent();
    } else {
      const map = { code_invalid: "errCodeInvalid", code_used: "errCodeUsed", code_expired: "errCodeExpired" };
      $("link-err").textContent = t(map[r.error] || "errOffline");
    }
  } catch (e) {
    $("link-err").textContent = t("errOffline");
  }
  $("btn-link").disabled = false;
}
$("open-site").addEventListener("click", () => window.egs.openExternal("https://everygamestat.com"));
$("who-card").addEventListener("click", () => {
  window.egs.openExternal(state.slug ? "https://everygamestat.com/p/" + state.slug : "https://everygamestat.com");
});

/* ---- adapterstatus ---- */
function setAdapterState(st, note) {
  const dot = document.querySelector("#ad-rocketleague .dot");
  const lbl = $("rl-state");
  if (st) {
    dot.dataset.state = st;
    lbl.textContent = st === "connected" ? t("stConnected") : st === "in_match" ? t("stInMatch") : t("stWaiting");
  }
  if (note === "synced") lbl.textContent = t("stSynced");
  if (note === "queued_offline") { lbl.textContent = t("stQueued"); refreshQueue(); }
  if (note === "sync_failed") lbl.textContent = t("stSyncFailed");
}
window.egs.onAdapterStatus((d) => { if (d.id === "rocketleague") setAdapterState(d.state, d.note); });

/* ---- sessie-tracker (procesdetectie) ---- */
let mw4Total = null;
function renderMw4Base() {
  if (mw4Total && mw4Total.sessions > 0) {
    $("mw4-state").textContent = t("procOff") + " \u00b7 " + t("procTotal")(Math.round(mw4Total.minutes / 6) / 10, mw4Total.sessions);
  } else {
    $("mw4-state").textContent = t("procOff");
  }
}
/* F9-hint eenmalig tonen onder de adapter */
window.egs.onProcStatus((d) => {
  if (d.id !== "mw4") return;
  const dot = document.querySelector("#ad-mw4 .dot");
  if (d.running) {
    dot.dataset.state = "in_match";
    $("mw4-state").textContent = t("procOn")(Math.max(1, Math.round(d.sinceMs / 60000)));
  } else {
    dot.dataset.state = "off";
    renderMw4Base();
  }
});
window.egs.onProcSession((sess) => {
  const mins = Math.max(1, Math.round((Date.parse(sess.ended_at) - Date.parse(sess.started_at)) / 60000));
  const box = $("matches");
  const empty = box.querySelector(".empty");
  if (empty) empty.remove();
  const div = document.createElement("div");
  div.className = "match sess";
  div.innerHTML = '<span class="s-name">' + t("sessSaved")(String(sess.game).replace(/[<>&]/g, ""), mins) + "</span>" +
    '<span class="m-meta">' + fmtTime(sess.ended_at) + "</span>";
  box.prepend(div);
  loadSessionTotals();
});
/* ---- screenshot-tracker ---- */
$("mw4-cap").addEventListener("click", () => window.egs.captureScoreboard());
window.egs.onOcrResult((d) => {
  const panel = $("cap-panel");
  panel.hidden = false;
  if (d.state === "busy") { $("cap-status").textContent = t("capBusy"); return; }
  if (d.state === "error") { $("cap-status").textContent = t("capError"); return; }
  $("cap-status").textContent = t("capDone");
  $("cap-kills").value = d.kills ?? "";
  $("cap-deaths").value = d.deaths ?? "";
  $("cap-result").value = d.result || "unknown";
});
$("cap-discard").addEventListener("click", () => { $("cap-panel").hidden = true; });
$("cap-save").addEventListener("click", async () => {
  const kills = parseInt($("cap-kills").value, 10);
  const deaths = parseInt($("cap-deaths").value, 10);
  const match = {
    game: "MW4 Beta",
    client_match_id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    played_at: new Date().toISOString(),
    result: $("cap-result").value,
    kills: isNaN(kills) ? null : kills,
    deaths: isNaN(deaths) ? null : deaths
  };
  $("cap-save").disabled = true;
  const r = await window.egs.saveGmatch(match);
  $("cap-save").disabled = false;
  if (r && r.ok) {
    $("cap-panel").hidden = true;
    const box = $("matches");
    const empty = box.querySelector(".empty");
    if (empty) empty.remove();
    const div = document.createElement("div");
    div.className = "match sess";
    div.innerHTML = '<span class="s-name">' + t("capSaved")(match.kills ?? "?", match.deaths ?? "?") + "</span>" +
      '<span class="m-meta">' + fmtTime(match.played_at) + "</span>";
    box.prepend(div);
  } else {
    $("cap-status").textContent = t("errOffline");
  }
});

/* ===== SOCIAL ===== */
const escT = (x) => String(x ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
function socRow(p, right, click) {
  const div = document.createElement("div");
  div.className = "soc-row" + (click ? " clickable" : "");
  const sub = p.playing
    ? '<span class="sr-play">' + t("nowPlaying")(escT(p.playing)) + "</span>"
    : (p.slug ? "<small>/p/" + escT(p.slug) + "</small>" : "");
  div.innerHTML = '<img class="sr-av" src="' + (p.avatar ? encodeURI(p.avatar) : "../../assets/icon.png") + '" alt="">' +
    '<span class="sr-name">' + escT(p.name || "?") + sub + "</span>" + (right || "");
  if (click) div.addEventListener("click", (e) => { if (!e.target.closest("button")) click(); });
  return div;
}
let socData = null;
async function loadSocial() {
  const r = await window.egs.social("social_overview");
  if (!r || !r.ok) return;
  socData = r;
  /* verzoeken */
  const inc = r.incoming || [], out = r.outgoing || [];
  $("soc-req-panel").hidden = !inc.length && !out.length;
  const incBox = $("soc-incoming"); incBox.innerHTML = "";
  inc.forEach((p) => {
    const row = socRow(p, '<button class="btn gold sm" data-a="1">' + t("socAccept") + '</button><button class="btn ghost sm" data-a="0">' + t("socDecline") + "</button>");
    row.querySelectorAll("button").forEach((b) => b.addEventListener("click", async () => {
      await window.egs.social("friend_respond", { fid: p.friendship_id, accept: b.dataset.a === "1" });
      loadSocial();
    }));
    incBox.appendChild(row);
  });
  const outBox = $("soc-outgoing"); outBox.innerHTML = "";
  out.forEach((p) => outBox.appendChild(socRow(p, '<span class="mono dim" style="font-size:10px">' + t("socPending") + "</span>")));
  /* vrienden */
  const fBox = $("soc-friends"); fBox.innerHTML = "";
  const friends = r.friends || [];
  if (!friends.length) fBox.innerHTML = '<div class="empty">' + t("socNoFriends") + "</div>";
  friends.forEach((f) => {
    const unread = Number(f.unread) || 0;
    const row = socRow(f, unread ? '<span class="badge">' + unread + "</span>" : "", () => openChat(f));
    row.dataset.uid = f.user_id;
    if (chatWith && chatWith.user_id === f.user_id) row.classList.add("activechat");
    fBox.appendChild(row);
  });
  updateBadge(friends.reduce((sum, f) => sum + (Number(f.unread) || 0), 0));
}
$("soc-refresh").addEventListener("click", loadSocial);

/* zoeken */
let socTimer = null;
$("soc-search").addEventListener("input", () => {
  clearTimeout(socTimer);
  socTimer = setTimeout(async () => {
    const q = $("soc-search").value.trim();
    const box = $("soc-results");
    if (q.length < 2) { box.innerHTML = ""; return; }
    const r = await window.egs.social("social_search", { q });
    box.innerHTML = "";
    (r.results || []).forEach((p) => {
      const row = socRow({ name: p.name, slug: p.slug, avatar: p.avatar }, '<button class="btn gold sm">' + t("socAdd") + "</button>");
      row.querySelector("button").addEventListener("click", async (e) => {
        const btn = e.target;
        const res = await window.egs.social("friend_request", { target: p.user_id });
        btn.outerHTML = '<span class="mono dim" style="font-size:10px">' + (res && res.accepted ? t("socNowFriends") : t("socSent")) + "</span>";
        loadSocial();
      });
      box.appendChild(row);
    });
  }, 350);
});

function updateBadge(n) {
  const b = $("soc-badge");
  b.hidden = !n;
  b.textContent = n > 99 ? "99+" : n;
  const tb = $("tb-soc-badge"); if (tb) { tb.hidden = !n; tb.textContent = n > 99 ? "99+" : n; }
  refreshBell();
}
/* ===== Meldingen (titelbalk): ongelezen social + update + laatste duel-potje ===== */
const notif = { social: 0, update: null, duel: null };
function refreshBell() {
  notif.social = Number(($("soc-badge") && !$("soc-badge").hidden && $("soc-badge").textContent) || 0);
  const n = (notif.social ? 1 : 0) + (notif.update ? 1 : 0) + (notif.duel ? 1 : 0);
  const b = $("tb-bell-badge"); if (b) { b.hidden = !n; b.textContent = n; }
}
function renderNotif() {
  const box = $("tb-notif"); const items = [];
  if (notif.update) items.push({ t: "\u2b06 " + t("updReady")(notif.update), go: () => window.egs.restartUpdate() });
  if (notif.social) items.push({ t: "\uD83D\uDCAC " + notif.social + " " + (lang === "nl" ? "ongelezen" : "unread"), go: () => show("view-social") });
  if (notif.duel) items.push({ t: "\u2694\uFE0F " + notif.duel, go: () => openWeb("/vs") });
  box.innerHTML = items.length ? items.map((it, i) => '<button class="tb-notif-i" data-i="' + i + '">' + escT(it.t) + "</button>").join("")
    : '<div class="tb-notif-empty">' + (lang === "nl" ? "Geen meldingen" : "No notifications") + "</div>";
  box.querySelectorAll(".tb-notif-i").forEach((el) => el.addEventListener("click", () => { box.hidden = true; items[+el.dataset.i].go(); }));
}
$("tb-bell").addEventListener("click", () => { const box = $("tb-notif"); box.hidden = !box.hidden; if (!box.hidden) renderNotif(); });
document.addEventListener("click", (e) => { if (!e.target.closest("#tb-bell") && !e.target.closest("#tb-notif")) $("tb-notif").hidden = true; });
$("tb-search").addEventListener("click", () => openWeb("/tracker"));
$("tb-social").addEventListener("click", () => show("view-social"));
$("tb-me").addEventListener("click", () => openWeb("/me"));

/* ===== Advertentievak: house ads tot een app-netwerk (Playwire/Venatus) je toelaat.
   AdSense mag niet in desktop-apps — daarom hier geen AdSense. ===== */
const HOUSE_ADS = [
  { h: "EGS Premium", p: (l) => l === "nl" ? "Geen advertenties, extra kaartstijlen, vroege features. Binnenkort via Patreon." : "No ads, extra card styles, early features. Coming via Patreon.", cta: (l) => l === "nl" ? "Meer info" : "Learn more", url: "https://everygamestat.com/#premium" },
  { h: "EGS Discord", p: (l) => l === "nl" ? "Bugs melden, features stemmen, duels vinden." : "Report bugs, vote on features, find duels.", cta: "Discord", url: "https://discord.gg/6pMx68veeN" },
  { h: (l) => l === "nl" ? "Daag een vriend uit" : "Challenge a friend", p: (l) => l === "nl" ? "Best of 5 in Clash Royale of Brawl Stars \u2014 automatisch geteld." : "Best of 5 in Clash Royale or Brawl Stars \u2014 counted automatically.", cta: (l) => l === "nl" ? "Naar Duels" : "Go to Duels", web: "/vs" }
];
function renderAd() {
  const slot = $("ad-slot"); if (!slot) return;
  const a = HOUSE_ADS[Math.floor(Math.random() * HOUSE_ADS.length)];
  const f = (v) => typeof v === "function" ? v(lang) : v;
  slot.innerHTML = '<div class="ad-h">' + escT(f(a.h)) + '</div><p class="ad-p">' + escT(f(a.p)) + '</p><button class="btn gold sm" id="ad-cta">' + escT(f(a.cta)) + "</button>";
  $("ad-cta").addEventListener("click", () => a.web ? openWeb(a.web) : window.egs.openExternal(a.url));
}
$("ad-x").addEventListener("click", () => { $("ad-box").hidden = true; });
$("ad-report").addEventListener("click", () => window.egs.openExternal("https://discord.gg/6pMx68veeN"));
$("ad-remove").addEventListener("click", () => window.egs.openExternal("https://everygamestat.com/#premium"));
renderAd();
window.egs.onSocialUnread((d) => updateBadge(d.total || 0));
window.egs.onPresence((d) => {
  const tb = $("tb-presence");
  if (tb) { if (d && d.game) { tb.hidden = false; tb.textContent = "\u25cf " + d.game + (d.state === "in_match" ? " \u00b7 " + (d.detail || (lang === "nl" ? "pot bezig" : "in match")) : ""); } else tb.hidden = true; }
  const box = $("now-playing");
  if (d.game) { box.hidden = false; $("now-playing-txt").textContent = t("nowPlaying")(d.game); }
  else box.hidden = true;
});
window.egs.onOpenSocial(() => show("view-social"));

/* ===== CHAT ===== */
let chatWith = null, chatTimer = null, chatLastId = null;
function openChat(f) {
  chatWith = f;
  $("chat-placeholder").hidden = true;
  $("chat-ui").hidden = false;
  $("chat-name").textContent = f.name || "?";
  $("chat-avatar").src = f.avatar ? encodeURI(f.avatar) : "../../assets/icon.png";
  $("chat-msgs").innerHTML = "";
  chatLastId = null;
  document.querySelectorAll("#soc-friends .soc-row").forEach((r) => r.classList.toggle("activechat", r.dataset.uid === f.user_id));
  clearInterval(chatTimer);
  pollChat();
  chatTimer = setInterval(pollChat, 5000);
  $("chat-input").focus();
}
$("chat-back").addEventListener("click", () => {
  clearInterval(chatTimer); chatTimer = null; chatWith = null;
  $("chat-ui").hidden = true;
  $("chat-placeholder").hidden = false;
  loadSocial();
});
async function pollChat() {
  if (!chatWith) return;
  const r = await window.egs.social("dm_thread", { other: chatWith.user_id });
  if (!r || !r.ok) return;
  const msgs = (r.messages || []).slice().reverse(); /* oud → nieuw */
  const newest = msgs.length ? msgs[msgs.length - 1].id : null;
  if (newest === chatLastId) return;
  chatLastId = newest;
  const box = $("chat-msgs");
  box.innerHTML = msgs.length ? "" : '<div class="empty">' + t("chatEmpty") + "</div>";
  let lastDay = "";
  msgs.forEach((m) => {
    const d = new Date(m.created_at);
    const day = d.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short" });
    if (day !== lastDay) { lastDay = day; const dv = document.createElement("div"); dv.className = "chat-day"; dv.textContent = day; box.appendChild(dv); }
    const b = document.createElement("div");
    b.className = "bubble " + (m.sender === r.me ? "mine" : "theirs");
    b.innerHTML = escT(m.body) + "<time>" + d.toLocaleTimeString(lang === "nl" ? "nl-NL" : "en-US", { hour: "2-digit", minute: "2-digit" }) + "</time>";
    box.appendChild(b);
  });
  box.scrollTop = box.scrollHeight;
  window.egs.social("dm_mark_read", { other: chatWith.user_id });
}
async function sendChat() {
  const inp = $("chat-input");
  const msg = inp.value.trim();
  if (!msg || !chatWith) return;
  inp.value = "";
  const r = await window.egs.social("dm_send", { to: chatWith.user_id, message: msg });
  if (r && r.ok) { chatLastId = null; pollChat(); }
  else inp.value = msg;
}
$("chat-send").addEventListener("click", sendChat);
$("chat-input").addEventListener("keydown", (e) => { if (e.key === "Enter") sendChat(); });

/* ===== SITE-TAB ===== */
/* ===== BIBLIOTHEEK ===== */
let libData = null;
async function loadLibrary() {
  if (!libData) {
    const r = await window.egs.social("library");
    if (!r || !r.ok) { $("lib-grid").innerHTML = '<div class="empty">' + t("errOffline") + "</div>"; return; }
    libData = r.games || [];
    const plats = [...new Set(libData.map((g) => g.platform).filter(Boolean))].sort();
    const sel = $("lib-plat");
    plats.forEach((p) => { const o = document.createElement("option"); o.value = p; o.textContent = p; sel.appendChild(o); });
  }
  renderLibrary();
}
function renderLibrary() {
  if (!libData) return;
  const q = $("lib-search").value.trim().toLowerCase();
  const plat = $("lib-plat").value;
  const sort = $("lib-sort").value;
  const showApps = $("lib-apps").checked;
  let rows = libData.filter((g) => (showApps || !g.software) && (!q || String(g.name || "").toLowerCase().includes(q)) && (!plat || g.platform === plat));
  if (sort === "name") rows.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  else if (sort === "ach") rows.sort((a, b) => (b.ach_e || 0) - (a.ach_e || 0));
  else if (sort === "last") rows.sort((a, b) => String(b.last || "").localeCompare(String(a.last || "")));
  else rows.sort((a, b) => b.minutes - a.minutes);
  $("lib-count").textContent = t("libCount")(rows.length);
  const grid = $("lib-grid");
  grid.innerHTML = "";
  const frag = document.createDocumentFragment();
  rows.slice(0, 400).forEach((g) => {
    const card = document.createElement("div");
    card.className = "gcard";
    let coverEl;
    if (g.cover) {
      coverEl = document.createElement("img");
      coverEl.className = "gc-cover";
      coverEl.loading = "lazy";
      coverEl.src = g.cover;
      coverEl.addEventListener("error", () => {
        const ph = document.createElement("div");
        ph.className = "gc-cover ph";
        ph.textContent = (g.name || "?")[0].toUpperCase();
        coverEl.replaceWith(ph);
      });
    } else {
      coverEl = document.createElement("div");
      coverEl.className = "gc-cover ph";
      coverEl.textContent = (g.name || "?")[0].toUpperCase();
    }
    const body = document.createElement("div");
    body.className = "gc-body";
    const ach = g.ach_t ? '<span class="gc-ach">' + (g.ach_e ?? 0) + "/" + g.ach_t + "</span>" : "<span></span>";
    body.innerHTML = '<div class="gc-name" title="' + escT(g.name) + '">' + escT(g.name) + "</div>" +
      '<div class="gc-meta"><span><b>' + fmtHours(g.minutes) + "</b> " + t("stHours") + "</span>" + ach + "</div>";
    card.appendChild(coverEl);
    card.appendChild(body);
    card.addEventListener("click", () => openGameSheet(g));
    frag.appendChild(card);
  });
  if (!rows.length) grid.innerHTML = '<div class="empty">\u2014</div>';
  else grid.appendChild(frag);
}
/* Site-pagina's openen in de browser (het ingebouwde venster is eruit: rendert
   niet betrouwbaar op elke pc). Ingelogd via je eigen browser-sessie. */
function openWeb(path) { window.egs.openExternal("https://everygamestat.com" + path); }
/* ===== GAME-SHEET: IGDB-info per game (omschrijving, trailer, screenshots, links) ===== */
const SHEET_LINKS = [["steam", "Steam"], ["official", "Website"], ["youtube", "YouTube"], ["twitter", "X"], ["instagram", "Instagram"], ["discord", "Discord"], ["twitch", "Twitch"], ["reddit", "Reddit"], ["epic", "Epic"], ["gog", "GOG"]];
function ytThumb(id) { return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; }
async function openGameSheet(g) {
  const sheet = $("game-sheet"), body = $("gsheet-body");
  sheet.hidden = false;
  body.innerHTML = '<div class="gs-head"><div class="gs-cover ph"></div><div class="gs-title"><h2>' + escT(g.name) + "</h2><p class=\"muted\">" + escT(g.platform) + " \u00b7 " + fmtHours(g.minutes) + " " + t("stHours") + '</p></div></div><p class="muted">' + t("gsLoading") + "</p>";
  const appid = g.platform === "Steam" && /^\d+$/.test(String(g.external_id || "")) ? String(g.external_id) : null;
  const r = await window.egs.gameInfo(appid, g.name);
  if (sheet.hidden) return;
  const m = r && r.ok && r.found ? r.meta : null;
  if (!m) { body.querySelector("p.muted:last-child").textContent = r && r.error === "key_missing" ? t("gsNoKey") : t("gsNotFound"); return; }
  const links = SHEET_LINKS.filter(([k]) => m.links && m.links[k]);
  const owned = g.platform === "Steam";
  const steamUrl = (m.links && m.links.steam) || (m.steam_appid ? "https://store.steampowered.com/app/" + m.steam_appid : null);
  body.innerHTML =
    '<div class="gs-head">' + (m.cover ? '<img class="gs-cover" src="' + m.cover + '" alt="">' : '<div class="gs-cover ph"></div>') +
      '<div class="gs-title"><h2>' + escT(m.name || g.name) + "</h2>" +
      '<p class="muted">' + [m.released ? m.released.slice(0, 4) : null, m.rating ? m.rating + "/100" : null, (m.platforms || []).join(" \u00b7 ")].filter(Boolean).join(" \u00b7 ") + "</p>" +
      '<div class="gs-chips">' + (m.genres || []).map((x) => "<span>" + escT(x) + "</span>").join("") + "</div>" +
      '<div class="gs-modes">' + (m.modes || []).map((x) => "<span>\u25cf " + escT(x) + "</span>").join("") + "</div>" +
      '<div class="gs-actions">' +
        (steamUrl ? '<button class="btn primary" data-url="' + steamUrl + '">' + (owned ? t("gsViewSteam") : t("gsBuySteam")) + "</button>" : "") +
        (!owned && m.steam_appid ? '<button class="btn" data-url="https://store.steampowered.com/app/' + m.steam_appid + '">' + t("gsWishlist") + "</button>" : "") +
      "</div></div></div>" +
    (m.summary ? '<p class="gs-summary">' + escT(m.summary) + "</p>" : "") +
    (m.videos && m.videos.length ? '<div class="gs-sec">' + t("gsTrailer") + '</div><div class="gs-video" data-url="https://www.youtube.com/watch?v=' + m.videos[0].id + '"><img src="' + ytThumb(m.videos[0].id) + '" alt=""><span class="gs-play">\u25b6</span></div>' : "") +
    (m.screenshots && m.screenshots.length ? '<div class="gs-sec">' + t("gsScreens") + '</div><div class="gs-shots">' + m.screenshots.map((s) => '<img src="' + s + '" loading="lazy" alt="" data-shot="' + s + '">').join("") + "</div>" : "") +
    (links.length ? '<div class="gs-sec">' + t("gsFollow") + '</div><div class="gs-links">' + links.map(([k, l]) => '<button class="btn small" data-url="' + m.links[k] + '">' + l + "</button>").join("") + "</div>" : "") +
    '<p class="gs-igdb">Powered by <b>IGDB.com</b></p>';
  body.querySelectorAll("[data-url]").forEach((el) => el.addEventListener("click", () => window.egs.openExternal(el.dataset.url)));
  body.querySelectorAll("[data-shot]").forEach((el) => el.addEventListener("click", () => { $("lightbox-img").src = el.dataset.shot.replace("t_screenshot_big", "t_1080p"); $("lightbox").hidden = false; }));
}
function closeGameSheet() { $("game-sheet").hidden = true; $("gsheet-body").innerHTML = ""; }
$("gsheet-close").addEventListener("click", closeGameSheet);
$("gsheet-scrim").addEventListener("click", closeGameSheet);
$("lightbox").addEventListener("click", () => { $("lightbox").hidden = true; $("lightbox-img").src = ""; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!$("lightbox").hidden) { $("lightbox").hidden = true; } else if (!$("game-sheet").hidden) closeGameSheet(); } });
$("lib-search").addEventListener("input", () => renderLibrary());
$("lib-sort").addEventListener("change", () => renderLibrary());
$("lib-plat").addEventListener("change", () => renderLibrary());
$("lib-apps").addEventListener("change", () => renderLibrary());

/* ===== LEADERBOARD ===== */
let boardData = null, boardMetric = "hours";
async function loadBoard() {
  if (!boardData) {
    const r = await window.egs.social("leaderboard");
    if (!r || !r.ok) return;
    boardData = r;
  }
  renderBoard();
}
function boardVal(row) {
  if (boardMetric === "games") return { v: row.games || 0, txt: fmtNum(row.games || 0) };
  if (boardMetric === "ach") return { v: row.ach_earned || 0, txt: fmtNum(row.ach_earned || 0) };
  return { v: row.hours || 0, txt: fmtNum(Math.round(row.hours || 0)) + " " + t("stHours") };
}
function renderBoard() {
  if (!boardData) return;
  const rows = (boardData.rows || []).slice().sort((a, b) => boardVal(b).v - boardVal(a).v);
  const pod = $("board-podium");
  pod.innerHTML = "";
  rows.slice(0, 3).forEach((r, i) => {
    const d = document.createElement("div");
    d.className = "pod p" + (i + 1);
    d.innerHTML = '<span class="pd-rank">#' + (i + 1) + "</span>" +
      '<img class="pd-av" src="' + (r.avatar ? encodeURI(r.avatar) : "../../assets/icon.png") + '" alt="">' +
      '<div class="pd-name">' + escT(r.name || r.slug || "?") + "</div>" +
      '<div class="pd-val">' + boardVal(r).txt + "</div>";
    pod.appendChild(d);
  });
  const list = $("board-rows");
  list.innerHTML = "";
  rows.slice(3, 50).forEach((r, i) => {
    const d = document.createElement("div");
    d.className = "brow" + (boardData.me_slug && r.slug === boardData.me_slug ? " me" : "");
    d.innerHTML = '<span class="br-rank">#' + (i + 4) + "</span>" +
      '<img class="br-av" src="' + (r.avatar ? encodeURI(r.avatar) : "../../assets/icon.png") + '" alt="">' +
      '<span class="br-name">' + escT(r.name || r.slug || "?") + "</span>" +
      '<span class="br-val">' + boardVal(r).txt + "</span>";
    list.appendChild(d);
  });
}
document.querySelectorAll(".board-tabs .btn").forEach((b) => {
  b.addEventListener("click", () => {
    boardMetric = b.dataset.metric;
    document.querySelectorAll(".board-tabs .btn").forEach((x) => x.classList.toggle("active", x === b));
    renderBoard();
  });
});

async function loadSessionTotals() {
  try {
    const r = await window.egs.sessionsSummary();
    if (r && r.ok) {
      const g = (r.games || []).find((x) => x.game === "MW4 Beta");
      mw4Total = g || { sessions: 0, minutes: 0 };
      const dot = document.querySelector("#ad-mw4 .dot");
      if (dot.dataset.state !== "in_match") renderMw4Base();
    }
  } catch (e) {}
}

let rlConfigured = false;
async function rlRefreshSetup() {
  try {
    const st = await window.egs.rlSetupStatus();
    rlConfigured = !!st.configured;
    $("rl-setup-box").hidden = rlConfigured;
    if (!rlConfigured) $("rl-state").textContent = t("rlSetupNeeded");
  } catch (e) {}
}
function rlSetupResult(r) {
  const msg = $("rl-setup-msg");
  msg.className = "setup-msg mono";
  if (r.ok) {
    msg.textContent = t("rlSetupDone") + " " + r.path;
    rlConfigured = true;
    setTimeout(() => { $("rl-setup-box").hidden = true; }, 6000);
  } else if (r.error === "not_found") { msg.className += " err"; msg.textContent = t("rlSetupNotFound"); }
  else if (r.error === "bad_folder") { msg.className += " err"; msg.textContent = t("rlSetupBadFolder"); }
  else if (r.error === "cancelled") { msg.textContent = ""; }
  else { msg.className += " err"; msg.textContent = t("rlSetupWriteFailed") + (r.detail || r.error); }
}
$("rl-auto").addEventListener("click", async () => rlSetupResult(await window.egs.rlSetupAuto()));
$("rl-pick").addEventListener("click", async () => rlSetupResult(await window.egs.rlSetupPick()));
$("rl-manual").addEventListener("click", () => {
  const box = $("rl-help-box");
  box.hidden = !box.hidden;
  box.textContent = t("rlHelpText");
});
$("rl-help").addEventListener("click", () => {
  const box = $("rl-setup-box");
  box.hidden = !box.hidden;
  if (!box.hidden) { $("rl-help-box").hidden = true; $("rl-setup-msg").textContent = rlConfigured ? t("rlSetupConfigured") : ""; }
});

async function refreshQueue() {
  const s = await window.egs.getState();
  updateQueueNote(s.queued);
}

/* ---- potten ---- */
function fmtTime(iso) {
  try { return new Date(iso).toLocaleTimeString(lang === "nl" ? "nl-NL" : "en-US", { hour: "2-digit", minute: "2-digit" }); }
  catch (e) { return ""; }
}
function matchRow(m) {
  const res = m.result || "unknown";
  const div = document.createElement("div");
  div.className = "match";
  const g = m.goals ?? "–", a = m.assists ?? "–", s = m.saves ?? "–";
  div.innerHTML =
    '<span class="m-res ' + res + '">' + res.toUpperCase().slice(0, 4) + "</span>" +
    '<span class="m-stats"><b>' + g + "G</b> " + a + "A " + s + "S</span>" +
    '<span class="m-meta">' + (m.playlist ? String(m.playlist).replace(/[<>&]/g, "") + "<br>" : "") + fmtTime(m.played_at) + "</span>";
  return div;
}
function renderSession() {
  const box = $("matches");
  box.innerHTML = "";
  if (!session.length) { box.innerHTML = '<div class="empty">' + t("noMatches") + "</div>"; return; }
  session.slice().reverse().forEach((m) => box.appendChild(matchRow(m)));
  const w = session.filter((x) => x.result === "win").length;
  const l = session.filter((x) => x.result === "loss").length;
  $("session-line").textContent = t("sessionLine")(session.length, w, l);
}
window.egs.onMatch((d) => { session.push(d.match); renderSession(); });

async function loadRecent() {
  /* laatste gesyncte potten tonen zolang de sessie leeg is */
  if (session.length) return;
  const r = await window.egs.recent();
  if (r && r.ok && r.matches && r.matches.length) {
    const box = $("matches");
    box.innerHTML = "";
    r.matches.forEach((m) => box.appendChild(matchRow(m)));
  }
}

/* ---- instellingen ---- */
$("btn-settings").addEventListener("click", () => {
  $("set-mw4exes").value = (state.mw4_exes || []).join(", ");
  $("set-rlname").value = state.rl_name || "";
  $("set-autostart").checked = !!state.autostart;
  $("set-discord").checked = state.discord_rpc !== false;
  $("set-lang").value = lang;
  show("view-settings");
});
$("btn-back").addEventListener("click", async () => {
  const exes = $("set-mw4exes").value.split(",").map((x) => x.trim()).filter(Boolean);
  await window.egs.setSetting({ rl_name: $("set-rlname").value.trim(), tracked_exes: { mw4: exes } });
  state = await window.egs.getState();
  show("view-main");
});
$("set-autostart").addEventListener("change", (e) => window.egs.setSetting({ autostart: e.target.checked }));
$("set-discord").addEventListener("change", (e) => window.egs.setSetting({ discord_rpc: e.target.checked }));
$("set-lang").addEventListener("change", (e) => {
  lang = e.target.value;
  window.egs.setSetting({ lang });
  applyI18n();
  renderSession();
  renderProfile();
});
$("btn-unlink").addEventListener("click", async () => {
  await window.egs.unlink();
  session.length = 0;
  state = await window.egs.getState();
  $("code").value = "";
  $("link-err").textContent = "";
  show("view-link");
});

boot();
