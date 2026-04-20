# GoTI 本地开发环境启动脚本 (PowerShell)

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  GoTI 本地开发环境启动脚本" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js 是否安装
try {
    $nodeVersion = node -v
    Write-Host "✅ Node 版本: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误: 未检测到 Node.js" -ForegroundColor Red
    Write-Host "请先安装 Node.js: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "按任意键退出"
    exit 1
}

Write-Host ""

# 检查是否已安装依赖
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 正在安装依赖..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 依赖安装失败" -ForegroundColor Red
        Read-Host "按任意键退出"
        exit 1
    }
    Write-Host "✅ 依赖安装完成" -ForegroundColor Green
    Write-Host ""
}

# 检查环境配置
if (-not (Test-Path ".env.development")) {
    Write-Host "⚙️  创建开发环境配置..." -ForegroundColor Yellow
    Copy-Item .env.example .env.development
    Write-Host "✅ 配置文件已创建" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 启动开发服务器..." -ForegroundColor Green
Write-Host ""
npm run dev

Read-Host "按任意键退出"
