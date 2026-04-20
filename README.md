# GoTI - MyGO 人格测试

一个精美的人格测试应用，用于评估你与《BanG Dream! It's MyGO!!!!!》系列中各个人物角色的人格匹配度。

## 🎯 功能特性

- 🎨 现代化的响应式界面设计
- ✨ 流畅的动画过渡效果
- 📝 20道精心设计的测试题目
- 👥 5个MyGO成员的人格档案
- 💾 本地存储进度保存功能
- 📱 移动端和桌面端完美适配
- 📤 结果分享功能

## 🚀 快速开始

### Windows 本地运行

**方式一：双击运行（推荐）**
```
双击 start-local.bat
```

**方式二：PowerShell**
```powershell
.\start-local.ps1
```

**方式三：命令行**
```bash
npm install
npm run dev
```

访问 http://localhost:3000

### Linux/Mac 本地运行

```bash
# 添加执行权限
chmod +x start-local.sh

# 运行脚本
./start-local.sh
```

### 生产构建

**Windows:**
```
双击 build.bat
```

**Linux/Mac:**
```bash
npm run build
```

## 📦 服务器部署

### 一键部署（推荐）

```bash
# 添加执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

部署脚本会自动：
- ✅ 检查并安装 Node.js
- ✅ 安装项目依赖
- ✅ 构建生产版本
- ✅ 使用 PM2 启动服务
- ✅ 配置开机自启

### 手动部署

#### 方式一：使用 PM2

```bash
# 1. 安装 PM2
npm install -g pm2

# 2. 构建项目
npm run build

# 3. 启动服务
pm2 serve dist 3000 --name goti-frontend

# 4. 保存 PM2 配置
pm2 save

# 5. 设置开机自启
pm2 startup
```

#### 方式二：使用 Nginx

```bash
# 1. 构建项目
npm run build

# 2. 配置 Nginx
# 将 dist 目录作为网站根目录
```

Nginx 配置示例：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/GoTI/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📁 项目结构

```
GoTI/
├── src/                    # 源代码
│   ├── api/               # API 接口
│   ├── components/        # React 组件
│   ├── config/           # 配置文件
│   ├── data/             # 静态数据
│   └── services/         # 数据服务
├── mock-server/           # API 模拟服务器（可选）
├── dist/                  # 构建输出（部署用）
├── start-local.bat        # Windows 一键启动 ⭐
├── start-local.ps1        # PowerShell 启动脚本
├── start-local.sh         # Linux/Mac 启动脚本
├── build.bat              # Windows 构建脚本
├── deploy.sh              # 服务器部署脚本 ⭐
├── .env.development       # 开发环境配置
├── .env.production        # 生产环境配置
├── .env.example           # 配置模板
├── package.json           # 项目配置
└── vite.config.js         # Vite 配置
```

## 🔧 配置说明

### 环境变量

项目支持两种数据源模式：

**本地模式**（默认，推荐）：
```env
VITE_DATA_SOURCE=local
```

**API 模式**：
```env
VITE_DATA_SOURCE=remote
VITE_API_BASE_URL=http://your-api-server:3001/api
```

### 配置文件

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置
- `.env.example` - 配置模板

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React

## 📝 使用说明

1. 在欢迎页面点击"开始测试"
2. 依次回答20道题目
3. 完成后查看你的角色匹配结果
4. 可以分享结果或重新测试

## 🌐 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
