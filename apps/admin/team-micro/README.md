# team-Micro 燃料电池汽车微应用

燃料电池汽车监控系统的微前端应用，基于 Vue 3 + TypeScript + Vite + Element Plus 开发。

## 功能特性

- 加氢站地图
  - 加氢站位置查找
  - 实时状态显示
  - 导航功能

- 燃料电池仪表盘
  - 氢气储量监控
  - 电堆状态监测
  - 系统温度监控
  - 性能趋势分析

## 开发环境

- Node.js >= 18
- pnpm >= 8
- Vue 3.5+
- TypeScript 5.8+

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
    ├── hydrogenMap/       # 加氢站地图
    └── fuelCellDashboard/ # 燃料电池仪表盘
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

## 开发工具

- 推荐使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 需要禁用 Vetur 插件以避免冲突

## 项目命令

### 开发调试
```sh
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 测试
```sh
# 单元测试
pnpm test:unit

# E2E测试
pnpm test:e2e:dev

# 代码检查
pnpm lint
```

## 相关文档

- [Vue 3 文档](https://cn.vuejs.org/)
- [Element Plus 组件库](https://element-plus.org/zh-CN/)
- [Vite 配置指南](https://vite.dev/config/)
- [Vitest 测试框架](https://vitest.dev/)
