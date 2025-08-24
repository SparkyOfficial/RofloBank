@echo off
echo ⚡ РОФЛОБАНК - ПРОСТАЯ СБОРКА ⚡
echo.

echo 🔧 Создание webpack сборки...
call npm run build

echo.
echo 📦 Копирование файлов...
if not exist "RofloBank-Portable" mkdir "RofloBank-Portable"
copy "main.js" "RofloBank-Portable\"
copy "preload.js" "RofloBank-Portable\"
copy "package.json" "RofloBank-Portable\"
xcopy "dist" "RofloBank-Portable\dist\" /s /e /i /y

echo.
echo 📋 Создание package.json для production...
echo { > "RofloBank-Portable\package.json"
echo   "name": "roflobank", >> "RofloBank-Portable\package.json"
echo   "version": "1.0.0", >> "RofloBank-Portable\package.json"
echo   "main": "main.js", >> "RofloBank-Portable\package.json"
echo   "author": "RofloBank Team", >> "RofloBank-Portable\package.json"
echo   "description": "РОФЛОБАНК - Система управления лирами" >> "RofloBank-Portable\package.json"
echo } >> "RofloBank-Portable\package.json"

echo.
echo 🎯 Установка production зависимостей...
cd "RofloBank-Portable"
call npm install electron --save-dev

echo.
echo ✅ Портативная версия готова в папке RofloBank-Portable!
echo 🚀 Запуск: npx electron .
echo.
pause