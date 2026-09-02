/* Praat uitsluitend met de EGS companion-ingest edge function.
   Auth: device-token (via koppelcode verkregen) — nooit wachtwoorden. */
const SB_URL = "https://wcsgosrevyyafnerrhge.supabase.co";
const SB_KEY = "sb_publishable_mric3P9h3YsHU_t5Jc5wWw_qulO3z8I";
const ENDPOINT = SB_URL + "/functions/v1/companion-ingest";

let config = null;
function init(cfg) { config = cfg; }

async function call(body) {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": SB_KEY },
    body: JSON.stringify(body)
  });
  const d = await r.json().catch(() => ({ ok: false, error: "bad_response" }));
  return d;
}

function token() { return config ? config.get().token : null; }

async function claim(code, appVersion) {
  return call({ action: "claim", code, device_name: require("os").hostname(), app_version: appVersion });
}
async function ingest(game, matches) {
  return call({ action: "ingest", token: token(), game, matches });
}
async function recent(limit) {
  return call({ action: "recent", token: token(), limit });
}
async function unlink() {
  return call({ action: "unlink", token: token() });
}
async function ingestSessions(sessions) {
  return call({ action: "ingest_sessions", token: token(), sessions });
}
async function sessionsSummary() {
  return call({ action: "sessions_summary", token: token() });
}
async function ingestGmatch(match) {
  return call({ action: "ingest_gmatch", token: token(), match });
}
async function social(action, extra) {
  return call(Object.assign({ action, token: token() }, extra || {}));
}
async function profile() {
  return call({ action: "profile", token: token() });
}
/* IGDB-metadata via de EGS game-info function (gecachet server-side). */
async function gameInfo(steam_appid, name) {
  const r = await fetch(SB_URL + "/functions/v1/game-info", {
    method: "POST", headers: { "Content-Type": "application/json", "apikey": SB_KEY },
    body: JSON.stringify({ steam_appid, name })
  });
  return r.json().catch(() => ({ ok: false }));
}
async function hubs() {
  return call({ action: "hubs", token: token() });
}
async function ping() {
  return call({ action: "ping", token: token() });
}

module.exports = { init, claim, ingest, recent, unlink, ping, profile, ingestSessions, sessionsSummary, ingestGmatch, social, gameInfo, hubs };
