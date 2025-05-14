# HPV-Micro 插电式混动汽车微应用

插电式混动汽车监控系统的微前端应用，基于 Vue 3 + TypeScript + Vite + Element Plus 开发。

## 功能特性

- 动力系统监控
  - 发动机状态监测
  - 电机状态监控
  - 动力分配分析

- 充电状态监控
  - 电池电量显示
  - 充电模式管理
  - 充电计划设置

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
    ├── powerSystem/       # 动力系统监控
    └── chargingStatus/    # 充电状态监控
```

## 微前端配置
- 基于 qiankun 微前端框架
- 入口配置：vite.config.ts
- 生命周期：src/main.ts
- 支持主应用路由下发
- 使用命名空间隔离样式 (hpv)

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
