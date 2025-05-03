# race-micro 纯电动汽车微应用

纯电动汽车监控系统的微前端应用，基于 Vue 3 + TypeScript + Vite + Element Plus 开发。

## 功能特性

- 充电站地图
  - 附近充电站查找
  - 实时充电状态
  - 导航功能

- 电池健康监控
  - 电池电量监测
  - 健康度评估
  - 性能指标分析
  - 温度监控系统

## 开发环境

- Node.js >= 18
- pnpm >= 8
- Vue 3.5+
- TypeScript 5.8+
- Vite 6.2+

## 项目结构
```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── router/         # 路由配置
├── stores/         # 状态管理
├── styles/         # 样式文件
└── views/          # 页面视图
    ├── home/              # 首页
    ├── superchargerMap/   # 充电站地图
    └── batteryHealth/     # 电池健康监控
```

## 微前端配置
- 使用 qiankun 作为微前端框架
- 应用入口配置在 vite.config.ts 中
- 生命周期配置在 src/main.ts 中
- 路由配置支持主应用下发

## 开发规范
1. 组件开发
   - 使用 Vue 3 组合式 API
   - 保持单文件组件结构清晰
   - 提取公共逻辑到 composables

2. 样式开发
   - 使用 SCSS 预处理器
   - 遵循 BEM 命名规范
   - 使用 Element Plus 变量系统

3. 类型规范
   - 所有组件props使用 TypeScript 类型定义
   - API 请求和响应需定义接口类型
   - 避免使用 any 类型

4. 代码质量
   - 提交前运行 ESLint 检查
   - 使用 Prettier 格式化代码
   - 编写单元测试用例

## 开发工具

- 推荐使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 需要禁用 Vetur 插件以避免冲突

## TypeScript 支持

- 使用 `vue-tsc` 替代 `tsc` 进行类型检查
- 配合 Volar 插件实现 `.vue` 文件的类型支持

## 项目命令

### 项目设置
```sh
# 安装依赖
pnpm install
```

### 开发调试
```sh
# 启动开发服务器
pnpm dev
```

### 构建部署
```sh
# 构建生产版本
pnpm build
```

### 测试
```sh
# 单元测试
pnpm test:unit

# E2E测试 - 开发环境
pnpm test:e2e:dev

# E2E测试 - 生产环境
pnpm test:e2e
```

### 代码检查
```sh
# 运行 ESLint
pnpm lint
```

## 相关文档

- [Vite 配置指南](https://vite.dev/config/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Element Plus 组件库](https://element-plus.org/zh-CN/)
- [Vitest 测试框架](https://vitest.dev/)
- [Cypress 测试工具](https://www.cypress.io/)
