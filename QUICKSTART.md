# 🚀 GoTI 快速开始指南

## 最简单的方式（推荐新手）

### 第一步：双击运行
```
双击 start-local.bat
```

### 第二步：等待启动
- 自动检查环境
- 自动安装依赖
- 自动打开浏览器

### 第三步：开始使用
浏览器会自动打开 http://localhost:3000，开始测试！

---

## 📋 三种启动方式

### 1️⃣ 本地数据模式（最简单）
```bash
双击运行: start-local.bat
```
**特点：** 无需服务器，开箱即用

### 2️⃣ API模式（含Mock服务器）
```bash
双击运行: start-with-api.bat
```
**特点：** 包含模拟API服务器，体验完整功能

### 3️⃣ 检查配置
```bash
双击运行: check-config.bat
```
**特点：** 检查环境和配置状态

---

## 🎯 选择指南

| 需求 | 推荐方式 | 启动脚本 |
|------|----------|----------|
| 快速体验 | 本地数据模式 | `start-local.bat` |
| 测试API功能 | API模式 | `start-with-api.bat` |
| 遇到问题 | 配置检查 | `check-config.bat` |

---

## ⚙️ 服务器要求

### 本地数据模式
- ✅ **无需服务器**
- ✅ 只需Node.js 16+

### API模式
- ✅ Node.js 16+
- ✅ 512MB内存
- ✅ 1GB存储

---

## 📝 配置信息

### 最简配置（本地模式）
创建 `.env.development` 文件：
```env
VITE_DATA_SOURCE=local
```

### API模式配置
```env
VITE_DATA_SOURCE=remote
VITE_API_BASE_URL=http://localhost:3001/api
```

---

## ❓ 常见问题

### Q: 双击.bat没反应？
**A:** 右键选择"以管理员身份运行"

### Q: 端口被占用？
**A:** 关闭其他占用3000/3001端口的程序

### Q: 如何切换模式？
**A:** 修改 `.env.development` 中的 `VITE_DATA_SOURCE`

---

## 📚 详细文档

- [DEPLOYMENT.md](./DEPLOYMENT.md) - 完整部署指南
- [CONFIG.md](./CONFIG.md) - 详细配置说明
- [README.md](./README.md) - 项目概览

---

## 🎉 开始使用

选择适合您的方式，开始体验 GoTI 人格测试吧！

**最简单的方式：**
```
双击 start-local.bat → 等待启动 → 开始测试
```

就这么简单！✨
