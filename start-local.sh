#!/bin/bash

echo "==================================="
echo "  GoTI 本地开发环境启动脚本"
echo "==================================="
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node 版本: $(node -v)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
    echo ""
fi

# 检查环境配置
if [ ! -f ".env.development" ]; then
    echo "⚙️  创建开发环境配置..."
    cp .env.example .env.development
    echo "✅ 配置文件已创建"
    echo ""
fi

echo "🚀 启动开发服务器..."
echo ""
npm run dev
