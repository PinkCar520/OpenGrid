# ZeroSphere Web - 微前端应用

## 项目简介
ZeroSphere Web 是一个基于微前端架构的现代化 Web 应用。该项目采用模块化设计，支持多个独立应用的协同运行。

## 技术栈
- 微前端框架：qiankun
- 主应用框架：Vue 3
- 构建工具：Vite
- 包管理工具：pnpm

## 项目结构
```
ZeroSphere-web/
├── packages/           # 子应用目录
│   ├── vehicle-main/          # 主应用
│   └── ... 
├── shared/            # 共享资源
├── package.json
├── pnpm-workspace.yaml # pnpm workspace 配置文件
├── pnpm-lock.yaml     # pnpm 依赖锁定文件
```

## 快速开始

### 环境要求
- Node.js >= 16
- pnpm >= 7

### 初始化项目
```bash
# 安装所有依赖并构建项目
pnpm bootstrap

# 如需清理所有 node_modules
pnpm clean
```

### 开发模式
```bash
# 启动所有应用
pnpm dev

# 只启动主应用
pnpm dev:main

# 只启动保险微应用
pnpm dev:ins
```

### 构建项目
```bash
# 构建所有应用
pnpm build

# 只构建主应用
pnpm build:main

# 只构建保险微应用
pnpm build:ins
```

### 常用开发命令
| 命令 | 说明 |
|------|------|
| pnpm bootstrap | 初始化项目，安装依赖并构建 |
| pnpm dev | 启动所有应用（开发模式） |
| pnpm dev:main | 只启动主应用 |
| pnpm dev:ins | 只启动保险微应用 |
| pnpm build | 构建所有应用 |
| pnpm clean | 清理所有 node_modules |

## 开发指南
1. 主应用配置位于 `packages/main`
2. 新增子应用请遵循项目规范创建
3. 共享资源统一放置在 `shared` 目录

## 贡献指南
1. Fork 本仓库
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

## 许可证
[MIT License](LICENSE)