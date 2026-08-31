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
