/* ============================================================
   discord.js — Rich Presence op je Discord-profiel
   ------------------------------------------------------------
   "In a game of Rocket League · 1 - 4" terwijl je speelt.
   Verbindt met de lokale Discord-client (IPC); faalt geruisloos
   als Discord niet draait en probeert het periodiek opnieuw.
   ============================================================ */
const DISCORD_APP_ID = "1535994527477932182"; /* EGS Discord-application */

let client = null;
let ready = false;
let connecting = false;
let lastActivity = null;
let startTs = null;

/* Zichtbare status. Eerder slikte dit bestand elke fout in: werkte de presence niet, dan
   was nergens te zien waarom. Nu staat in Instellingen wat er aan de hand is.
   phase: idle | connecting | connected | no_discord | error */
const status = { phase: "idle", user: null, error: null, setOk: null, setError: null, at: 0 };
let onStatus = null;
function setStatus(patch) {
  Object.assign(status, patch, { at: Date.now() });
  try { onStatus && onStatus({ ...status }); } catch (e) {}
}
const errText = (e) => String((e && (e.message || e.code)) || e || "").slice(0, 160);

function dropClient() {
  ready = false;
  const c = client; client = null;
  try { c && c.removeAllListeners && c.removeAllListeners(); } catch (_) {}
  try { c && c.destroy && c.destroy(); } catch (_) {}
}

const LOGIN_TIMEOUT_MS = 12000;
async function ensureClient() {
  if (ready || connecting) return;
  connecting = true;
  setStatus({ phase: "connecting", error: null });
  try {
    const { Client } = require("@xhayper/discord-rpc");
    const c = new Client({ clientId: DISCORD_APP_ID });
    client = c;
    c.on("ready", () => {
      if (client !== c) return;
      ready = true;
      setStatus({ phase: "connected", user: (c.user && (c.user.globalName || c.user.username)) || null, error: null });
      if (lastActivity) push(lastActivity);
    });
    c.on("disconnected", () => {
      if (client !== c) return;
      /* Discord afgesloten of herstart: client weggooien, anders blijft een dode verbinding hangen
         en lukt opnieuw verbinden nooit meer tot de Companion herstart. */
      dropClient();
      setStatus({ phase: "no_discord", user: null, error: "disconnected" });
    });
    /* login() kan blijven hangen als de pipe wel bestaat maar Discord niet antwoordt. Zonder
       deze grens bleef 'connecting' voor altijd true en probeerde de app het nooit opnieuw. */
    await Promise.race([
      c.login(),
      new Promise((_, rej) => setTimeout(() => rej(new Error("login_timeout")), LOGIN_TIMEOUT_MS))
    ]);
  } catch (e) {
    const msg = errText(e);
    dropClient();
    const noDiscord = /ENOENT|could not connect|connection (closed|refused)|ECONNREFUSED|EPIPE/i.test(msg);
    setStatus({ phase: noDiscord ? "no_discord" : "error", user: null, error: msg });
  }
  connecting = false;
}

async function push(act) {
  if (!ready || !client) return;
  try {
    if (act) await client.user.setActivity(act);
    else await client.user.clearActivity();
    setStatus({ setOk: Date.now(), setError: null });
  } catch (e) {
    setStatus({ setError: errText(e) });
  }
}

/* Discord weigert een hele activity als één veld niet voldoet: tekstvelden 2 t/m 128 tekens,
   afbeeldings-URL's hooguit 256. Een servernaam van één letter of een lange cover-URL zette
   de presence dan stilzwijgend niet. */
const txt = (v, fallback) => {
  let t = String(v == null ? "" : v).trim();
  if (t.length < 2) t = fallback;
  return t.length > 128 ? t.slice(0, 127) + "\u2026" : t;
};
const img = (url, fallback) => (url && String(url).length <= 256) ? String(url) : fallback;

/* Per-game art op je Discord-profiel. Discord proxyt externe https-afbeeldingen,
   dus we kunnen rechtstreeks Steam-covers en eigen bucket-art gebruiken.
   Onbekende games vallen terug op het EGS-logo. */
/* Afbeeldingen: externe https-URL's werken in Rich Presence (bewezen met de RL-cover).
   Logo vanaf GitHub (bestaat gegarandeerd); game-art van Steam-CDN / EGS-bucket. */
