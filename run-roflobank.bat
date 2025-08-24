@echo off
echo Starting RofloBank Application...
echo.
if exist "build\win-unpacked\RofloBank.exe" (
    echo Launching RofloBank.exe...
    start "" "build\win-unpacked\RofloBank.exe"
    echo RofloBank has been launched!
) else (
    echo Error: RofloBank.exe not found!
    echo Please run 'npm run pack' first to build the application.
    echo.
    pause
)