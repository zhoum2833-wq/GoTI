# 🌐 GoTI 云服务器部署指南

## 📊 云服务器推荐对比

### 🏆 推荐排名

| 排名 | 云服务商 | 推荐度 | 优势 | 适用场景 |
|------|----------|--------|------|----------|
| 1️⃣ | **阿里云** | ⭐⭐⭐⭐⭐ | 国内速度快、稳定、文档全 | 国内用户首选 |
| 2️⃣ | **腾讯云** | ⭐⭐⭐⭐⭐ | 性价比高、活动多 | 预算有限 |
| 3️⃣ | **华为云** | ⭐⭐⭐⭐ | 安全性强、企业级 | 企业应用 |
| 4️⃣ | **Vercel** | ⭐⭐⭐⭐⭐ | 免费托管、自动部署 | 静态网站 |
| 5️⃣ | **Netlify** | ⭐⭐⭐⭐⭐ | 免费托管、功能丰富 | 静态网站 |

---

## 🎯 阿里云部署方案（推荐）

### ✅ 为什么选择阿里云？

1. **国内访问速度快** - 节点遍布全国
2. **稳定性高** - 99.9%可用性保证
3. **文档完善** - 中文文档详细
4. **技术支持好** - 7x24小时客服
5. **价格合理** - 新用户优惠多
6. **生态完整** - 配套服务齐全

### 💰 阿里云配置推荐

#### 方案一：轻量应用服务器（推荐新手）

**配置：**
- CPU: 2核
- 内存: 2GB
- 存储: 60GB SSD
- 带宽: 3Mbps
- **价格：约 60-100元/月**

**优势：**
- ✅ 开箱即用
- ✅ 自带面板
- ✅ 操作简单
- ✅ 性价比高

#### 方案二：ECS云服务器（推荐进阶）

**配置：**
- CPU: 2核
- 内存: 4GB
- 存储: 40GB SSD
- 带宽: 5Mbps
- **价格：约 100-200元/月**

**优势：**
- ✅ 性能更强
- ✅ 配置灵活
- ✅ 可扩展性好
- ✅ 适合长期使用

#### 方案三：函数计算FC（推荐省钱）

**配置：**
- 按需付费
- 无需购买服务器
- **价格：约 0-50元/月**

**优势：**
- ✅ 按使用付费
- ✅ 自动扩缩容
- ✅ 无需运维
- ✅ 成本最低

---

## 🚀 阿里云部署步骤

### 方式一：轻量应用服务器部署

#### 第一步：购买服务器

