@echo off
echo Syncing changes to GitHub...
git add .
set /p commitMsg="Enter commit message (default: 'Update'): "
if "%commitMsg%"=="" set commitMsg=Update
git commit -m "%commitMsg%"
git push origin main
echo Done!
pause
