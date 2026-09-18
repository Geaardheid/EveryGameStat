/* Config in de userData-map (overleeft updates; weg bij "app-data verwijderen"). */
const fs = require("fs");
const path = require("path");

let file = null;
let cache = {};

function init(userDataDir) {
  file = path.join(userDataDir, "egs-companion.json");
  try { cache = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { cache = {}; }
  if (!Array.isArray(cache.queue)) cache.queue = [];
}

function get() { return cache; }

function set(kv) {
  Object.assign(cache, kv);
  try { fs.writeFileSync(file, JSON.stringify(cache, null, 2)); } catch (e) {}
}

/* offline-wachtrij: potten die niet verstuurd konden worden */
function queueSession(session) {
  cache.squeue = cache.squeue || [];
  cache.squeue.push(session);
  if (cache.squeue.length > 200) cache.squeue = cache.squeue.slice(-200);
  set({});
}

function queueMatch(game, match) {
  cache.queue.push({ game, match });
  if (cache.queue.length > 200) cache.queue = cache.queue.slice(-200);
  set({});
}

let flushing = false;
async function flushQueue(api) {
  if (flushing || !cache.token) return;
  if (!cache.queue.length && !(cache.squeue || []).length) return;
  flushing = true;
  try {
    const byGame = {};
    for (const q of cache.queue) (byGame[q.game] = byGame[q.game] || []).push(q.match);
    for (const game of Object.keys(byGame)) {
      const r = await api.ingest(game, byGame[game]);
      if (!r.ok) return; /* nog steeds offline: laten staan */
    }
    cache.queue = [];
    set({});
    if ((cache.squeue || []).length) {
      const r = await api.ingestSessions(cache.squeue);
      if (r.ok) { cache.squeue = []; set({}); }
    }
  } catch (e) { /* volgende keer opnieuw */ }
  finally { flushing = false; }
}

module.exports = { init, get, set, queueMatch, queueSession, flushQueue };
