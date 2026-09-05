/* Call of Duty via de eigen Activision-login — ONOFFICIEEL.
   Activision heeft geen publieke API en schermt pd.callofduty.com af met Akamai;
   vanaf een server krijg je 403, vanaf een echte browser op een thuis-IP niet.
   Daarom doet de app het zelf: login in een app-venster (eigen cookie-partitie),
   ophalen met Chromium's netwerkstack, en alleen het gevormde resultaat naar EGS. */
const { BrowserWindow, session } = require("electron");
const api = require("./api");
const config = require("./config");

const PART = "persist:cod";
/* Activision verhuist paden zonder aankondiging; we proberen de bekende prefixes. */
const BASES = ["https://pd.callofduty.com/api/papi-client", "https://pd.callofduty.com/api/x/v1"];
let BASE = BASES[0];
const TITLES = [
  { key: "bo6", modes: ["mp", "wz"] }, { key: "mw3", modes: ["mp", "wz"] }, { key: "mw2", modes: ["mp", "wz"] },
  { key: "mw", modes: ["mp", "wz"] }, { key: "cw", modes: ["mp"] }, { key: "vg", modes: ["mp"] }
];
let loginWin = null, timer = null, onStatus = () => {};

function ses() { return session.fromPartition(PART); }
async function cookieValue() {
  try { const c = await ses().cookies.get({ name: "ACT_SSO_COOKIE" }); const hit = c.find((x) => x.domain.includes("callofduty.com") && x.value); return hit ? hit.value : null; } catch (e) { return null; }
}
async function hasCookie() { return !!(await cookieValue()); }
/* Identiteit zoals de community-wrappers: userInfo op profile.callofduty.com met de cookie in het pad. */
async function identities() {
  const cv = await cookieValue(); if (!cv) throw new Error("not_logged_in");
  const r = await ses().fetch("https://profile.callofduty.com/cod/userInfo/" + cv, { headers: { "Accept": "application/json, text/plain, */*", "Referer": "https://profile.callofduty.com/" } });
  const text = await r.text();
  const m = text.match(/\{[\s\S]*\}/); let d = null; try { d = JSON.parse(m ? m[0] : text); } catch (e) {}
  if (!d) throw new Error("userInfo http " + r.status);
  const ids = d?.userInfo?.identities || d?.identities || [];
  if (!Array.isArray(ids) || !ids.length) throw new Error("no identities (" + JSON.stringify(d).slice(0, 120) + ")");
  return ids.map((x) => ({ platform: x.provider || x.platform, username: x.username }));
}
async function get(path, base) {
  const r = await ses().fetch((base || BASE) + path, { headers: { "Accept": "application/json, text/plain, */*", "Referer": "https://www.callofduty.com/" } });
  const text = await r.text();
  let d = null; try { d = JSON.parse(text); } catch (e) {}
  if (!d) throw new Error("http " + r.status + (r.status === 403 ? " (blocked)" : " (no json)"));
  if (d.status !== "success") throw new Error(String(d?.data?.message || (d.errorCode ? d.errorCode : "") || d?.message || JSON.stringify(d).slice(0, 100)));
  return d.data;
}
function shape(mode, d) {
  const p = mode === "wz" ? (d?.br_all ?? d?.lifetime?.mode?.br_all?.properties ?? {}) : (d?.lifetime?.all?.properties ?? {});
  const n = (k) => (typeof p[k] === "number" && isFinite(p[k])) ? p[k] : null;
  const out = { level: d?.level ?? null, prestige: d?.prestige ?? null, kills: n("kills"), deaths: n("deaths"), kd: n("kdRatio"), wins: n("wins"), losses: n("losses"),
    matches: n("totalGamesPlayed") ?? n("gamesPlayed"), score: n("score"), spm: n("scorePerMinute"), accuracy: n("accuracy"), headshots: n("headshots"), assists: n("assists"),
    time_played_min: n("timePlayedTotal") != null ? Math.round(n("timePlayedTotal") / 60) : null, best_killstreak: n("recordKillStreak"), win_pct: n("winLossRatio") };
  if (mode === "wz") { out.top5 = n("topFive"); out.top10 = n("topTen"); out.top25 = n("topTwentyFive"); out.downs = n("downs"); out.revives = n("revives"); }
  return out;
}