1. 访问 [阿里云官网](https://www.aliyun.com/)
2. 注册/登录账号
3. 选择"轻量应用服务器"
4. 选择配置：
   - 地域：离用户最近的区域
   - 镜像：Ubuntu 20.04 或 CentOS 7.9
   - 套餐：2核2GB即可

#### 第二步：连接服务器

**Windows用户：**
```bash
# 使用阿里云控制台的远程连接
# 或使用SSH工具（如PuTTY）
ssh root@你的服务器IP
```

**Mac/Linux用户：**
```bash
ssh root@你的服务器IP
```

#### 第三步：安装环境

```bash
# 更新系统
yum update -y  # CentOS
# 或
apt update && apt upgrade -y  # Ubuntu

# 安装Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
yum install -y nodejs  # CentOS
# 或
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs  # Ubuntu

# 验证安装
node --version
npm --version

# 安装PM2（进程管理）
npm install -g pm2
```

#### 第四步：上传代码

**方式1：使用Git（推荐）**
```bash
# 安装Git
yum install -y git  # CentOS
# 或
apt-get install -y git  # Ubuntu

# 克隆代码
cd /var/www
git clone https://github.com/你的用户名/goti.git
cd goti
```

**方式2：使用FTP工具**
- 使用FileZilla等FTP工具
- 上传整个项目文件夹到 `/var/www/goti`

#### 第五步：部署应用

**本地数据模式：**
```bash
cd /var/www/goti

# 安装依赖
npm install

# 构建生产版本
npm run build

# 使用PM2启动静态服务器
pm2 serve dist 3000 --name goti-frontend

# 保存PM2配置
pm2 save
pm2 startup
```

**API模式：**
```bash
# 启动API服务器
cd /var/www/goti/mock-server
npm install
pm2 start server.js --name goti-api

# 启动前端
cd /var/www/goti
npm run build
pm2 serve dist 3000 --name goti-frontend

# 保存PM2配置
pm2 save
pm2 startup
```

#### 第六步：配置域名和SSL（可选）

**安装Nginx：**
```bash
yum install -y nginx  # CentOS
# 或
apt-get install -y nginx  # Ubuntu
```

**配置Nginx：**
```nginx
# /etc/nginx/conf.d/goti.conf
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

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**启动Nginx：**
```bash
nginx -t  # 测试配置
systemctl start nginx
systemctl enable nginx
```

**配置SSL证书（免费）：**
```bash
# 安装Certbot
yum install -y certbot python3-certbot-nginx  # CentOS
# 或
apt-get install -y certbot python3-certbot-nginx  # Ubuntu

# 获取免费SSL证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

---

### 方式二：Vercel/Netlify部署（免费）

#### Vercel部署（推荐）

**优势：**
- ✅ 完全免费
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 自动部署

**步骤：**

1. **推送代码到GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/goti.git
git push -u origin main
```

2. **连接Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub登录
   - 点击"Import Project"
   - 选择你的GitHub仓库
   - 点击"Deploy"

3. **配置构建设置**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **完成部署**
   - 自动获得域名：`your-project.vercel.app`
   - 可绑定自定义域名

#### Netlify部署

**步骤类似Vercel：**
1. 访问 [netlify.com](https://www.netlify.com)
2. 连接GitHub仓库
3. 配置构建设置
4. 自动部署

---

## 💡 部署方案选择建议

### 根据需求选择

```
你的需求
  │
  ├─ 只是想快速上线展示？
  │   └─ 使用 Vercel/Netlify（免费）
  │       - 零成本
  │       - 自动部署
  │       - 无需服务器
  │
  ├─ 需要API功能？
  │   ├─ 用户量小（<1000人/天）
  │   │   └─ 阿里云轻量服务器
  │   │       - 成本低
  │   │       - 操作简单
  │   │
  │   └─ 用户量大（>1000人/天）
  │       └─ 阿里云ECS + 负载均衡
  │           - 性能强
  │           - 可扩展
  │
  ├─ 预算有限？
  │   └─ Vercel/Netlify + 阿里云函数计算
  │       - 几乎零成本
  │       - 按需付费
  │
  └─ 企业级应用？
      └─ 阿里云ECS集群
          - 高可用
          - 专业运维
```

---

## 📊 成本对比

| 方案 | 月成本 | 年成本 | 适用场景 |
|------|--------|--------|----------|
| Vercel/Netlify | 0元 | 0元 | 静态网站、个人项目 |
| 阿里云函数计算 | 0-50元 | 0-600元 | 低流量API |
| 阿里云轻量服务器 | 60-100元 | 720-1200元 | 小型应用 |
| 阿里云ECS | 100-200元 | 1200-2400元 | 中型应用 |
| 阿里云集群 | 500+元 | 6000+元 | 大型应用 |

---

## 🎯 推荐方案

### 新手推荐：Vercel + 阿里云函数计算

**优势：**
- ✅ 前端免费托管在Vercel
- ✅ API部署在阿里云函数计算
- ✅ 总成本几乎为零
- ✅ 无需服务器运维

**步骤：**
1. 前端部署到Vercel（免费）
2. API部署到阿里云函数计算（按需付费）
3. 配置跨域和域名

### 进阶推荐：阿里云轻量服务器

**优势：**
- ✅ 一站式解决方案
- ✅ 操作简单
- ✅ 成本可控
- ✅ 适合学习

**步骤：**
1. 购买轻量服务器
2. 安装Node.js环境
3. 部署应用
4. 配置域名和SSL

---

## 🔧 阿里云部署脚本

为了简化部署，我创建了一个自动化部署脚本：

```bash
#!/bin/bash
# ali-deploy.sh - 阿里云一键部署脚本

echo "================================"
echo "GoTI 阿里云部署脚本"
echo "================================"

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "安装Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    yum install -y nodejs
fi

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "安装PM2..."
    npm install -g pm2
fi

# 安装依赖
echo "安装项目依赖..."
npm install

# 构建项目
echo "构建项目..."
npm run build

# 启动服务
echo "启动服务..."
pm2 serve dist 3000 --name goti-frontend

# 保存PM2配置
pm2 save
pm2 startup

echo "================================"
echo "部署完成！"
echo "访问地址: http://你的服务器IP:3000"
echo "================================"
```

---

## 📞 阿里云技术支持

- **官方文档：** https://help.aliyun.com/
- **工单系统：** 控制台提交工单
- **电话支持：** 95187
- **社区论坛：** https://developer.aliyun.com/

---

## ✅ 总结

**阿里云完全适合部署GoTI！**

**推荐配置：**
- 新手：轻量应用服务器（2核2GB）
- 进阶：ECS云服务器（2核4GB）
- 省钱：Vercel + 函数计算

**最佳实践：**
1. 前端部署到Vercel（免费）
2. API部署到阿里云（按需）
3. 使用CDN加速
4. 配置HTTPS证书

需要详细的部署指导，我可以提供一对一帮助！
