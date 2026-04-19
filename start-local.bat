@echo off
chcp 65001 >nul
title GoTI - 本地数据模式启动

echo.
echo ========================================
echo    GoTI 人格测试 - 本地数据模式
echo ========================================
echo.

REM 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到Node.js，请先安装Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js 已安装
node --version
echo.

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo [!] 检测到首次运行，正在安装依赖...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo [✓] 依赖安装完成
    echo.
)

REM 设置环境变量（本地数据模式）
echo [配置] 使用本地数据模式
echo.

REM 创建临时配置文件（如果不存在）
if not exist ".env.development" (
    echo [!] 创建默认配置文件...
    (
        echo # 数据源配置
        echo VITE_DATA_SOURCE=local
        echo.
        echo # 应用配置
        echo VITE_APP_TITLE=GoTI 人格测试
        echo VITE_APP_DESCRIPTION=MyGO 角色匹配度测试
        echo.
        echo # 功能开关
        echo VITE_ENABLE_RESULT_SHARING=true
        echo VITE_ENABLE_PROGRESS_SAVE=true
        echo VITE_ENABLE_ANALYTICS=false
    ) > .env.development
    echo [✓] 配置文件创建完成
    echo.
)

echo ========================================
echo    启动开发服务器
echo ========================================
echo.
echo [提示] 服务器启动后，浏览器将自动打开
echo [提示] 按 Ctrl+C 可停止服务器
echo.

REM 启动开发服务器
call npm run dev

pause
