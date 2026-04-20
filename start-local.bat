@echo off
chcp 65001 >nul
echo ===================================
echo   GoTI 本地开发环境启动脚本
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

REM 检查环境配置
if not exist ".env.development" (
    echo ⚙️  创建开发环境配置...
    copy .env.example .env.development >nul
    echo ✅ 配置文件已创建
    echo.
)

echo 🚀 启动开发服务器...
echo.
call npm run dev

pause
