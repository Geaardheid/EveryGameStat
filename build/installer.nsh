; EGS Companion — installer in huisstijl: donkere pagina's, eigen header en zijbalk, eigen teksten
!define MUI_BGCOLOR 131316
!define MUI_TEXTCOLOR F4F3F2
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_RIGHT
!define MUI_INSTFILESPAGE_COLORS "F4F3F2 1B1B1F"
!define MUI_INSTFILESPAGE_PROGRESSBAR "smooth"
!define MUI_WELCOMEPAGE_TITLE "EGS Companion"
!define MUI_WELCOMEPAGE_TITLE_3LINES
!define MUI_WELCOMEPAGE_TEXT "Your playtime, live matches and Discord presence, tracked automatically.$\r$\n$\r$\nThe Companion reads game logs and running processes on this PC and sends only the numbers to your EveryGameStat card. No screen capture, no game memory.$\r$\n$\r$\nChoose Next to pick an install folder."
!define MUI_DIRECTORYPAGE_TEXT_TOP "Pick where EGS Companion goes. Updates install here silently."
!define MUI_FINISHPAGE_TITLE "You're set"
!define MUI_FINISHPAGE_TITLE_3LINES
!define MUI_FINISHPAGE_TEXT "EGS Companion is installed. Open it, enter the 8-character code from everygamestat.com/companion, and your games start tracking."
!define MUI_FINISHPAGE_RUN_TEXT "Open EGS Companion now"
!define MUI_ABORTWARNING_TEXT "Stop installing EGS Companion?"

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
