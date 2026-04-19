# GoTI 部署操作指南

本文档提供 GoTI 人格测试应用的完整部署和启动指南。

## 📋 目录

- [快速开始](#快速开始)
- [部署模式](#部署模式)
- [服务器要求](#服务器要求)
- [配置信息清单](#配置信息清单)
- [一键启动脚本](#一键启动脚本)
- [常见问题](#常见问题)

## 🚀 快速开始

### 最简单的方式（本地数据模式）

**无需服务器，开箱即用！**

1. 双击运行 `start-local.bat`
2. 自动打开浏览器访问 http://localhost:3000
3. 开始使用！

就这么简单！默认配置使用本地数据，无需任何服务器。

## 📦 部署模式

GoTI 支持两种部署模式：

### 模式一：本地数据模式（推荐新手）

**特点：**
- ✅ 无需后端服务器
- ✅ 部署简单，开箱即用
- ✅ 可部署到任何静态网站托管
- ✅ 响应速度快

**适用场景：**
- 个人使用
- 静态网站托管（GitHub Pages、Vercel、Netlify等）
- 快速演示

**启动方式：**
```bash
# 方式1：使用批处理脚本
start-local.bat

# 方式2：手动启动
npm install
npm run dev
```

### 模式二：远程API模式（高级用户）

**特点：**
- ✅ 数据集中管理
- ✅ 支持动态更新内容
- ✅ 可收集用户数据
- ✅ 支持多端同步

**适用场景：**
- 需要数据分析
- 内容需要频繁更新
- 多平台数据同步
- 企业级应用

**启动方式：**
```bash
# 方式1：使用批处理脚本（包含Mock服务器）
start-with-api.bat

# 方式2：手动启动
# 终端1：启动API服务器
cd mock-server
npm install
npm start

# 终端2：启动前端
npm install
npm run dev
```

## 🖥️ 服务器要求

### 本地数据模式

**无需服务器！** 只需要：
- Node.js 16+ （开发环境）
- 任何静态网站托管服务（生产环境）

### 远程API模式

#### 最低配置
- CPU: 1核
- 内存: 512MB
- 存储: 1GB
- 带宽: 1Mbps

#### 推荐配置
- CPU: 2核
- 内存: 1GB
- 存储: 5GB
- 带宽: 5Mbps

#### 软件要求
- Node.js 16+ 或
- Python 3.8+ 或
- 任何支持HTTP API的后端语言

#### 支持的服务器类型
- 云服务器（阿里云、腾讯云、AWS等）
- VPS
- 本地服务器
- Serverless（云函数）

## 📝 配置信息清单

### 本地数据模式配置

创建 `.env.development` 文件：

```env
# 数据源：使用本地数据
VITE_DATA_SOURCE=local

# 应用标题（可选）
VITE_APP_TITLE=GoTI 人格测试

# 应用描述（可选）
VITE_APP_DESCRIPTION=MyGO 角色匹配度测试

# 功能开关
VITE_ENABLE_RESULT_SHARING=true
VITE_ENABLE_PROGRESS_SAVE=true
VITE_ENABLE_ANALYTICS=false
```

### 远程API模式配置

创建 `.env.development` 文件：

```env
# 数据源：使用远程API
VITE_DATA_SOURCE=remote

# API服务器地址（必填）
VITE_API_BASE_URL=http://your-server.com/api

# API超时时间（可选，默认10秒）
VITE_API_TIMEOUT=10000

# 应用标题（可选）
VITE_APP_TITLE=GoTI 人格测试

# 功能开关
VITE_ENABLE_RESULT_SHARING=true
VITE_ENABLE_PROGRESS_SAVE=true
VITE_ENABLE_ANALYTICS=true  # 启用数据分析
```

### API服务器需要提供的端点

| 端点 | 方法 | 说明 | 是否必需 |
|------|------|------|----------|
| `/api/questions` | GET | 获取题目列表 | ✅ 必需 |
| `/api/characters` | GET | 获取角色列表 | ✅ 必需 |
| `/api/results` | POST | 保存测试结果 | ⚠️ 可选 |

#### API响应格式

**获取题目列表：**
```json
[
  {
    "id": 1,
    "question": "在团队活动中，你更倾向于：",
    "options": [
      {
        "text": "主动组织和领导大家",
        "weights": { "anon": 3, "rana": 2, "tomori": 0, "takamatsu": 1, "soyo": 2 }
      },
      {
        "text": "积极配合，提供支持",
        "weights": { "anon": 1, "rana": 1, "tomori": 2, "takamatsu": 2, "soyo": 3 }
      }
    ]
  }
]
```

**获取角色列表：**
```json
{
  "anon": {
    "id": "anon",
    "name": "高松灯",
    "nickname": "Anon",
    "color": "#FF69B4",
    "description": "热情开朗的吉他手",
    "personality": ["热情洋溢", "善于社交"],
    "strengths": "社交能力强",
    "weaknesses": "有时过于冲动",
    "idealMatch": "充满活力的人"
  }
}
```

## 🔧 一键启动脚本

我们提供了多个批处理脚本，方便快速启动：

### 1. start-local.bat - 本地数据模式启动

**功能：**
- 自动检查Node.js环境
- 自动安装依赖
- 启动开发服务器
- 自动打开浏览器

**使用方法：**
```bash
双击运行 start-local.bat
```

### 2. start-with-api.bat - API模式启动（含Mock服务器）

**功能：**
- 启动Mock API服务器
- 启动前端开发服务器
- 自动配置环境变量
- 自动打开浏览器

**使用方法：**
```bash
双击运行 start-with-api.bat
```

### 3. check-config.bat - 配置检查工具

**功能：**
- 检查Node.js环境
- 检查配置文件
- 验证API连接
- 显示当前配置

**使用方法：**
```bash
双击运行 check-config.bat
```

## 🌐 生产环境部署

### 静态网站托管（本地数据模式）

#### GitHub Pages
```bash
# 1. 修改 vite.config.js
base: '/your-repo-name/'

# 2. 构建
npm run build

# 3. 部署到 gh-pages 分支
```

#### Vercel / Netlify
```bash
# 1. 连接Git仓库
# 2. 设置构建命令: npm run build
# 3. 设置输出目录: dist
# 4. 自动部署
```

### 服务器部署（API模式）

#### 使用PM2部署
```bash
# 1. 安装PM2
npm install -g pm2

# 2. 启动API服务器
cd mock-server
pm2 start server.js --name goti-api

# 3. 构建并启动前端
npm run build
pm2 serve dist 3000 --name goti-frontend

# 4. 查看状态
pm2 status
```

#### 使用Docker部署
```bash
# 构建镜像
docker build -t goti-app .

# 运行容器
docker run -d -p 3000:3000 goti-app
```

## ❓ 常见问题

### Q1: 双击.bat文件没反应？

**A:** 可能是PowerShell执行策略限制，解决方法：
1. 右键点击.bat文件
2. 选择"以管理员身份运行"
3. 或者在PowerShell中执行：
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```

### Q2: 端口被占用怎么办？

**A:** 修改配置文件中的端口号：
- 前端：修改 `vite.config.js` 中的 `server.port`
- API：修改 `.env` 文件中的 `VITE_API_BASE_URL`

### Q3: 如何切换数据源？

**A:** 修改 `.env.development` 文件：
```env
# 本地数据
VITE_DATA_SOURCE=local

# 或远程API
VITE_DATA_SOURCE=remote
VITE_API_BASE_URL=http://your-api-server.com/api
```
然后重启开发服务器。

### Q4: Mock服务器是什么？

**A:** Mock服务器是一个模拟的API服务器，用于开发和测试。它不需要真实的后端，可以快速启动并返回测试数据。

### Q5: 如何查看当前使用的配置？

**A:** 运行配置检查脚本：
```bash
check-config.bat
```
或在浏览器控制台中输入：
```javascript
console.log(config)
```

### Q6: 生产环境如何配置？

**A:** 创建 `.env.production` 文件，Vite会自动使用：
```bash
npm run build  # 使用 .env.production
npm run dev    # 使用 .env.development
```

### Q7: 如何更新题目和角色数据？

**A:** 
- **本地模式**：直接编辑 `src/data/questions.js` 和 `src/data/characters.js`
- **API模式**：更新API服务器返回的数据

### Q8: 支持HTTPS吗？

**A:** 支持！在生产环境中：
- 使用Nginx/Apache配置SSL证书
- 或使用云服务商的HTTPS功能
- Vercel/Netlify自动提供HTTPS

## 📞 获取帮助

- 查看 [CONFIG.md](./CONFIG.md) 了解详细配置
- 查看 [README.md](./README.md) 了解项目概览
- 提交Issue反馈问题

## 🎯 快速决策树

```
开始
  │
  ├─ 只是想快速体验？
  │   └─ 使用本地数据模式
  │       └─ 运行 start-local.bat
  │
  ├─ 需要部署到静态网站？
  │   └─ 使用本地数据模式
  │       └─ npm run build
  │
  ├─ 需要收集用户数据？
  │   └─ 使用API模式
  │       └─ 部署API服务器 + 前端
  │
  └─ 需要动态更新内容？
      └─ 使用API模式
          └─ 部署API服务器 + 前端
```

选择适合您的模式，开始使用吧！🚀
