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
    rlSetupNotFound: "Rocket League folder not found \u00b7 point to it yourself (Documents\\My Games\\Rocket League, or the game folder).",
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
    updReady: (v) => "Update v" + v + " ready \u00b7 installs on restart.",
    updRestart: "Restart now",
    cachedNote: "offline \u00b7 showing last known data",
    procTag: "session tracker",
    procOff: "not detected \u00b7 start the game",
    procOn: (m) => "running \u00b7 " + m + " min this session",
    procTotal: (h, n) => h + " h measured \u00b7 " + n + " session(s)",
    sessSaved: (g, m) => g + " \u00b7 " + m + " min \u00b7 saved \u2713",
    capBtn: "F9",
    capBusy: "Reading scoreboard\u2026 (screenshot stays on your PC)",
    capDone: "Check the numbers \u00b7 OCR guesses, you decide.",
    capError: "Capture failed. Is the game on Borderless? Try again with the scoreboard visible.",
    capKills: "Kills",
    capDeaths: "Deaths",
    capResult: "Result",
    capSave: "Save match",
    capDiscard: "Discard",
    capSaved: (k, d) => "MW4 Beta \u00b7 " + k + "/" + d + " \u00b7 saved \u2713",
    capHint: "Press F9 while the scoreboard is on screen.",
    tabHome: "Home", tabSocial: "Social", tabSite: "Site", tabLibrary: "Library", tabBoard: "Community",
    npPlaying: "Now playing", npSince: (m) => m + " min this session", npMatch: "in a match", memberSince: (d) => "Member since " + d,
    toastLinked: "Linked \u00b7 welcome to the Companion", toastSession: (g, m) => g + " \u00b7 " + m + " min saved to your card", toastMatch: (r) => "Rocket League \u00b7 " + r + " synced", toastAch: "Achievement unlocked", toastDone: "Saved",
    emptyLib: "Nothing here yet. Link a platform on the site.", emptyBoard: "No public cards yet.",
    tabHubs: "Hubs", hubsHead: "Game hubs", hubsSub: "The games the Companion is built around", libRecent: "Recently played", libAll: "All games", libMost: "Most played", statsPlatforms: "Platforms",
    hubLive: "Live tracking", hubLinked: "Stats linked", hubNoData: "Not linked", hubSoon: "Coming soon", hubSessions: "sessions", hubMatches: "matches", hubLinkOn: "Link on the site", hubRlNote: "Rocket League is tracked live by the Companion \u00b7 matches land on Home.",
    mcTag: "per server", mcOff: "not running \u00b7 hours per server via latest.log", mcOn: "running \u00b7 in the menu", mcOnServer: (x) => "on " + x, mcOnWorld: (x) => "singleplayer \u00b7 " + x,
    mcServers: "Servers", mcWorlds: "Singleplayer worlds", mcTotal: "Total measured", mcHours: "hours", mcSessions: "sessions", mcLast: "last", mcDeaths: "deaths", mcAdv: "advancements", mcEmpty: "Play Minecraft (Java) with the Companion open and your servers appear here. Bedrock has no log, so only total hours via Xbox.",
    hubSubMc: "Hours per server \u00b7 latest.log",
    rlPerPlaylist: "Per playlist", rlForm: "Last 10", rlRecords: "Records", rlStreak: "Current streak", rlBestStreak: "Best win streak", rlAcc: "Shot accuracy", rlBestGame: "Most goals in a match", rlAvgScore: "Average score", rlToday: "today", rlNoPl: "Matches without a playlist",
    ghRanks: "The rank ladder", ghRanksNote: "Each rank has four divisions except the top one", ghDivs: "4 divisions each", ghNoDiv: "No divisions", ghPlaylists: "Ranked playlists", ghPlaylistsNote: "Each playlist has its own rank", ghYourStats: "Your stats", ghAbout: "About tracking", ghBack: "Back",
    ghRlAbout: "The Companion reads Rocket League's official local Stats API. Every match lands on your card with goals, assists, saves, shots and the result. No MMR or rank from the API, because there is none.",
    ghSeason: "Seasons and resets", ghSeasonP: "Competitive seasons run a few months. At the end everyone is placed back a little, so ranks stay comparable.",
    mdWeak: "Weak link", mdWeakP: (c, n) => c + " at level " + n, mdWeakVs: (n) => n + " below your opponent's average", mdLevels: "Card levels", mdYou: "You", mdOpp: "Opponent", mdAvgLvl: "avg level", mdShared: "Cards you both played", mdTowerHp: "King tower", mdStartTr: "Trophies at start", mdLoading: "Loading match…", mdNoDetail: "No detail available for this match.", mdElixir: "avg elixir", mdTower: "Tower troop", mdEven: "Card levels were even",
    mdHow: "How we read this match", mdRlHow: "The result comes from Rocket League's own match-end event, the mode from the number of players, and the stats from your own player row in the official Stats API. Nothing estimated.", mdVsAvg: "Compared with your average", mdAbove: "above", mdBelow: "below", mdSame: "same as", mdPerMatchAvg: "your average",
    crDeck: "Current deck", crLevel: "lvl", crElixir: "avg elixir", crBattles: "Recent battles", crForm: "Last 10", crWinrate: "win rate", crWins: "wins", crLosses: "losses", crCrowns: "crowns", crTrophies: "Trophies", crBest: "Personal best", crToBest: (n) => n + " to your best", crAtBest: "At your personal best", crOppDeck: "Opponent deck", crLadder: "Ladder", crPlaytime: "estimated playtime", crClan: "Clan", crArena: "Arena", crEvo: "Evolution", crNoBattles: "No recent battles in the API yet.",
    rlDelUnknown: "Clear matches without a result", rlDelOne: "Delete this match", rlDelConfirm: (n) => "Delete " + n + " match(es) without a result? Your other matches stay.", rlDeleted: (n) => n + " deleted", rlDelFail: "Couldn't delete",
    rlMatches: "matches", rlWinrate: "win rate", rlGoals: "goals", rlAssists: "assists", rlSaves: "saves", rlShots: "shots", rlPerMatch: "per match", rlLast: "Last matches", rlEmpty: "No matches yet. Run the one-time Rocket League setup on Home, then play a match with the Companion open.", rlSetupGo: "Set up on Home", hubSetup: "Needs setup", rlToday: "today", rlWins: "wins", rlLosses: "losses",
    loadErr: "Couldn't load this. Check your connection.", retry: "Try again",
    setSecTracking: "Tracking", setSecGames: "Games", setSecApp: "App", setSecAccount: "Account", setTrackHint: "Detects games, records sessions and matches, updates your card and Discord.", setDiscordShort: "Discord Rich Presence", setAutostartShort: "Start with Windows",
    qpTrack: "Track with EGS", qpDiscord: "Discord presence", qpRefresh: "Refresh now", qpSettings: "Settings", qpIdle: "Nothing detected", qpPaused: "Tracking paused", qpDetecting: "Watching for games",
    streakHead: "Play streak", streakDays: (n) => n === 1 ? "day in a row" : "days in a row", streakToday: "played today", streakOpen: "not played yet today", streakBest: (n) => "best " + n, streakWeek: (h) => h + " h this week", streakNone: "Play with the Companion open to start a streak.",
    gsStats: "Your statistics", gsRatios: "Ratios", gsOther: "Other statistics", gsAch: "Achievements", gsAchPrivate: "Your Steam game details are private \u00b7 set them to public in Steam privacy settings to see achievements.", gsNoStats: "This game doesn't publish statistics on Steam.", gsLocked: "locked", gsRare: "of players",
    hubSubRl: "Live match tracking", hubSubDbd: "Steam stats \u00b7 log adapter soon", hubSubApi: "Official API", hubSubSteam: "Steam stats", hubSubPlat: "Platform totals",
    libHead: "Your library",
    libSearchPh: "Search games\u2026",
    libSortHours: "Most played", libSortName: "Name", libSortAch: "Achievements", libSortLast: "Recently played",
    libAllPlatforms: "All platforms",
    libLoading: "Loading your library\u2026",
    libCount: (n) => n + " games",
    gsLoading: "Loading game info\u2026", gsNoKey: "Game info is not configured yet.", gsNotFound: "No extra info found for this game.",
    libShowApps: "Show apps (Netflix, Spotify …)",
    tabWeb: "Stats", webMyCard: "My card", webOpen: "Open in browser", setQuit: "Quit app completely", adReport: "Report ad", adRemove: "Remove ads",
    libFail: "Could not load right now.",
    tbIdle: "Not playing", tbNow: "Now playing", tbInMatch: "in a match",
    menuProfile: "My profile", menuCard: "Open my card on the web", menuSettings: "Settings",
    profTop: "Top games", profPlat: "Linked platforms", profGames: "games", profHours: "hours", profAch: "achievements", profPlats: "platforms",
    profSince: (d) => "Member since " + d, profPrivate: "This player's card is private.", profNotFound: "No player with this name.", profAddFriend: "Add friend", profMessage: "Message", profOwn: "This is you.", profSearchPh: "Find a player\u2026",
    tabStats: "Stats", statsHead: "Your game stats", statsEmpty: "Link a game on the website (Deep stats) and it shows up here.", statsAll: "All stats", statsBack: "Back", statsUpdated: "updated",
    gsViewSteam: "View on Steam", gsBuySteam: "Buy on Steam", gsWishlist: "Wishlist on Steam", gsTrailer: "Trailer", gsScreens: "Screenshots", gsFollow: "Follow on",
        fnTabPlayer: "Player", fnTabShop: "Item shop", fnTabNews: "News", fnTabMap: "Map", fnTabCos: "Cosmetics",
    fnShopH: "Item shop today", fnItems: "items", fnNewsH: "News", fnMapH: "The map", fnPois: "named locations",
    fnCosH: "Cosmetics", fnCosPh: "Search a skin, emote, pickaxe\u2026", fnCosNote: "Search the full cosmetics catalogue.", fnResults: "results", fnLastShop: "last in shop", fnSearch: "Search",
    fnPerMode: "Per mode", fnShare: "of your matches", fnLevel: "Level", fnNote: "Data from fortnite-api.com. Not affiliated with or endorsed by Epic Games.", fnNoData: "Nothing to show right now.",
    libSoon: "Coming soon on Steam", libSoonSub: "Popular upcoming games you don\u2019t own yet", btnOpenSteam: "Open in Steam", libRelease: (d) => "Releases " + d, gsOpenClient: "Open in Steam app",
boardHead: "Leaderboard",
    commHead: "Community",
    commSub: "Who is playing, the rankings and community matches. Public cards only.",
    commPlaying: "Playing now", commPlayingEmpty: "Nobody is live right now. Play with the Companion open and you show up here.",
    commRl: "Rocket League community", commRlNote: "All matches tracked by Companion users with a public card.",
    commPlayersLbl: "Players", commWinrate: "Win rate",
    profFlex: "Game highlights", profAct: "Activity on this PC",
    profActNote: "Sessions recorded by the Companion. Days without the Companion running stay empty.",
    profSessions: (n) => n === 1 ? "1 session" : n + " sessions",
    profMember: (n) => "Member #" + n, profLinked: "linked", profOf: (n) => "of " + n,

    boardHours: "Hours", boardGames: "Games", boardAch: "Achievements",
    nowPlaying: (g) => "Playing now \u00b7 " + g,
    dcOff: "Off. Nothing is sent to Discord.", dcSignedOut: "Sign in to EveryGameStat first. Presence only runs when you are signed in.", dcConnecting: "Connecting to Discord\u2026", dcIdle: "Connected to Discord as {name}. Waiting for a game.", dcShowing: "Connected to Discord as {name}. Showing: {game}.", dcHidden: "Friends can't see it? In Discord, check Settings, Activity Privacy, and the Privacy Settings of the server itself. If sharing your activity is off there, Discord hides this too.", dcNoDiscord: "Can't reach Discord on this PC. Start the Discord desktop app (the browser version doesn't work). If Discord runs as administrator, the Companion can't reach it. It retries every 20 seconds.", dcError: "Discord didn't answer: {err}. Retrying every 20 seconds.", dcSetError: "Connected as {name}, but Discord rejected the activity: {err}",
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
    socNoFriends: "No friends yet \u00b7 search above to add someone.",
    socAdd: "Add",
    socAccept: "Accept",
    socDecline: "Decline",
    socPending: "pending\u2026",
    socRemove: "Remove",
    socSent: "Request sent \u2713",
    socNowFriends: "You're now friends \u2713",
    chatPh: "Type a message\u2026",
    chatSend: "Send",
    chatEmpty: "Say hi",
    setMw4Exes: "Extra process names to track", detName: "Game detection \u00b7 every game", detHint: "Steam games are recognised automatically; Battle.net, Xbox app, Epic and Riot via a built-in list. Playtime per session lands on your card.",
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
    rlSetupNotFound: "Rocket League-map niet gevonden \u00b7 wijs hem zelf aan (Documenten\\My Games\\Rocket League, of de gamemap).",
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
    updReady: (v) => "Update v" + v + " klaar \u00b7 installeert bij herstart.",
    updRestart: "Nu herstarten",
    cachedNote: "offline \u00b7 laatst bekende data",
    procTag: "sessie-tracker",
    procOff: "niet gedetecteerd \u00b7 start de game",
    procOn: (m) => "draait \u00b7 " + m + " min deze sessie",
    procTotal: (h, n) => h + " u gemeten \u00b7 " + n + " sessie(s)",
    sessSaved: (g, m) => g + " \u00b7 " + m + " min \u00b7 opgeslagen \u2713",
    capBtn: "F9",
    capBusy: "Scorebord lezen\u2026 (screenshot blijft op je pc)",
    capDone: "Check de cijfers \u00b7 OCR gokt, jij beslist.",
    capError: "Vastleggen mislukt. Staat de game op Borderless? Probeer opnieuw met het scorebord in beeld.",
    capKills: "Kills",
    capDeaths: "Deaths",
    capResult: "Resultaat",
    capSave: "Pot opslaan",
    capDiscard: "Weggooien",
    capSaved: (k, d) => "MW4 Beta \u00b7 " + k + "/" + d + " \u00b7 opgeslagen \u2713",
    capHint: "Druk op F9 terwijl het scorebord in beeld staat.",
    tabHome: "Home", tabSocial: "Social", tabSite: "Site", tabLibrary: "Bibliotheek", tabBoard: "Community",
    npPlaying: "Speelt nu", npSince: (m) => m + " min deze sessie", npMatch: "pot bezig", memberSince: (d) => "Lid sinds " + d,
    toastLinked: "Gekoppeld \u00b7 welkom in de Companion", toastSession: (g, m) => g + " \u00b7 " + m + " min op je kaart gezet", toastMatch: (r) => "Rocket League \u00b7 " + r + " gesynct", toastAch: "Achievement unlocked", toastDone: "Opgeslagen",
    emptyLib: "Nog niets hier. Koppel een platform op de site.", emptyBoard: "Nog geen publieke kaarten.",
    tabHubs: "Hubs", hubsHead: "Game hubs", hubsSub: "De games waar de Companion om draait", libRecent: "Laatst gespeeld", libAll: "Alle games", libMost: "Meest gespeeld", statsPlatforms: "Platforms",
    hubLive: "Live tracking", hubLinked: "Stats gekoppeld", hubNoData: "Niet gekoppeld", hubSoon: "Binnenkort", hubSessions: "sessies", hubMatches: "potten", hubLinkOn: "Koppel op de site", hubRlNote: "Rocket League wordt live gevolgd door de Companion \u00b7 potten komen op Home.",
    mcTag: "per server", mcOff: "draait niet \u00b7 uren per server via latest.log", mcOn: "draait \u00b7 in het menu", mcOnServer: (x) => "op " + x, mcOnWorld: (x) => "singleplayer \u00b7 " + x,
    mcServers: "Servers", mcWorlds: "Singleplayer-werelden", mcTotal: "Totaal gemeten", mcHours: "uur", mcSessions: "sessies", mcLast: "laatst", mcDeaths: "doden", mcAdv: "advancements", mcEmpty: "Speel Minecraft (Java) met de Companion open en je servers verschijnen hier. Bedrock heeft geen log, dus alleen totaaluren via Xbox.",
    hubSubMc: "Uren per server \u00b7 latest.log",
    rlPerPlaylist: "Per playlist", rlForm: "Laatste 10", rlRecords: "Records", rlStreak: "Huidige reeks", rlBestStreak: "Langste winreeks", rlAcc: "Schotnauwkeurigheid", rlBestGame: "Meeste goals in een pot", rlAvgScore: "Gemiddelde score", rlToday: "vandaag", rlNoPl: "Potten zonder playlist",
    ghRanks: "De ranglijst", ghRanksNote: "Elke rank heeft vier divisies, behalve de hoogste", ghDivs: "4 divisies elk", ghNoDiv: "Geen divisies", ghPlaylists: "Ranked-playlists", ghPlaylistsNote: "Elke playlist heeft zijn eigen rank", ghYourStats: "Jouw stats", ghAbout: "Over de tracking", ghBack: "Terug",
    ghRlAbout: "De Companion leest de offici\u00eble lokale Stats API van Rocket League. Elke pot komt op je kaart met goals, assists, saves, schoten en de uitslag. Geen MMR of rank uit de API, want die bestaat niet.",
    ghSeason: "Seizoenen en resets", ghSeasonP: "Competitieve seizoenen duren een paar maanden. Aan het eind gaat iedereen iets terug, zodat ranks vergelijkbaar blijven.",
    mdWeak: "Zwakke schakel", mdWeakP: (c, n) => c + " op level " + n, mdWeakVs: (n) => n + " onder het gemiddelde van je tegenstander", mdLevels: "Kaartlevels", mdYou: "Jij", mdOpp: "Tegenstander", mdAvgLvl: "gem. level", mdShared: "Kaarten die jullie allebei speelden", mdTowerHp: "King tower", mdStartTr: "Trofee\u00ebn bij start", mdLoading: "Gevecht laden\u2026", mdNoDetail: "Geen detail beschikbaar voor dit gevecht.", mdElixir: "gem. elixer", mdTower: "Towertroep", mdEven: "De kaartlevels waren gelijk",
    mdHow: "Hoe we deze pot lezen", mdRlHow: "De uitslag komt uit Rocket League's eigen match-end-event, de modus uit het aantal spelers, en de stats uit jouw eigen spelersregel in de offici\u00eble Stats API. Niets geschat.", mdVsAvg: "Vergeleken met je gemiddelde", mdAbove: "boven", mdBelow: "onder", mdSame: "gelijk aan", mdPerMatchAvg: "je gemiddelde",
    crDeck: "Huidig deck", crLevel: "lvl", crElixir: "gem. elixer", crBattles: "Laatste gevechten", crForm: "Laatste 10", crWinrate: "winrate", crWins: "gewonnen", crLosses: "verloren", crCrowns: "kronen", crTrophies: "Trofeeën", crBest: "Persoonlijk record", crToBest: (n) => n + " tot je record", crAtBest: "Op je persoonlijk record", crOppDeck: "Deck van de tegenstander", crLadder: "Ladder", crPlaytime: "geschatte speeltijd", crClan: "Clan", crArena: "Arena", crEvo: "Evolutie", crNoBattles: "Nog geen recente gevechten in de API.",
    rlDelUnknown: "Potten zonder uitslag wissen", rlDelOne: "Deze pot verwijderen", rlDelConfirm: (n) => n + " pot(ten) zonder uitslag verwijderen? Je andere potten blijven staan.", rlDeleted: (n) => n + " verwijderd", rlDelFail: "Verwijderen mislukt",
    rlMatches: "potten", rlWinrate: "winrate", rlGoals: "goals", rlAssists: "assists", rlSaves: "saves", rlShots: "schoten", rlPerMatch: "per pot", rlLast: "Laatste potten", rlEmpty: "Nog geen potten. Doe de eenmalige Rocket League-setup op Home en speel een pot met de Companion open.", rlSetupGo: "Instellen op Home", hubSetup: "Setup nodig", rlToday: "vandaag", rlWins: "gewonnen", rlLosses: "verloren",
    loadErr: "Kon dit niet laden. Check je verbinding.", retry: "Opnieuw",
    setSecTracking: "Tracking", setSecGames: "Games", setSecApp: "App", setSecAccount: "Account", setTrackHint: "Detecteert games, meet sessies en potten, werkt je kaart en Discord bij.", setDiscordShort: "Discord Rich Presence", setAutostartShort: "Starten met Windows",
    qpTrack: "Tracken met EGS", qpDiscord: "Discord-presence", qpRefresh: "Nu verversen", qpSettings: "Instellingen", qpIdle: "Niets gedetecteerd", qpPaused: "Tracking gepauzeerd", qpDetecting: "Let op games",
    streakHead: "Speelreeks", streakDays: (n) => n === 1 ? "dag op rij" : "dagen op rij", streakToday: "vandaag gespeeld", streakOpen: "vandaag nog niet gespeeld", streakBest: (n) => "record " + n, streakWeek: (h) => h + " uur deze week", streakNone: "Speel met de Companion open en je reeks begint.",
    gsStats: "Jouw statistieken", gsRatios: "Ratio's", gsOther: "Overige statistieken", gsAch: "Achievements", gsAchPrivate: "Je Steam-gamegegevens staan op priv\u00e9 \u00b7 zet ze op openbaar in je Steam-privacy om achievements te zien.", gsNoStats: "Deze game publiceert geen statistieken op Steam.", gsLocked: "vergrendeld", gsRare: "van de spelers",
    hubSubRl: "Live pot-tracking", hubSubDbd: "Steam-stats \u00b7 log-adapter binnenkort", hubSubApi: "Offici\u00eble API", hubSubSteam: "Steam-stats", hubSubPlat: "Platformtotalen",
    libHead: "Jouw bibliotheek",
    libSearchPh: "Zoek games\u2026",
    libSortHours: "Meest gespeeld", libSortName: "Naam", libSortAch: "Achievements", libSortLast: "Laatst gespeeld",
    libAllPlatforms: "Alle platforms",
    libLoading: "Bibliotheek laden\u2026",
    libCount: (n) => n + " games",
    gsLoading: "Game-info laden\u2026", gsNoKey: "Game-info is nog niet ingesteld.", gsNotFound: "Geen extra info gevonden voor deze game.",
    libShowApps: "Apps tonen (Netflix, Spotify …)",
    tabWeb: "Stats", webMyCard: "Mijn kaart", webOpen: "Open in browser", setQuit: "App volledig afsluiten", adReport: "Meld advertentie", adRemove: "Advertenties verwijderen",
    libFail: "Kon nu niet laden.",
    tbIdle: "Niets bezig", tbNow: "Speelt nu", tbInMatch: "pot bezig",
    menuProfile: "Mijn profiel", menuCard: "Mijn kaart op het web", menuSettings: "Instellingen",
    profTop: "Topgames", profPlat: "Gekoppelde platforms", profGames: "games", profHours: "uur", profAch: "achievements", profPlats: "platforms",
    profSince: (d) => "Lid sinds " + d, profPrivate: "De kaart van deze speler is priv\u00e9.", profNotFound: "Geen speler met deze naam.", profAddFriend: "Vriend toevoegen", profMessage: "Bericht", profOwn: "Dit ben jij.", profSearchPh: "Zoek een speler\u2026",
    tabStats: "Stats", statsHead: "Jouw game-stats", statsEmpty: "Koppel een game op de website (Deep stats) en hij verschijnt hier.", statsAll: "Alle stats", statsBack: "Terug", statsUpdated: "bijgewerkt",
    gsViewSteam: "Bekijk op Steam", gsBuySteam: "Koop op Steam", gsWishlist: "Op Steam-verlanglijst", gsTrailer: "Trailer", gsScreens: "Screenshots", gsFollow: "Volg op",
        fnTabPlayer: "Speler", fnTabShop: "Itemshop", fnTabNews: "Nieuws", fnTabMap: "Map", fnTabCos: "Cosmetics",
    fnShopH: "Itemshop van vandaag", fnItems: "items", fnNewsH: "Nieuws", fnMapH: "De map", fnPois: "benoemde locaties",
    fnCosH: "Cosmetics", fnCosPh: "Zoek een skin, emote, pickaxe\u2026", fnCosNote: "Zoek in de volledige cosmetics-catalogus.", fnResults: "resultaten", fnLastShop: "laatst in de shop", fnSearch: "Zoeken",
    fnPerMode: "Per mode", fnShare: "van je potten", fnLevel: "Level", fnNote: "Data van fortnite-api.com. Niet verbonden met of goedgekeurd door Epic Games.", fnNoData: "Nu niets te tonen.",
    libSoon: "Binnenkort op Steam", libSoonSub: "Populaire aankomende games die je nog niet hebt", btnOpenSteam: "Open in Steam", libRelease: (d) => "Komt " + d, gsOpenClient: "Open in Steam-app",
