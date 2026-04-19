@echo off
chcp 65001 >nul
title GoTI - API模式启动

echo.
echo ========================================
echo    GoTI 人格测试 - API模式
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

REM 检查并创建Mock服务器
if not exist "mock-server" (
    echo [!] 创建Mock服务器...
    mkdir mock-server
    (
        echo const express = require('express'^);
        echo const cors = require('cors'^);
        echo const path = require('path'^);
        echo.
        echo const app = express(^);
        echo const PORT = 3001;
        echo.
        echo app.use(cors(^)^);
        echo app.use(express.json(^)^);
        echo.
        echo // 题目数据
        echo const questions = require('../src/data/questions'.questions^);
        echo const characters = require('../src/data/characters'.characters^);
        echo.
        echo // API路由
        echo app.get('/api/questions', (req, res^) =^> {
        echo   res.json(questions^);
        echo }^);
        echo.
        echo app.get('/api/characters', (req, res^) =^> {
        echo   res.json(characters^);
        echo }^);
        echo.
        echo app.post('/api/results', (req, res^) =^> {
        echo   console.log('保存结果:', req.body^);
        echo   res.json({ success: true, id: Date.now(^) }^);
        echo }^);
        echo.
        echo app.listen(PORT, (^^) =^> {
        echo   console.log(`Mock API服务器运行在 http://localhost:${PORT}`^);
        echo }^);
    ) > mock-server\server.js
    
    (
        echo {
        echo   "name": "goti-mock-server",
        echo   "version": "1.0.0",
        echo   "main": "server.js",
        echo   "scripts": {
        echo     "start": "node server.js"
        echo   },
        echo   "dependencies": {
        echo     "express": "^4.18.2",
        echo     "cors": "^2.8.5"
        echo   }
        echo }
    ) > mock-server\package.json
    
    echo [✓] Mock服务器创建完成
    echo.
)

REM 安装Mock服务器依赖
if not exist "mock-server\node_modules" (
    echo [!] 安装Mock服务器依赖...
    cd mock-server
    call npm install
    cd ..
    echo [✓] Mock服务器依赖安装完成
    echo.
)

REM 安装前端依赖
if not exist "node_modules" (
    echo [!] 安装前端依赖...
    call npm install
    echo [✓] 前端依赖安装完成
    echo.
)

REM 创建API模式配置文件
echo [配置] 创建API模式配置...
(
    echo # 数据源配置
    echo VITE_DATA_SOURCE=remote
    echo.
    echo # API服务器配置
    echo VITE_API_BASE_URL=http://localhost:3001/api
    echo VITE_API_TIMEOUT=10000
    echo.
    echo # 应用配置
    echo VITE_APP_TITLE=GoTI 人格测试
    echo VITE_APP_DESCRIPTION=MyGO 角色匹配度测试
    echo.
    echo # 功能开关
    echo VITE_ENABLE_RESULT_SHARING=true
    echo VITE_ENABLE_PROGRESS_SAVE=true
    echo VITE_ENABLE_ANALYTICS=true
) > .env.development
echo [✓] 配置文件创建完成
echo.

echo ========================================
echo    启动服务
echo ========================================
echo.
echo [提示] 将启动两个服务:
echo   1. Mock API服务器 (端口 3001)
echo   2. 前端开发服务器 (端口 3000)
echo.

REM 启动Mock API服务器（新窗口）
echo [启动] Mock API服务器...
start "GoTI Mock API Server" cmd /k "cd mock-server && npm start"
timeout /t 2 >nul

REM 启动前端开发服务器
echo [启动] 前端开发服务器...
echo.
echo [提示] 浏览器将自动打开
echo [提示] 按 Ctrl+C 可停止服务器
echo.

call npm run dev

pause
