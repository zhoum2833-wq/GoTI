# GoTI - MyGO 人格测试

一个精美的人格测试应用，用于评估你与《BanG Dream! It's MyGO!!!!!》系列中各个人物角色的人格匹配度。

## 🚀 快速开始

**最简单的方式：双击运行 `start-local.bat`**

详细指南请查看：[QUICKSTART.md](./QUICKSTART.md)

## 功能特性

- 🎨 现代化的响应式界面设计
- ✨ 流畅的动画过渡效果
- 📝 20道精心设计的测试题目
- 👥 5个MyGO成员的人格档案
- 💾 本地存储进度保存功能
- 📱 移动端和桌面端完美适配
- 📤 结果分享功能
- 📊 直观的匹配度展示
- ⚙️ 灵活的配置系统

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Framer Motion（动画）
- Lucide React（图标）

## 安装和运行

### 前置要求

- Node.js 16 或更高版本
- npm 或 yarn 或 pnpm

### 安装步骤

1. 首先，以管理员身份打开PowerShell，执行以下命令来临时允许脚本运行：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

2. 然后安装项目依赖：

```bash
npm install
```

3. 配置环境变量（可选）：

```bash
cp .env.example .env.development
```

4. 启动开发服务器：

```bash
npm run dev
```

5. 在浏览器中打开显示的URL（通常是 http://localhost:3000）

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
game1/
├── src/
│   ├── api/                    # API接口定义
│   │   ├── index.js           # API客户端
│   │   ├── questions.js       # 题目API
│   │   ├── characters.js      # 角色API
│   │   └── results.js         # 结果API
│   ├── components/             # React组件
│   │   ├── WelcomePage.jsx    # 欢迎页面
│   │   ├── QuestionPage.jsx   # 题目页面
│   │   ├── ResultPage.jsx     # 结果页面
│   │   └── ProgressBar.jsx    # 进度条组件
│   ├── config/                 # 配置管理
│   │   ├── index.js           # 主配置
│   │   ├── api.js             # API配置
│   │   └── app.js             # 应用配置
│   ├── data/                   # 静态数据
│   │   ├── questions.js       # 测试题目数据
│   │   └── characters.js      # 人物档案数据
│   ├── services/               # 数据服务
│   │   ├── dataService.js     # 数据服务抽象层
│   │   ├── localDataLoader.js # 本地数据加载器
│   │   └── apiDataLoader.js   # API数据加载器
│   ├── App.jsx                # 主应用组件
│   ├── main.jsx               # 应用入口
│   └── index.css              # 全局样式
├── .env.development            # 开发环境配置
├── .env.production             # 生产环境配置
├── .env.example                # 配置模板
├── CONFIG.md                   # 配置文档
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 使用说明

1. 在欢迎页面点击"开始测试"
2. 依次回答20道题目，选择最符合你的选项
3. 可以使用"上一题"和"下一题"按钮导航
4. 完成所有题目后查看你的匹配结果
5. 可以分享结果或重新测试

## 主要功能说明

### 进度保存
测试进度会自动保存到本地存储中，如果中途关闭页面，再次访问时可以继续测试。

### 人格匹配算法
基于每个问题的选项权重，计算与各个角色的匹配得分，最终展示匹配百分比。

### 分享功能
支持使用系统原生分享功能，或者复制结果到剪贴板。

## 配置说明

GoTI 支持灵活的配置系统，可以通过修改配置文件来切换数据源、调整功能开关等。

### 快速配置

1. 复制配置模板：
   ```bash
   cp .env.example .env.development
   ```

2. 修改配置项：
   ```env
   # 使用本地数据（默认）
   VITE_DATA_SOURCE=local
   
   # 或使用远程API
   VITE_DATA_SOURCE=remote
   VITE_API_BASE_URL=https://api.your-domain.com/api
   ```

3. 重启开发服务器

### 主要配置项

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_DATA_SOURCE` | 数据源类型（local/remote） | `local` |
| `VITE_API_BASE_URL` | API服务器地址 | `http://localhost:3001/api` |
| `VITE_APP_TITLE` | 应用标题 | `GoTI 人格测试` |
| `VITE_ENABLE_RESULT_SHARING` | 启用结果分享 | `true` |
| `VITE_ENABLE_PROGRESS_SAVE` | 启用进度保存 | `true` |
| `VITE_ENABLE_ANALYTICS` | 启用数据分析 | `false` |

### 数据源模式

**本地数据模式**（默认）：
- 使用 `src/data/` 目录下的静态数据
- 无需后端服务器
- 适合静态部署

**远程API模式**：
- 从API服务器获取数据
- 支持动态更新
- 需要配置API服务器

详细配置说明请查看 [CONFIG.md](./CONFIG.md)。

## 云服务器部署

### 快速选择

| 需求 | 推荐方案 | 成本 |
|------|----------|------|
| 预算有限 | Vercel（免费） | 0元/月 |
| 国内用户 | 阿里云轻量服务器 | 60-100元/月 |
| 企业应用 | 阿里云ECS | 100+元/月 |

详细对比请查看 [CLOUD-CHOICE.md](./CLOUD-CHOICE.md)

### 阿里云部署（推荐国内用户）

**为什么选择阿里云？**
- ✅ 国内访问速度快
- ✅ 稳定性高（99.9%可用性）
- ✅ 中文文档完善
- ✅ 技术支持好

**一键部署：**
```bash
# 在阿里云服务器上运行
bash ali-deploy.sh
```

详细步骤请查看 [CLOUD-DEPLOYMENT.md](./CLOUD-DEPLOYMENT.md)

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
