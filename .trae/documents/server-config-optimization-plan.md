# GoTI 服务器配置文件优化计划

## 项目背景

当前 GoTI 人格测试应用使用本地静态数据（questions.js 和 characters.js）。为了提高灵活性和可维护性，需要实现服务器配置文件系统，使得可以通过修改配置文件来切换数据源（本地数据或远程API服务器）。

## 目标

1. 创建灵活的服务器配置文件系统
2. 支持多种环境配置（开发、测试、生产）
3. 支持本地数据和远程API两种数据源
4. 优化现有代码以支持配置化
5. 提供清晰的配置文档

## 实施步骤

### 第一阶段：配置文件系统设计

#### 1. 创建环境配置文件
- 创建 `.env.development` - 开发环境配置
- 创建 `.env.production` - 生产环境配置
- 创建 `.env.example` - 配置模板文件
- 配置内容包括：
  - API服务器地址
  - 数据源类型（local/remote）
  - 应用标题和描述
  - 其他环境变量

#### 2. 创建配置管理模块
- 创建 `src/config/index.js` - 统一配置管理
- 创建 `src/config/api.js` - API配置
- 创建 `src/config/app.js` - 应用配置
- 实现配置加载和验证逻辑

### 第二阶段：数据层重构

#### 3. 创建数据服务层
- 创建 `src/services/dataService.js` - 数据服务抽象层
- 实现本地数据加载器 `src/services/localDataLoader.js`
- 实现远程API数据加载器 `src/services/apiDataLoader.js`
- 统一数据接口，支持自动切换数据源

#### 4. 重构现有数据导入
- 修改 `src/App.jsx` 使用数据服务
- 更新组件以支持异步数据加载
- 添加加载状态和错误处理

### 第三阶段：API服务器支持（可选）

#### 5. 创建API接口定义
- 创建 `src/api/questions.js` - 题目API
- 创建 `src/api/characters.js` - 角色API
- 创建 `src/api/results.js` - 结果API（保存测试结果）
- 实现请求拦截器和响应拦截器

#### 6. 添加Mock服务器（开发用）
- 创建 `src/mock/server.js` - Mock服务器
- 创建 `src/mock/data/` - Mock数据
- 集成到开发环境

### 第四阶段：优化和文档

#### 7. 优化用户体验
- 添加配置加载状态显示
- 添加网络错误提示
- 实现数据缓存机制
- 添加离线支持

#### 8. 创建配置文档
- 更新 README.md 添加配置说明
- 创建 `CONFIG.md` 详细配置指南
- 添加配置示例和常见问题

## 配置文件结构设计

### .env 文件格式
```env
# 数据源配置
VITE_DATA_SOURCE=local  # local 或 remote

# API服务器配置（当 DATA_SOURCE=remote 时使用）
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

### 配置管理模块结构
```javascript
// src/config/index.js
export const config = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'local',
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  app: {
    title: import.meta.env.VITE_APP_TITLE,
    description: import.meta.env.VITE_APP_DESCRIPTION,
  },
  features: {
    resultSharing: import.meta.env.VITE_ENABLE_RESULT_SHARING === 'true',
    progressSave: import.meta.env.VITE_ENABLE_PROGRESS_SAVE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  }
}
```

### 数据服务接口设计
```javascript
// src/services/dataService.js
class DataService {
  async getQuestions() { ... }
  async getCharacters() { ... }
  async saveResult(result) { ... }
  async getCharacterById(id) { ... }
}
```

## 文件变更清单

### 新增文件
1. `.env.development` - 开发环境配置
2. `.env.production` - 生产环境配置
3. `.env.example` - 配置模板
4. `src/config/index.js` - 配置管理
5. `src/config/api.js` - API配置
6. `src/config/app.js` - 应用配置
7. `src/services/dataService.js` - 数据服务
8. `src/services/localDataLoader.js` - 本地数据加载
9. `src/services/apiDataLoader.js` - API数据加载
10. `src/api/index.js` - API客户端
11. `src/api/questions.js` - 题目API
12. `src/api/characters.js` - 角色API
13. `src/api/results.js` - 结果API
14. `CONFIG.md` - 配置文档

### 修改文件
1. `src/App.jsx` - 使用数据服务和配置
2. `src/components/WelcomePage.jsx` - 使用配置化的标题和描述
3. `src/components/ResultPage.jsx` - 支持可选的分享功能
4. `package.json` - 添加必要的依赖
5. `README.md` - 添加配置说明
6. `.gitignore` - 忽略 .env 文件

## 依赖项

### 新增依赖
- `axios` - HTTP客户端（用于API请求）
- `dotenv` - 环境变量管理（Vite已内置支持）

## 测试计划

1. **本地数据模式测试**
   - 验证默认配置下使用本地数据
   - 测试数据加载和显示

2. **远程API模式测试**
   - 配置API服务器地址
   - 测试数据获取和错误处理

3. **环境切换测试**
   - 测试开发环境配置
   - 测试生产环境配置
   - 验证环境变量正确加载

4. **功能开关测试**
   - 测试各功能开关的启用/禁用

## 风险和注意事项

1. **安全性**
   - 不要在配置文件中存储敏感信息
   - API密钥应使用环境变量注入

2. **兼容性**
   - 确保向后兼容现有本地数据模式
   - 提供平滑的迁移路径

3. **性能**
   - 实现数据缓存减少API调用
   - 优化配置加载时间

## 预期成果

1. 灵活的配置系统，支持多种部署场景
2. 清晰的配置文档和使用指南
3. 可扩展的数据服务架构
4. 完善的错误处理和用户提示
5. 为未来功能扩展奠定基础
