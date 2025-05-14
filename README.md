# ZeroSphere Web - 微前端 SaaS 系统

## 项目简介
ZeroSphere Web 是一个基于微前端架构的现代化 SaaS 系统。该项目采用模块化设计，支持多个独立应用的协同运行，提供完整的开发、构建和部署解决方案。

## 技术栈
- 微前端框架：qiankun
- 前端框架：Vue 3 + TypeScript
- UI 框架：Element Plus
- 构建工具：Vite + Turborepo
- 包管理工具：pnpm
- 后端框架：NestJS
- 数据库：PostgreSQL + Prisma
- 开发语言：TypeScript

## 项目结构
```
zeroSphere-web/
├── apps/                # 前端应用目录
│   ├── admin/          # 管理后台
│   └── portal/         # 门户网站
├── packages/           # 共享包目录
│   ├── ui/            # UI 组件库
│   ├── utils/         # 工具函数
│   └── types/         # 类型定义
├── services/          # 后端服务目录
│   ├── auth/          # 认证服务
│   ├── user/          # 用户服务
│   └── common/        # 公共服务
├── package.json       # 项目配置
├── turbo.json         # Turborepo 配置
├── pnpm-workspace.yaml # pnpm workspace 配置
└── .npmrc            # npm 配置
```

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.15.0
- PostgreSQL >= 14
- TypeScript >= 5.3.3

### 安装依赖
```bash
# 安装所有依赖
pnpm install

# 清理依赖和缓存
pnpm clean
```

### 开发模式
```bash
# 启动所有应用
pnpm dev

# 启动管理后台
pnpm dev:admin

# 启动门户网站
pnpm dev:portal

# 启动后端服务
pnpm dev:services
```

### 构建项目
```bash
# 构建所有应用
pnpm build

# 构建管理后台
pnpm build:admin

# 构建门户网站
pnpm build:portal

# 构建后端服务
pnpm build:services
```

### 数据库操作
```bash
# 生成 Prisma 客户端
pnpm db:generate

# 推送数据库变更
pnpm db:push

# 打开 Prisma Studio
pnpm db:studio
```

### 常用开发命令
| 命令 | 说明 |
|------|------|
| pnpm install | 安装所有依赖 |
| pnpm dev | 启动所有应用（开发模式） |
| pnpm build | 构建所有应用 |
| pnpm lint | 运行代码检查 |
| pnpm format | 格式化代码 |
| pnpm test | 运行测试 |
| pnpm clean | 清理依赖和缓存 |
| pnpm changeset | 创建变更集 |
| pnpm version | 更新版本号 |
| pnpm release | 发布包 |

## 开发指南

### 前端开发
1. 使用 Vue 3 + TypeScript 开发
2. 遵循组件化开发原则
3. 使用 Element Plus 组件库
4. 保持代码风格一致，使用 ESLint 和 Prettier

### 后端开发
1. 使用 NestJS 框架
2. 遵循模块化设计
3. 使用 Prisma 进行数据库操作
4. 实现 RESTful API

### 共享包开发
1. UI 组件库位于 `packages/ui`
2. 工具函数位于 `packages/utils`
3. 类型定义位于 `packages/types`

## 项目规范
1. 代码风格：使用 ESLint + Prettier
2. 提交规范：使用 Changesets
3. 类型检查：使用 TypeScript
4. 测试规范：使用 Vitest

## 贡献指南
1. Fork 本仓库
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

## 许可证
[MIT License](LICENSE)