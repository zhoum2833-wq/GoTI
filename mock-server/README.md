# GoTI Mock API Server

这是一个简单的Mock API服务器，用于开发和测试GoTI人格测试应用。

## 快速启动

### 方式1：使用批处理脚本（推荐）

```bash
# 在项目根目录运行
start-with-api.bat
```

这将自动启动Mock服务器和前端开发服务器。

### 方式2：手动启动

```bash
# 安装依赖
npm install

# 启动服务器
npm start
```

服务器将在 http://localhost:3001 启动

## API端点

### 获取题目列表
```
GET /api/questions
```

响应示例：
```json
[
  {
    "id": 1,
    "question": "在团队活动中，你更倾向于：",
    "options": [...]
  }
]
```

### 获取角色列表
```
GET /api/characters
```

响应示例：
```json
{
  "anon": {
    "id": "anon",
    "name": "高松灯",
    ...
  }
}
```

### 保存测试结果
```
POST /api/results
```

请求体：
```json
{
  "topMatch": {...},
  "allMatches": [...],
  "scores": {...},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 健康检查
```
GET /api/health
```

## 数据来源

Mock服务器使用 `src/data/` 目录下的静态数据：
- 题目数据：`src/data/questions.js`
- 角色数据：`src/data/characters.js`

修改这些文件可以更新Mock服务器返回的数据。

## 注意事项

- 这是一个开发用的Mock服务器，不适合生产环境
- 数据保存在内存中，重启服务器后会丢失
- 如需生产环境部署，请使用真实的后端服务器
