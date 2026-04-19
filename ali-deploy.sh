#!/bin/bash

echo ""
echo "========================================"
echo "   GoTI 阿里云一键部署脚本"
echo "========================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 打印函数
print_success() {
    echo -e "${GREEN}[✓] $1${NC}"
}

print_error() {
    echo -e "${RED}[✗] $1${NC}"
}

print_info() {
    echo -e "${YELLOW}[!] $1${NC}"
}

# 检测操作系统
detect_os() {
    if [ -f /etc/redhat-release ]; then
        OS="centos"
        PKG_MANAGER="yum"
    elif [ -f /etc/lsb-release ]; then
        OS="ubuntu"
        PKG_MANAGER="apt-get"
    else
        print_error "不支持的操作系统"
        exit 1
    fi
    print_success "检测到系统: $OS"
}

# 更新系统
update_system() {
    print_info "更新系统..."
    if [ "$OS" = "centos" ]; then
        yum update -y
    else
        apt-get update && apt-get upgrade -y
    fi
    print_success "系统更新完成"
}

# 安装Node.js
install_nodejs() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js 已安装: $NODE_VERSION"
        return
    fi

    print_info "安装Node.js 18..."
    
    if [ "$OS" = "centos" ]; then
        curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
        yum install -y nodejs
    else
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        apt-get install -y nodejs
    fi

    if command -v node &> /dev/null; then
        print_success "Node.js 安装成功: $(node --version)"
    else
        print_error "Node.js 安装失败"
        exit 1
    fi
}

# 安装PM2
install_pm2() {
    if command -v pm2 &> /dev/null; then
        print_success "PM2 已安装"
        return
    fi

    print_info "安装PM2..."
    npm install -g pm2

    if command -v pm2 &> /dev/null; then
        print_success "PM2 安装成功"
    else
        print_error "PM2 安装失败"
        exit 1
    fi
}

# 安装Nginx（可选）
install_nginx() {
    if command -v nginx &> /dev/null; then
        print_success "Nginx 已安装"
        return
    fi

    print_info "是否安装Nginx？(y/n)"
    read -r INSTALL_NGINX

    if [ "$INSTALL_NGINX" = "y" ]; then
        print_info "安装Nginx..."
        if [ "$OS" = "centos" ]; then
            yum install -y nginx
        else
            apt-get install -y nginx
        fi
        
        systemctl start nginx
        systemctl enable nginx
        print_success "Nginx 安装成功"
    fi
}

# 安装项目依赖
install_dependencies() {
    print_info "安装项目依赖..."
    
    if [ -f "package.json" ]; then
        npm install
        print_success "依赖安装完成"
    else
        print_error "未找到 package.json，请确保在项目根目录运行此脚本"
        exit 1
    fi
}

# 构建项目
build_project() {
    print_info "构建项目..."
    
    if npm run build; then
        print_success "项目构建成功"
    else
        print_error "项目构建失败"
        exit 1
    fi
}

# 启动服务
start_services() {
    print_info "停止旧服务..."
    pm2 delete goti-frontend 2>/dev/null
    pm2 delete goti-api 2>/dev/null

    print_info "启动前端服务..."
    pm2 serve dist 3000 --name goti-frontend

    # 检查是否需要启动API服务器
    if [ -d "mock-server" ]; then
        print_info "启动API服务器..."
        cd mock-server
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        pm2 start server.js --name goti-api
        cd ..
    fi

    # 保存PM2配置
    pm2 save
    pm2 startup | tail -n 1 | bash

    print_success "服务启动成功"
}

# 配置防火墙
configure_firewall() {
    print_info "配置防火墙..."
    
    if command -v firewall-cmd &> /dev/null; then
        firewall-cmd --permanent --add-port=3000/tcp
        firewall-cmd --permanent --add-port=3001/tcp
        firewall-cmd --permanent --add-port=80/tcp
        firewall-cmd --permanent --add-port=443/tcp
        firewall-cmd --reload
        print_success "防火墙配置完成"
    elif command -v ufw &> /dev/null; then
        ufw allow 3000
        ufw allow 3001
        ufw allow 80
        ufw allow 443
        print_success "防火墙配置完成"
    fi
}

# 显示部署信息
show_deployment_info() {
    SERVER_IP=$(curl -s ifconfig.me)
    
    echo ""
    echo "========================================"
    echo "   部署完成！"
    echo "========================================"
    echo ""
    echo "访问地址:"
    echo "  http://$SERVER_IP:3000"
    echo ""
    echo "服务状态:"
    pm2 status
    echo ""
    echo "常用命令:"
    echo "  查看日志: pm2 logs"
    echo "  重启服务: pm2 restart all"
    echo "  停止服务: pm2 stop all"
    echo ""
    echo "如需配置域名和HTTPS，请查看:"
    echo "  CLOUD-DEPLOYMENT.md"
    echo ""
}

# 主函数
main() {
    detect_os
    update_system
    install_nodejs
    install_pm2
    install_nginx
    install_dependencies
    build_project
    start_services
    configure_firewall
    show_deployment_info
}

# 运行主函数
main
