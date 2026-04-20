#!/bin/bash

echo "==================================="
echo "  GoTI 服务器部署脚本"
echo "==================================="
echo ""

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  建议使用 root 用户运行此脚本"
fi

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，正在安装..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

echo "✅ Node 版本: $(node -v)"
echo "✅ NPM 版本: $(npm -v)"
echo ""

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 正在安装 PM2..."
    npm install -g pm2
fi

echo "✅ PM2 已安装"
echo ""

# 安装项目依赖
echo "📦 安装项目依赖..."
npm install --production=false

# 构建项目
echo ""
echo "🔨 构建生产版本..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建完成"
echo ""

# 停止旧服务
echo "🛑 停止旧服务..."
pm2 stop goti-frontend 2>/dev/null
pm2 delete goti-frontend 2>/dev/null

# 启动新服务
echo "🚀 启动服务..."
pm2 serve dist 3000 --name goti-frontend

# 保存 PM2 配置
pm2 save

echo ""
echo "==================================="
echo "  ✅ 部署完成！"
echo "==================================="
echo ""
echo "访问地址: http://$(curl -s ifconfig.me || echo 'your-server-ip'):3000"
echo ""
echo "常用命令:"
echo "  查看状态: pm2 status"
echo "  查看日志: pm2 logs goti-frontend"
echo "  重启服务: pm2 restart goti-frontend"
echo "  停止服务: pm2 stop goti-frontend"
echo ""
