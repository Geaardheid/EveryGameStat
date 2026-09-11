; EGS Companion — installer in huisstijl.
; Welkom- en klaar-pagina zijn eigen nsDialogs-pagina's (donker, logo, eigen tekst);
; mapkeuze en voortgang zijn MUI-pagina's in dezelfde kleuren.
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
!ifndef MUI_DIRECTORYPAGE_TEXT_TOP
!define MUI_DIRECTORYPAGE_TEXT_TOP "Pick where EGS Companion goes. Updates install here silently."
!endif
!ifndef MUI_ABORTWARNING_TEXT
!define MUI_ABORTWARNING_TEXT "Stop installing EGS Companion?"
!endif

; deze include wordt vóór installer.nsi geladen, dus MUI zelf laden (heeft include-guard)
!include MUI2.nsh
!include nsDialogs.nsh
!include WinMessages.nsh

Var EgsDlg
Var EgsImg
Var EgsImgH
Var EgsFontTitle
Var EgsFontBody
Var EgsRunCheck

!macro egsFonts
  ${If} $EgsFontTitle == ""
    CreateFont $EgsFontTitle "Segoe UI" 20 700
    CreateFont $EgsFontBody "Segoe UI" 10 400
  ${EndIf}
!macroend

; ---- welkom (alleen in de installer; de uninstaller laadt dit bestand ook en zou anders over ongebruikte functies klagen) ----
!ifndef BUILD_UNINSTALLER
!macro customWelcomePage
  Page custom egsWelcomeCreate egsWelcomeLeave
!macroend

Function egsWelcomeCreate
  !insertmacro MUI_HEADER_TEXT "Welcome" "Set up EGS Companion in under a minute."
  !insertmacro egsFonts
  nsDialogs::Create 1018
  Pop $EgsDlg
  ${If} $EgsDlg == error
    Abort
  ${EndIf}
  SetCtlColors $EgsDlg "" 131316
  ${NSD_CreateBitmap} 0u 4u 64u 64u ""
  Pop $EgsImg
  ${NSD_SetImage} $EgsImg "$PLUGINSDIR\logo96.bmp" $EgsImgH
  ${NSD_CreateLabel} 76u 8u 220u 24u "EGS Companion"
  Pop $0
  SetCtlColors $0 F2B03D 131316
  SendMessage $0 ${WM_SETFONT} $EgsFontTitle 0
  ${NSD_CreateLabel} 76u 34u 220u 60u "Your playtime, live matches and Discord presence, tracked automatically.$\r$\n$\r$\nThe Companion reads game logs and running processes on this PC and sends only the numbers to your EveryGameStat card. No screen capture, no game memory."
  Pop $0
  SetCtlColors $0 F4F3F2 131316
  SendMessage $0 ${WM_SETFONT} $EgsFontBody 0
  ${NSD_CreateLabel} 76u 104u 220u 20u "Next picks the install folder. Rocket League and Minecraft need nothing extra; you link the app with an 8-character code from everygamestat.com/companion."
  Pop $0
  SetCtlColors $0 A9A7A2 131316
  SendMessage $0 ${WM_SETFONT} $EgsFontBody 0
  nsDialogs::Show
  ${NSD_FreeImage} $EgsImgH
FunctionEnd

Function egsWelcomeLeave
FunctionEnd

; ---- klaar ----
!macro customFinishPage
  Page custom egsFinishCreate egsFinishLeave
!macroend

Function egsFinishCreate
  !insertmacro MUI_HEADER_TEXT "You're set" "EGS Companion is installed."
  !insertmacro egsFonts
  nsDialogs::Create 1018
  Pop $EgsDlg
  ${If} $EgsDlg == error
    Abort
  ${EndIf}
  SetCtlColors $EgsDlg "" 131316
  ${NSD_CreateBitmap} 0u 4u 64u 64u ""
  Pop $EgsImg
  ${NSD_SetImage} $EgsImg "$PLUGINSDIR\logo96.bmp" $EgsImgH
  ${NSD_CreateLabel} 76u 8u 220u 24u "Ready to track"
  Pop $0
  SetCtlColors $0 F2B03D 131316
  SendMessage $0 ${WM_SETFONT} $EgsFontTitle 0
  ${NSD_CreateLabel} 76u 34u 220u 44u "Open the Companion, enter the code from everygamestat.com/companion, and your games start tracking. It lives in the tray and updates itself."
  Pop $0
  SetCtlColors $0 F4F3F2 131316
  SendMessage $0 ${WM_SETFONT} $EgsFontBody 0
  ${NSD_CreateCheckbox} 76u 86u 220u 12u "Open EGS Companion now"
  Pop $EgsRunCheck
  SetCtlColors $EgsRunCheck F4F3F2 131316
  ${NSD_Check} $EgsRunCheck
  nsDialogs::Show
  ${NSD_FreeImage} $EgsImgH
FunctionEnd

Function egsFinishLeave
  ${NSD_GetState} $EgsRunCheck $0
  ${If} $0 == ${BST_CHECKED}
    ExecShell "open" "$INSTDIR\${PRODUCT_FILENAME}.exe"
  ${EndIf}
FunctionEnd

!endif

; ---- init / opruimen ----
!macro customInit
  InitPluginsDir
  File /oname=$PLUGINSDIR\logo96.bmp "${BUILD_RESOURCES_DIR}\logo96.bmp"
  ; draaiende app afsluiten voor (her)installatie/update
  nsExec::Exec 'taskkill /F /IM "EGS Companion.exe" /T'
  Sleep 400
!macroend

!macro customUnInit
  nsExec::Exec 'taskkill /F /IM "EGS Companion.exe" /T'
  Sleep 400
!macroend

!macro customUnInstall
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "EGS Companion"
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "egs-companion"
  RMDir /r "$LOCALAPPDATA\egs-companion-updater"
!macroend
