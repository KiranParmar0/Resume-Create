@echo off
REM Job Application Email Automation - Windows Batch Script
REM This script provides easy access to common commands

setlocal enabledelayedexpansion

:menu
cls
echo.
echo ==========================================
echo   Job Application Email Automation
echo ==========================================
echo.
echo 1. Install Dependencies (npm install)
echo 2. Create Sample Excel File
echo 3. Send Emails Now (npm start)
echo 4. View Documentation
echo 5. Exit
echo.
echo ==========================================

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto sample
if "%choice%"=="3" goto start
if "%choice%"=="4" goto docs
if "%choice%"=="5" goto exit
goto menu

:install
cls
echo.
echo Installing dependencies...
echo This will install: nodemailer, xlsx
echo.
call npm install
echo.
pause
goto menu

:sample
cls
echo.
echo Creating sample Excel file...
echo This will create: Compan HR contact.xlsx
echo.
call node create-sample-excel.js
echo.
pause
goto menu

:start
cls
echo.
echo ==========================================
echo   Starting Email Campaign
echo ==========================================
echo.
echo Make sure you have:
echo 1. Updated send-emails.js with your Gmail App Password
echo 2. Created Compan HR contact.xlsx with HR contacts
echo 3. Placed Kiran_Parmar_Resume.pdf in this folder
echo.
pause
call npm start
echo.
pause
goto menu

:docs
cls
echo.
echo Documentation Files:
echo.
echo 1. README.md - Full documentation
echo 2. QUICK_START.md - Quick setup guide
echo 3. TROUBLESHOOTING.md - Solutions for problems
echo 4. CONFIGURATION.md - Customization options
echo 5. PROJECT_STRUCTURE.md - File guide
echo.
set /p docfile="Enter filename (without .md extension) or press Enter to go back: "

if "!docfile!"=="" goto menu
if "!docfile!"=="1" set docfile=README
if "!docfile!"=="2" set docfile=QUICK_START
if "!docfile!"=="3" set docfile=TROUBLESHOOTING
if "!docfile!"=="4" set docfile=CONFIGURATION
if "!docfile!"=="5" set docfile=PROJECT_STRUCTURE

if exist "!docfile!.md" (
    start notepad "!docfile!.md"
) else (
    echo File not found: !docfile!.md
    pause
)
goto menu

:exit
echo.
echo Thank you for using Job Application Email Automation!
echo.
pause
exit /b