boardHead: "Klassement",
    commHead: "Community",
    commSub: "Wie er speelt, het klassement en community-potten. Alleen publieke kaarten.",
    commPlaying: "Speelt nu", commPlayingEmpty: "Niemand is nu live. Speel met de Companion open en je staat hier.",
    commRl: "Rocket League-community", commRlNote: "Alle potten van Companion-gebruikers met een publieke kaart.",
    commPlayersLbl: "Spelers", commWinrate: "Winrate",
    profFlex: "Game-hoogtepunten", profAct: "Activiteit op deze pc",
    profActNote: "Sessies vastgelegd door de Companion. Dagen zonder draaiende Companion blijven leeg.",
    profSessions: (n) => n === 1 ? "1 sessie" : n + " sessies",
    profMember: (n) => "Lid #" + n, profLinked: "gekoppeld", profOf: (n) => "van " + n,

    boardHours: "Uren", boardGames: "Games", boardAch: "Achievements",
    nowPlaying: (g) => "Speelt nu \u00b7 " + g,
    dcOff: "Uit. Er gaat niets naar Discord.", dcSignedOut: "Log eerst in bij EveryGameStat. Presence draait alleen als je bent ingelogd.", dcConnecting: "Verbinden met Discord\u2026", dcIdle: "Verbonden met Discord als {name}. Wacht op een game.", dcShowing: "Verbonden met Discord als {name}. Toont nu: {game}.", dcHidden: "Zien vrienden het niet? Kijk in Discord bij Instellingen, Activiteitsprivacy, en bij de Privacy-instellingen van de server zelf. Staat je activiteit delen daar uit, dan verbergt Discord dit ook.", dcNoDiscord: "Discord is op deze pc niet bereikbaar. Start de Discord-desktopapp (de browserversie werkt niet). Draait Discord als administrator, dan kan de Companion er niet bij. Elke 20 seconden volgt een nieuwe poging.", dcError: "Discord gaf geen antwoord: {err}. Elke 20 seconden volgt een nieuwe poging.", dcSetError: "Verbonden als {name}, maar Discord weigerde de activiteit: {err}",
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
    socNoFriends: "Nog geen vrienden \u00b7 zoek hierboven om iemand toe te voegen.",
    socAdd: "Toevoegen",
    socAccept: "Accepteren",
    socDecline: "Weigeren",
    socPending: "in afwachting\u2026",
    socRemove: "Verwijderen",
    socSent: "Verzoek verstuurd \u2713",
    socNowFriends: "Jullie zijn nu vrienden \u2713",
    chatPh: "Typ een bericht\u2026",
    chatSend: "Versturen",
    chatEmpty: "Zeg hoi",
    setMw4Exes: "Extra procesnamen om te volgen", detName: "Game-detectie \u00b7 elke game", detHint: "Steam-games worden automatisch herkend; Battle.net, Xbox-app, Epic en Riot via een ingebouwde lijst. Speeltijd per sessie komt op je kaart.",
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
  /* tooltips van de rail volgen de taal (label is verborgen, tooltip toont hem) */
  document.querySelectorAll("#tabbar .tab").forEach((b) => { const l = b.querySelector(".tab-lbl"); if (l && l.textContent) b.title = l.textContent; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = t(el.dataset.i18nPh);
    if (typeof v === "string") el.placeholder = v;
  });
}

const $ = (id) => document.getElementById(id);
const ART_BUCKET = "https://wcsgosrevyyafnerrhge.supabase.co/storage/v1/object/public/art/";
const MASCOT = (n) => ART_BUCKET + "mascot/" + n + ".webp";
const emptyHtml = (txt, pose) => '<div class="empty"><img class="mascot" src="' + MASCOT(pose || "shrug") + '" alt=""><span>' + txt + "</span></div>";
const skelRows = (n, cls) => Array.from({ length: n }, () => '<div class="skel ' + (cls || "skel-row") + '"></div>').join("");
/* achievement-toast, zoals op de site */
let toastTimer = null;
function toast(msg, title, pose) {
  const el = $("toast"); if (!el) return;
  $("toast-title").textContent = title || t("toastAch");
  $("toast-msg").textContent = msg;
  $("toast-icon").src = MASCOT(pose || "cheer");
  el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 3800);
}
/* loader minimaal 900 ms in beeld: het merkmoment, ook als de data er in 1 ms is */
const LOADER_MIN_MS = 900, loaderShownAt = Date.now();
function loaderOff() {
  const l = $("egs-loader"); if (!l) return;
  const wait = Math.max(0, LOADER_MIN_MS - (Date.now() - loaderShownAt));
  setTimeout(() => { document.body.classList.remove("booting"); requestAnimationFrame(() => setTimeout(() => { l.classList.remove("on"); try { window.egs.uiReady(); } catch (e) {} }, 120)); }, wait);
}
let state = null;
const session = []; /* potten van deze app-sessie */

const ALL_VIEWS = ["view-link", "view-main", "view-settings", "view-social", "view-library", "view-board", "view-stats", "view-profile", "view-hubs"];
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
  if (view === "view-stats") loadStats();
  if (view === "view-hubs") loadHubsPage();
}
const TABMAP = { home: "view-main", social: "view-social", library: "view-library", board: "view-board", stats: "view-stats", hubs: "view-hubs" };
document.querySelectorAll("#tabbar .tab[data-tab]").forEach((b) => {
  b.addEventListener("click", () => show(TABMAP[b.dataset.tab]));
});

