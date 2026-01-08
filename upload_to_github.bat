@echo off
setlocal

:: Set path to git executable found on system
set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"

echo Checking Git configuration...

:: Check and set user name
for /f "tokens=*" %%i in ('"%GIT_CMD%" config user.name') do set CURRENT_NAME=%%i
if "%CURRENT_NAME%"=="" (
    echo Git user.name is not set.
    set /p NEW_NAME="Enter your Name (e.g. John Doe): "
    "%GIT_CMD%" config --global user.name "%NEW_NAME%"
)

:: Check and set user email
for /f "tokens=*" %%i in ('"%GIT_CMD%" config user.email') do set CURRENT_EMAIL=%%i
if "%CURRENT_EMAIL%"=="" (
    echo Git user.email is not set.
    set /p NEW_EMAIL="Enter your Email (e.g. john@example.com): "
    "%GIT_CMD%" config --global user.email "%NEW_EMAIL%"
)

echo.
echo preparing to upload...
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "Initial commit"
"%GIT_CMD%" branch -M main

echo.
echo Pushing to GitHub...
echo You may be asked to sign in to GitHub in a browser window.
"%GIT_CMD%" push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo Upload successful!
) else (
    echo Upload failed. Please check the errors above.
)
pause
