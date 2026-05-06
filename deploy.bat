@echo off
cd /d C:\PETERC~1\HEALTH~1

echo === Git commit ^& push ===
git add -A
git commit -m "update"
git push

echo.
echo === Deploy to Vercel ===
node --require ./patch-hostname.js "C:\Users\choyc\AppData\Roaming\npm\node_modules\vercel\dist\index.js" deploy --prod --yes

echo.
echo === Done ===
pause
