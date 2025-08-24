@echo off
echo ⚡ РОФЛОБАНК - НАСТРОЙКА GIT ⚡
echo.

echo 🔧 Настройка конфигурации Git...
git config core.quotepath false
git config core.precomposeunicode true
git config core.preloadindex true
git config core.fscache true
git config core.autocrlf input
git config push.default simple

echo 🎯 Добавление полезных алиасов...
git config alias.st status
git config alias.co checkout
git config alias.br branch
git config alias.cm commit
git config alias.lg "log --oneline --graph --decorate"
git config alias.unstage "reset HEAD --"
git config alias.last "log -1 HEAD"

echo.
echo ✅ Конфигурация Git успешно завершена!
echo.
echo 📋 Доступные алиасы:
echo   git st      - статус репозитория
echo   git co      - переключение веток
echo   git br      - список веток
echo   git cm      - коммит
echo   git lg      - красивый лог
echo   git unstage - убрать из индекса
echo   git last    - последний коммит
echo.
echo 📖 Полное руководство: GIT-GUIDE.md
echo.
pause