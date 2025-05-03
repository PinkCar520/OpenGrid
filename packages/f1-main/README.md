# Vehicle-Main 新能源汽车监控平台主应用

基于 Vue 3 + TypeScript + Element Plus 开发的新能源汽车监控平台主应用，负责微应用的管理和集成。

## 功能特性

- 微应用管理
  - 动态加载微应用
  - 应用间通信
  - 路由分发

- 系统管理
  - 用户管理
  - 角色管理
  - 权限管理

## 项目结构
```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── config/          # 配置文件
│   └── loadedMicroAppLifeCycle.ts  # 微应用生命周期
├── router/          # 路由配置
├── stores/          # 状态管理
├── styles/          # 样式文件
└── views/           # 页面视图
    ├── Dashboard/   # 工作台
    └── system/      # 系统管理
```

## 微前端管理

- 基于 qiankun 框架
- 支持的微应用：
  - race：纯电动汽车
  - team：燃料电池汽车
  - HEV：混合动力汽车
  - HPV：插电式混动汽车

## 开发环境

- Node.js >= 18
- pnpm >= 8
- Vue 3.5+
- TypeScript 5.8+
- Vite 6.2+

## 开发工具

- 推荐使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 需要禁用 Vetur 插件

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
- [qiankun 微前端](https://qiankun.umijs.org/zh)
- [Vite 配置](https://cn.vitejs.dev/)