const EGS_LOGO = "https://raw.githubusercontent.com/Geaardheid/EveryGameStat/main/assets/icon.png";
const ART = "https://wcsgosrevyyafnerrhge.supabase.co/storage/v1/object/public/art/";
const steamCover = (appid) => "https://cdn.cloudflare.steamstatic.com/steam/apps/" + appid + "/library_600x900.jpg";
const GAME_ICONS = {
  "rocket league": steamCover(252950), "dead by daylight": steamCover(381210), "rust": steamCover(252490), "pubg": steamCover(578080),
  "call of duty": steamCover(1938090), "fortnite": ART + "icon-fortnite.png", "league of legends": ART + "icon-lol.png",
  "minecraft": ART + "icon-minecraft.png", "fivem": ART + "game-fivem.png"
};
function gameIcon(game) {
  const g = String(game || "").toLowerCase();
  if (GAME_ICONS[g]) return GAME_ICONS[g];
  for (const k of Object.keys(GAME_ICONS)) if (g.includes(k)) return GAME_ICONS[k]; /* "call of duty: black ops 7" → cod-cover */
  return EGS_LOGO;
}

/**
 * Presence bijwerken.
 * @param {string|null} game  naam van de game, of null (niets aan het spelen)
 * @param {string|null} state extra regel, bijv. "1 - 4" of "23 min this session"
 */
/* Geen game bezig: tóch een nette EGS-presence i.p.v. Discords eigen "?"-detectie
   van EGS Companion.exe (die grijze vraagteken-kaart). App-icoon via externe URL. */
const APP_ICON = EGS_LOGO;
/* Timers. Zonder startTimestamp neemt Discord het moment van elke update als begin: de teller
   sprong dan bij elke hartslag (elke 2 minuten) terug naar 0:00. Nu loopt hij door zolang de
   toestand gelijk blijft, en begint hij alleen opnieuw als je een game start, wisselt of stopt. */
let idleTs = null, lastGame = null;
function setActivity(game, state, art) {
  if (!game) {
    startTs = null; lastGame = null;
    if (!idleTs) idleTs = Date.now();
    lastActivity = {
      name: "EveryGameStat", type: 0,
      details: "Tracking stats with EveryGameStat",
      state: "everygamestat.com",
      startTimestamp: idleTs,
      largeImageKey: APP_ICON,
      largeImageText: "EveryGameStat",
      buttons: [{ label: "EveryGameStat", url: "https://everygamestat.com" }]
    };
    ensureClient().then(() => push(lastActivity));
    return;
  }
  idleTs = null;
  if (!startTs || lastGame !== game) startTs = Date.now();
  lastGame = game;
  /* Medal-stijl: de gamenaam is de titel ("Playing Rocket League"), de kaart zegt
     "Tracking stats in Rocket League with EveryGameStat", de game-cover groot,
     het EGS-logo klein in de hoek, en de regel eronder is de live-stand/server. */
  lastActivity = {
    name: txt(game + " with EveryGameStat", "EveryGameStat"), type: 0, statusDisplayType: 0,
    details: txt("Tracking stats in " + game + " with EveryGameStat", "EveryGameStat"),
    state: txt(state, "Playing"),
    startTimestamp: startTs,
    largeImageKey: img(art, gameIcon(game)),
    largeImageText: txt(game, "EveryGameStat"),
    smallImageKey: APP_ICON,
    smallImageText: "EveryGameStat Companion",
    buttons: [{ label: "View stats on EveryGameStat", url: "https://everygamestat.com" }]
  };
  ensureClient().then(() => push(lastActivity));
}

/* periodiek opnieuw verbinden (Discord kan later gestart worden of herstarten) */
setInterval(() => { if (lastActivity && !ready) ensureClient(); }, 20 * 1000);

function stop() {
  lastActivity = null; idleTs = null; startTs = null; lastGame = null;
  push(null);
  dropClient();
  setStatus({ phase: "idle", user: null, error: null });
}

module.exports = {
  setActivity, stop,
  getStatus: () => ({ ...status, hasActivity: !!lastActivity, game: lastActivity && lastActivity.largeImageText || null }),
  onStatus: (fn) => { onStatus = fn; }
};
/* art: optionele afbeeldings-URL van de detector (Steam-cover per appid) */
