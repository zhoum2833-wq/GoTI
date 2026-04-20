@echo off
chcp 65001 >nul
echo ===================================
echo   GoTI Windows 本地构建脚本
echo ===================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node 版本: %NODE_VERSION%
echo.

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
    echo.
)

echo 🔨 构建生产版本...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo.
echo ===================================
echo   ✅ 构建完成！
echo ===================================
echo.
echo 📁 构建文件位于: dist\
echo.
echo 📦 部署方式：
echo   1. 将 dist\ 文件夹上传到服务器
echo   2. 使用 Nginx 或其他 Web 服务器托管
echo   3. 或运行: npm run preview 本地预览
echo.

pause
