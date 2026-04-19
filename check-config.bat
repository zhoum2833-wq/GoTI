@echo off
chcp 65001 >nul
title GoTI - 配置检查工具

echo.
echo ========================================
echo    GoTI 配置检查工具
echo ========================================
echo.

REM 检查Node.js
echo [检查] Node.js 环境...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [✗] Node.js 未安装
    echo     下载地址: https://nodejs.org/
) else (
    echo [✓] Node.js 已安装
    for /f "tokens=*" %%i in ('node --version') do echo     版本: %%i
)
echo.

REM 检查npm
echo [检查] npm 环境...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [✗] npm 未安装
) else (
    echo [✓] npm 已安装
    for /f "tokens=*" %%i in ('npm --version') do echo     版本: %%i
)
echo.

REM 检查项目依赖
echo [检查] 项目依赖...
if exist "node_modules" (
    echo [✓] 依赖已安装
) else (
    echo [✗] 依赖未安装
    echo     请运行: npm install
)
echo.

REM 检查配置文件
echo [检查] 配置文件...
if exist ".env.development" (
    echo [✓] .env.development 存在
    echo.
    echo 当前配置:
    echo ----------------------------------------
    type .env.development
    echo ----------------------------------------
) else (
    echo [✗] .env.development 不存在
    if exist ".env.example" (
        echo     可以复制: copy .env.example .env.development
    )
)
echo.

if exist ".env.production" (
    echo [✓] .env.production 存在
) else (
    echo [!] .env.production 不存在（可选）
)
echo.

REM 检查数据源配置
echo [检查] 数据源配置...
if exist ".env.development" (
    findstr /C:"VITE_DATA_SOURCE=local" .env.development >nul
    if %errorlevel% equ 0 (
        echo [✓] 数据源: 本地数据模式
        echo     无需API服务器
    ) else (
        findstr /C:"VITE_DATA_SOURCE=remote" .env.development >nul
        if %errorlevel% equ 0 (
            echo [✓] 数据源: 远程API模式
            echo.
            echo [检查] API服务器配置...
            for /f "tokens=2 delims==" %%a in ('findstr "VITE_API_BASE_URL" .env.development') do (
                echo     API地址: %%a
            )
        ) else (
            echo [!] 数据源未配置，将使用默认值（本地数据）
        )
    )
) else (
    echo [!] 使用默认配置（本地数据模式）
)
echo.

REM 检查端口占用
echo [检查] 端口占用...
netstat -ano | findstr ":3000" >nul
if %errorlevel% equ 0 (
    echo [!] 端口 3000 已被占用
    echo     可能已有服务在运行
) else (
    echo [✓] 端口 3000 可用
)

netstat -ano | findstr ":3001" >nul
if %errorlevel% equ 0 (
    echo [!] 端口 3001 已被占用
    echo     API服务器可能已在运行
) else (
    echo [✓] 端口 3001 可用
)
echo.

REM 显示建议
echo ========================================
echo    配置建议
echo ========================================
echo.

if not exist "node_modules" (
    echo [建议] 运行以下命令安装依赖:
    echo     npm install
    echo.
)

if not exist ".env.development" (
    echo [建议] 创建配置文件:
    echo     copy .env.example .env.development
    echo.
)

echo [提示] 快速启动:
echo   - 本地数据模式: 运行 start-local.bat
echo   - API模式: 运行 start-with-api.bat
echo.

pause
