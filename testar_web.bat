@echo off
cd /d "%~dp0"
echo Abra http://localhost:8060 no navegador. Ctrl+C encerra.
start "" http://localhost:8060
node testar_web.js
