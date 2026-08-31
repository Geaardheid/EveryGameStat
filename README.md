# EGS Companion

The [EveryGameStat](https://everygamestat.com) desktop companion. It brings the one thing no website can: **local, per-session game stats** from your own PC, straight to your shareable EGS card.

## How it works

1. **Install** — download the latest `EGS-Companion-Setup-x.x.x.exe` from [Releases](../../releases), run it. That's it: no Node, no terminal, no config files.
2. **Link** — on everygamestat.com, go to *Account → Companion* and generate a link code. Type it into the app once.
3. **Play** — the companion sits in your system tray. Finished matches appear live in the app and sync to your EGS account automatically. Offline? Matches are saved locally and synced later.

Updates install silently in the background via GitHub Releases.

## Transparency (read this if you worry about anti-cheat)

This is an open-source project **by design**, so anyone can verify what it does:

- **Read-only.** The companion only *reads* local log files and local APIs that games expose on purpose.
- **Never game memory.** It does not attach to, inject into, or read the memory of any game process. This is a hard design rule that will never change.
- **No passwords.** The app never sees your EveryGameStat password. Linking uses a short-lived code that is exchanged for a device token; you can revoke it any time from the site or the app.

### Rocket League

Uses the **official Stats API built into the game by Psyonix** (a local TCP stream on `127.0.0.1:49123`). One-time setup: create `Documents\My Games\Rocket League\TAGame\Config\TAStatsAPI.ini` with:

```ini
[TAGame.MatchStatsExporter_TA]
Port=49123
PacketSendRate=30
```

then restart Rocket League. The in-app "Setup" button shows these instructions too.

## Supported games

| Game | Source | Status |
|---|---|---|
| Rocket League | Official local Stats API | ✅ Live |
| Dead by Daylight | Local log parsing (NightLight-style) | 🧪 Planned, will be labeled experimental |
| More | One adapter at a time | 🔜 |

## Development

```bash
npm install
npm start        # run in dev
npm run dist     # build the Windows installer locally
```

Releases are built by GitHub Actions: push a tag like `v0.2.1` and the workflow builds and publishes the installer automatically.

## License

MIT