async function boot() {
  state = await window.egs.getState();
  lang = state.lang || "nl";
  applyI18n();
  /* echte semver: MAJOR.MINOR.PATCH (0.x = alpha) */
  $("ver").textContent = "v" + state.version + " \u00b7 alpha";
  updateQueueNote(state.queued);
  if (!state.linked) { show("view-link"); loaderOff(); return; }
  fillMain();
  show("view-main");
  loadRecent();
  loaderOff();
  try { const p = await window.egs.presenceNow(); if (p) applyPresence(p); } catch (e) {}
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
  if (!profileData) ["st-games", "st-hours", "st-ach"].forEach((id) => { $(id).innerHTML = '<span class="skel skel-num"></span>'; });
  try {
    const p = await window.egs.profile();
    if (p && p.ok) {
      profileData = p;
      renderProfile();
    }
  } catch (e) {}
  btn.classList.remove("busy");
}
/* getallen tellen op (kaartcijfers), respecteert reduced-motion */
function countTo(el, target, fmt) {
  if (!el) return; const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const to = Number(target) || 0; const from = Number(el.dataset.v || 0); el.dataset.v = String(to);
  if (reduce || from === to || !Number.isFinite(to)) { el.textContent = fmt(to); return; }
  const t0 = performance.now(), dur = 700;
  const step = (now) => { const k = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(Math.round(from + (to - from) * e)); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function renderProfile() {
  const p = profileData;
  if (!p) return;
  if (p.name) $("who-name").textContent = p.name;
  if (p.slug) state.slug = p.slug;
  if (p.avatar) { $("who-avatar").src = p.avatar; const ta = $("tb-avatar"); if (ta) ta.src = p.avatar; }
  const since = $("who-since"); if (since) since.textContent = p.since ? t("memberSince")(new Date(p.since).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { month: "long", year: "numeric" })) : "";
  countTo($("st-games"), p.totals.games, fmtNum);
  countTo($("st-hours"), p.totals.minutes, fmtHours);
  countTo($("st-ach"), p.totals.ach_earned, fmtNum);
  $("plat-chips").innerHTML = (p.platforms || []).map((x) =>
    '<span class="chip"><b>' + String(x.platform).replace(/[<>&]/g, "") + "</b> \u00b7 " + ((x.minutes || 0) >= 30 ? fmtHours(x.minutes) + " " + t("stHours") : t("profLinked")) + "</span>"
  ).join("");
  const tg = p.top_games || [];
  $("top-panel").hidden = !tg.length;
  $("top-games").innerHTML = tg.map((g, i) =>
    '<div class="tg">' + '<span class="tg-n">' + (i + 1) + "</span>" +
    (g.cover ? '<img src="' + encodeURI(fixUrl(g.cover)) + '" alt="">' : '<span class="tg-ph"></span>') +
    '<span><div class="tg-name">' + String(g.name || "").replace(/[<>&]/g, "") + '</div><div class="tg-plat">' + String(g.platform || "").replace(/[<>&]/g, "") + "</div></span>" +
    '<span class="tg-hours">' + fmtHours(g.minutes) + " " + t("stHours") + "</span></div>"
  ).join("");
  $("top-games").classList.add("stag"); $("top-games").querySelectorAll(".tg").forEach((el, i) => el.style.setProperty("--i", i));
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
  if (tb) { if (d.state === "ready") { tb.hidden = false; tb.textContent = "\u2b06 v" + (d.version || "") + " \u00b7 " + (lang === "nl" ? "herstart om te installeren" : "restart to install"); tb.onclick = () => window.egs.restartUpdate(); } else if (d.state === "downloading") { tb.hidden = false; tb.textContent = "\u2b07 v" + (d.version || ""); } else tb.hidden = true; }
  const st = $("upd-status");
  if (st) {
    st.textContent = d.state === "checking" ? t("updChecking")
      : d.state === "none" ? t("updNone")
      : d.state === "downloading" ? t("updDownloading")(d.version || "?")
      : d.state === "ready" ? t("updReady")(d.version || "?")
      : d.state === "error" ? (t("updError") + (d.message ? " \u00b7 " + d.message : "")) : "";
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
      toast(t("toastLinked"), t("toastAch"), "cheer");
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
const detRunning = {};
window.egs.onProcStatus((d) => {
  const dot = document.querySelector("#ad-mw4 .dot");
  if (d.running) detRunning[d.id] = d; else delete detRunning[d.id];
  const anyOn = Object.values(detRunning)[0];
  if (anyOn) {
    dot.dataset.state = "in_match";
    $("mw4-state").textContent = (tbNowLast && tbNowLast.game ? tbNowLast.game + " \u00b7 " : "") + t("procOn")(Math.max(1, Math.round(anyOn.sinceMs / 60000))) + (anyOn.via ? " \u00b7 " + anyOn.via : "");
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
  toast(t("toastSession")(String(sess.game), mins), t("toastDone"), "controller");
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
  out.forEach((p) => outBox.appendChild(socRow(p, '<span class="mono dim soc-note">' + t("socPending") + "</span>")));
  /* vrienden */
  const fBox = $("soc-friends"); fBox.innerHTML = "";
  const friends = r.friends || [];
  if (!friends.length) fBox.innerHTML = emptyHtml(t("socNoFriends"), "wave");
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
      const row = socRow({ name: p.name, slug: p.slug, avatar: p.avatar }, '<button class="btn gold sm">' + t("socAdd") + "</button>", () => openProfileFromSlug(p.slug));
      row.querySelector("button").addEventListener("click", async (e) => {
        const btn = e.target;
        const res = await window.egs.social("friend_request", { target: p.user_id });
        btn.outerHTML = '<span class="mono dim soc-note">' + (res && res.accepted ? t("socNowFriends") : t("socSent")) + "</span>";
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
$("tb-social").addEventListener("click", () => show("view-social"));

/* ===== Advertentievak: house ads tot een app-netwerk (Playwire/Venatus) je toelaat.
   AdSense mag niet in desktop-apps — daarom hier geen AdSense. ===== */
const HOUSE_ADS = [
  { h: "EGS Premium", p: (l) => l === "nl" ? "Geen advertenties, extra kaartstijlen, vroege features. Binnenkort via Patreon." : "No ads, extra card styles, early features. Coming via Patreon.", cta: (l) => l === "nl" ? "Meer info" : "Learn more", url: "https://everygamestat.com/#premium" },
  { h: "EGS Discord", p: (l) => l === "nl" ? "Bugs melden, features stemmen, duels vinden." : "Report bugs, vote on features, find duels.", cta: "Discord", url: "https://discord.gg/6pMx68veeN" },
  { h: (l) => l === "nl" ? "Daag een vriend uit" : "Challenge a friend", p: (l) => l === "nl" ? "Best of 5 in Clash Royale of Brawl Stars \u00b7 automatisch geteld." : "Best of 5 in Clash Royale or Brawl Stars \u00b7 counted automatically.", cta: (l) => l === "nl" ? "Naar Duels" : "Go to Duels", web: "/vs" }
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
let presArt = null;
function applyPresence(d) {
  d = d || {};
  try { const dot = document.querySelector("#ad-mw4 .dot"); if (dot && !Object.keys(detRunning).length) { dot.dataset.state = d.game ? "in_match" : "off"; if (d.game) $("mw4-state").textContent = d.game; else renderMw4Base(); } } catch (e) {}
  if (d.art !== undefined) presArt = d.art;
  tbNow(d);
  const box = $("now-playing");
  if (d.game) { box.hidden = false; $("now-playing-txt").textContent = t("nowPlaying")(d.game); }
  else box.hidden = true;
  /* Medal-stijl: art vervaagd achter "speelt nu" (titelbalk + hero op Home) */
  const artUrl = d.game && presArt ? 'url("' + presArt + '")' : "";
  const tbArt = $("tb-now-art"); if (tbArt) tbArt.style.backgroundImage = artUrl;
  renderQp();
  const hero = $("np-hero");
  if (hero) {
    hero.hidden = !d.game;
    if (d.game) {
      $("np-art").style.backgroundImage = artUrl;
      $("np-eyebrow").textContent = t("npPlaying") + (d.state === "in_match" ? " \u00b7 " + (d.detail || t("npMatch")) : "");
      $("np-game").textContent = d.game;
      $("np-sub").textContent = tbNowSince ? t("npSince")(Math.max(1, Math.floor((Date.now() - tbNowSince) / 60000))) : "";
    }
  }
}
/* Speelreeks: dagen op rij met minstens één gemeten sessie. Eigen vorm: hexagons met de EGS-ster, geen vlammetje. */
const HEX = (cls) => '<svg class="hx ' + cls + '" viewBox="0 0 24 24"><path d="M12 2.2 20.5 7v10L12 21.8 3.5 17V7z"/><path class="st" d="M12 8.2l1.1 2.4 2.6.3-1.9 1.8.5 2.6L12 14l-2.3 1.3.5-2.6-1.9-1.8 2.6-.3z"/></svg>';
function renderStreak(days) {
  const panel = $("streak-panel"); if (!panel) return;
  const set = new Set((days || []).filter((d) => (d.minutes || 0) > 0).map((d) => d.day));
  if (!set.size) { panel.hidden = false; $("streak-n").textContent = "0"; $("streak-lbl").textContent = t("streakDays")(0); $("streak-week").innerHTML = ""; $("streak-foot").textContent = t("streakNone"); $("streak-sub").textContent = ""; return; }
  const iso = (d) => d.toISOString().slice(0, 10);
  const today = new Date(); const todayK = iso(today);
  const yest = new Date(today); yest.setUTCDate(yest.getUTCDate() - 1);
  /* huidige reeks: telt terug vanaf vandaag, of vanaf gisteren als vandaag nog open is */
  let cur = 0; const start = set.has(todayK) ? new Date(today) : (set.has(iso(yest)) ? yest : null);
  if (start) { const d = new Date(start); while (set.has(iso(d))) { cur++; d.setUTCDate(d.getUTCDate() - 1); } }
  /* record */
  let best = 0, run = 0, prev = null;
  [...set].sort().forEach((k) => { const dt = new Date(k + "T00:00:00Z"); run = prev && (dt - prev) === 86400000 ? run + 1 : 1; best = Math.max(best, run); prev = dt; });
  /* weekstrip ma–zo */
  const dow = (today.getUTCDay() + 6) % 7; const mon = new Date(today); mon.setUTCDate(mon.getUTCDate() - dow);
  const names = lang === "nl" ? ["ma", "di", "wo", "do", "vr", "za", "zo"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let weekMin = 0, html = "";
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon); d.setUTCDate(mon.getUTCDate() + i); const k = iso(d);
    const played = set.has(k); const isToday = k === todayK; const future = d > today;
    weekMin += (days.find((x) => x.day === k) || {}).minutes || 0;
    html += '<div class="sd' + (isToday ? " today" : "") + (future ? " future" : "") + '">' + HEX(played ? "on" : "off") + "<span>" + names[i] + "</span></div>";
  }
  panel.hidden = false;
  $("streak-n").textContent = String(cur); $("streak-lbl").textContent = t("streakDays")(cur);
  $("streak-sub").textContent = set.has(todayK) ? t("streakToday") : t("streakOpen");
  $("streak-week").innerHTML = html;
  $("streak-foot").textContent = t("streakBest")(best) + " \u00b7 " + t("streakWeek")(Math.round(weekMin / 6) / 10);
}
let mcStatusLast = null;
function renderMc(st) {
  mcStatusLast = st || null;
  const dot = document.querySelector("#ad-minecraft .dot"), lbl = $("mc-state");
  if (!dot || !lbl) return;
  if (st && st.running) { dot.dataset.state = st.server || st.world ? "in_match" : "connected"; lbl.textContent = st.server ? t("mcOnServer")(st.server) : st.world ? t("mcOnWorld")(st.world) : t("mcOn"); }
  else { dot.dataset.state = "off"; lbl.textContent = t("mcOff") + (mcSummary && mcSummary.total && mcSummary.total.sessions ? " \u00b7 " + fmtPlay(mcSummary.total.minutes).v + " " + fmtPlay(mcSummary.total.minutes).u + " \u00b7 " + (mcSummary.servers || []).length + " servers" : ""); }
}
window.egs.onMcStatus(renderMc);
try { window.egs.mcStatus().then(renderMc); } catch (e) {}
window.egs.onPresence(applyPresence);
window.egs.onPresenceLocal((d) => { if (d) { if (d.art !== undefined) presArt = d.art; if (!tbNowLast || (tbNowLast.game || null) !== (d.game || null)) applyPresence({ game: d.game, art: d.art }); } });
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
/* Binnenkort op Steam: populaire aankomende games, minus wat je al in je bibliotheek hebt. Bron: Steam store. */
let soonData = null, soonBusy = false;
async function renderSoon(browsing) {
  const hd = $("lib-soon-h"), row = $("lib-soon"); if (!hd || !row) return;
  if (!browsing) { hd.hidden = true; row.hidden = true; return; }
  if (!soonData && !soonBusy) { soonBusy = true; try { const r = await window.egs.steamDiscover(); soonData = (r && r.items) || []; } catch (e) { soonData = []; } soonBusy = false; }
  const owned = new Set((libData || []).filter((g) => g.platform === "Steam").map((g) => String(g.external_id)));
  const list = (soonData || []).filter((g) => !owned.has(String(g.appid))).slice(0, 12);
  hd.hidden = !list.length; row.hidden = !list.length; if (!list.length) return;
  hd.innerHTML = escT(t("libSoon")) + '<small class="lib-sec-sub">' + escT(t("libSoonSub")) + "</small>";
  row.innerHTML = "";
  list.forEach((g, i) => {
    const el = document.createElement("div"); el.className = "soon-card"; el.style.setProperty("--i", i);
    el.innerHTML = '<img src="' + encodeURI(g.image || g.capsule || STEAM_H(g.appid)) + '" alt="" loading="lazy"><div class="soon-b"><b>' + escT(g.name) + "</b><span>" + (g.release ? escT(t("libRelease")(g.release)) : "") + "</span>" +
      '<div class="soon-actions"><button class="btn small" data-steam="' + escT(g.appid) + '">' + escT(t("btnOpenSteam")) + "</button></div></div>";
    el.querySelector("[data-steam]").addEventListener("click", (e) => { e.stopPropagation(); window.egs.openExternal("steam://store/" + g.appid); });
    el.querySelector("img").addEventListener("error", (e) => { const ph = document.createElement("div"); ph.className = "soon-ph"; ph.textContent = g.name; e.target.replaceWith(ph); });
    row.appendChild(el);
  });
}
async function loadLibrary() {
  if (loadLibrary.busy) return; loadLibrary.busy = true; setTimeout(() => { loadLibrary.busy = false; }, 5000);
  if (!libData) {
    $("lib-grid").innerHTML = Array.from({ length: 14 }, () => '<div class="skel-card"><div class="skel skel-cover"></div><div class="skel-body"><div class="skel skel-line w80"></div><div class="skel skel-line w40"></div></div></div>').join("");
    const r = await window.egs.social("library");
    if (!r || !r.ok) { $("lib-grid").innerHTML = emptyHtml(t("errOffline"), "worried"); return; }
    libData = r.games || [];
    const plats = [...new Set(libData.map((g) => g.platform).filter(Boolean))].sort();
    const sel = $("lib-plat");
    plats.forEach((p) => { const o = document.createElement("option"); o.value = p; o.textContent = p; sel.appendChild(o); });
  }
  renderLibrary();
}
let libPlat = "";
const steamHero = (appid) => "https://cdn.cloudflare.steamstatic.com/steam/apps/" + appid + "/library_hero.jpg";
/* covers van Supercell-games staan als root-relatief pad in de database (werkt op de site) */
const SITE = "https://everygamestat.com";
const fixUrl = (u) => { const x = String(u || ""); return x.startsWith("/") ? SITE + x : x; };
function gameCard(g, i) {
  const card = document.createElement("div");
  card.className = "gcard";
  card.style.setProperty("--i", Math.min(i || 0, 30));
  let coverEl;
  const appid = g.platform === "Steam" && /^\d+$/.test(String(g.external_id || "")) ? String(g.external_id) : null;
  const portrait = appid ? "https://cdn.cloudflare.steamstatic.com/steam/apps/" + appid + "/library_600x900.jpg" : null;
  const wrap = document.createElement("div"); wrap.className = "gc-wrap";
  if (g.cover || portrait) {
    coverEl = document.createElement("img"); coverEl.className = "gc-cover"; coverEl.loading = "lazy"; coverEl.src = portrait || fixUrl(g.cover);
    let triedFallback = !portrait || !g.cover;
    coverEl.addEventListener("error", () => {
      if (!triedFallback) { triedFallback = true; coverEl.src = fixUrl(g.cover); return; }
      const ph = document.createElement("div"); ph.className = "gc-cover ph"; ph.textContent = (g.name || "?")[0].toUpperCase(); coverEl.replaceWith(ph);
    });
    /* liggende art (Steam-header, Xbox-banner): niet opblazen, maar passend tonen op een geblurde kopie */
    coverEl.addEventListener("load", () => {
      if (coverEl.naturalWidth > coverEl.naturalHeight * 1.1) { wrap.classList.add("wide"); const bg = document.createElement("div"); bg.className = "gc-bg"; bg.style.backgroundImage = 'url("' + coverEl.src + '")'; wrap.prepend(bg); }
    });
  } else { coverEl = document.createElement("div"); coverEl.className = "gc-cover ph"; coverEl.textContent = (g.name || "?")[0].toUpperCase(); }
  wrap.appendChild(coverEl);
  const plat = document.createElement("span"); plat.className = "gc-plat"; plat.textContent = g.platform || "";
  const body = document.createElement("div"); body.className = "gc-body";
  const ach = g.ach_t ? '<span class="gc-ach">' + (g.ach_e ?? 0) + "/" + g.ach_t + "</span>" : "<span></span>";
  body.innerHTML = '<div class="gc-name" title="' + escT(g.name) + '">' + escT(g.name) + "</div>" +
    '<div class="gc-meta"><span><b>' + fmtHours(g.minutes) + "</b> " + t("stHours") + "</span>" + ach + "</div>";
  card.appendChild(wrap); card.appendChild(plat); card.appendChild(body);
  if (g.ach_t) {
    const pct = Math.min(100, Math.round(((g.ach_e || 0) / g.ach_t) * 100));
    const bar = document.createElement("div"); bar.className = "gc-bar" + (pct >= 100 ? " done" : ""); const fill = document.createElement("i"); fill.style.width = pct + "%"; bar.appendChild(fill); card.appendChild(bar);
  }
  card.addEventListener("click", () => openGameSheet(g));
  return card;
}
function renderLibChips(all) {
  const box = $("lib-chips"); box.innerHTML = "";
  const per = {}; all.forEach((g) => { per[g.platform] = (per[g.platform] || 0) + 1; });
  const mk = (val, label, n) => { const b = document.createElement("button"); b.className = "lchip" + (libPlat === val ? " on" : ""); b.innerHTML = escT(label) + "<small>" + n + "</small>"; b.addEventListener("click", () => { libPlat = val; renderLibrary(); }); return b; };
  box.appendChild(mk("", t("libAllPlatforms"), all.length));
  Object.entries(per).sort((a, b) => b[1] - a[1]).forEach(([p, n]) => box.appendChild(mk(p, p, n)));
}
function renderLibHero(g) {
  const hero = $("lib-hero"); hero.hidden = !g; if (!g) return;
  const appid = g.platform === "Steam" && /^\d+$/.test(String(g.external_id || "")) ? String(g.external_id) : null;
  hero.innerHTML = "";
  const art = document.createElement("div"); art.className = "lh-art";
  if (appid) { art.style.backgroundImage = 'url("' + steamHero(appid) + '")'; const test = new Image(); test.onerror = () => { art.classList.add("blur"); art.style.backgroundImage = g.cover ? 'url("' + fixUrl(g.cover) + '")' : ""; }; test.src = steamHero(appid); }
  else if (g.cover) { art.classList.add("blur"); art.style.backgroundImage = 'url("' + fixUrl(g.cover) + '")'; }
  const body = document.createElement("div"); body.className = "lh-body";
  body.innerHTML = (g.cover ? '<img class="lh-cover" src="' + encodeURI(fixUrl(g.cover)) + '" alt="">' : "") +
    '<div class="lh-txt"><span class="eyebrow">' + t("libMost") + "</span><div class=\"lh-name\">" + escT(g.name) + "</div>" +
    '<div class="lh-meta"><span><b>' + fmtHours(g.minutes) + "</b>" + t("stHours") + "</span>" + (g.ach_t ? "<span><b>" + (g.ach_e ?? 0) + "/" + g.ach_t + "</b>" + t("stAch") + "</span>" : "") + "<span><b>" + escT(g.platform) + "</b></span>" +
    (g.last ? "<span>" + escT(new Date(g.last).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short", year: "numeric" })) + "</span>" : "") + "</div></div>";
  hero.appendChild(art); hero.appendChild(body);
  hero.onclick = () => openGameSheet(g);
}
function renderLibrary() {
  if (!libData) return;
  const q = $("lib-search").value.trim().toLowerCase();
  const sort = $("lib-sort").value;
  const showApps = $("lib-apps").checked;
  const base = libData.filter((g) => showApps || !g.software);
  renderLibChips(base);
  let rows = base.filter((g) => (!q || String(g.name || "").toLowerCase().includes(q)) && (!libPlat || g.platform === libPlat));
  if (sort === "name") rows.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  else if (sort === "ach") rows.sort((a, b) => ((b.ach_e || 0) / (b.ach_t || 1)) - ((a.ach_e || 0) / (a.ach_t || 1)) || (b.ach_e || 0) - (a.ach_e || 0));
  else if (sort === "last") rows.sort((a, b) => String(b.last || "").localeCompare(String(a.last || "")));
  else rows.sort((a, b) => b.minutes - a.minutes);
  $("lib-count").textContent = t("libCount")(rows.length) + (libPlat ? " \u00b7 " + libPlat : "");
  /* hero + laatst gespeeld alleen in de rustige stand (geen zoekterm) */
  const browsing = !q;
  const top = browsing ? rows.slice().sort((a, b) => b.minutes - a.minutes)[0] : null;
  renderLibHero(top || null);
  renderSoon(browsing);
  const recent = browsing ? rows.filter((g) => g.last).sort((a, b) => String(b.last).localeCompare(String(a.last))).slice(0, 12) : [];
  $("lib-recent-h").hidden = !recent.length; $("lib-recent").hidden = !recent.length;
  const rBox = $("lib-recent"); rBox.innerHTML = ""; recent.forEach((g, i) => rBox.appendChild(gameCard(g, i)));
  $("lib-all-h").hidden = !browsing || !rows.length;
  const grid = $("lib-grid"); grid.innerHTML = "";
  const frag = document.createDocumentFragment();
  rows.slice(0, 400).forEach((g, i) => frag.appendChild(gameCard(g, i)));
  if (!rows.length) grid.innerHTML = emptyHtml(libData.length ? "\u2013" : t("emptyLib"), "shrug");
  else grid.appendChild(frag);
}
/* Site-pagina's openen in de browser (het ingebouwde venster is eruit: rendert
   niet betrouwbaar op elke pc). Ingelogd via je eigen browser-sessie. */
function openWeb(path) { window.egs.openExternal("https://everygamestat.com" + path); }
/* ===== GAME HUBS + STATS — zelfde bron als de site (platform_game_data). Niets geschat. ===== */
const STEAM_H = (id) => "https://cdn.cloudflare.steamstatic.com/steam/apps/" + id + "/header.jpg";
const SITE_ART = "https://everygamestat.com/art/";
const HUBS = {
  rocketleague: { name: "Rocket League", c: "#F2B03D", art: STEAM_H(252950), kind: "live", sub: "hubSubRl", pick: [], all: [] },
  minecraft: { name: "Minecraft", c: "#5DBB46", art: null, mark: ART_BUCKET + "icon-minecraft.png", kind: "local", sub: "hubSubMc", pick: [], all: [] },
  dbd:      { name: "Dead by Daylight", c: "#C8302E", art: STEAM_H(381210), kind: "steam", sub: "hubSubDbd", hero: "escapes", pick: ["total_kills","bloodpoints","prestige"], all: ["bloodpoints","escapes","hatch_escapes","sacrifices","kills","total_kills","gens","heals","unhooks","skillchecks","survivor_pips","killer_pips","prestige","max_level","hits_near_hook"] },
  royale:   { name: "Clash Royale",   c: "#4DA6FF", art: SITE_ART + "game-clashroyale.png", kind: "api", sub: "hubSubApi", hero: "trophies", pick: ["best","wins","three_crown"], all: ["trophies","best","level","wins","losses","battles","three_crown","cards","arena","clan","war_wins","donations","star_points","streak","fav_card"] },
  brawl:    { name: "Brawl Stars",    c: "#FFD400", art: null, kind: "api", sub: "hubSubApi", hero: "trophies", pick: ["highest","wins3v3","brawlers"], all: ["trophies","highest","level","wins3v3","solo","duo","brawlers","club"] },
  clash:    { name: "Clash of Clans", c: "#F2A93B", art: SITE_ART + "game-clashofclans.png", kind: "api", sub: "hubSubApi", hero: "th", pick: ["best","war_stars","attacks"], all: ["th","level","trophies","best","war_stars","attacks","defenses","builder_trophies","donations","capital","clan","role"] },
  fortnite: { name: "Fortnite",       c: "#2EA3FF", art: SITE_ART + "game-fortnite.jpg", kind: "api", sub: "hubSubApi", hero: "wins", pick: ["kd","kills","matches"], all: ["wins","kills","deaths","kd","matches","winrate","top10","top25","kpm","score","minutes","outlived","level"] },
  pubg:     { name: "PUBG",           c: "#E8A93B", art: STEAM_H(578080), kind: "api", sub: "hubSubApi", hero: "kd", pick: ["wins","kills","matches"], all: ["kills","wins","matches","kd","winrate","top10","top10_rate","damage","avg_damage","headshots","headshot_pct","longest_kill","most_kills","assists","revives","dbnos","road_kills","vehicle_destroys"] },
  lol:      { name: "League of Legends", c: "#C8963C", art: null, mark: ART_BUCKET + "icon-lol.png", kind: "api", sub: "hubSubApi", hero: "level", pick: [], all: ["level"], ranks: true },
  tft:      { name: "Teamfight Tactics", c: "#7BA7D9", art: null, mark: ART_BUCKET + "icon-lol.png", kind: "api", sub: "hubSubApi", hero: null, pick: [], all: [], ranks: true },
  xbox:     { name: "Xbox",           c: "#107C10", art: null, kind: "platform", sub: "hubSubPlat", hero: "gamerscore_earned", pick: ["games","hours","games_with_time"], all: ["gamerscore_earned","gamerscore_total","gamerscore_pct","games","hours","games_with_time","games_without_time","coverage_pct"] },
  psn:      { name: "PlayStation",    c: "#2E6DB4", art: null, kind: "platform", sub: "hubSubPlat", hero: "trophy_level", pick: ["platinum","gold","silver"], all: ["trophy_level","trophy_progress","trophy_tier","trophies_earned","trophies_total","platinum","gold","silver","bronze","platinum_games","completed_games","games","minutes"] }
};
const HUB_PAGE_ORDER = ["rocketleague", "minecraft", "dbd", "royale", "brawl", "clash", "fortnite", "pubg", "lol", "tft"];
const STAT_LBL = { spm: "Score/min", accuracy: "Accuracy %", best_killstreak: "Best killstreak", time_played_min: "Minutes played", prestige: "Prestige", top5: "Top 5", downs: "Downs", trophies: "Trophies", best: "Best", highest: "Best", level: "Level", wins: "Wins", losses: "Losses", battles: "Battles", three_crown: "3-crown wins", cards: "Cards", arena: "Arena", clan: "Clan", club: "Club", war_wins: "War day wins", donations: "Donations", star_points: "Star points", streak: "Streak", fav_card: "Favourite card", wins3v3: "3v3 wins", solo: "Solo wins", duo: "Duo wins", brawlers: "Brawlers", th: "Town Hall", war_stars: "War stars", attacks: "Attack wins", defenses: "Defense wins", builder_trophies: "Builder trophies", capital: "Capital gold", role: "Role", kd: "K/D", winrate: "Win %", kills: "Kills", matches: "Matches", avg_damage: "Avg damage", top10: "Top 10", top10_rate: "Top 10 %", damage: "Damage", headshots: "Headshots", headshot_pct: "Headshot %", longest_kill: "Longest kill (m)", most_kills: "Most kills", assists: "Assists", revives: "Revives", dbnos: "Knocks", road_kills: "Road kills", vehicle_destroys: "Vehicles destroyed", deaths: "Deaths", top25: "Top 25", kpm: "Kills/match", score: "Score", minutes: "Minutes", outlived: "Outlived", escapes: "Escapes", total_kills: "Kills", bloodpoints: "Bloodpoints", gens: "Generators", heals: "Heals", hatch_escapes: "Hatch escapes", sacrifices: "Sacrifices", unhooks: "Unhooks", skillchecks: "Skill checks", survivor_pips: "Survivor pips", killer_pips: "Killer pips", max_level: "Max level", hits_near_hook: "Hits near hook", gamerscore_earned: "Gamerscore", gamerscore_total: "Gamerscore total", gamerscore_pct: "Gamerscore %", games: "Games", hours: "Hours", games_with_time: "With playtime", games_without_time: "Without playtime", coverage_pct: "Coverage %", trophy_level: "Trophy level", trophy_progress: "Level progress %", trophy_tier: "Tier", trophies_earned: "Trophies", trophies_total: "Trophies total", platinum: "Platinum", gold: "Gold", silver: "Silver", bronze: "Bronze", platinum_games: "Platinum games", completed_games: "100% games" };
const fmtStat = (v) => v == null || v === "" ? "\u2013" : (typeof v === "number" ? v.toLocaleString(lang === "nl" ? "nl-NL" : "en-US") : String(v));
const rankTxt = (rk) => (rk.queue || "").replace("RANKED_", "").replace("_", " ") + ": " + (rk.tier || "?") + " " + (rk.rank || "") + (rk.lp != null ? " \u00b7 " + rk.lp + " LP" : "");
let hubData = [], hubsLoadedAt = 0, mcSummary = null, rlMatches = null, hubOrigin = "view-stats";
/* hubs zonder eigen art: de cover uit je eigen bibliotheek (Xbox/PS/Steam) van dezelfde game */
async function ensureLib() {
  if (libData) return libData;
  try { const r = await window.egs.social("library"); if (r && r.ok) libData = r.games || []; } catch (e) {}
  return libData || [];
}
function libCover(name) {
  const n = String(name || "").toLowerCase();
  const hit = (libData || []).filter((g) => g.cover && String(g.name || "").toLowerCase().startsWith(n)).sort((a, b) => b.minutes - a.minutes)[0];
  return hit ? fixUrl(hit.cover) : null;
}
async function fetchRl() {
  try { const r = await window.egs.recent(50); if (r && r.ok) rlMatches = r.matches || []; } catch (e) {}
  return rlMatches;
}
function rlStats(list) {
  /* server- en live-potten samenvoegen: eerst op wedstrijd-id, anders op tijdstip binnen 5 s (dezelfde pot, andere bron) */
  const all = [];
  const byId = new Set();
  const near = (a, b) => Math.abs(Date.parse(a) - Date.parse(b)) < 5000;
  for (const m of [...(list || []), ...(session || [])]) {
    if (!m) continue;
    const id = m.client_match_id || null;
    if (id) { if (byId.has(id)) continue; byId.add(id); }
    else if (all.some((x) => near(x.played_at, m.played_at) && (x.result || "") === (m.result || ""))) continue;
    all.push(m);
  }
  const n = all.length, w = all.filter((m) => m.result === "win").length, l = all.filter((m) => m.result === "loss").length;
  const sum = (k) => all.reduce((a, m) => a + (Number(m[k]) || 0), 0);
  const today = all.filter((m) => new Date(m.played_at).toDateString() === new Date().toDateString()).length;
  return { n, w, l, wr: n ? Math.round((w / Math.max(1, w + l)) * 100) : null, g: sum("goals"), a: sum("assists"), s: sum("saves"), sh: sum("shots"), today, all: all.sort((x, y) => String(y.played_at).localeCompare(String(x.played_at))) };
}
function errBox(retryFn) {
  const d = document.createElement("div"); d.className = "empty";
  d.innerHTML = '<img class="mascot" src="' + MASCOT("worried") + '" alt=""><span>' + escT(t("loadErr")) + '</span>';
  const b = document.createElement("button"); b.className = "btn small"; b.textContent = t("retry"); b.addEventListener("click", retryFn); d.appendChild(b);
  return d;
}
/* speeltijd netjes: < 60 min → "12 min", anders uren met 1 decimaal */
const fmtPlay = (min) => { min = Number(min) || 0; return min < 60 ? { v: fmtNum(Math.round(min)), u: "min" } : { v: fmtNum(Math.round(min / 6) / 10), u: t("mcHours") }; };
async function fetchMc() {
  try { const r = await window.egs.sessionsSummary(); if (r && r.ok) { mcSummary = r.minecraft || { servers: [], worlds: [] }; const g = (r.games || []).find((x) => x.game === "Minecraft"); mcSummary.total = g || { sessions: 0, minutes: 0 }; } } catch (e) {}
  return mcSummary;
}
async function fetchHubs(force) {
  if (!force && hubData.length && Date.now() - hubsLoadedAt < 60000) return true;
  const r = await window.egs.hubs();
  if (!r || !r.ok) return false;
  hubData = (r.hubs || []).filter((h) => HUBS[h.game_key]);
  hubsLoadedAt = Date.now();
  return true;
}
const hubOf = (key) => hubData.find((h) => h.game_key === key) || null;
/* eerste cijfer dat er is: hero, anders eerste uit pick */
function heroStat(def, d) {
  const keys = [def.hero, ...def.pick].filter(Boolean);
  for (const k of keys) if (d[k] != null && d[k] !== "") return { k, v: d[k] };
  if (def.ranks && Array.isArray(d.ranks) && d.ranks.length) return { k: "rank", v: (d.ranks[0].tier || "?") + " " + (d.ranks[0].rank || ""), lbl: "Rank" };
  return null;
}
function artStyle(el, def) {
  el.style.setProperty("--hc", def.c);
  const lib = def.art ? null : libCover(def.name);
  if (def.art) el.style.backgroundImage = 'url("' + def.art + '")';
  else if (lib) el.style.backgroundImage = 'url("' + lib + '")';
  else if (def.mark) { el.style.backgroundImage = 'url("' + def.mark + '")'; el.classList.add("mark"); }
}
/* ---- v0.9.0: game hubs als volwaardige pagina's — sfeerlaag in de kleur van de game ---- */
function hubAtmo(viewId, color) {
  const v = $(viewId); if (!v) return;
  v.classList.add("hubmode"); v.style.setProperty("--hc", color || "#F2B03D");
  if (!v.querySelector(".hub-atmo")) { const el = document.createElement("div"); el.className = "hub-atmo"; v.prepend(el); }
}
function hubAtmoOff(viewId) {
  const v = $(viewId); if (!v) return;
  v.classList.remove("hubmode"); const el = v.querySelector(".hub-atmo"); if (el) el.remove();
}
/* ---- Game hubs-tab ---- */
/* ranglijst en playlists, zelfde bron als de game-hub op de site */
const RL_RANKS = [["Bronze", "#B87333", 3], ["Silver", "#B9BEC7", 3], ["Gold", "#E1B12C", 3], ["Platinum", "#6FD1E0", 3], ["Diamond", "#5B8CFF", 3], ["Champion", "#B067FF", 3], ["Grand Champion", "#FF4D6D", 3], ["Supersonic Legend", "#F2B03D", 1]];
const RL_PLAYLISTS = [["Ranked Duel", "1v1"], ["Ranked Doubles", "2v2"], ["Ranked Standard", "3v3"], ["Hoops", "2v2"], ["Rumble", "3v3"], ["Dropshot", "3v3"], ["Snow Day", "3v3"], ["Tournaments", "3v3"]];
function openGameHub(key) {
  const def = HUBS[key]; if (!def) return;
  hubAtmo("view-hubs", def.c);
  $("hubs-head").hidden = true;
  const box = $("hubs-detail"); $("hubs-grid").hidden = true; $("hubs-detail").hidden = false; box.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "gh-detail"; wrap.style.setProperty("--hc", def.c);
  const banner = document.createElement("div"); banner.className = "sd-banner"; artStyle(banner, def);
  const rs = key === "rocketleague" ? rlStats(rlMatches) : null;
  banner.innerHTML = '<button class="btn small sd-back" id="gh-back">\u2190 ' + t("ghBack") + "</button>" +
    '<div class="sd-in"><div><h2>' + escT(def.name) + '</h2><div class="sd-who">' + escT(t(def.sub)) + (rs && rs.n ? " \u00b7 " + rs.n + " " + t("rlMatches") : "") + "</div></div>" +
    '<div class="gh-cta"><button class="btn gold sm" id="gh-stats">' + escT(t("ghYourStats")) + " \u2192</button></div></div>";
  wrap.appendChild(banner);
  if (key === "rocketleague") {
    const s1 = document.createElement("div"); s1.className = "hub-sub gh-sec"; s1.innerHTML = "<span>" + escT(t("ghRanks")) + '</span><small>' + escT(t("ghRanksNote")) + "</small>"; wrap.appendChild(s1);
    const lad = document.createElement("div"); lad.className = "gh-ladder";
    RL_RANKS.forEach(([n, c, tiers], i) => {
      const el = document.createElement("div"); el.className = "gh-rank"; el.style.setProperty("--rc", c); el.style.setProperty("--i", i);
      el.innerHTML = '<span class="gh-badge"><svg viewBox="0 0 24 24"><path d="M12 2.4 20.4 7v10L12 21.6 3.6 17V7z"/><path class="in" d="M12 7.6l1.3 2.8 3 .4-2.2 2.1.6 3-2.7-1.5-2.7 1.5.6-3-2.2-2.1 3-.4z"/></svg></span>' +
        "<b>" + escT(n) + "</b><span>" + escT(tiers === 1 ? t("ghNoDiv") : "I \u00b7 II \u00b7 III \u00b7 " + t("ghDivs")) + "</span>";
      lad.appendChild(el);
    });
    wrap.appendChild(lad);
    const s2 = document.createElement("div"); s2.className = "hub-sub gh-sec"; s2.innerHTML = "<span>" + escT(t("ghPlaylists")) + '</span><small>' + escT(t("ghPlaylistsNote")) + "</small>"; wrap.appendChild(s2);
    const pl = document.createElement("div"); pl.className = "gh-pls";
    RL_PLAYLISTS.forEach(([n, m], i) => {
      /* de RL-log geeft alleen 1v1/2v2/3v3 door, niet welke playlist: het cijfer hoort alleen bij de ranked-playlist van die grootte, niet bij Hoops/Rumble/etc. */
      const played = rs && i < 3 ? rs.all.filter((x) => String(x.playlist || "") === m).length : 0;
      const el = document.createElement("div"); el.className = "gh-pl" + (played ? " on" : ""); el.style.setProperty("--i", i);
      el.innerHTML = "<b>" + escT(m) + "</b><span>" + escT(n) + "</span>" + (played ? '<small>' + played + " " + escT(t("rlMatches")) + "</small>" : "");
      pl.appendChild(el);
    });
    wrap.appendChild(pl);
    const s3 = document.createElement("div"); s3.className = "hub-sub"; s3.textContent = t("ghSeason"); wrap.appendChild(s3);
    const p3 = document.createElement("p"); p3.className = "gh-p"; p3.textContent = t("ghSeasonP"); wrap.appendChild(p3);
    const s4 = document.createElement("div"); s4.className = "hub-sub"; s4.textContent = t("ghAbout"); wrap.appendChild(s4);
    const p4 = document.createElement("p"); p4.className = "gh-p"; p4.textContent = t("ghRlAbout"); wrap.appendChild(p4);
  }
  box.appendChild(wrap);
  $("gh-back").addEventListener("click", () => { hubAtmoOff("view-hubs"); $("hubs-head").hidden = false; $("hubs-detail").hidden = true; $("hubs-grid").hidden = false; $("view-hubs").scrollTop = 0; });
  $("gh-stats").addEventListener("click", () => { hubOrigin = "view-hubs"; show("view-stats"); if (key === "rocketleague") openRlHub(); else if (key === "minecraft") openMcHub(); else openHub(key); });
  $("view-hubs").scrollTop = 0;
}
let hubsBusy = false;
async function loadHubsPage() {
  const grid = $("hubs-grid");
  const cached = hubData.length > 0;
  if (cached) renderHubsPage(false); else grid.innerHTML = skelRows(6, "skel-hub");
  if (hubsBusy) return; hubsBusy = true;
  try {
    const before = JSON.stringify([hubData, mcSummary, rlMatches && rlMatches.length]);
    const ok = await Promise.all([fetchHubs(false), fetchMc(), fetchRl(), ensureLib()]);
    if (!ok[0] && !cached) { grid.innerHTML = ""; grid.appendChild(errBox(() => loadHubsPage())); return; }
    const after = JSON.stringify([hubData, mcSummary, rlMatches && rlMatches.length]);
    if (!cached || before !== after) renderHubsPage(cached);
  } catch (e) { if (!cached) { grid.innerHTML = ""; grid.appendChild(errBox(() => loadHubsPage())); } }
  finally { hubsBusy = false; }
}
function renderHubsPage(quiet) {
  const grid = $("hubs-grid");
  hubAtmoOff("view-hubs"); $("hubs-head").hidden = false;
  $("hubs-detail").hidden = true; grid.hidden = false;
  grid.innerHTML = ""; grid.classList.toggle("noanim", !!quiet);
  HUB_PAGE_ORDER.forEach((key, i) => {
    const def = HUBS[key]; const h = hubOf(key); const d = (h && h.data) || {};
    const el = document.createElement("div"); el.className = "ghub"; el.style.setProperty("--hc", def.c); el.style.setProperty("--i", i);
    const art = document.createElement("div"); art.className = "gh-art"; artStyle(art, def);
    let status, cls, stat = null, who = "";
    if (def.kind === "local") {
      const has = mcSummary && mcSummary.total && mcSummary.total.sessions > 0;
      status = mcStatusLast && mcStatusLast.running ? t("hubLive") : (has ? t("hubLinked") : t("hubSoon")); cls = mcStatusLast && mcStatusLast.running ? "live" : (has ? "ok" : "soon");
      if (has) { const f = fmtPlay(mcSummary.total.minutes); stat = { v: f.v, lbl: f.u }; }
      who = t(def.sub) + (mcSummary && mcSummary.servers && mcSummary.servers.length ? " \u00b7 " + mcSummary.servers.length + " servers" : "");
    } else if (def.kind === "live") {
      const rs = rlStats(rlMatches);
      const on = tbNowLast && tbNowLast.game === "Rocket League";
      status = on ? t("hubLive") : (rs.n ? t("hubLinked") : t("hubSetup")); cls = on ? "live" : (rs.n ? "ok" : "soon");
      if (rs.n) stat = { v: rs.wr != null ? rs.wr + "%" : String(rs.n), lbl: rs.wr != null ? t("rlWinrate") + " \u00b7 " + rs.n + " " + t("rlMatches") : t("rlMatches") };
      else el.classList.add("off");
      who = t(def.sub);
    } else if (h) { status = t("hubLinked"); cls = "ok"; const hs = heroStat(def, d); if (hs) stat = { v: fmtStat(hs.v), lbl: hs.lbl || STAT_LBL[hs.k] || hs.k }; who = escT(d.name || d.riot_id || d.tag || t(def.sub)); }
    else { status = t("hubNoData"); cls = "soon"; el.classList.add("off"); who = t(def.sub) + " \u00b7 " + t("hubLinkOn"); }
    el.appendChild(art);
    const pill = document.createElement("span"); pill.className = "gh-pill " + cls; pill.innerHTML = "<i></i>" + escT(status); el.appendChild(pill);
    const body = document.createElement("div"); body.className = "gh-body";
    body.innerHTML = '<div class="gh-txt"><div class="gh-name">' + escT(def.name) + '</div><div class="gh-sub">' + who + "</div></div>" +
      (stat ? '<div class="gh-stat"><b>' + escT(String(stat.v)) + "</b><span>" + escT(stat.lbl) + "</span></div>" : "");
    el.appendChild(body);
    el.addEventListener("click", () => {
      hubOrigin = "view-hubs";
      if (def.kind === "live") { openGameHub(key); return; } /* eigen game-hub met ranglijst en playlists */
      if (def.kind === "local") { show("view-stats"); openMcHub(); return; }
      if (!h) { window.egs.openExternal("https://everygamestat.com/me"); return; }
      show("view-stats"); openHub(key);
    });
    grid.appendChild(el);
  });
}
/* ---- Stats-tab: kaarten met art-banner en één kerncijfer ---- */
function statCard(h, i, isPlat) {
  const def = HUBS[h.game_key], d = h.data || {};
  const card = document.createElement("div"); card.className = "scard" + (isPlat ? " plat" : ""); card.style.setProperty("--hc", def.c); card.style.setProperty("--i", i);
  const art = document.createElement("div"); art.className = "sc-art"; artStyle(art, def);
  const hs = heroStat(def, d);
  const rest = def.pick.filter((k) => k !== (hs && hs.k)).slice(0, 3);
  const body = document.createElement("div"); body.className = "sc-body";
  body.innerHTML = '<div class="sc-head"><h3>' + escT(def.name) + "</h3><span>" + escT(d.name || d.riot_id || d.tag || "") + "</span></div>" +
    (hs ? '<div class="sc-hero"><b>' + escT(fmtStat(hs.v)) + "</b><span>" + escT(hs.lbl || STAT_LBL[hs.k] || hs.k) + "</span></div>" : '<div class="sc-hero"><b>\u2013</b></div>') +
    (rest.length ? '<div class="sc-row">' + rest.map((k) => "<div><b>" + escT(fmtStat(d[k])) + "</b><span>" + escT(STAT_LBL[k] || k) + "</span></div>").join("") + "</div>" : "") +
    (def.ranks && Array.isArray(d.ranks) && d.ranks.length ? '<div class="hub-ranks">' + d.ranks.slice(0, 2).map((rk) => "<span>" + escT(rankTxt(rk)) + "</span>").join("") + "</div>" : "") +
    '<div class="sc-foot"><span>' + t("statsUpdated") + " " + escT(h.updated_at ? new Date(h.updated_at).toLocaleString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "\u2013") + "</span><em>" + t("statsAll") + " \u2192</em></div>";
  card.appendChild(art); card.appendChild(body);
  card.addEventListener("click", () => { hubOrigin = "view-stats"; openHub(h.game_key); });
  return card;
}
let statsBusy = false;
async function loadStats() {
  const grid = $("stats-grid");
  hubAtmoOff("view-stats");
  $("stats-detail").hidden = true; $("stats-home").hidden = false;
  const cached = hubData.length > 0 || (rlMatches && rlMatches.length);
  if (cached) renderStats(false); else grid.innerHTML = skelRows(4, "skel-hub");
  if (statsBusy) return; statsBusy = true;
  try {
    const before = JSON.stringify([hubData, mcSummary, rlMatches && rlMatches.length]);
    const ok = await Promise.all([fetchHubs(false), fetchMc(), fetchRl(), ensureLib()]);
    if (!ok[0] && !cached) { grid.innerHTML = ""; grid.appendChild(errBox(() => loadStats())); return; }
    const after = JSON.stringify([hubData, mcSummary, rlMatches && rlMatches.length]);
    if (!cached || before !== after) renderStats(cached);
  } catch (e) { if (!cached) { grid.innerHTML = ""; grid.appendChild(errBox(() => loadStats())); } }
  finally { statsBusy = false; }
}
function renderStats(quiet) {
  const grid = $("stats-grid"), plat = $("stats-plat");
  grid.classList.toggle("noanim", !!quiet); plat.classList.toggle("noanim", !!quiet);
  const games = hubData.filter((h) => HUBS[h.game_key].kind !== "platform");
  const hasMc = !!(mcSummary && mcSummary.total && mcSummary.total.sessions > 0);
  const rs = rlStats(rlMatches); const hasRl = rs.n > 0;
  const plats = hubData.filter((h) => HUBS[h.game_key].kind === "platform");
  const nSrc = hubData.length + (hasMc ? 1 : 0) + (hasRl ? 1 : 0);
  $("stats-sub").textContent = nSrc + " " + (lang === "nl" ? "bronnen" : "sources");
  grid.innerHTML = ""; plat.innerHTML = "";
  if (!hubData.length && !hasMc && !hasRl) { grid.innerHTML = emptyHtml(t("statsEmpty"), "plug"); $("stats-plat-h").hidden = true; return; }
  let i = 0;
  if (hasRl) grid.appendChild(rlCard(i++, rs));
  if (hasMc) grid.appendChild(mcCard(i++));
  games.forEach((h) => grid.appendChild(statCard(h, i++, false)));
  $("stats-plat-h").hidden = !plats.length;
  plats.forEach((h) => plat.appendChild(statCard(h, i++, true)));
}
function rlCard(i, rs) {
  const def = HUBS.rocketleague;
  const card = document.createElement("div"); card.className = "scard"; card.style.setProperty("--hc", def.c); card.style.setProperty("--i", i);
  const art = document.createElement("div"); art.className = "sc-art"; artStyle(art, def);
  const body = document.createElement("div"); body.className = "sc-body";
  body.innerHTML = '<div class="sc-head"><h3>Rocket League</h3><span>' + escT(t("hubSubRl")) + "</span></div>" +
    '<div class="sc-hero"><b>' + (rs.wr != null ? rs.wr + "%" : "\u2013") + "</b><span>" + escT(t("rlWinrate")) + " \u00b7 " + rs.n + " " + escT(t("rlMatches")) + "</span></div>" +
    '<div class="sc-row"><div><b>' + fmtNum(rs.g) + "</b><span>" + escT(t("rlGoals")) + "</span></div><div><b>" + fmtNum(rs.a) + "</b><span>" + escT(t("rlAssists")) + "</span></div><div><b>" + fmtNum(rs.s) + "</b><span>" + escT(t("rlSaves")) + "</span></div></div>" +
    '<div class="sc-foot"><span>' + (rs.today ? rs.today + " " + escT(t("rlMatches")) + " " + escT(t("rlToday")) : escT(t("hubSubRl"))) + "</span><em>" + t("statsAll") + " \u2192</em></div>";
  card.appendChild(art); card.appendChild(body);
  card.addEventListener("click", () => { hubOrigin = "view-stats"; openRlHub(); });
  return card;
}
async function openRlHub() {
  if (!rlMatches) await fetchRl();
  const def = HUBS.rocketleague, rs = rlStats(rlMatches);
  hubAtmo("view-stats", def.c);
  const box = $("stats-detail"); $("stats-home").hidden = true; box.hidden = false; box.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "sd"; wrap.style.setProperty("--hc", def.c);
  const banner = document.createElement("div"); banner.className = "sd-banner"; artStyle(banner, def);
  const live = tbNowLast && tbNowLast.game === "Rocket League" ? t("hubLive") + (tbNowLast.detail ? " \u00b7 " + tbNowLast.detail : "") : t("hubSubRl");
  banner.innerHTML = '<button class="btn small sd-back" id="hub-back">\u2190 ' + t("statsBack") + "</button>" +
    '<div class="sd-in"><div><h2>Rocket League</h2><div class="sd-who">' + escT(live) + "</div></div></div>";
  wrap.appendChild(banner);
  if (!rs.n) {
    const e = document.createElement("div"); e.className = "sd-empty"; e.innerHTML = emptyHtml(t("rlEmpty"), "controller");
    const b = document.createElement("button"); b.className = "btn gold"; b.textContent = t("rlSetupGo"); b.addEventListener("click", () => { show("view-main"); $("rl-setup-box").hidden = false; });
    e.firstChild.appendChild(b); wrap.appendChild(e);
  } else {
    const hero = document.createElement("div"); hero.className = "sd-heroes";
    const per = (v) => rs.n ? (Math.round((v / rs.n) * 10) / 10).toLocaleString(lang === "nl" ? "nl-NL" : "en-US") : "\u2013";
    [[rs.wr != null ? rs.wr + "%" : "\u2013", t("rlWinrate") + " \u00b7 " + rs.w + " " + t("rlWins") + " / " + rs.l + " " + t("rlLosses")], [fmtNum(rs.n), t("rlMatches")], [per(rs.g), t("rlGoals") + " " + t("rlPerMatch")], [per(rs.s), t("rlSaves") + " " + t("rlPerMatch")]]
      .forEach(([v, l], i) => { const el = document.createElement("div"); el.className = "sh"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(v) + "</b><span>" + escT(l) + "</span>"; hero.appendChild(el); });
    wrap.appendChild(hero);
    /* vorm van de laatste 10 */
    const fh = document.createElement("div"); fh.className = "hub-sub cr-bathead"; fh.innerHTML = "<span>" + escT(t("rlForm")) + "</span>";
    const form = document.createElement("span"); form.className = "cr-form";
    form.innerHTML = rs.all.slice(0, 10).map((m) => '<i class="' + (m.result === "win" ? "w" : m.result === "loss" ? "l" : "d") + '" title="' + escT(String(m.playlist || "")) + '"></i>').join("");
    fh.appendChild(form); wrap.appendChild(fh);
    /* records + nauwkeurigheid */
    let cur = 0, curType = null, best = 0, run = 0;
    rs.all.forEach((m, i) => {
      if (m.result === "win") { run = run > 0 ? run + 1 : 1; } else if (m.result === "loss") { run = run < 0 ? run - 1 : -1; } else run = 0;
      if (i === 0) { cur = Math.abs(run); curType = run > 0 ? "W" : run < 0 ? "L" : null; }
      if (run > best) best = run;
    });
    const acc = rs.sh > 0 ? Math.round((rs.g / rs.sh) * 100) : null;
    const maxG = rs.all.reduce((a, m) => Math.max(a, Number(m.goals) || 0), 0);
    const avgScore = rs.all.filter((m) => m.score != null).length ? Math.round(rs.all.reduce((a, m) => a + (Number(m.score) || 0), 0) / rs.all.filter((m) => m.score != null).length) : null;
    const recH = document.createElement("div"); recH.className = "hub-sub"; recH.textContent = t("rlRecords"); wrap.appendChild(recH);
    const recG = document.createElement("div"); recG.className = "sd-grid";
    [[curType ? cur + curType : "\u2013", t("rlStreak")], [best > 0 ? best + "W" : "\u2013", t("rlBestStreak")], [acc != null ? acc + "%" : "\u2013", t("rlAcc")], [maxG || "\u2013", t("rlBestGame")], [avgScore != null ? fmtNum(avgScore) : "\u2013", t("rlAvgScore")], [fmtNum(rs.today), t("rlMatches") + " " + t("rlToday")]]
      .forEach(([v, l], i) => { const el = document.createElement("div"); el.className = "hub-tile"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(String(v)) + "</b><span>" + escT(l) + "</span>"; recG.appendChild(el); });
    wrap.appendChild(recG);
    /* per playlist */
    const byPl = {};
    rs.all.forEach((m) => { const k = m.playlist || "?"; const o = byPl[k] = byPl[k] || { pl: k, n: 0, w: 0, l: 0, g: 0, s: 0 }; o.n++; if (m.result === "win") o.w++; if (m.result === "loss") o.l++; o.g += Number(m.goals) || 0; o.s += Number(m.saves) || 0; });
    const pls = Object.values(byPl).sort((a, b) => b.n - a.n);
    if (pls.length) {
      const ph = document.createElement("div"); ph.className = "hub-sub"; ph.textContent = t("rlPerPlaylist"); wrap.appendChild(ph);
      const box2 = document.createElement("div"); box2.className = "rl-pls";
      const maxN = Math.max(...pls.map((p) => p.n), 1);
      pls.forEach((p, i) => {
        const wr2 = p.w + p.l ? Math.round((p.w / (p.w + p.l)) * 100) : null;
        const el = document.createElement("div"); el.className = "rl-pl"; el.style.setProperty("--i", i);
        el.innerHTML = '<div class="rp-t"><b>' + escT(p.pl === "?" ? t("rlNoPl") : p.pl) + "</b><small>" + p.n + " " + escT(t("rlMatches")) + " \u00b7 " + p.w + "W / " + p.l + "L \u00b7 " + (Math.round((p.g / p.n) * 10) / 10) + " " + escT(t("rlGoals")) + " " + escT(t("rlPerMatch")) + '</small><div class="rp-bar"><i></i></div></div><span class="rp-wr">' + (wr2 != null ? wr2 + "%" : "\u2013") + "</span>";
        box2.appendChild(el);
        requestAnimationFrame(() => { const b = el.querySelector(".rp-bar i"); if (b) b.style.width = Math.round((p.n / maxN) * 100) + "%"; });
      });
      wrap.appendChild(box2);
    }
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = t("statsAll"); wrap.appendChild(sub);
    const g = document.createElement("div"); g.className = "sd-grid";
    [[fmtNum(rs.g), t("rlGoals")], [fmtNum(rs.a), t("rlAssists")], [fmtNum(rs.s), t("rlSaves")], [fmtNum(rs.sh), t("rlShots")], [per(rs.g), t("rlGoals") + " " + t("rlPerMatch")], [per(rs.a), t("rlAssists") + " " + t("rlPerMatch")]]
      .forEach(([v, l], i) => { const el = document.createElement("div"); el.className = "hub-tile"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(v) + "</b><span>" + escT(l) + "</span>"; g.appendChild(el); });
    wrap.appendChild(g);
    const sub2 = document.createElement("div"); sub2.className = "hub-sub rl-lasthead"; sub2.innerHTML = "<span>" + escT(t("rlLast")) + "</span>";
    const unknowns = rs.all.filter((m) => (m.result || "unknown") === "unknown");
    if (unknowns.length) {
      const del = document.createElement("button"); del.className = "btn small danger rl-delall"; del.textContent = t("rlDelUnknown") + " (" + unknowns.length + ")";
      del.addEventListener("click", () => rlDeleteUnknown(unknowns.length));
      sub2.appendChild(del);
    }
    wrap.appendChild(sub2);
    const list = document.createElement("div"); list.className = "matches";
    rs.all.slice(0, 30).forEach((m, i) => { const row = matchRow(m, true); row.style.animationDelay = Math.min(i, 12) * 30 + "ms"; list.appendChild(row); });
    wrap.appendChild(list);
  }
  box.appendChild(wrap);
  $("hub-back").addEventListener("click", hubBack);
  $("view-stats").scrollTop = 0;
}
function hubBack() {
  hubAtmoOff("view-stats");
  const box = $("stats-detail"); box.hidden = true; $("stats-home").hidden = false;
  if (hubOrigin === "view-hubs") show("view-hubs");
  else { renderStats(true); $("view-stats").scrollTop = 0; }
}
function mcCard(i) {
  const def = HUBS.minecraft, m = mcSummary;
  const card = document.createElement("div"); card.className = "scard"; card.style.setProperty("--hc", def.c); card.style.setProperty("--i", i);
  const art = document.createElement("div"); art.className = "sc-art"; artStyle(art, def);
  const top = (m.servers || [])[0];
  const body = document.createElement("div"); body.className = "sc-body";
  body.innerHTML = '<div class="sc-head"><h3>Minecraft</h3><span>' + escT(t("mcTag")) + "</span></div>" +
    '<div class="sc-hero"><b>' + fmtPlay(m.total.minutes).v + "</b><span>" + escT(fmtPlay(m.total.minutes).u) + "</span></div>" +
    '<div class="sc-row"><div><b>' + (m.servers || []).length + "</b><span>" + escT(t("mcServers")) + "</span></div><div><b>" + fmtNum(m.total.sessions) + "</b><span>" + escT(t("mcSessions")) + "</span></div><div><b>" + escT(top ? top.server : "\u2013") + "</b><span>Top server</span></div></div>" +
    '<div class="sc-foot"><span>' + escT(t("hubSubMc")) + "</span><em>" + t("statsAll") + " \u2192</em></div>";
  card.appendChild(art); card.appendChild(body);
  card.addEventListener("click", () => { hubOrigin = "view-stats"; openMcHub(); });
  return card;
}
async function openMcHub() {
  if (!mcSummary) await fetchMc();
  const def = HUBS.minecraft, m = mcSummary || { servers: [], worlds: [], total: { sessions: 0, minutes: 0 } };
  hubAtmo("view-stats", def.c);
  const box = $("stats-detail"); $("stats-home").hidden = true; box.hidden = false; box.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "sd"; wrap.style.setProperty("--hc", def.c);
  const banner = document.createElement("div"); banner.className = "sd-banner"; artStyle(banner, def);
  const live = mcStatusLast && mcStatusLast.running ? (mcStatusLast.server ? t("mcOnServer")(mcStatusLast.server) : mcStatusLast.world ? t("mcOnWorld")(mcStatusLast.world) : t("mcOn")) : "";
  banner.innerHTML = '<button class="btn small sd-back" id="hub-back">\u2190 ' + t("statsBack") + "</button>" +
    '<div class="sd-in"><div><h2>Minecraft</h2><div class="sd-who">' + escT(mcStatusLast && mcStatusLast.user ? mcStatusLast.user + " \u00b7 " : "") + escT(live || t("hubSubMc")) + "</div></div></div>";
  wrap.appendChild(banner);
  const hero = document.createElement("div"); hero.className = "sd-heroes";
  const hs = [[fmtPlay(m.total.minutes).v, t("mcTotal") + " (" + fmtPlay(m.total.minutes).u + ")"], [String((m.servers || []).length), t("mcServers")], [fmtNum(m.total.sessions), t("mcSessions")], [fmtNum((m.servers || []).reduce((a, x) => a + (x.deaths || 0), 0) + (m.worlds || []).reduce((a, x) => a + (x.deaths || 0), 0)), t("mcDeaths")]];
  hs.forEach(([v, l], i) => { const el = document.createElement("div"); el.className = "sh"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(v) + "</b><span>" + escT(l) + "</span></div>"; hero.appendChild(el); });
  wrap.appendChild(hero);
  const fmtLast = (iso) => iso ? new Date(iso).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short" }) : "\u2013";
  const table = (rows, keyName, title) => {
    if (!rows || !rows.length) return;
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = title; wrap.appendChild(sub);
    const max = Math.max(...rows.map((r) => r.minutes || 0), 1);
    const list = document.createElement("div"); list.className = "mc-rows";
    rows.forEach((r, i) => {
      const el = document.createElement("div"); el.className = "mc-row"; el.style.setProperty("--i", i);
      el.innerHTML = '<span class="mc-rank">' + (i + 1) + '</span><div class="mc-main"><b>' + escT(r[keyName]) + '</b><div class="mc-bar"><i></i></div><small>' + fmtNum(r.sessions) + " " + escT(t("mcSessions")) + " \u00b7 " + escT(t("mcLast")) + " " + fmtLast(r.last) + (r.deaths ? " \u00b7 " + fmtNum(r.deaths) + " " + escT(t("mcDeaths")) : "") + (r.advancements ? " \u00b7 " + fmtNum(r.advancements) + " " + escT(t("mcAdv")) : "") + '</small></div><span class="mc-hours"><b>' + (r.minutes >= 60 ? fmtNum(Math.round(r.minutes / 6) / 10) : fmtNum(r.minutes)) + "</b>" + (r.minutes >= 60 ? escT(t("mcHours")) : "min") + "</span>";
      el.querySelector(".mc-bar i").style.width = Math.round((r.minutes / max) * 100) + "%";
      list.appendChild(el);
    });
    wrap.appendChild(list);
  };
  table(m.servers, "server", t("mcServers"));
  table(m.worlds, "world", t("mcWorlds"));
  if (!(m.servers || []).length && !(m.worlds || []).length) { const e = document.createElement("div"); e.innerHTML = emptyHtml(t("mcEmpty"), "controller"); wrap.appendChild(e.firstChild); }
  box.appendChild(wrap);
  $("hub-back").addEventListener("click", hubBack);
  $("view-stats").scrollTop = 0;
}
/* ===== Clash Royale: eigen hub met deck, vorm en gevechten (zelfde data als de site) ===== */
function crBanner(def, d, h) {
  const banner = document.createElement("div"); banner.className = "sd-banner"; artStyle(banner, def);
  const bits = [d.arena ? t("crArena") + ": " + d.arena : null, String(d.clan || "").replace(/^Clan:\s*/i, "") ? t("crClan") + ": " + String(d.clan).replace(/^Clan:\s*/i, "") : null, d.tag || null].filter(Boolean);
  banner.innerHTML = '<button class="btn small sd-back" id="hub-back">\u2190 ' + t("statsBack") + "</button>" +
    '<div class="sd-in"><div><h2>' + escT(def.name) + '</h2><div class="sd-who">' + escT(d.name || "") + (bits.length ? " \u00b7 " + escT(bits.join(" \u00b7 ")) : "") + "</div></div>" +
    '<div class="sd-upd">' + t("statsUpdated") + " " + escT(h.updated_at ? new Date(h.updated_at).toLocaleString(lang === "nl" ? "nl-NL" : "en-US") : "\u2013") + "</div></div>";
  return banner;
}
function openRoyaleHub(h) {
  const def = HUBS.royale, d = h.data || {};
  hubAtmo("view-stats", def.c);
  const box = $("stats-detail"); $("stats-home").hidden = true; box.hidden = false; box.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "sd cr"; wrap.style.setProperty("--hc", def.c);
  wrap.appendChild(crBanner(def, d, h));

  /* kerncijfers */
  const w = Number(d.wins) || 0, l = Number(d.losses) || 0;
  const wr = w + l ? Math.round((w / (w + l)) * 100) : null;
  const hero = document.createElement("div"); hero.className = "sd-heroes";
  [[fmtNum(d.trophies), t("crTrophies")], [wr != null ? wr + "%" : "\u2013", t("crWinrate") + " \u00b7 " + fmtNum(w) + "W / " + fmtNum(l) + "L"], [fmtNum(d.three_crown), "3-" + t("crCrowns")], [fmtNum(d.battles), "battles"]]
    .forEach(([v, lb], i) => { const el = document.createElement("div"); el.className = "sh"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(String(v)) + "</b><span>" + escT(lb) + "</span>"; hero.appendChild(el); });
  wrap.appendChild(hero);

  /* balk naar persoonlijk record */
  if (d.trophies != null && d.best != null) {
    const pct = Math.max(2, Math.min(100, Math.round((Number(d.trophies) / Math.max(1, Number(d.best))) * 100)));
    const gap = Number(d.best) - Number(d.trophies);
    const bar = document.createElement("div"); bar.className = "cr-best";
    bar.innerHTML = '<div class="cr-best-top"><span>' + escT(t("crBest")) + " " + fmtNum(d.best) + "</span><span>" + escT(gap > 0 ? t("crToBest")(fmtNum(gap)) : t("crAtBest")) + '</span></div><div class="cr-bar"><i></i></div>';
    wrap.appendChild(bar);
    requestAnimationFrame(() => { const i = bar.querySelector(".cr-bar i"); if (i) i.style.width = pct + "%"; });
  }

  /* huidig deck */
  const deck = Array.isArray(d.deck) ? d.deck : [];
  if (deck.length) {
    const avg = deck.reduce((a, c) => a + (Number(c.elixir) || 0), 0) / deck.length;
    const sub = document.createElement("div"); sub.className = "hub-sub cr-deckhead";
    sub.innerHTML = "<span>" + escT(t("crDeck")) + '</span><span class="cr-avg"><b>' + (Math.round(avg * 10) / 10).toLocaleString(lang === "nl" ? "nl-NL" : "en-US") + "</b> " + escT(t("crElixir")) + "</span>";
    wrap.appendChild(sub);
    const g = document.createElement("div"); g.className = "cr-deck";
    deck.forEach((c, i) => {
      const el = document.createElement("div"); el.className = "cr-card" + (c.evo ? " evo" : ""); el.style.setProperty("--i", i);
      el.innerHTML = (c.icon ? '<img src="' + encodeURI(c.icon) + '" alt="" loading="lazy">' : '<div class="cr-ph"></div>') +
        '<span class="cr-elx">' + escT(String(c.elixir ?? "?")) + "</span>" +
        '<div class="cr-ct"><b>' + escT(c.name || "?") + '</b><small>' + escT(t("crLevel")) + " " + escT(String(c.level ?? "?")) + (c.max ? "/" + escT(String(c.max)) : "") + (c.evo ? " \u00b7 " + escT(t("crEvo")) : "") + "</small></div>";
      g.appendChild(el);
    });
    wrap.appendChild(g);
  }

  /* vorm + gevechten */
  const rec = Array.isArray(d.recent) ? d.recent : [];
  const sub2 = document.createElement("div"); sub2.className = "hub-sub cr-bathead"; sub2.innerHTML = "<span>" + escT(t("crBattles")) + "</span>";
  if (rec.length) {
    const form = document.createElement("span"); form.className = "cr-form";
    form.innerHTML = rec.slice(0, 10).map((b) => '<i class="' + (b.res === "W" ? "w" : b.res === "L" ? "l" : "d") + '" title="' + escT(String(b.opp || "")) + '"></i>').join("");
    sub2.appendChild(form);
  }
  wrap.appendChild(sub2);
  if (!rec.length) { const e = document.createElement("div"); e.innerHTML = emptyHtml(t("crNoBattles"), "controller"); wrap.appendChild(e.firstChild); }
  else {
    const list = document.createElement("div"); list.className = "cr-bats";
    rec.slice(0, 20).forEach((b, i) => {
      const row = document.createElement("div"); row.className = "cr-bat " + (b.res === "W" ? "win" : b.res === "L" ? "loss" : ""); row.style.setProperty("--i", i);
      const dt = b.t ? new Date(b.t) : null;
      const when = dt ? dt.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short" }) + " " + dt.toLocaleTimeString(lang === "nl" ? "nl-NL" : "en-US", { hour: "2-digit", minute: "2-digit" }) : "";
      const tro = Number(b.trophy);
      row.innerHTML = '<span class="cb-res">' + (b.res === "W" ? "WIN" : b.res === "L" ? "LOSS" : "\u2013") + "</span>" +
        '<span class="cb-crowns"><b>' + escT(String(b.crowns ?? 0)) + "</b> \u2013 " + escT(String(b.opp_crowns ?? 0)) + "</span>" +
        '<div class="cb-opp"><b>' + escT(b.opp || "?") + "</b><small>" + escT(b.mode || t("crLadder")) + " \u00b7 " + escT(when) + "</small></div>" +
        (Number.isFinite(tro) && tro !== 0 ? '<span class="cb-tro ' + (tro > 0 ? "up" : "down") + '">' + (tro > 0 ? "+" : "") + escT(String(tro)) + "</span>" : '<span class="cb-tro"></span>');
      row.classList.add("clickable");
      row.addEventListener("click", () => openCrBattle(b));
      const od = Array.isArray(b.opp_deck) ? b.opp_deck : [];
      if (od.length) {
        const deckEl = document.createElement("div"); deckEl.className = "cb-deck"; deckEl.title = t("crOppDeck");
        deckEl.innerHTML = od.slice(0, 8).map((c) => '<img src="' + encodeURI(c.i || "") + '" alt="' + escT(c.n || "") + '" title="' + escT(c.n || "") + '" loading="lazy">').join("");
        row.appendChild(deckEl);
      }
      list.appendChild(row);
    });
    wrap.appendChild(list);
  }

  /* overige cijfers */
  const rest = [["level", "Level"], ["cards", "Cards"], ["star_points", "Star points"], ["donations", "Donations"], ["war_wins", "War day wins"], ["streak", "Streak"], ["fav_card", "Favourite card"], ["xp", "XP"]]
    .filter(([k]) => d[k] != null && d[k] !== "");
  if (d.est_minutes) rest.push(["est_minutes", t("crPlaytime")]);
  if (rest.length) {
    const sub3 = document.createElement("div"); sub3.className = "hub-sub"; sub3.textContent = t("statsAll"); wrap.appendChild(sub3);
    const g = document.createElement("div"); g.className = "sd-grid";
    rest.forEach(([k, lb], i) => {
      const el = document.createElement("div"); el.className = "hub-tile"; el.style.setProperty("--i", i);
      const v = k === "est_minutes" ? fmtHours(d[k]) + " " + t("stHours") : fmtStat(d[k]);
      el.innerHTML = "<b>" + escT(String(v)) + "</b><span>" + escT(lb) + "</span>"; g.appendChild(el);
    });
    wrap.appendChild(g);
  }
  box.appendChild(wrap);
  $("hub-back").addEventListener("click", hubBack);
  box.scrollTop = 0; $("view-stats").scrollTop = 0;
}
function openHub(key) {
  if (key === "royale") { const hh = hubOf(key); if (hh) return openRoyaleHub(hh); }
  if (key === "fortnite") { const hh = hubOf(key); if (hh) return openFortniteHub(hh); }
  const h = hubOf(key); if (!h) return;
  const def = HUBS[key], d = h.data || {};
  hubAtmo("view-stats", def.c);
  const box = $("stats-detail"); $("stats-home").hidden = true; box.hidden = false;
  box.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "sd"; wrap.style.setProperty("--hc", def.c);
  const banner = document.createElement("div"); banner.className = "sd-banner"; artStyle(banner, def);
  banner.innerHTML = '<button class="btn small sd-back" id="hub-back">\u2190 ' + t("statsBack") + "</button>" +
    '<div class="sd-in"><div><h2>' + escT(def.name) + '</h2><div class="sd-who">' + escT(d.name || d.riot_id || d.tag || "") + "</div></div>" +
    '<div class="sd-upd">' + t("statsUpdated") + " " + escT(h.updated_at ? new Date(h.updated_at).toLocaleString(lang === "nl" ? "nl-NL" : "en-US") : "\u2013") + "</div></div>";
  wrap.appendChild(banner);
  /* kerncijfers: hero + pick, daarna de rest */
  const heroKeys = [def.hero, ...def.pick].filter((k, i, a) => k && a.indexOf(k) === i && d[k] != null).slice(0, 4);
  if (heroKeys.length) {
    const hero = document.createElement("div"); hero.className = "sd-heroes";
    heroKeys.forEach((k, i) => { const el = document.createElement("div"); el.className = "sh"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(fmtStat(d[k])) + "</b><span>" + escT(STAT_LBL[k] || k) + "</span>"; hero.appendChild(el); });
    wrap.appendChild(hero);
  }
  const restKeys = def.all.filter((k) => !heroKeys.includes(k));
  if (restKeys.length) {
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = t("statsAll"); wrap.appendChild(sub);
    const g = document.createElement("div"); g.className = "sd-grid";
    restKeys.forEach((k, i) => { const el = document.createElement("div"); el.className = "hub-tile"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(fmtStat(d[k])) + "</b><span>" + escT(STAT_LBL[k] || k) + "</span>"; g.appendChild(el); });
    wrap.appendChild(g);
  }
  if (d.modes && typeof d.modes === "object") {
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = "Per mode"; wrap.appendChild(sub);
    const g = document.createElement("div"); g.className = "hub-modes";
    g.innerHTML = Object.entries(d.modes).map(([m, v]) => '<div class="hub-mode"><b>' + escT(m) + "</b>" + Object.entries(v).slice(0, 6).map(([k, x]) => "<span>" + escT(STAT_LBL[k] || k) + " " + escT(fmtStat(x)) + "</span>").join("") + "</div>").join("");
    wrap.appendChild(g);
  }
  const list = (arr, title, f) => {
    if (!Array.isArray(arr) || !arr.length) return;
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = title; wrap.appendChild(sub);
    const g = document.createElement("div"); g.className = "hub-list"; g.innerHTML = arr.map(f).join("");
    g.querySelectorAll("span").forEach((el, i) => el.style.setProperty("--i", i));
    wrap.appendChild(g);
  };
  list(d.ranks, "Ranks", (rk) => '<span class="rk"><b>' + escT(rankTxt(rk)) + "</b> " + escT(fmtStat(rk.wins)) + "W/" + escT(fmtStat(rk.losses)) + "L</span>");
  list(d.top_brawlers, "Top brawlers", (b) => "<span><b>" + escT(b.name) + "</b> " + escT(fmtStat(b.trophies)) + " \u00b7 P" + escT(fmtStat(b.power)) + "</span>");
  list(d.deck, "Current deck", (c) => "<span>" + (c.icon ? '<img src="' + encodeURI(c.icon) + '" alt="">' : "") + escT(c.name) + " \u00b7 " + escT(fmtStat(c.elixir)) + "</span>");
  list(d.trophy_titles && d.trophy_titles.slice(0, 16), "Trophy cabinet", (tt) => "<span>" + (tt.icon ? '<img src="' + encodeURI(tt.icon) + '" alt="">' : "") + escT(tt.name) + " \u00b7 " + escT(fmtStat(tt.progress)) + "%" + (tt.platinum ? " \u00b7 Platinum" : "") + "</span>");
  box.appendChild(wrap);
  $("hub-back").addEventListener("click", hubBack);
  box.scrollTop = 0; $("view-stats").scrollTop = 0;
}


/* ===== FORTNITE-HUB: eigen stats per mode + itemshop, nieuws, map en cosmetics via fn-hub (fortnite-api.com), zoals /fortnite op de site ===== */
const fnS = { tab: "player", shop: null, news: null, map: null, cos: null, cosQ: "" };
const fnRar = (k) => k ? " fn-r-" + String(k).toLowerCase().replace(/[^a-z]/g, "") : "";
function openFortniteHub(h) {
  const def = HUBS.fortnite, d = h.data || {};
  hubAtmo("view-stats", def.c);
  const box = $("stats-detail"); $("stats-home").hidden = true; box.hidden = false; box.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "sd fn"; wrap.style.setProperty("--hc", def.c);
  const banner = document.createElement("div"); banner.className = "sd-banner"; artStyle(banner, def);
  banner.innerHTML = '<button class="btn small sd-back" id="hub-back">\u2190 ' + t("statsBack") + "</button>" +
    '<div class="sd-in"><div><h2>Fortnite</h2><div class="sd-who">' + escT(d.name || "") + (d.level != null ? " \u00b7 " + t("fnLevel") + " " + escT(fmtStat(d.level)) : "") + "</div></div>" +
    '<div class="sd-upd">' + t("statsUpdated") + " " + escT(h.updated_at ? new Date(h.updated_at).toLocaleString(lang === "nl" ? "nl-NL" : "en-US") : "\u2013") + "</div></div>";
  wrap.appendChild(banner);
  const tabs = document.createElement("div"); tabs.className = "fn-tabs";
  [["player", "fnTabPlayer"], ["shop", "fnTabShop"], ["news", "fnTabNews"], ["map", "fnTabMap"], ["cosmetics", "fnTabCos"]].forEach(([k, l]) => {
    const b = document.createElement("button"); b.className = "fn-tab" + (fnS.tab === k ? " on" : ""); b.dataset.tab = k; b.textContent = t(l);
    b.addEventListener("click", () => { fnS.tab = k; tabs.querySelectorAll(".fn-tab").forEach((x) => x.classList.toggle("on", x.dataset.tab === k)); fnPane(pane, k, d); });
    tabs.appendChild(b);
  });
  wrap.appendChild(tabs);
  const pane = document.createElement("div"); pane.className = "fn-pane"; wrap.appendChild(pane);
  const note = document.createElement("p"); note.className = "gs-igdb fn-note"; note.textContent = t("fnNote"); wrap.appendChild(note);
  box.appendChild(wrap);
  $("hub-back").addEventListener("click", hubBack);
  fnPane(pane, fnS.tab, d);
  box.scrollTop = 0; $("view-stats").scrollTop = 0;
}
function fnPane(pane, tab, d) {
  pane.innerHTML = ""; pane.dataset.tab = tab;
  if (tab === "player") return fnPlayer(pane, d);
  pane.innerHTML = skelRows(3, "skel-row");
  const fail = () => { pane.innerHTML = emptyHtml(t("fnNoData"), "shrug"); };
  if (tab === "shop") return fnShop(pane).catch(fail);
  if (tab === "news") return fnNews(pane).catch(fail);
  if (tab === "map") return fnMap(pane).catch(fail);
  if (tab === "cosmetics") return fnCos(pane);
}
async function fnGet(key, body) {
  if (fnS[key]) return fnS[key];
  const r = await window.egs.fnHub(body);
  if (!r || !r.ok) throw new Error((r && r.error) || "api");
  fnS[key] = r; return r;
}
function fnPlayer(pane, d) {
  const w = Number(d.wins) || 0, mt = Number(d.matches) || 0;
  const wr = d.winrate != null ? d.winrate : (mt ? Math.round((w / mt) * 1000) / 10 : null);
  const heroes = [[fmtStat(d.wins), STAT_LBL.wins], [wr != null ? fmtStat(wr) + "%" : "\u2013", STAT_LBL.winrate], [fmtStat(d.kd), STAT_LBL.kd], [fmtStat(d.kills), STAT_LBL.kills], [fmtStat(d.matches), STAT_LBL.matches]];
  pane.innerHTML = '<div class="sd-heroes five">' + heroes.map(([v, l], i) => '<div class="sh" style="--i:' + i + '"><b>' + escT(v) + "</b><span>" + escT(l) + "</span></div>").join("") + "</div>";
  const modes = d.modes && typeof d.modes === "object" ? Object.entries(d.modes) : [];
  if (modes.length) {
    const tot = modes.reduce((s, [, v]) => s + (Number(v.matches) || 0), 0);
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = t("fnPerMode"); pane.appendChild(sub);
    const g = document.createElement("div"); g.className = "fn-modes";
    modes.sort((x, y) => (Number(y[1].matches) || 0) - (Number(x[1].matches) || 0)).forEach(([name, v], i) => {
      const share = tot ? Math.round(((Number(v.matches) || 0) / tot) * 100) : 0;
      const el = document.createElement("div"); el.className = "fn-mode"; el.style.setProperty("--i", i);
      el.innerHTML = '<div class="fn-mode-h"><b>' + escT(name) + "</b><em>" + (v.winrate != null ? escT(fmtStat(v.winrate)) + "%" : "\u2013") + "</em></div>" +
        '<i class="fn-bar"><i style="width:' + share + '%"></i></i><small>' + share + "% " + escT(t("fnShare")) + " \u00b7 " + escT(fmtStat(v.matches)) + " " + escT(STAT_LBL.matches.toLowerCase()) + "</small>" +
        '<div class="fn-mode-rows">' + [["wins", v.wins], ["kills", v.kills], ["kd", v.kd], ["top10", v.top10]].map(([k, x]) => "<span><b>" + escT(fmtStat(x)) + "</b>" + escT(STAT_LBL[k] || k) + "</span>").join("") + "</div>";
      g.appendChild(el);
    });
    pane.appendChild(g);
  }
  const rest = ["deaths", "top10", "top25", "kpm", "score", "outlived", "minutes", "level"].filter((k) => d[k] != null);
  if (rest.length) {
    const sub = document.createElement("div"); sub.className = "hub-sub"; sub.textContent = t("statsAll"); pane.appendChild(sub);
    const g = document.createElement("div"); g.className = "sd-grid";
    rest.forEach((k, i) => { const v = k === "minutes" ? fmtNum(Math.round(Number(d[k]) / 60)) + " " + t("stHours") : fmtStat(d[k]); const el = document.createElement("div"); el.className = "hub-tile"; el.style.setProperty("--i", i); el.innerHTML = "<b>" + escT(v) + "</b><span>" + escT(k === "minutes" ? t("profHours") : STAT_LBL[k] || k) + "</span>"; g.appendChild(el); });
    pane.appendChild(g);
  }
}
const fnItem = (it, s) => '<div class="fn-item' + fnRar(it.rarity_key) + '" title="' + escT(it.name || "") + '">' + (it.image ? '<img src="' + encodeURI(it.image) + '" alt="" loading="lazy">' : '<div class="fn-noimg"></div>') +
  '<div class="fn-item-b"><b>' + escT(it.name || "") + "</b><span>" + escT(it.type || "") + (it.series ? " \u00b7 " + escT(it.series) : (it.rarity ? " \u00b7 " + escT(it.rarity) : "")) + "</span>" +
  (it.price != null ? "<em>" + (s && s.vbuck ? '<img src="' + encodeURI(s.vbuck) + '" alt="">' : "") + escT(fmtNum(it.price)) + (it.regular && it.regular !== it.price ? " <s>" + escT(fmtNum(it.regular)) + "</s>" : "") + (it.bundle ? " \u00b7 " + escT(String(it.items)) + " " + escT(t("fnItems")) : "") + "</em>" :
   (it.intro || it.shop_last ? "<em>" + escT(it.intro ? String(it.intro).replace("Introduced in ", "") : "") + (it.shop_last ? (it.intro ? " \u00b7 " : "") + escT(t("fnLastShop")) + " " + escT(String(it.shop_last).slice(0, 10)) : "") + "</em>" : "")) + "</div></div>";
async function fnShop(pane) {
  const s = await fnGet("shop", { action: "shop" }); if (!pane.isConnected || pane.dataset.tab !== "shop") return;
  pane.innerHTML = '<div class="hub-sub fn-sec"><span>' + escT(t("fnShopH")) + "</span><small>" + (s.date ? escT(String(s.date).slice(0, 10)) + " \u00b7 " : "") + escT(fmtNum(s.total || 0)) + " " + escT(t("fnItems")) + "</small></div>" +
    (s.sections || []).map((sec) => '<div class="hub-sub fn-sec sm"><span>' + escT(sec.name) + "</span><small>" + sec.items.length + '</small></div><div class="fn-shop">' + sec.items.map((it) => fnItem(it, s)).join("") + "</div>").join("");
  pane.querySelectorAll(".fn-item").forEach((el, i) => el.style.setProperty("--i", Math.min(i, 24)));
}
async function fnNews(pane) {
  const n = await fnGet("news", { action: "news" }); if (!pane.isConnected || pane.dataset.tab !== "news") return;
  pane.innerHTML = '<div class="hub-sub fn-sec"><span>' + escT(t("fnNewsH")) + "</span><small>" + (n.date ? escT(String(n.date).slice(0, 10)) : "") + "</small></div>" +
    '<div class="fn-news">' + (n.items || []).map((x, i) => '<article class="fn-newsitem" style="--i:' + i + '">' + (x.image ? '<img src="' + encodeURI(x.image) + '" alt="" loading="lazy">' : "") + "<div><b>" + escT(x.title || "") + "</b><p>" + escT(x.body || "") + "</p></div></article>").join("") + "</div>";
  if (!(n.items || []).length) pane.innerHTML = emptyHtml(t("fnNoData"), "shrug");
}
async function fnMap(pane) {
  const m = await fnGet("map", { action: "map" }); if (!pane.isConnected || pane.dataset.tab !== "map") return;
  const pois = (m.pois || []).slice().sort((x, y) => String(x.name).localeCompare(String(y.name)));
  pane.innerHTML = '<div class="hub-sub fn-sec"><span>' + escT(t("fnMapH")) + "</span><small>" + pois.length + " " + escT(t("fnPois")) + "</small></div>" +
    (m.image ? '<div class="fn-map"><img src="' + encodeURI(m.image) + '" alt="Fortnite map"></div>' : "") +
    '<div class="fn-pois">' + pois.map((x, i) => '<span style="--i:' + Math.min(i, 30) + '">' + escT(x.name) + "</span>").join("") + "</div>";
}
function fnCos(pane) {
  const c = fnS.cos;
  pane.innerHTML = '<div class="hub-sub fn-sec"><span>' + escT(t("fnCosH")) + "</span><small>" + (c ? escT(fmtNum(c.total || 0)) + " " + escT(t("fnResults")) : escT(t("fnCosNote"))) + "</small></div>" +
    '<div class="fn-cosbar"><input id="fn-cos-q" class="text-input" maxlength="40" placeholder="' + escT(t("fnCosPh")) + '" value="' + escT(fnS.cosQ) + '" spellcheck="false"><button class="btn gold sm" id="fn-cos-go">' + escT(t("fnSearch")) + "</button></div>" +
    '<div id="fn-cos-list">' + (c ? (c.items && c.items.length ? '<div class="fn-shop">' + c.items.map((it) => fnItem(it, null)).join("") + "</div>" : emptyHtml(t("fnNoData"), "shrug")) : "") + "</div>";
  const go = async () => {
    const q = $("fn-cos-q").value.trim(); if (q.length < 2) { $("fn-cos-q").focus(); return; }
    fnS.cosQ = q; $("fn-cos-list").innerHTML = skelRows(2, "skel-row");
    try { const r = await window.egs.fnHub({ action: "cosmetics", query: q }); fnS.cos = r && r.ok ? r : { items: [], total: 0 }; } catch (e) { fnS.cos = { items: [], total: 0 }; }
    if (pane.isConnected && pane.dataset.tab === "cosmetics") fnCos(pane);
  };
  $("fn-cos-go").addEventListener("click", go);
  $("fn-cos-q").addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  pane.querySelectorAll(".fn-item").forEach((el, i) => el.style.setProperty("--i", Math.min(i, 24)));
}

/* ===== Zoeken (titelbalk): spelers op EGS + games in je bibliotheek, alles in de app ===== */
let qTimer = null;
/* snel paneel onder "speelt nu": tracking aan/uit, huidige game met cover, Discord, verversen, instellingen */
function renderQp() {
  const p = $("qp"); if (p.hidden) return;
  const paused = state && state.tracking_paused === true;
  $("qp-track").checked = !paused;
  $("qp-discord").checked = !(state && state.discord_rpc === false);
  const g = tbNowLast && tbNowLast.game;
  $("qp-game").classList.toggle("off", !g || paused);
  $("qp-art").style.backgroundImage = g && presArt ? 'url("' + presArt + '")' : "";
  $("qp-gname").textContent = paused ? t("qpPaused") : (g || t("qpIdle"));
  $("qp-gsub").textContent = paused ? "" : (g ? (tbNowSince ? tbElapsed() : "") + (tbNowLast.detail ? " \u00b7 " + tbNowLast.detail : "") : t("qpDetecting"));
}
$("tb-now").addEventListener("click", (e) => { e.stopPropagation(); const p = $("qp"); p.hidden = !p.hidden; $("tb-notif").hidden = true; $("tb-me-pop").hidden = true; $("tb-q-pop").hidden = true; renderQp(); });
document.addEventListener("click", (e) => { if (!e.target.closest("#qp") && !e.target.closest("#tb-now")) $("qp").hidden = true; });
$("qp-track").addEventListener("change", async (e) => { const paused = !e.target.checked; await window.egs.setSetting({ tracking_paused: paused }); state.tracking_paused = paused; if (paused) applyPresence({ game: null, art: null }); renderQp(); });
$("qp-discord").addEventListener("change", async (e) => { await window.egs.setSetting({ discord_rpc: e.target.checked }); state.discord_rpc = e.target.checked; const sd = $("set-discord"); if (sd) sd.checked = e.target.checked; });
$("qp-refresh").addEventListener("click", async () => { const b = $("qp-refresh"); b.classList.add("busy"); try { await window.egs.refreshNow(); await loadProfile(); await loadSessionTotals(); } catch (e2) {} b.classList.remove("busy"); renderQp(); });
$("qp-settings").addEventListener("click", () => { $("qp").hidden = true; show("view-settings"); });
$("tb-search").addEventListener("click", (e) => { e.stopPropagation(); const p = $("tb-q-pop"); p.hidden = !p.hidden; $("tb-notif").hidden = true; $("tb-me-pop").hidden = true; if (!p.hidden) { $("tb-q").focus(); tbQuery(); } });
document.addEventListener("click", (e) => { if (!e.target.closest("#tb-q-pop") && !e.target.closest("#tb-search")) $("tb-q-pop").hidden = true; });
$("tb-q").addEventListener("input", () => { clearTimeout(qTimer); qTimer = setTimeout(tbQuery, 250); });
$("tb-q").addEventListener("keydown", (e) => { if (e.key === "Escape") $("tb-q-pop").hidden = true; });
async function tbQuery() {
  const q = $("tb-q").value.trim().toLowerCase(), box = $("tb-q-res");
  const games = (libData || []).filter((g) => !g.software && q && String(g.name || "").toLowerCase().includes(q)).slice(0, 5);
  let people = [];
  if (q.length >= 2) { try { const r = await window.egs.social("social_search", { q }); people = (r && r.results) || []; } catch (e) {} }
  if (!q) { box.innerHTML = '<div class="tb-notif-empty">' + t("profSearchPh") + "</div>"; return; }
  box.innerHTML =
    (people.length ? '<div class="tbq-h">' + (lang === "nl" ? "Spelers" : "Players") + "</div>" + people.slice(0, 5).map((p, i) => '<button class="tb-notif-i tbq-row" data-p="' + i + '"><img src="' + (p.avatar ? encodeURI(p.avatar) : "../../assets/icon.png") + '" alt=""><span>' + escT(p.name || "?") + "</span><small>/p/" + escT(p.slug || "") + "</small></button>").join("") : "") +
    (games.length ? '<div class="tbq-h">' + (lang === "nl" ? "Jouw games" : "Your games") + "</div>" + games.map((g, i) => '<button class="tb-notif-i tbq-row" data-g="' + i + '">' + (g.cover ? '<img src="' + encodeURI(fixUrl(g.cover)) + '" alt="">' : "<i></i>") + "<span>" + escT(g.name) + "</span><small>" + escT(g.platform) + "</small></button>").join("") : "") +
    (!people.length && !games.length ? '<div class="tb-notif-empty">\u2013</div>' : "");
  box.querySelectorAll("[data-p]").forEach((el) => el.addEventListener("click", () => { $("tb-q-pop").hidden = true; openProfileFromSlug(people[+el.dataset.p].slug); }));
  box.querySelectorAll("[data-g]").forEach((el) => el.addEventListener("click", () => { $("tb-q-pop").hidden = true; openGameSheet(games[+el.dataset.g]); }));
}
/* ===== Profielmenu (avatar rechtsboven) ===== */
$("tb-me").addEventListener("click", (e) => { e.stopPropagation(); const p = $("tb-me-pop"); p.hidden = !p.hidden; $("tb-notif").hidden = true;
  $("tbm-name").textContent = (profileData && profileData.name) || state.display_name || "EGS"; $("tbm-slug").textContent = state.slug ? "everygamestat.com/p/" + state.slug : "";
  $("tbm-av").src = (profileData && profileData.avatar) || "../../assets/icon.png";
  $("tbm-profile").textContent = t("menuProfile"); $("tbm-card").textContent = t("menuCard"); $("tbm-settings").textContent = t("menuSettings"); });
document.addEventListener("click", (e) => { if (!e.target.closest("#tb-me-pop") && !e.target.closest("#tb-me")) $("tb-me-pop").hidden = true; });
$("tbm-profile").addEventListener("click", () => { $("tb-me-pop").hidden = true; openProfile(state.slug, true); });
$("tbm-card").addEventListener("click", () => { $("tb-me-pop").hidden = true; window.egs.openExternal("https://everygamestat.com/" + (state.slug ? "p/" + state.slug : "me")); });
$("tbm-settings").addEventListener("click", () => { $("tb-me-pop").hidden = true; show("view-settings"); });

/* ===== Profielpagina: jezelf of een andere speler (publieke kaart, zelfde RPC als de site) ===== */
let profSlug = null;
async function openProfile(slug, isMe) {
  show("view-profile"); profSlug = slug || null;
  $("prof-name").textContent = isMe ? ((profileData && profileData.name) || state.display_name || "") : "\u2026";
  $("prof-sub").textContent = slug ? "/p/" + slug : "";
  ["prof-stats", "prof-top", "prof-plat", "prof-actions", "prof-flex", "prof-act-chart", "prof-act-games"].forEach((id) => { const el = $(id); if (el) el.innerHTML = ""; });
  $("prof-note").textContent = ""; $("prof-live").hidden = true;
  const actPanel = $("prof-act-panel"); if (actPanel) actPanel.hidden = true;
  $("prof-banner").style.backgroundImage = ""; $("prof-banner").classList.remove("art");
  $("prof-top-h").textContent = t("profTop"); $("prof-plat-h").textContent = t("profPlat");
  let d = slug ? await window.egs.publicProfile(slug) : null;
  /* geen publieke kaart maar wel jezelf: toon je eigen cijfers uit de Companion-koppeling */
  if (!d && isMe) {
    if (!profileData) await loadProfile();
    const p = profileData;
    if (p && p.totals) d = {
      own: true, name: p.name, avatar: p.avatar, since: p.since,
      games: p.totals.games, hours: Math.round((p.totals.minutes || 0) / 60),
      ach_earned: p.totals.ach_earned, ach_total: p.totals.ach_total,
      platforms_detail: (p.platforms || []).map((x) => ({ platform: x.platform, hours: Math.round((x.minutes || 0) / 60) })),
      top_games: (p.top_games || []).map((g) => ({ name: g.name, platform: g.platform, playtime_minutes: g.minutes, cover_url: g.cover, achievements_earned: g.ach_e, achievements_total: g.ach_t }))
    };
  }
  if (!d) { $("prof-note").textContent = isMe ? t("profPrivate") : t("profNotFound"); return; }
  if (d.own) $("prof-note").textContent = t("profPrivate");
  $("prof-name").textContent = d.name || slug || ""; $("prof-av").src = d.avatar || "../../assets/icon.png";
  const bits = [];
  if (slug && !d.own) bits.push("/p/" + slug);
  if (d.member_no) bits.push(t("profMember")(d.member_no));
  if (d.since) { const ds = new Date(d.since).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { month: "long", year: "numeric" }); bits.push(d.member_no ? (lang === "nl" ? "sinds " : "since ") + ds : t("profSince")(ds)); }
  $("prof-sub").textContent = bits.join(" \u00b7 ");
  /* banner = de art van de meest gespeelde game, geen generieke gradient */
  const bArt = d.top_games && d.top_games[0] && (d.top_games[0].cover_url || d.top_games[0].icon_url);
  if (bArt) { $("prof-banner").style.backgroundImage = 'url("' + encodeURI(fixUrl(bArt)) + '")'; $("prof-banner").classList.add("art"); }
  const tile = (v, l, s) => '<div class="prof-tile"><b>' + v + "</b><span>" + l + "</span>" + (s ? "<small>" + s + "</small>" : "") + "</div>";
  const achE = d.ach_earned, achT = d.ach_total;
  const achV = achE != null ? fmtNum(achE) : (d.ach_pct != null ? d.ach_pct + "%" : "\u2013");
  const achPct = achT ? Math.round(((achE || 0) / achT) * 100) : (d.ach_pct != null ? d.ach_pct : null);
  const achSub = achE != null && achT ? escT(t("profOf")(fmtNum(achT))) + (achPct != null ? " \u00b7 " + achPct + "%" : "") : null;
  $("prof-stats").innerHTML = tile(fmtNum(d.games || 0), t("profGames")) + tile(fmtNum(d.hours || 0), t("profHours")) + tile(achV, t("profAch"), achSub) + tile((d.platforms_detail || d.platforms || []).length, t("profPlats"));
  $("prof-stats").querySelectorAll(".prof-tile").forEach((el, i) => el.style.setProperty("--i", i));
  /* game-hoogtepunten: de cijfers van de publieke kaart, rechtstreeks uit de API's */
  const flex = (d.flex && typeof d.flex === "object" ? Object.values(d.flex).filter((f) => f && f.value != null && f.label) : [])
    .sort((x, y) => (Number(y.value) > 0 ? 1 : 0) - (Number(x.value) > 0 ? 1 : 0)); /* nullen achteraan, gedimd */
  $("prof-flex").innerHTML = flex.length ? '<div class="lib-sec">' + escT(t("profFlex")) + '</div><div class="pf-grid">' +
    flex.map((f, i) => '<div class="pf' + (Number(f.value) > 0 ? "" : " zero") + '" style="--i:' + i + '"><b>' + escT(fmtStat(f.value)) + escT(f.unit || "") + "</b><span>" + escT(f.label) + "</span>" + (f.sub ? "<small>" + escT(f.sub) + "</small>" : "") + "</div>").join("") + "</div>" : "";
  $("prof-top").innerHTML = (d.top_games || []).map((g, i) => {
    const aE = g.achievements_earned, aT = g.achievements_total;
    return '<div class="tg"><span class="tg-n">' + (i + 1) + "</span>" +
      (g.icon_url || g.cover_url ? '<img src="' + encodeURI(fixUrl(g.icon_url || g.cover_url)) + '" alt="">' : "") +
      '<div class="tg-t"><b>' + escT(g.name) + "</b><span>" + escT(g.platform) + (aT ? " \u00b7 " + fmtNum(aE || 0) + "/" + fmtNum(aT) + " ach" : "") + "</span>" +
      (aT ? '<i class="tg-bar"><i style="width:' + Math.min(100, Math.round(((aE || 0) / aT) * 100)) + '%"></i></i>' : "") +
      '</div><span class="tg-h">' + fmtHours(g.playtime_minutes) + " " + t("stHours") + "</span></div>";
  }).join("") || '<p class="muted">\u2013</p>';
  $("prof-plat").innerHTML = (d.platforms_detail || []).map((p) => '<span class="chip"><b>' + escT(p.platform) + "</b> \u00b7 " + ((p.hours || 0) > 0 ? fmtNum(p.hours) + " " + t("stHours") : t("profLinked")) + "</span>").join("");
  if (d.activity && d.activity.length) { const av = d.activity[0]; $("prof-live").hidden = false; $("prof-live").textContent = "\u25cf " + escT(av.game) + " \u00b7 " + av.matches + " " + (lang === "nl" ? "potten vandaag" : "matches today"); }
  $("prof-actions").innerHTML = isMe ? '<span class="muted">' + t("profOwn") + "</span>" : '<button class="btn gold sm" id="prof-add">' + t("profAddFriend") + "</button>";
  const add = $("prof-add"); if (add) add.addEventListener("click", async () => { await window.egs.social("friend_request", { target: slug }); add.textContent = "\u2713"; add.disabled = true; });
  /* eigen profiel: activiteit die de Companion op deze pc heeft vastgelegd (dagen + per game) */
  if (isMe && actPanel) {
    try {
      const r = await window.egs.sessionsSummary();
      if (r && r.ok && ((r.days || []).length || (r.games || []).length)) {
        actPanel.hidden = false;
        $("prof-act-h").textContent = t("profAct");
        $("prof-act-note").textContent = t("profActNote");
        const map = {}; (r.days || []).forEach((x) => { map[x.day] = x.minutes || 0; });
        const days = [];
        for (let i = 13; i >= 0; i--) { const dt = new Date(Date.now() - i * 86400000); const k = dt.toISOString().slice(0, 10); days.push({ m: map[k] || 0, d: dt }); }
        const max = Math.max(60, ...days.map((x) => x.m));
        $("prof-act-chart").innerHTML = days.map((x, i) => { const f = fmtPlay(x.m); return '<div class="ab" style="--i:' + i + '"><em>' + (x.m ? f.v + " " + f.u : "") + '</em><i class="' + (x.m ? "on" : "") + '" style="height:' + Math.max(2, Math.round((x.m / max) * 100)) + '%"></i><span>' + x.d.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric" }) + "</span></div>"; }).join("");
        $("prof-act-games").innerHTML = (r.games || []).slice().sort((x, y) => y.minutes - x.minutes).slice(0, 8).map((g, i) => { const f = fmtPlay(g.minutes); return '<div class="ag" style="--i:' + i + '"><b>' + escT(g.game) + "</b><span>" + escT(t("profSessions")(g.sessions)) + "</span><em>" + f.v + " " + f.u + "</em></div>"; }).join("");
      }
    } catch (e) { /* geen paneel */ }
  }
}
window.openProfileFromSlug = (slug) => openProfile(slug, slug && state.slug === slug);

/* ===== Titelbalk: "nu bezig" links (Medal-stijl) ===== */
let tbNowSince = null, tbNowTimer = null, tbNowLast = null;
function tbNow(d) {
  const g = d && d.game;
  if (g && !tbNowSince) tbNowSince = Date.now(); if (!g) tbNowSince = null;
  tbNowLast = d;
  $("tb-now-lbl").textContent = g ? t("tbNow") + (tbNowSince ? " \u00b7 " + tbElapsed() : "") : t("tbIdle");
  const sess = (g && sessTotals && sessTotals.n) ? " \u00b7 " + sessTotals.w + "W/" + sessTotals.l + "L" : "";
  $("tb-now-game").textContent = g ? g + (d.state === "in_match" ? " \u00b7 " + (d.detail || t("tbInMatch")) : "") + sess : "";
  $("tb-now").classList.toggle("on", !!g);
  clearInterval(tbNowTimer); if (g) tbNowTimer = setInterval(() => { tbNow(tbNowLast); const sub = $("np-sub"); if (sub && tbNowSince) sub.textContent = t("npSince")(Math.max(1, Math.floor((Date.now() - tbNowSince) / 60000))); }, 30000);
}
function tbElapsed() { const m = Math.floor((Date.now() - tbNowSince) / 60000); return m < 60 ? m + " min" : Math.floor(m / 60) + "u " + (m % 60) + "m"; }
let sessTotals = null;
tbNow(null);
try { $("tb-q").placeholder = t("profSearchPh"); } catch (e) {}
setTimeout(() => { try { if (state && state.linked && !libData) loadLibrary(); } catch (e) {} }, 4000);
/* ===== Titelbalk + afsluiten (hersteld; was in 0.2.2 per ongeluk mee verwijderd) ===== */
document.querySelectorAll("#titlebar [data-win]").forEach((b) => b.addEventListener("click", () => window.egs.win(b.dataset.win)));
$("btn-quit").addEventListener("click", () => window.egs.win("quit"));
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
  if (!m) { body.querySelector("p.muted:last-child").textContent = r && r.error === "key_missing" ? t("gsNoKey") : t("gsNotFound"); const c = body.querySelector(".gs-cover.ph"); if (c && g.cover) { const im = document.createElement("img"); im.className = "gs-cover"; im.src = fixUrl(g.cover); c.replaceWith(im); } if (appid) loadSteamBlock(body, appid); return; }
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
        (appid || m.steam_appid ? '<button class="btn" data-url="steam://store/' + (appid || m.steam_appid) + '">' + t("gsOpenClient") + "</button>" : "") +
        (!owned && m.steam_appid ? '<button class="btn" data-url="https://store.steampowered.com/app/' + m.steam_appid + '">' + t("gsWishlist") + "</button>" : "") +
      "</div></div></div>" +
    (m.summary ? '<p class="gs-summary">' + escT(m.summary) + "</p>" : "") +
    (m.videos && m.videos.length ? '<div class="gs-sec">' + t("gsTrailer") + '</div><div class="gs-videos">' + m.videos.slice(0, 3).map((v) => '<div class="gs-video" data-yt="' + v.id + '"><img src="' + ytThumb(v.id) + '" alt=""><span class="gs-play">\u25b6</span></div>').join("") + "</div>" : "") +
    (m.screenshots && m.screenshots.length ? '<div class="gs-sec">' + t("gsScreens") + '</div><div class="gs-shots">' + m.screenshots.map((s) => '<img src="' + s + '" loading="lazy" alt="" data-shot="' + s + '">').join("") + "</div>" : "") +
    (links.length ? '<div class="gs-sec">' + t("gsFollow") + '</div><div class="gs-links">' + links.map(([k, l]) => '<button class="btn small" data-url="' + m.links[k] + '">' + l + "</button>").join("") + "</div>" : "") +
    '<p class="gs-igdb">Powered by <b>IGDB.com</b></p>';
  body.querySelectorAll("[data-url]").forEach((el) => el.addEventListener("click", () => window.egs.openExternal(el.dataset.url)));
  const shots = (m.screenshots || []).map((s) => s.replace("t_screenshot_big", "t_1080p"));
  body.querySelectorAll("[data-shot]").forEach((el, i) => el.addEventListener("click", () => lbOpen(shots, i)));
  body.querySelectorAll("[data-yt]").forEach((el) => el.addEventListener("click", () => window.egs.openVideo(el.dataset.yt)));
  if (appid) loadSteamBlock(body, appid);
}
/* ===== Steam per-game stats + achievements — zelfde bron en indeling als de gamepagina op de site ===== */
const CURATED_STATS = {
  "252490": { /* Rust */
    sections: [
      { title: ["PVP", "PVP"], match: /^(kill_player|deaths|headshot|bullet_fired|bullet_hit_player|arrow_fired|arrow_hit_player|rocket_fired|shotgun_fired|wounded|melee)/,
        labels: { kill_player: ["Players killed", "Spelers gedood"], deaths: ["Deaths", "Keer gestorven"], headshot: ["Headshots", "Headshots"], bullet_fired: ["Bullets fired", "Kogels afgevuurd"], bullet_hit_player: ["Bullets hit players", "Kogels raak op spelers"], arrow_fired: ["Arrows fired", "Pijlen afgeschoten"], arrow_hit_player: ["Arrows hit players", "Pijlen raak op spelers"], rocket_fired: ["Rockets fired", "Raketten afgevuurd"], wounded: ["Times wounded", "Keer gewond geraakt"] } },
      { title: ["Hunting", "Jacht"], match: /^kill_(bear|boar|chicken|horse|stag|wolf|scientist)$/,
        labels: { kill_bear: ["Bears killed", "Beren gedood"], kill_boar: ["Boars killed", "Zwijnen gedood"], kill_chicken: ["Chickens killed", "Kippen gedood"], kill_horse: ["Horses killed", "Paarden gedood"], kill_stag: ["Stags killed", "Herten gedood"], kill_wolf: ["Wolves killed", "Wolven gedood"], kill_scientist: ["Scientists killed", "Scientists gedood"] } },
      { title: ["Gathering", "Verzamelen"], match: /^(harvested?[_.]|acquired[_.])/,
        labels: { harvested_wood: ["Wood harvested", "Hout gehakt"], harvested_stones: ["Stone harvested", "Steen gehakt"], harvested_cloth: ["Cloth collected", "Stof geplukt"], harvested_leather: ["Leather collected", "Leer verzameld"], "acquired_metal.ore": ["Metal ore acquired", "Metaalerts verzameld"], acquired_scrap: ["Scrap acquired", "Scrap verzameld"], acquired_lowgradefuel: ["Low grade fuel", "Low grade fuel"] } }
    ],
    derived: (m) => { const out = []; const kp = m.get("kill_player"), de = m.get("deaths"); if (kp != null && de > 0) out.push({ v: (kp / de).toFixed(2), t: ["K/D ratio", "K/D-ratio"] }); const bf = m.get("bullet_fired"), bh = m.get("bullet_hit_player"); if (bf > 0 && bh != null) out.push({ v: Math.round(100 * bh / bf) + "%", t: ["Bullet accuracy", "Raakpercentage"] }); const hs = m.get("headshot"); if (hs != null && bh > 0) out.push({ v: Math.round(100 * hs / bh) + "%", t: ["Headshot rate", "Headshot-percentage"] }); return out; }
  },
  "730": { /* Counter-Strike 2 */
    sections: [
      { title: ["Overall", "Totaal"], match: /^total_(kills|deaths|time_played|rounds_played|wins|mvps|damage_done|money_earned|kills_headshot|shots_fired|shots_hit|planted_bombs|defused_bombs|kills_knife|kills_enemy_weapon|kills_enemy_blinded|dominations|revenges|contribution_score)$/,
        labels: { total_kills: ["Kills", "Kills"], total_deaths: ["Deaths", "Deaths"], total_time_played: ["Seconds played", "Seconden gespeeld"], total_rounds_played: ["Rounds played", "Rondes gespeeld"], total_wins: ["Rounds won", "Rondes gewonnen"], total_mvps: ["MVPs", "MVP's"], total_damage_done: ["Damage done", "Schade toegebracht"], total_money_earned: ["Money earned", "Geld verdiend"], total_kills_headshot: ["Headshot kills", "Headshot-kills"], total_shots_fired: ["Shots fired", "Schoten"], total_shots_hit: ["Shots hit", "Schoten raak"], total_planted_bombs: ["Bombs planted", "Bommen geplant"], total_defused_bombs: ["Bombs defused", "Bommen ontmanteld"], total_kills_knife: ["Knife kills", "Mes-kills"], total_kills_enemy_blinded: ["Kills on blinded enemies", "Kills op verblinde vijanden"], total_dominations: ["Dominations", "Dominations"], total_revenges: ["Revenges", "Wraakacties"], total_contribution_score: ["Contribution score", "Score"] } },
      { title: ["Per weapon", "Per wapen"], match: /^total_kills_(ak47|m4a1|awp|deagle|glock|usp|p250|famas|galilar|aug|sg556|scar20|g3sg1|ssg08|mp7|mp9|ump45|p90|bizon|mac10|nova|xm1014|mag7|sawedoff|negev|m249|fiveseven|tec9|elite|hkp2000|p90|taser|hegrenade|molotov|knife|cz75|mp5sd|revolver)$/, labels: {} },
      { title: ["Maps", "Maps"], match: /^total_(wins|rounds)_map_/, labels: {} }
    ],
    derived: (m) => { const out = []; const k = m.get("total_kills"), d = m.get("total_deaths"); if (k != null && d > 0) out.push({ v: (k / d).toFixed(2), t: ["K/D ratio", "K/D-ratio"] }); const sf = m.get("total_shots_fired"), sh = m.get("total_shots_hit"); if (sf > 0 && sh != null) out.push({ v: Math.round(100 * sh / sf) + "%", t: ["Accuracy", "Raakpercentage"] }); const hs = m.get("total_kills_headshot"); if (hs != null && k > 0) out.push({ v: Math.round(100 * hs / k) + "%", t: ["Headshot rate", "Headshot-percentage"] }); const w = m.get("total_wins"), r = m.get("total_rounds_played"); if (w != null && r > 0) out.push({ v: Math.round(100 * w / r) + "%", t: ["Round win rate", "Ronde-winrate"] }); const tp = m.get("total_time_played"); if (tp > 0) out.push({ v: fmtNum(Math.round(tp / 3600)) + " h", t: ["Time played", "Speeltijd"] }); return out; }
  }
};
const LL = (pair) => pair[lang === "nl" ? 1 : 0];
function prettyStat(sname, sid) {
  let src = sname || String(sid);
  const looksInternal = !/\s/.test(src) && (/_/.test(src) || /^[A-Z]{1,4}Stats?[A-Z0-9]/.test(src) || /^(DBD|ACH|STATS?|TOTAL|GLOBAL)[_.]/i.test(src));
  if (sname && !looksInternal) return sname;
  let x = String(src).replace(/_(disp|display|float|int|stat|value|val)$/i, "").replace(/^[A-Z]{1,4}Stats?(?=[A-Z0-9])/, "").replace(/^(DBD|STAT|STATS|TOTAL|GLOBAL|ACH)[_.]/i, "")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Za-z])(\d)/g, "$1 $2").replace(/(\d)([A-Za-z])/g, "$1 $2").replace(/[._]+/g, " ").replace(/\bPct\b/gi, "%").replace(/\s+/g, " ").trim();
  x = x.split(" ").map((w) => /^[A-Z]{2,4}$/.test(w) ? w : (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join(" ");
  return x || String(sid);
}
const fmtStatVal = (v) => Number.isInteger(v) ? fmtNum(v) : (Math.round(v * 10) / 10).toLocaleString(lang === "nl" ? "nl-NL" : "en-US");
function statTiles(rows, labelFor) {
  return '<div class="gs-stats">' + rows.map((s) => '<div class="gs-stat"><b>' + escT(fmtStatVal(s.value)) + "</b><span>" + escT(labelFor(s)) + "</span></div>").join("") + "</div>";
}
async function loadSteamBlock(body, appid) {
  const host = document.createElement("div"); host.className = "gs-steam"; host.innerHTML = '<div class="gs-sec">' + t("gsStats") + '</div><div class="skel skel-row"></div><div class="skel skel-row"></div>';
  const igdb = body.querySelector(".gs-igdb"); if (igdb) body.insertBefore(host, igdb); else body.appendChild(host);
  let r = null; try { r = await window.egs.social("steam_game", { appid, lang }); } catch (e) {}
  if (!body.isConnected) return;
  if (!r || !r.ok) { host.innerHTML = ""; return; }
  const stats = (r.stats || []).filter((s) => typeof s.value === "number" && s.value !== 0);
  let html = "";
  if (stats.length) {
    const cfg = CURATED_STATS[appid];
    html += '<div class="gs-sec">' + t("gsStats") + " <em>" + stats.length + "</em></div>";
    if (cfg) {
      const m = new Map(stats.map((s) => [String(s.id), s.value])); const used = new Set();
      const derived = cfg.derived ? cfg.derived(m) : [];
      if (derived.length) html += '<div class="gs-sub">' + t("gsRatios") + '</div><div class="gs-stats hero">' + derived.map((d) => '<div class="gs-stat gold"><b>' + escT(String(d.v)) + "</b><span>" + escT(LL(d.t)) + "</span></div>").join("") + "</div>";
      for (const sec of cfg.sections) {
        const rows = stats.filter((s) => sec.match.test(String(s.id))); if (!rows.length) continue;
        rows.forEach((s) => used.add(String(s.id))); rows.sort((a, b) => b.value - a.value);
        html += '<div class="gs-sub">' + escT(LL(sec.title)) + " <em>" + rows.length + "</em></div>" + statTiles(rows, (s) => { const l = sec.labels[String(s.id)]; return l ? LL(l) : prettyStat(s.name, s.id); });
      }
      const rest = stats.filter((s) => !used.has(String(s.id))).sort((a, b) => b.value - a.value);
      if (rest.length) html += '<div class="gs-sub">' + t("gsOther") + " <em>" + rest.length + "</em></div>" + statTiles(rest.slice(0, 60), (s) => prettyStat(s.name, s.id));
    } else {
      html += statTiles(stats.slice().sort((a, b) => b.value - a.value).slice(0, 60), (s) => prettyStat(s.name, s.id));
    }
  }
  const ach = r.achievements || [];
  if (ach.length) {
    const earned = ach.filter((a) => a.achieved).sort((a, b) => (a.global_pct ?? 100) - (b.global_pct ?? 100));
    const locked = ach.filter((a) => !a.achieved && !a.hidden).sort((a, b) => (b.global_pct ?? 0) - (a.global_pct ?? 0));
    html += '<div class="gs-sec">' + t("gsAch") + " <em>" + r.earned + "/" + r.total + "</em></div>";
    if (r.private) html += '<p class="muted">' + escT(t("gsAchPrivate")) + "</p>";
    html += '<div class="gs-ach">' + [...earned, ...locked].slice(0, 48).map((a) =>
      '<div class="gs-a' + (a.achieved ? "" : " locked") + '" title="' + escT(a.desc || "") + '">' + (a.icon ? '<img src="' + encodeURI(a.achieved ? a.icon : (a.icon_locked || a.icon)) + '" alt="" loading="lazy">' : "") +
      '<div class="gs-a-t"><b>' + escT(a.name) + "</b><small>" + (a.global_pct != null ? a.global_pct.toFixed(1) + "% " + escT(t("gsRare")) : escT(a.achieved ? "" : t("gsLocked"))) + "</small></div></div>").join("") + "</div>";
  } else if (!stats.length) html += '<div class="gs-sec">' + t("gsStats") + '</div><p class="muted">' + escT(t("gsNoStats")) + "</p>";
  host.innerHTML = html;
}
/* ===== detail per pot/gevecht ===== */
function openMatchSheet(html) { $("match-sheet").hidden = false; $("msheet-body").innerHTML = html; }
function closeMatchSheet() { $("match-sheet").hidden = true; $("msheet-body").innerHTML = ""; }
$("msheet-close").addEventListener("click", closeMatchSheet);
$("msheet-scrim").addEventListener("click", closeMatchSheet);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("match-sheet").hidden) closeMatchSheet(); });

let crBattles = null;
async function fetchCrBattles(force) {
  if (crBattles && !force) return crBattles;
  try { const r = await window.egs.crBattles(); if (r && r.ok) crBattles = r.battles || []; } catch (e) {}
  return crBattles;
}
const crCardHtml = (c, cls) => '<div class="md-card' + (c.ev ? " evo" : "") + (cls ? " " + cls : "") + '">' + (c.i ? '<img src="' + encodeURI(c.i) + '" alt="" loading="lazy">' : "") +
  (c.e != null ? '<span class="cr-elx">' + escT(String(c.e)) + "</span>" : "") +
  '<b>' + escT(c.n) + "</b>" + (c.lvl != null ? "<small>" + escT(t("crLevel")) + " " + c.lvl + "</small>" : "") + "</div>";
async function openCrBattle(b0) {
  openMatchSheet('<p class="muted">' + escT(t("mdLoading")) + "</p>");
  const list = await fetchCrBattles(false);
  const key = (x) => String(x && x.t || "").slice(0, 16);
  const b = (list || []).find((x) => key(x) === key(b0) && String(x.opp || "") === String(b0.opp || "")) || null;
  if (!b || !b.deck.length) { openMatchSheet('<p class="muted">' + escT(t("mdNoDetail")) + "</p>"); return; }
  const avg = (arr, k) => arr.length ? Math.round((arr.reduce((a, c) => a + (Number(c[k]) || 0), 0) / arr.length) * 10) / 10 : null;
  const myLvl = avg(b.deck, "lvl"), opLvl = avg(b.opp_deck, "lvl");
  const myEl = avg(b.deck, "e"), opEl = avg(b.opp_deck, "e");
  const weak = b.deck.filter((c) => c.lvl != null).sort((a, c) => a.lvl - c.lvl)[0] || null;
  const gap = weak && opLvl != null ? Math.round((opLvl - weak.lvl) * 10) / 10 : null;
  const shared = b.deck.filter((c) => b.opp_deck.some((o) => o.n === c.n));
  const dt = b.t ? new Date(b.t) : null;
  const tro = Number(b.trophy);
  const head = '<div class="md-head ' + (b.res === "W" ? "win" : b.res === "L" ? "loss" : "") + '">' +
    '<span class="md-res">' + (b.res === "W" ? "WIN" : b.res === "L" ? "LOSS" : "DRAW") + "</span>" +
    '<div class="md-score"><b>' + escT(String(b.crowns)) + "</b><i>\u2013</i><b>" + escT(String(b.opp_crowns)) + "</b></div>" +
    '<div class="md-meta"><b>' + escT(b.opp || "?") + (b.opp_tag ? ' <small>' + escT(b.opp_tag) + "</small>" : "") + "</b>" +
    "<small>" + escT(b.mode || t("crLadder")) + (b.arena ? " \u00b7 " + escT(b.arena) : "") + (dt ? " \u00b7 " + escT(dt.toLocaleString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })) : "") + "</small></div>" +
    (Number.isFinite(tro) && tro !== 0 ? '<span class="md-tro ' + (tro > 0 ? "up" : "down") + '">' + (tro > 0 ? "+" : "") + escT(String(tro)) + "</span>" : "") + "</div>";
  const compare = '<div class="md-cmp">' +
    '<div><b>' + (myLvl != null ? myLvl : "\u2013") + "</b><span>" + escT(t("mdYou") + " \u00b7 " + t("mdAvgLvl")) + "</span></div>" +
    '<div><b>' + (opLvl != null ? opLvl : "\u2013") + "</b><span>" + escT(t("mdOpp") + " \u00b7 " + t("mdAvgLvl")) + "</span></div>" +
    '<div><b>' + (myEl != null ? myEl : "\u2013") + "</b><span>" + escT(t("mdYou") + " \u00b7 " + t("mdElixir")) + "</span></div>" +
    '<div><b>' + (opEl != null ? opEl : "\u2013") + "</b><span>" + escT(t("mdOpp") + " \u00b7 " + t("mdElixir")) + "</span></div>" +
    (b.my_tr != null ? '<div><b>' + fmtNum(b.my_tr) + "</b><span>" + escT(t("mdStartTr")) + "</span></div>" : "") + "</div>";
  const weakHtml = weak ? '<div class="md-weak"><div class="md-weak-t"><span class="eyebrow">' + escT(t("mdWeak")) + "</span><b>" + escT(t("mdWeakP")(weak.n, weak.lvl)) + "</b>" +
    "<small>" + escT(gap != null && gap > 0 ? t("mdWeakVs")(gap) : t("mdEven")) + "</small></div>" + crCardHtml(weak, "big") + "</div>" : "";
  const decks = '<div class="md-sec">' + escT(t("mdYou")) + (b.my_tower ? ' <small>' + escT(t("mdTower")) + ": " + escT(b.my_tower) + "</small>" : "") + "</div>" +
    '<div class="md-deck">' + b.deck.map((c) => crCardHtml(c, weak && c.n === weak.n ? "weak" : "")).join("") + "</div>" +
    '<div class="md-sec">' + escT(t("mdOpp")) + (b.opp_tower ? ' <small>' + escT(t("mdTower")) + ": " + escT(b.opp_tower) + "</small>" : "") + "</div>" +
    '<div class="md-deck">' + b.opp_deck.map((c) => crCardHtml(c, shared.some((x) => x.n === c.n) ? "shared" : "")).join("") + "</div>" +
    (shared.length ? '<div class="md-note">' + escT(t("mdShared")) + ": " + escT(shared.map((c) => c.n).join(", ")) + "</div>" : "");
  openMatchSheet(head + compare + weakHtml + decks);
}
function openRlMatch(m, rs) {
  const g = Number(m.goals) || 0, a = Number(m.assists) || 0, sv = Number(m.saves) || 0, sh = Number(m.shots) || 0;
  const per = (tot) => rs && rs.n ? tot / rs.n : null;
  const cmp = (val, avgv) => { if (avgv == null) return ""; const d = Math.round((val - avgv) * 10) / 10; const w = d > 0 ? t("mdAbove") : d < 0 ? t("mdBelow") : t("mdSame"); return '<small class="' + (d > 0 ? "up" : d < 0 ? "down" : "") + '">' + (d !== 0 ? (d > 0 ? "+" : "") + d + " " : "") + escT(w) + " " + escT(t("mdPerMatchAvg")) + "</small>"; };
  const dt = m.played_at ? new Date(m.played_at) : null;
  const res = m.result || "unknown";
  const head = '<div class="md-head ' + (res === "win" ? "win" : res === "loss" ? "loss" : "") + '">' +
    '<span class="md-res">' + escT(res.toUpperCase()) + "</span>" +
    '<div class="md-score"><b>' + g + "</b><i>G</i></div>" +
    '<div class="md-meta"><b>Rocket League' + (m.playlist ? " \u00b7 " + escT(m.playlist) : "") + "</b><small>" + (dt ? escT(dt.toLocaleString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })) : "") + "</small></div>" +
    (m.score != null ? '<span class="md-tro">' + fmtNum(m.score) + "</span>" : "") + "</div>";
  const acc = sh > 0 ? Math.round((g / sh) * 100) : null;
  const rows = [[g, t("rlGoals"), per(rs && rs.g)], [a, t("rlAssists"), per(rs && rs.a)], [sv, t("rlSaves"), per(rs && rs.s)], [sh, t("rlShots"), per(rs && rs.sh)]];
  const grid = '<div class="md-sec">' + escT(t("mdVsAvg")) + "</div><div class=\"md-rows\">" +
    rows.map(([v, lb, avgv]) => '<div class="md-row"><b>' + v + "</b><span>" + escT(lb) + "</span>" + cmp(v, avgv != null ? Math.round(avgv * 10) / 10 : null) + "</div>").join("") +
    (acc != null ? '<div class="md-row"><b>' + acc + '%</b><span>' + escT(t("rlAcc")) + "</span></div>" : "") + "</div>";
  const how = '<div class="md-sec">' + escT(t("mdHow")) + '</div><div class="md-note">' + escT(t("mdRlHow")) + "</div>";
  openMatchSheet(head + grid + how);
}
function closeGameSheet() { $("game-sheet").hidden = true; $("gsheet-body").innerHTML = ""; }
$("gsheet-close").addEventListener("click", closeGameSheet);
$("gsheet-scrim").addEventListener("click", closeGameSheet);
/* ===== Lightbox met slider ===== */
let lbItems = [], lbIdx = 0;
function lbOpen(items, i) { lbItems = items; lbIdx = i || 0; $("lightbox").hidden = false; lbRender(); }
function lbClose() { $("lightbox").hidden = true; $("lightbox-img").src = ""; }
function lbStep(d) { if (lbItems.length < 2) return; lbIdx = (lbIdx + d + lbItems.length) % lbItems.length; lbRender(); }
function lbRender() { $("lightbox-img").src = lbItems[lbIdx]; $("lb-count").textContent = lbItems.length > 1 ? (lbIdx + 1) + " / " + lbItems.length : ""; }
$("lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox" || e.target.id === "lightbox-img") lbClose(); });
$("lb-x").addEventListener("click", lbClose);
$("lb-prev").addEventListener("click", (e) => { e.stopPropagation(); lbStep(-1); });
$("lb-next").addEventListener("click", (e) => { e.stopPropagation(); lbStep(1); });
document.addEventListener("keydown", (e) => { if ($("lightbox").hidden) return; if (e.key === "ArrowLeft") lbStep(-1); if (e.key === "ArrowRight") lbStep(1); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!$("lightbox").hidden) { $("lightbox").hidden = true; } else if (!$("game-sheet").hidden) closeGameSheet(); } });
$("lib-search").addEventListener("input", () => renderLibrary());
$("lib-sort").addEventListener("change", () => renderLibrary());
$("lib-apps").addEventListener("change", () => renderLibrary());

