@echo off
chcp 65001 >nul
cd /d "C:\Peter Claude 工作資料夾\health-survey"

echo === 正在部署到 Vercel ===
echo.

git add -A
git commit -m "update: 更新內容"
git push

node --require ./patch-hostname.js "C:\Users\choyc\AppData\Roaming\npm\node_modules\vercel\dist\index.js" deploy --prod --yes

echo.
echo === 部署完成 ===
pause
