# HEV-Micro 混合动力汽车微应用

混合动力汽车监控系统的微前端应用，基于 Vue 3 + TypeScript + Vite + Element Plus 开发。

## 功能特性

- 发动机状态监控
  - 实时运行状态显示
  - 性能指标监测
  - 运行日志记录

- 电池系统监控
  - 电池电量监测
  - 电池组状态监控
  - 能量流向分析

## 开发环境

- Node.js >= 18
- pnpm >= 8
- Vue 3.5+
- TypeScript 5.8+
- Vite 6.2+

## 快速开始

1. 安装依赖:
```sh
pnpm install
```

2. 启动开发服务器:
```sh
pnpm dev
```

3. 构建生产版本:
```sh
pnpm build
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── hooks/          # 组合式函数
├── locales/        # 国际化资源
├── router/         # 路由配置
├── stores/         # 状态管理
├── styles/         # 样式文件
└── views/          # 页面视图
    ├── home/              # 首页
    ├── engineStatus/      # 发动机状态
    └── batteryStatus/     # 电池状态
```

## 微前端配置
- 基于 qiankun 微前端框架
- 入口配置：vite.config.ts
- 生命周期：src/main.ts
- 支持主应用路由下发
- 使用 Element Plus 命名空间隔离样式

## 开发规范

1. 代码规范
   - 使用 Vue 3 组合式 API
   - TypeScript 类型检查
   - ESLint + Prettier 代码格式化

2. 样式规范
   - SCSS 预处理器
   - BEM 命名规范
   - Element Plus 变量系统

3. 组件开发
   - 单一职责原则
   - Props 类型声明
   - 组件文档注释

## 开发工具

- 推荐使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 禁用 Vetur 插件

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

### 测试和代码检查
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
- [Element Plus](https://element-plus.org/zh-CN/)
- [Vite 配置](https://cn.vitejs.dev/)
- [qiankun 微前端](https://qiankun.umijs.org/zh)