/* ===== LEADERBOARD ===== */
let boardData = null, boardMetric = "hours";
async function loadBoard() {
  if (!boardData) {
    $("board-podium").innerHTML = skelRows(3, "skel-pod");
    $("board-rows").innerHTML = skelRows(8);
    /* v0.9.0: alles voor de Community-tab in \u00e9\u00e9n call; oudere server valt terug op alleen het klassement */
    let r = null;
    try { r = await window.egs.social("community"); } catch (e) { r = null; }
    if (r && r.ok) boardData = { rows: r.board || [], me_slug: r.me_slug || null, playing: r.playing || [], rl: r.rl || null };
    else {
      const lb = await window.egs.social("leaderboard");
      if (!lb || !lb.ok) { $("board-podium").innerHTML = ""; $("board-rows").innerHTML = emptyHtml(t("errOffline"), "worried"); return; }
      boardData = { rows: lb.rows || [], me_slug: lb.me_slug || null, playing: [], rl: null };
    }
  }
  renderBoard();
  renderCommunity();
}
/* wie speelt nu + Rocket League-community: publieke data, niets geschat */
function renderCommunity() {
  const d = boardData || {};
  const box = $("comm-playing"); if (!box) return;
  $("comm-playing-h").hidden = false; box.hidden = false; box.innerHTML = "";
  const rows = d.playing || [];
  if (!rows.length) box.innerHTML = '<p class="muted comm-empty">' + escT(t("commPlayingEmpty")) + "</p>";
  rows.forEach((p, i) => {
    const el = document.createElement("div"); el.className = "cp"; el.style.setProperty("--i", i);
    el.innerHTML = '<img src="' + (p.avatar ? encodeURI(p.avatar) : "../../assets/icon.png") + '" alt="">' +
      '<div class="cp-t"><b>' + escT(p.name || p.slug || "?") + "</b><span>\u25cf " + escT(p.game || "") + (p.detail ? " \u00b7 " + escT(p.detail) : "") + "</span></div>";
    if (p.slug) { el.classList.add("go"); el.addEventListener("click", () => openProfileFromSlug(p.slug)); }
    box.appendChild(el);
  });
  const rh = $("comm-rl-h"), rb = $("comm-rl");
  const rl = d.rl;
  if (!rl || !rl.matches) { rh.hidden = true; rb.hidden = true; return; }
  rh.hidden = false; rb.hidden = false;
  const tile = (v, l) => '<div class="crl-tile"><b>' + escT(fmtStat(v)) + "</b><span>" + escT(l) + "</span></div>";
  rb.innerHTML = '<p class="muted crl-note">' + escT(t("commRlNote")) + "</p>" +
    '<div class="crl-tiles">' + tile(rl.matches, t("rlMatches")) + tile(rl.players, t("commPlayersLbl")) + tile(rl.goals, t("rlGoals")) + tile(rl.saves, t("rlSaves")) + "</div>" +
    '<div class="crl-rows">' + (rl.top || []).slice(0, 10).map((p, i) =>
      '<div class="crl-row' + (p.slug ? " go" : "") + '" style="--i:' + i + '"' + (p.slug ? ' data-slug="' + escT(p.slug) + '"' : "") + ">" +
        '<img src="' + (p.avatar ? encodeURI(p.avatar) : "../../assets/icon.png") + '" alt=""><b>' + escT(p.name || p.slug || "?") + "</b>" +
        "<span>" + fmtNum(p.matches || 0) + " " + escT(t("rlMatches")) + "</span>" +
        (p.winrate != null ? "<em>" + escT(String(p.winrate)) + "% " + escT(t("commWinrate")) + "</em>" : "") +
      "</div>").join("") + "</div>";
  rb.querySelectorAll(".crl-row.go").forEach((el) => el.addEventListener("click", () => openProfileFromSlug(el.dataset.slug)));
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
  if (!rows.length) { list.innerHTML = emptyHtml(t("emptyBoard"), "trophy"); return; }
  rows.slice(3, 50).forEach((r, i) => {
    const d = document.createElement("div");
    d.className = "brow" + (boardData.me_slug && r.slug === boardData.me_slug ? " me" : "");
    d.style.setProperty("--i", i);
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
      mcSummary = r.minecraft || { servers: [], worlds: [] }; mcSummary.total = (r.games || []).find((x) => x.game === "Minecraft") || { sessions: 0, minutes: 0 };
      renderMc(mcStatusLast);
      renderStreak(r.days || []);
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
function matchRow(m, deletable) {
  const res = m.result || "unknown";
  const div = document.createElement("div");
  div.className = "match";
  const g = m.goals ?? "–", a = m.assists ?? "–", s = m.saves ?? "–";
  div.innerHTML =
    '<span class="m-res ' + res + '">' + res.toUpperCase().slice(0, 4) + "</span>" +
    '<span class="m-stats"><b>' + g + "G</b> " + a + "A " + s + "S</span>" +
    '<span class="m-meta">' + (m.playlist ? String(m.playlist).replace(/[<>&]/g, "") + "<br>" : "") + fmtTime(m.played_at) + "</span>";
  if (deletable) { div.classList.add("clickable"); div.addEventListener("click", () => openRlMatch(m, rlStats(rlMatches))); }
  /* potten zonder uitslag kun je zelf wissen (alleen hier in de Companion) */
  if (deletable && res === "unknown" && m.client_match_id) {
    div.classList.add("has-del");
    const b = document.createElement("button"); b.className = "m-del"; b.title = t("rlDelOne"); b.textContent = "\u00d7";
    b.addEventListener("click", async (e) => {
      e.stopPropagation(); b.disabled = true;
      const r = await window.egs.rlDelete({ id: m.client_match_id });
      if (r && r.ok) { div.remove(); rlMatches = null; session = session.filter((x) => x.client_match_id !== m.client_match_id); toast(t("rlDeleted")(r.deleted || 1), t("toastDone"), "controller"); fetchRl().then(() => { renderStats(true); }); }
      else { b.disabled = false; toast(t("rlDelFail"), t("toastDone"), "worried"); }
    });
    div.appendChild(b);
  }
  return div;
}
async function rlDeleteUnknown(n) {
  if (!window.confirm(t("rlDelConfirm")(n))) return;
  const r = await window.egs.rlDelete({ scope: "unknown" });
  if (r && r.ok) {
    session = session.filter((m) => (m.result || "unknown") !== "unknown");
    rlMatches = null; await fetchRl();
    toast(t("rlDeleted")(r.deleted || 0), t("toastDone"), "cheer");
    renderSession(); openRlHub();
  } else toast(t("rlDelFail"), t("toastDone"), "worried");
}
function renderSession() {
  const box = $("matches");
  box.innerHTML = "";
  if (!session.length) { box.innerHTML = emptyHtml(t("noMatches"), "controller"); return; }
  session.slice().reverse().forEach((m) => box.appendChild(matchRow(m)));
  const w = session.filter((x) => x.result === "win").length;
  const l = session.filter((x) => x.result === "loss").length;
  $("session-line").textContent = t("sessionLine")(session.length, w, l);
  sessTotals = { n: session.length, w, l }; if (tbNowLast && tbNowLast.game) tbNow(tbNowLast);
}
window.egs.onMatch((d) => { session.push(d.match); renderSession(); rlMatches = null; const m = d.match || {}; toast(t("toastMatch")((m.result || "?").toUpperCase() + " \u00b7 " + (m.goals ?? "\u2013") + "G " + (m.assists ?? "\u2013") + "A " + (m.saves ?? "\u2013") + "S"), t("toastDone"), m.result === "win" ? "cheer" : "controller"); });

async function loadRecent() {
  /* laatste gesyncte potten tonen zolang de sessie leeg is */
  if (session.length) return;
  const r = await window.egs.recent();
  const box = $("matches");
  if (r && r.ok && r.matches && r.matches.length) {
    box.innerHTML = "";
    r.matches.forEach((m, i) => { const row = matchRow(m); row.style.animationDelay = Math.min(i, 12) * 35 + "ms"; box.appendChild(row); });
  } else if (!session.length) box.innerHTML = emptyHtml(t("noMatches"), "controller");
}

/* ---- instellingen ---- */
$("btn-settings").addEventListener("click", () => {
  $("set-mw4exes").value = (state.mw4_exes || []).join(", ");
  $("set-rlname").value = state.rl_name || "";
  $("set-autostart").checked = !!state.autostart;
  $("set-discord").checked = state.discord_rpc !== false;
  dcRefresh();
  $("set-track").checked = state.tracking_paused !== true;
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
$("set-discord").addEventListener("change", async (e) => { await window.egs.setSetting({ discord_rpc: e.target.checked }); state.discord_rpc = e.target.checked; setTimeout(dcRefresh, 600); });
/* Statusregel onder de Discord-schakelaar: zegt eerlijk of de koppeling staat en wat Discord nu toont. */
function dcRender(st) {
  const el = $("set-discord-status"); if (!el || !st) return;
  const f = (k, o) => Object.keys(o || {}).reduce((s, p) => s.split("{" + p + "}").join(o[p]), t(k));
  const name = st.user || "?";
  let txt = "", cls = "";
  if (st.enabled === false) txt = t("dcOff");
  else if (st.signedIn === false) { txt = t("dcSignedOut"); cls = "bad"; }
  else if (st.phase === "connected" && st.setError) { txt = f("dcSetError", { name, err: st.setError }); cls = "bad"; }
  else if (st.phase === "connected") { txt = (st.game && st.game !== "EveryGameStat" ? f("dcShowing", { name, game: st.game }) : f("dcIdle", { name })) + " " + t("dcHidden"); cls = "ok"; }
  else if (st.phase === "no_discord") { txt = t("dcNoDiscord"); cls = "bad"; }
  else if (st.phase === "error") { txt = f("dcError", { err: st.error || "?" }); cls = "bad"; }
  else txt = t("dcConnecting");
  el.textContent = txt; el.className = "dc-status" + (cls ? " " + cls : "");
}
let dcLast = null;
async function dcRefresh() { try { dcLast = await window.egs.discordStatus(); dcRender(dcLast); } catch (e) {} }
if (window.egs.onDiscordStatus) window.egs.onDiscordStatus((st) => { dcLast = { ...(dcLast || {}), ...st, enabled: state.discord_rpc !== false, signedIn: dcLast ? dcLast.signedIn : true }; dcRender(dcLast); });
$("set-track").addEventListener("change", async (e) => { const paused = !e.target.checked; await window.egs.setSetting({ tracking_paused: paused }); state.tracking_paused = paused; if (paused) applyPresence({ game: null, art: null }); });
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
