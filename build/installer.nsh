; EGS Companion — installer in huisstijl: donkere pagina's, eigen header en zijbalk, eigen teksten
!ifndef MUI_BGCOLOR
!define MUI_BGCOLOR 131316
!endif
!ifndef MUI_TEXTCOLOR
!define MUI_TEXTCOLOR F4F3F2
!endif
!ifndef MUI_INSTFILESPAGE_COLORS
!define MUI_INSTFILESPAGE_COLORS "F4F3F2 1B1B1F"
!endif
!ifndef MUI_INSTFILESPAGE_PROGRESSBAR
!define MUI_INSTFILESPAGE_PROGRESSBAR "smooth"
!endif
!ifndef MUI_WELCOMEPAGE_TITLE
!define MUI_WELCOMEPAGE_TITLE "EGS Companion"
!endif
!ifndef MUI_WELCOMEPAGE_TITLE_3LINES
!define MUI_WELCOMEPAGE_TITLE_3LINES
!endif
!ifndef MUI_WELCOMEPAGE_TEXT
!define MUI_WELCOMEPAGE_TEXT "Your playtime, live matches and Discord presence, tracked automatically.$\r$\n$\r$\nThe Companion reads game logs and running processes on this PC and sends only the numbers to your EveryGameStat card. No screen capture, no game memory.$\r$\n$\r$\nChoose Next to pick an install folder."
!endif
!ifndef MUI_DIRECTORYPAGE_TEXT_TOP
!define MUI_DIRECTORYPAGE_TEXT_TOP "Pick where EGS Companion goes. Updates install here silently."
!endif
!ifndef MUI_FINISHPAGE_TITLE
!define MUI_FINISHPAGE_TITLE "You're set"
!endif
!ifndef MUI_FINISHPAGE_TITLE_3LINES
!define MUI_FINISHPAGE_TITLE_3LINES
!endif
!ifndef MUI_FINISHPAGE_TEXT
!define MUI_FINISHPAGE_TEXT "EGS Companion is installed. Open it, enter the 8-character code from everygamestat.com/companion, and your games start tracking."
!endif
!ifndef MUI_FINISHPAGE_RUN_TEXT
!define MUI_FINISHPAGE_RUN_TEXT "Open EGS Companion now"
!endif
!ifndef MUI_ABORTWARNING_TEXT
!define MUI_ABORTWARNING_TEXT "Stop installing EGS Companion?"
!endif

; EGS Companion — nette installatie & opruiming
!macro customInit
  ; draaiende app afsluiten voor (her)installatie/update
  nsExec::Exec 'taskkill /F /IM "EGS Companion.exe" /T'
  Sleep 400
!macroend

!macro customUnInit
  ; draaiende app afsluiten voordat de uninstaller iets aanraakt (niets blijft hangen in Taakbeheer)
  nsExec::Exec 'taskkill /F /IM "EGS Companion.exe" /T'
  Sleep 400
!macroend

!macro customUnInstall
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "EGS Companion"
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "egs-companion"
  RMDir /r "$LOCALAPPDATA\egs-companion-updater"
!macroend
