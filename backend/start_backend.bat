@echo off
title Porulagam Backend (FastAPI + MySQL)
cd /d "%~dp0"

echo ========================================================
echo   Porulagam Backend Service (FastAPI + MySQL)
echo ========================================================
echo.

:: Test MySQL connection first
echo [*] Testing MySQL database connection...
python test_db_connection.py
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] MySQL connection check failed!
    echo Please verify MySQL is running on localhost:3306 with credentials in backend\.env
    pause
    exit /b 1
)

echo.
echo [*] Starting FastAPI Server on http://localhost:8000 ...
echo [*] Interactive API Docs: http://localhost:8000/docs
echo [*] Health Check:        http://localhost:8000/api/health
echo.
python main.py
