# GoTI 配置指南

本文档详细说明 GoTI 人格测试应用的配置方法和选项。

## 目录

- [环境配置](#环境配置)
- [配置文件说明](#配置文件说明)
- [数据源配置](#数据源配置)
- [功能开关](#功能开关)
- [API服务器配置](#api服务器配置)
- [常见问题](#常见问题)

## 环境配置

GoTI 使用 Vite 的环境变量系统，支持以下环境配置文件：

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置
- `.env.example` - 配置模板（用于参考）

### 创建配置文件

1. 复制 `.env.example` 文件：
   ```bash
   cp .env.example .env.development
   ```

2. 根据需要修改配置项

3. 重启开发服务器使配置生效

## 配置文件说明

### 完整配置示例

```env
# 数据源配置
VITE_DATA_SOURCE=local

# API服务器配置
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000

# 应用配置
VITE_APP_TITLE=GoTI 人格测试
VITE_APP_DESCRIPTION=MyGO 角色匹配度测试

# 功能开关
VITE_ENABLE_RESULT_SHARING=true
VITE_ENABLE_PROGRESS_SAVE=true
VITE_ENABLE_ANALYTICS=false
```

### 配置项详解

| 配置项 | 说明 | 默认值 | 可选值 |
|--------|------|--------|--------|
| `VITE_DATA_SOURCE` | 数据源类型 | `local` | `local`, `remote` |
| `VITE_API_BASE_URL` | API服务器地址 | `http://localhost:3001/api` | 任意URL |
| `VITE_API_TIMEOUT` | API请求超时时间（毫秒） | `10000` | 数字 |
| `VITE_APP_TITLE` | 应用标题 | `GoTI 人格测试` | 任意字符串 |
| `VITE_APP_DESCRIPTION` | 应用描述 | `MyGO 角色匹配度测试` | 任意字符串 |
| `VITE_ENABLE_RESULT_SHARING` | 启用结果分享 | `true` | `true`, `false` |
| `VITE_ENABLE_PROGRESS_SAVE` | 启用进度保存 | `true` | `true`, `false` |
| `VITE_ENABLE_ANALYTICS` | 启用数据分析 | `false` | `true`, `false` |

## 数据源配置

### 本地数据模式（默认）

使用本地静态数据文件（`src/data/` 目录）：

```env
VITE_DATA_SOURCE=local
```

**优点：**
- 无需后端服务器
- 部署简单
- 响应速度快

**适用场景：**
- 静态网站部署
- 快速原型开发
- 离线应用

### 远程API模式

使用远程API服务器获取数据：

```env
VITE_DATA_SOURCE=remote
VITE_API_BASE_URL=https://api.your-domain.com/api
```

**优点：**
- 数据集中管理
- 支持动态更新
- 可收集用户数据

**适用场景：**
- 需要数据分析
- 多端数据同步
- 内容管理系统

## 功能开关

### 结果分享功能

控制是否显示"分享结果"按钮：

```env
VITE_ENABLE_RESULT_SHARING=true  # 启用
VITE_ENABLE_RESULT_SHARING=false # 禁用
```

### 进度保存功能

控制是否保存用户答题进度：

```env
VITE_ENABLE_PROGRESS_SAVE=true  # 启用（使用 localStorage）
VITE_ENABLE_PROGRESS_SAVE=false # 禁用
```

### 数据分析功能

控制是否将测试结果发送到服务器：

```env
VITE_ENABLE_ANALYTICS=true  # 启用（需要配置API服务器）
VITE_ENABLE_ANALYTICS=false # 禁用
```

## API服务器配置

### API端点要求

当使用远程API模式时，服务器需要提供以下端点：

#### 获取题目列表
```
GET /api/questions
```

响应格式：
```json
[
  {
    "id": 1,
    "question": "问题文本",
    "options": [
      { "text": "选项A", "weights": { "anon": 3, "rana": 2 } },
      { "text": "选项B", "weights": { "anon": 1, "rana": 3 } }
    ]
  }
]
```

#### 获取角色列表
```
GET /api/characters
```

响应格式：
```json
{
  "anon": {
    "id": "anon",
    "name": "角色名",
    "nickname": "昵称",
    "color": "#FF69B4",
    "description": "描述",
    "personality": ["特点1", "特点2"],
    "strengths": "优势",
    "weaknesses": "劣势",
    "idealMatch": "理想伙伴"
  }
}
```

#### 保存测试结果（可选）
```
POST /api/results
```

请求体：
```json
{
  "topMatch": { ... },
  "allMatches": [ ... ],
  "scores": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### CORS配置

API服务器需要配置CORS以允许跨域请求：

```javascript
// Express.js 示例
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
```

## 常见问题

### Q: 如何切换数据源？

A: 修改 `.env.development` 或 `.env.production` 文件中的 `VITE_DATA_SOURCE` 配置项，然后重启开发服务器。

### Q: 配置修改后不生效？

A: Vite 的环境变量在构建时注入，修改配置后需要：
- 开发环境：重启开发服务器
- 生产环境：重新构建项目

### Q: 如何查看当前配置？

A: 在代码中导入并打印配置对象：

```javascript
import config from './config'
console.log(config)
```

### Q: 如何添加新的配置项？

A: 
1. 在 `.env` 文件中添加配置（必须以 `VITE_` 开头）
2. 在 `src/config/index.js` 中读取配置
3. 重启开发服务器

### Q: 生产环境配置如何设置？

A: 创建 `.env.production` 文件，Vite 在构建时会自动使用该文件：

```bash
npm run build  # 使用 .env.production
npm run dev    # 使用 .env.development
```

### Q: 如何保护敏感配置？

A: 
- 不要在前端配置中存储敏感信息（如API密钥）
- 使用后端代理处理需要认证的请求
- `.env` 文件已添加到 `.gitignore`，不会被提交到版本控制

## 配置最佳实践

1. **开发环境**：使用本地数据模式，快速迭代
2. **测试环境**：使用远程API模式，测试真实场景
3. **生产环境**：根据需求选择数据源，启用必要功能

4. **版本控制**：
   - 提交 `.env.example` 作为配置模板
   - 不要提交 `.env.development` 和 `.env.production`

5. **团队协作**：
   - 在文档中说明所需配置项
   - 提供配置示例和默认值

## 技术支持

如有问题，请查看：
- [README.md](./README.md) - 项目概览
- [项目Issues](https://github.com/your-repo/issues) - 问题反馈
