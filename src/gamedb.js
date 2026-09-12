/* Generieke game-detectie — zoals Medal/Discord, zonder game-geheugen.
   1) Steam zet bij een draaiende Steam-game HKCU\Software\Valve\Steam\RunningAppID;
      appid → naam/cover uit je eigen bibliotheek (werkt voor élke Steam-game).
   2) Anders: exe-lijst voor bekende niet-Steam-games (Battle.net, Xbox-app, Epic, Riot).
   3) Call of Duty: de venstertitel zegt welke titel (BO7, MW4, Warzone …). */
const { execFile } = require("child_process");

const EXES = [
  { exes: ["cod26-cod.exe", "cod25-cod.exe", "cod24-cod.exe", "cod23-cod.exe", "cod22-cod.exe", "cod.exe"], label: "Call of Duty", family: "cod" } /* titel-exe vóór de HQ-exe: de eerste treffer bepaalt de titel */,
  { exes: ["fortniteclient-win64-shipping.exe"], label: "Fortnite", appid: null, art: "icon-fortnite.png" },
  { exes: ["rocketleague.exe"], label: "Rocket League", appid: 252950 },
  { exes: ["deadbydaylight-win64-shipping.exe", "dbd-win64-shipping.exe"], label: "Dead by Daylight", appid: 381210 },
  { exes: ["rustclient.exe"], label: "Rust", appid: 252490 },
  { exes: ["tslgame.exe"], label: "PUBG", appid: 578080 },
  { exes: ["fivem.exe", "fivem_gtaprocess.exe"], label: "FiveM" , art: "game-fivem.png" },
  { exes: ["gta5.exe", "gta5_enhanced.exe", "playgtav.exe"], label: "Grand Theft Auto V", appid: 271590 },
  { exes: ["valorant-win64-shipping.exe"], label: "VALORANT", art: "icon-valorant.png" },
  { exes: ["league of legends.exe"], label: "League of Legends", art: "icon-lol.png" },
  { exes: ["cs2.exe"], label: "Counter-Strike 2", appid: 730 },
  { exes: ["r5apex.exe", "r5apex_dx12.exe"], label: "Apex Legends", appid: 1172470 },
  { exes: ["minecraft.windows.exe", "minecraftlauncher.exe"], label: "Minecraft", art: "icon-minecraft.png" },
  { exes: ["overwatch.exe"], label: "Overwatch 2", appid: 2357570 },
  { exes: ["thefinals.exe", "discovery.exe"], label: "THE FINALS", appid: 2073850 },
  { exes: ["forzahorizon5.exe"], label: "Forza Horizon 5", appid: 1551360 },
  { exes: ["eafc24.exe", "fc24.exe"], label: "EA SPORTS FC 24", appid: 2195250 },
  { exes: ["eafc25.exe", "fc25.exe"], label: "EA SPORTS FC 25", appid: 2669320 },
  { exes: ["eafc26.exe", "fc26.exe"], label: "EA SPORTS FC 26" },
  { exes: ["marvel-win64-shipping.exe"], label: "Marvel Rivals", appid: 2767030 },
  { exes: ["helldivers2.exe"], label: "HELLDIVERS 2", appid: 553850 },
  { exes: ["eldenring.exe"], label: "Elden Ring", appid: 1245620 },
  { exes: ["dota2.exe"], label: "Dota 2", appid: 570 },
  { exes: ["escapefromtarkov.exe"], label: "Escape from Tarkov" },
  { exes: ["robloxplayerbeta.exe"], label: "Roblox" },
  { exes: ["seaofthieves.exe"], label: "Sea of Thieves", appid: 1172620 },
  { exes: ["ufc5.exe"], label: "UFC 5" }
];
/* Java-Minecraft draait als javaw.exe; alleen tellen als de venstertitel 'Minecraft' zegt */
const TITLE_ONLY = [{ exe: "javaw.exe", contains: "minecraft", label: "Minecraft", art: "icon-minecraft.png" }];

const COD_TITLES = [
  ["black ops 7", "Call of Duty: Black Ops 7"], ["black ops 6", "Call of Duty: Black Ops 6"], ["modern warfare iv", "Call of Duty: Modern Warfare IV"],
  ["modern warfare 4", "Call of Duty: Modern Warfare IV"], ["mw4", "Call of Duty: Modern Warfare IV"], ["modern warfare iii", "Call of Duty: Modern Warfare III"],
  ["modern warfare ii", "Call of Duty: Modern Warfare II"], ["warzone", "Call of Duty: Warzone"]
];

function reg(key, value) {
  return new Promise((resolve) => {
    if (process.platform !== "win32") return resolve(null);
    execFile("reg", ["query", key, "/v", value], { windowsHide: true }, (err, out) => {
      if (err || !out) return resolve(null);
      const m = out.match(/REG_DWORD\s+0x([0-9a-f]+)/i);
      resolve(m ? parseInt(m[1], 16) : null);
    });
  });
}
/** Steam-appid van de game die nu draait (0/null = geen). */
async function steamRunningAppId() { const v = await reg("HKCU\\Software\\Valve\\Steam", "RunningAppID"); return v && v > 0 ? v : null; }

/** Venstertitels van processen (alleen de gevraagde exe's), via PowerShell. */
function windowTitles(exeNames) {
  return new Promise((resolve) => {
    if (process.platform !== "win32" || !exeNames.length) return resolve({});
    const names = exeNames.map((e) => e.replace(/\.exe$/i, "")).join(",");
    const ps = `Get-Process -Name ${names} -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | ForEach-Object { $_.ProcessName + '|' + $_.MainWindowTitle }`;
    execFile("powershell", ["-NoProfile", "-NonInteractive", "-Command", ps], { windowsHide: true, timeout: 8000 }, (err, out) => {
      const map = {};
      if (!err && out) for (const line of out.split(/\r?\n/)) { const i = line.indexOf("|"); if (i > 0) map[line.slice(0, i).toLowerCase() + ".exe"] = line.slice(i + 1); }
      resolve(map);
    });
  });
}
/* Per seizoen een eigen exe in de unified client; de venstertitel zegt alleen "Call of Duty". */
const COD_EXE_TITLES = { "cod26-cod.exe": "Call of Duty: Modern Warfare IV", "cod25-cod.exe": "Call of Duty: Black Ops 7", "cod24-cod.exe": "Call of Duty: Black Ops 6", "cod23-cod.exe": "Call of Duty: Modern Warfare III", "cod22-cod.exe": "Call of Duty: Modern Warfare II" };
function codTitleFrom(windowTitle, appid, exe) {
  const via = String(exe || "").toLowerCase();
  for (const [k, label] of Object.entries(COD_EXE_TITLES)) if (via.includes(k)) return label;
  const m = /cod(\d\d)-cod\.exe/.exec(via); /* onbekend seizoen: jaartal tonen i.p.v. alleen "Call of Duty" */
  if (m) return "Call of Duty (20" + m[1] + ")";
  const t = String(windowTitle || "").toLowerCase();
  for (const [k, label] of COD_TITLES) if (t.includes(k)) return label;
  return null;
}
module.exports = { EXES, TITLE_ONLY, steamRunningAppId, windowTitles, codTitleFrom };
