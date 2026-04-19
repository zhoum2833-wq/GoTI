# 🚀 阿里云服务器创建后操作指南

## ⚡ 快速开始（3步完成）

```
1. 连接服务器（2分钟）
2. 上传代码（3分钟）
3. 一键部署（15分钟）
```

---

## 📋 详细步骤

### 第一步：连接服务器

#### 方式一：使用阿里云控制台（最简单）

1. **登录阿里云控制台**
   - 访问 https://ecs.console.aliyun.com/
   - 找到你的服务器实例

2. **远程连接**
   - 点击"远程连接"按钮
   - 选择"Workbench远程连接"
   - 输入root密码（购买时设置的）

#### 方式二：使用SSH工具（推荐）

**Windows用户：**

1. **下载SSH工具**
   - 推荐：PuTTY 或 XShell
   - 或使用Windows自带的PowerShell

2. **连接服务器**
   ```powershell
   # 使用PowerShell连接
   ssh root@你的服务器公网IP
   ```

3. **输入密码**
   - 输入购买时设置的root密码
   - 密码不会显示，直接输入后按回车

**Mac/Linux用户：**

```bash
# 打开终端，输入以下命令
ssh root@你的服务器公网IP

# 输入密码
```

#### 获取服务器公网IP

1. 登录阿里云控制台
2. 进入"实例列表"
3. 查看"公网IP"列
4. 复制IP地址

---

### 第二步：上传代码到服务器

#### 方式一：使用Git（推荐）

```bash
# 1. 安装Git（如果未安装）
# Ubuntu
apt update && apt install -y git

# CentOS
yum install -y git

# 2. 克隆代码
cd /var/www
git clone https://github.com/你的用户名/goti.git

# 3. 进入项目目录
cd goti
```

#### 方式二：使用FTP工具上传

**Windows用户推荐：FileZilla**

1. **下载FileZilla**
   - 官网：https://filezilla-project.org/

2. **连接服务器**
   - 主机：sftp://你的服务器IP
   - 用户名：root
   - 密码：购买时设置的密码
   - 端口：22

3. **上传文件**
   - 左侧选择本地项目文件夹
   - 右侧进入 `/var/www/`
   - 拖拽上传整个项目

#### 方式三：使用SCP命令

```bash
# 在本地电脑执行（不是服务器上）
scp -r 本地项目路径 root@服务器IP:/var/www/goti

# 例如：
scp -r D:\project\trae\game1 root@123.45.67.89:/var/www/goti
```

---

### 第三步：一键部署

#### 使用自动化脚本（最简单）

```bash
# 1. 进入项目目录
cd /var/www/goti

# 2. 添加执行权限
chmod +x ali-deploy.sh

# 3. 运行部署脚本
./ali-deploy.sh
```

**脚本会自动完成：**
- ✅ 检测系统类型
- ✅ 更新系统
- ✅ 安装Node.js
- ✅ 安装PM2
- ✅ 安装项目依赖
- ✅ 构建项目
- ✅ 启动服务
- ✅ 配置防火墙

#### 手动部署（了解原理）

```bash
# 1. 更新系统
apt update && apt upgrade -y  # Ubuntu
# 或
yum update -y  # CentOS

# 2. 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs  # Ubuntu
# 或
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
yum install -y nodejs  # CentOS

# 3. 验证安装
node --version
npm --version

# 4. 安装PM2
npm install -g pm2

# 5. 进入项目目录
cd /var/www/goti

# 6. 安装依赖
npm install

# 7. 构建项目
npm run build

# 8. 启动服务
pm2 serve dist 3000 --name goti-frontend

# 9. 保存PM2配置
pm2 save
pm2 startup

# 10. 配置防火墙
ufw allow 3000  # Ubuntu
# 或
firewall-cmd --permanent --add-port=3000/tcp  # CentOS
firewall-cmd --reload
```

---

## 🌐 访问应用

部署完成后，通过以下地址访问：

```
http://你的服务器公网IP:3000
```

例如：
```
http://123.45.67.89:3000
```

---

## 🔧 常用管理命令

### PM2进程管理