/** Login-venster; zodra de ACT_SSO_COOKIE er staat sluit het en synchroniseren we. */
function login(parent) {
  if (loginWin && !loginWin.isDestroyed()) { loginWin.focus(); return; }
  loginWin = new BrowserWindow({ width: 520, height: 720, parent, title: "Activision \u00b7 inloggen", autoHideMenuBar: true,
    webPreferences: { partition: PART, contextIsolation: true, nodeIntegration: false, sandbox: true } });
  loginWin.loadURL("https://profile.callofduty.com/cod/login?redirectUrl=https://www.callofduty.com/");
  const check = async () => { if (await hasCookie()) { try { loginWin.close(); } catch (e) {} config.set({ cod_linked: true }); onStatus({ state: "linked" }); sync(); } };
  loginWin.webContents.on("did-navigate", check);
  loginWin.webContents.on("did-navigate-in-page", check);
  loginWin.on("closed", () => { loginWin = null; });
}

/** Profiel ophalen en naar EGS sturen. */
async function sync() {
  if (!(await hasCookie())) { onStatus({ state: "unlinked" }); return { ok: false, error: "not_logged_in" }; }
  onStatus({ state: "syncing" });
  try {
    let list = [];
    try { list = await identities(); }
    catch (e1) { const ids = await get("/crm/cod/v2/identities"); list = Array.isArray(ids?.titleIdentities) ? ids.titleIdentities : []; if (!list.length) throw e1; }
    /* uno = Activision-ID, werkt voor alle titels; anders eerste identity */
    const uno = list.find((x) => x.platform === "uno") || list[0];
    if (!uno) throw new Error("no_identity");
    const platform = uno.platform, gamer = encodeURIComponent(uno.username);
    const titles = [], errors = [];
    for (const t of TITLES) for (const mode of t.modes) {
      let done = false;
      for (const base of BASES) {
        try { const d = await get(`/stats/cod/v1/title/${t.key}/platform/${platform}/gamer/${gamer}/profile/type/${mode}`, base); titles.push({ title: t.key, mode, stats: shape(mode, d) }); BASE = base; done = true; break; }
        catch (e) { errors.push(t.key + "/" + mode + (base.includes("/x/") ? "[x]" : "") + ": " + e.message); }
      }
      if (done) continue;
    }
    if (!titles.length) throw new Error(errors.map((x) => x.slice(0, 60)).join(" \u00b7 ").slice(0, 400));
    const r = await api.social("cod_ingest", { profile: { username: uno.username, platform, titles } });
    if (!r || !r.ok) throw new Error(r && r.error || "ingest_failed");
    config.set({ cod_linked: true, cod_last: Date.now(), cod_user: uno.username });
    onStatus({ state: "ok", user: uno.username, titles: titles.length, at: Date.now() });
    return { ok: true, titles: titles.length, user: uno.username };
  } catch (e) {
    const msg = String(e.message || e);
    onStatus({ state: "error", message: msg });
    return { ok: false, error: msg };
  }
}
async function unlink() {
  try { await ses().clearStorageData(); } catch (e) {}
  config.set({ cod_linked: false, cod_last: null, cod_user: null });
  try { await api.social("cod_unlink", {}); } catch (e) {}
  onStatus({ state: "unlinked" });
}
function start(cb) {
  onStatus = cb || onStatus;
  clearInterval(timer);
  timer = setInterval(() => { if (config.get().cod_linked) sync(); }, 6 * 3600 * 1000);
  if (config.get().cod_linked) setTimeout(sync, 15000);
}
async function status() { const c = config.get(); return { linked: !!c.cod_linked && await hasCookie(), user: c.cod_user || null, last: c.cod_last || null }; }
module.exports = { login, sync, unlink, start, status };
