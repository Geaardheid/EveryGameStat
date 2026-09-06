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

async function ensureClient() {
  if (ready || connecting) return;
  connecting = true;
  try {
    const { Client } = require("@xhayper/discord-rpc");
    client = new Client({ clientId: DISCORD_APP_ID });
    client.on("ready", () => { ready = true; if (lastActivity) push(lastActivity); });
    client.on("disconnected", () => { ready = false; });
    await client.login();
  } catch (e) {
    ready = false;
    try { client && client.destroy && client.destroy(); } catch (_) {}
    client = null;
  }
  connecting = false;
}

async function push(act) {
  if (!ready || !client) return;
  try {
    if (act) await client.user.setActivity(act);
    else await client.user.clearActivity();
  } catch (e) {}
}

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
  return GAME_ICONS[String(game || "").toLowerCase()] || EGS_LOGO;
}

/**
 * Presence bijwerken.
 * @param {string|null} game  naam van de game, of null (niets aan het spelen)
 * @param {string|null} state extra regel, bijv. "1 - 4" of "23 min this session"
 */
/* Geen game bezig: tóch een nette EGS-presence i.p.v. Discords eigen "?"-detectie
   van EGS Companion.exe (die grijze vraagteken-kaart). App-icoon via externe URL. */
const APP_ICON = EGS_LOGO;
function setActivity(game, state, art) {
  if (!game) {
    startTs = null;
    lastActivity = {
      details: "EGS Companion",
      state: "Tracking stats \u00b7 everygamestat.com",
      largeImageKey: APP_ICON,
      largeImageText: "EveryGameStat",
      buttons: [{ label: "EveryGameStat", url: "https://everygamestat.com" }]
    };
    ensureClient().then(() => push(lastActivity));
    return;
  }
  if (!startTs) startTs = Date.now();
  lastActivity = {
    details: "In a game of " + game,
    state: state || "via EGS Companion",
    startTimestamp: startTs,
    largeImageKey: art || gameIcon(game),
    largeImageText: game,
    smallImageKey: APP_ICON,
    smallImageText: "EGS Companion",
    buttons: [{ label: "EveryGameStat", url: "https://everygamestat.com" }]
  };
  ensureClient().then(() => push(lastActivity));
}

/* periodiek opnieuw verbinden (Discord kan later gestart worden) */
setInterval(() => { if (lastActivity && !ready) ensureClient(); }, 60 * 1000);

function stop() {
  lastActivity = null;
  push(null);
  try { client && client.destroy && client.destroy(); } catch (e) {}
  client = null; ready = false;
}

module.exports = { setActivity, stop };
/* art: optionele afbeeldings-URL van de detector (Steam-cover per appid) */