```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs

# 重启服务
pm2 restart all

# 停止服务
pm2 stop all

# 删除服务
pm2 delete all

# 监控
pm2 monit
```

### 系统管理

```bash
# 查看系统资源
htop

# 查看磁盘空间
df -h

# 查看内存使用
free -h

# 查看端口占用
netstat -tulpn | grep 3000
```

---

## 🔒 安全配置（重要！）

### 1. 修改SSH端口

```bash
# 编辑SSH配置
nano /etc/ssh/sshd_config

# 找到并修改端口
Port 22  →  Port 2222

# 重启SSH服务
systemctl restart sshd
```

### 2. 配置防火墙

```bash
# Ubuntu (UFW)
ufw allow 2222/tcp  # SSH新端口
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # 应用端口
ufw enable

# CentOS (Firewalld)
firewall-cmd --permanent --add-port=2222/tcp
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --reload
```

### 3. 创建普通用户

```bash
# 创建用户
adduser goti

# 设置密码
passwd goti

# 添加sudo权限
usermod -aG sudo goti  # Ubuntu
# 或
usermod -aG wheel goti  # CentOS
```

---

## 🌍 配置域名（可选）

### 1. 域名解析

1. 登录域名服务商控制台
2. 添加A记录：
   - 主机记录：@ 或 www
   - 记录值：你的服务器IP
   - TTL：600

### 2. 安装Nginx

```bash
# Ubuntu
apt install -y nginx

# CentOS
yum install -y nginx
```

### 3. 配置Nginx

```bash
# 创建配置文件
nano /etc/nginx/sites-available/goti

# 添加以下内容：
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 启用配置
ln -s /etc/nginx/sites-available/goti /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重启Nginx
systemctl restart nginx
systemctl enable nginx
```

### 4. 配置HTTPS（免费SSL）

```bash
# 安装Certbot
apt install -y certbot python3-certbot-nginx  # Ubuntu
# 或
yum install -y certbot python3-certbot-nginx  # CentOS

# 获取SSL证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

---

## 📊 性能优化

### 1. 启用Gzip压缩

```bash
# 编辑Nginx配置
nano /etc/nginx/nginx.conf

# 添加Gzip配置
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;
```

### 2. 配置CDN加速

1. 开通阿里云CDN
2. 添加加速域名
3. 配置源站（你的服务器IP）
4. 修改域名解析到CDN

---

## 🔄 更新部署

### 更新代码

```bash
# 进入项目目录
cd /var/www/goti

# 拉取最新代码
git pull

# 重新安装依赖（如有更新）
npm install

# 重新构建
npm run build

# 重启服务
pm2 restart goti-frontend
```

---

## 🆘 故障排查

### 无法访问网站

```bash
# 1. 检查服务是否运行
pm2 status

# 2. 检查端口是否监听
netstat -tulpn | grep 3000

# 3. 检查防火墙
ufw status  # Ubuntu
firewall-cmd --list-all  # CentOS

# 4. 检查安全组
# 登录阿里云控制台 → 实例 → 安全组 → 添加规则
# 开放3000端口
```

### 服务启动失败

```bash
# 查看错误日志
pm2 logs goti-frontend

# 检查Node.js版本
node --version

# 检查依赖是否安装
ls node_modules
```

---

## ✅ 部署检查清单

- [ ] 成功连接服务器
- [ ] 代码上传完成
- [ ] Node.js安装成功
- [ ] 依赖安装完成
- [ ] 项目构建成功
- [ ] PM2服务启动
- [ ] 防火墙配置完成
- [ ] 可以通过IP访问
- [ ] 域名解析配置（可选）
- [ ] HTTPS证书配置（可选）

---

## 📞 需要帮助？

- 查看日志：`pm2 logs`
- 查看状态：`pm2 status`
- 重启服务：`pm2 restart all`
- 查看文档：[CLOUD-DEPLOYMENT.md](./CLOUD-DEPLOYMENT.md)

---

## 🎉 完成！

恭喜！你的GoTI应用已经成功部署！

**访问地址：**
```
http://你的服务器IP:3000
```

**下一步：**
- 配置域名和HTTPS
- 设置自动备份
- 配置监控告警
