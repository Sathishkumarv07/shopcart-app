@echo off
title Launch Porulagam Marketplace Desktop
cd /d "%~dp0"

echo ========================================================
echo   Porulagam (பொருளகம்) Desktop Application Launcher
echo ========================================================
echo.

:: Check if server is already running on port 5173
netstat -ano | findstr :5173 | findstr LISTENING >nul
if %errorlevel% neq 0 (
    echo [1/2] Starting Porulagam Web Engine in background...
    start /min "" cmd /c "npm.cmd run dev"
    timeout /t 2 /nobreak >nul
) else (
    echo [1/2] Porulagam Engine is already running.
)

echo [2/2] Opening Porulagam Desktop Window...

:: Try launching in Edge App Mode (Standalone borderless desktop window)
where msedge >nul 2>nul
if %errorlevel% equ 0 (
    start msedge --app=http://localhost:5173/ --window-size=1280,800
    exit /b
)

:: Otherwise try Chrome App Mode
where chrome >nul 2>nul
if %errorlevel% equ 0 (
    start chrome --app=http://localhost:5173/ --window-size=1280,800
    exit /b
)

:: Default browser fallback
start http://localhost:5173/
exit /b
