/* ============================================================
   ocr.js — screenshot-tracker
   ------------------------------------------------------------
   Legt het scherm vast (desktopCapturer — pixels, zoals OBS),
   OCR't LOKAAL met tesseract.js (gebundelde taaldata, geen
   uploads), en probeert kills/deaths/result uit het scorebord
   te halen. De gebruiker bevestigt altijd voordat er iets wordt
   opgeslagen. Screenshots verlaten de pc nooit.
   ============================================================ */
const { desktopCapturer, screen } = require("electron");
const path = require("path");

let workerPromise = null;
function getWorker() {
  if (!workerPromise) {
    const { createWorker } = require("tesseract.js");
    workerPromise = createWorker("eng", 1, {
      langPath: path.join(__dirname, "..", "assets", "ocr"),
      gzip: true,
      cacheMethod: "none",
      logger: () => {}
    });
  }
  return workerPromise;
}

async function captureScreen() {
  const disp = screen.getPrimaryDisplay();
  const { width, height } = disp.size;
  const scale = disp.scaleFactor || 1;
  const sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width: Math.round(width * scale), height: Math.round(height * scale) }
  });
  const primary = sources.find((s) => String(s.display_id) === String(disp.id)) || sources[0];
  if (!primary || primary.thumbnail.isEmpty()) throw new Error("capture_empty");
  return primary.thumbnail.toPNG();
}

/* heuristiek: haal cijfers uit de scorebordregel van de speler */
function parseScoreboard(text, playerName) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const out = { kills: null, deaths: null, result: "unknown", raw_lines: lines.length };

  const up = text.toUpperCase();
  if (/\b(VICTORY|WON|GEWONNEN|WIN)\b/.test(up)) out.result = "win";
  else if (/\b(DEFEAT|LOST|VERLOREN|LOSS)\b/.test(up)) out.result = "loss";
  else if (/\bDRAW\b/.test(up)) out.result = "draw";

  /* 1) regel met de spelersnaam zoeken */
  let row = null;
  if (playerName) {
    const want = playerName.toLowerCase().replace(/[^a-z0-9]/g, "");
    row = lines.find((l) => l.toLowerCase().replace(/[^a-z0-9]/g, "").includes(want) && /\d/.test(l));
  }
  /* 2) anders: eerste regel die op een statsrij lijkt (3+ getallen) */
  if (!row) row = lines.find((l) => (l.match(/\b\d{1,3}\b/g) || []).length >= 3 && !/^\d+[:.]\d+$/.test(l));
  if (row) {
    const nums = (row.match(/\b\d{1,3}\b/g) || []).map(Number).filter((n) => n <= 200);
    /* COD-volgorde is doorgaans Score · Kills · Deaths(·Assists); score is vaak 4+ cijfers en al weggefilterd */
    if (nums.length >= 2) { out.kills = nums[0]; out.deaths = nums[1]; }
    if (nums.length >= 3) { out.kills = nums[nums.length - 3]; out.deaths = nums[nums.length - 2]; }
  }
  return out;
}

async function captureAndRead(playerName) {
  const png = await captureScreen();
  const worker = await getWorker();
  const { data } = await worker.recognize(png);
  const parsed = parseScoreboard(data.text || "", playerName);
  return { ...parsed, text_sample: (data.text || "").slice(0, 400) };
}

module.exports = { captureAndRead, parseScoreboard };
