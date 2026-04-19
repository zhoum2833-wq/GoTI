# 🎯 GoTI 操作说明总结

## ✅ 已创建的工具和文档

### 📚 文档文件
1. **QUICKSTART.md** - 快速开始指南（最简单）
2. **DEPLOYMENT.md** - 详细部署操作指南
3. **CONFIG.md** - 配置详细说明
4. **README.md** - 项目概览（已更新）

### 🔧 一键启动脚本
1. **start-local.bat** - 本地数据模式一键启动
2. **start-with-api.bat** - API模式一键启动（含Mock服务器）
3. **check-config.bat** - 配置检查工具

### 🖥️ Mock服务器
1. **mock-server/server.js** - Mock API服务器
2. **mock-server/package.json** - Mock服务器依赖配置
3. **mock-server/README.md** - Mock服务器使用说明

---

## 🎮 如何操作（三步走）

### 方式一：本地数据模式（推荐新手）

#### 操作步骤：
```
1. 双击 start-local.bat
2. 等待自动安装依赖和启动
3. 浏览器自动打开，开始使用
```

#### 特点：
- ✅ 无需任何服务器
- ✅ 无需配置
- ✅ 开箱即用
- ✅ 最简单的方式

---

### 方式二：API模式（体验完整功能）

#### 操作步骤：
```
1. 双击 start-with-api.bat
2. 等待自动启动Mock服务器和前端
3. 浏览器自动打开，开始使用
```

#### 特点：
- ✅ 包含模拟API服务器
- ✅ 支持数据保存
- ✅ 体验完整功能
- ✅ 适合开发和测试

---

### 方式三：遇到问题时

#### 操作步骤：
```
1. 双击 check-config.bat
2. 查看环境和配置状态
3. 根据提示解决问题
```

---

## 🖥️ 服务器要求

### 本地数据模式
| 项目 | 要求 |
|------|------|
| 服务器 | ❌ 无需服务器 |
| Node.js | ✅ 16+ |
| 内存 | 任意 |
| 存储 | 500MB |

### API模式
| 项目 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 1核 | 2核 |
| 内存 | 512MB | 1GB |
| 存储 | 1GB | 5GB |
| Node.js | 16+ | 18+ |

---

## 📝 配置信息清单

### 本地数据模式配置
创建 `.env.development` 文件：
```env
# 必需配置
VITE_DATA_SOURCE=local

# 可选配置
VITE_APP_TITLE=GoTI 人格测试
VITE_APP_DESCRIPTION=MyGO 角色匹配度测试
VITE_ENABLE_RESULT_SHARING=true
VITE_ENABLE_PROGRESS_SAVE=true
VITE_ENABLE_ANALYTICS=false
```

### API模式配置
创建 `.env.development` 文件：
```env
# 必需配置
VITE_DATA_SOURCE=remote
VITE_API_BASE_URL=http://localhost:3001/api

# 可选配置
VITE_API_TIMEOUT=10000
VITE_APP_TITLE=GoTI 人格测试
VITE_APP_DESCRIPTION=MyGO 角色匹配度测试
VITE_ENABLE_RESULT_SHARING=true
VITE_ENABLE_PROGRESS_SAVE=true
VITE_ENABLE_ANALYTICS=true
```

---

## 🔌 API服务器端点要求

### 必需端点
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/questions` | GET | 获取题目列表 |
| `/api/characters` | GET | 获取角色列表 |

### 可选端点
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/results` | POST | 保存测试结果 |

---

## 🎯 使用场景决策树

```
开始
  │
  ├─ 只是想快速体验？
  │   └─ 双击 start-local.bat
  │
  ├─ 想测试API功能？
  │   └─ 双击 start-with-api.bat
  │
  ├─ 遇到问题？
  │   └─ 双击 check-config.bat
  │
  ├─ 需要部署到生产环境？
  │   └─ 查看 DEPLOYMENT.md
  │
  └─ 需要详细配置？
      └─ 查看 CONFIG.md
```

---

## 📖 文档导航

| 文档 | 用途 | 适合人群 |
|------|------|----------|
| **QUICKSTART.md** | 快速开始 | 所有人 |
| **DEPLOYMENT.md** | 详细部署 | 运维人员 |
| **CONFIG.md** | 详细配置 | 开发人员 |
| **README.md** | 项目概览 | 所有人 |

---

## ⚡ 一键启动对比

| 启动方式 | 脚本 | 服务器 | 配置 | 适用场景 |
|----------|------|--------|------|----------|
| 本地模式 | `start-local.bat` | ❌ 不需要 | 自动 | 快速体验 |
| API模式 | `start-with-api.bat` | ✅ Mock服务器 | 自动 | 完整功能 |
| 配置检查 | `check-config.bat` | - | - | 故障排查 |

---

## 🎉 开始使用

**推荐新手：**
```
双击 start-local.bat → 等待启动 → 开始测试
```

就这么简单！🚀

---

## 💡 提示

1. **首次运行**：会自动安装依赖，需要等待几分钟
2. **端口占用**：确保3000和3001端口未被占用
3. **权限问题**：右键选择"以管理员身份运行"
4. **配置修改**：修改 `.env.development` 后需重启服务器

---

## 📞 获取帮助

- 查看 [QUICKSTART.md](./QUICKSTART.md) 快速开始
- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 详细部署
- 查看 [CONFIG.md](./CONFIG.md) 详细配置
- 运行 `check-config.bat` 检查环境
