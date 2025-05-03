# ZeroSphere Web - 微前端应用

## 项目简介
ZeroSphere Web 是一个基于微前端架构的新能源汽车监控系统。该项目采用模块化设计，支持多个独立应用的协同运行。

## 技术栈
- 微前端框架：qiankun
- 主应用框架：Vue 3
- UI 框架：Element Plus
- 构建工具：Vite
- 包管理工具：pnpm
- 开发语言：TypeScript

## 项目结构
```
ZeroSphere-web/
├── packages/              # 子应用目录
│   ├── vehicle-main/     # 主应用 - 车辆监控中心
│   ├── race-micro/       # 纯电动汽车监控
│   ├── team-micro/       # 燃料电池汽车监控
│   ├── hev-micro/       # 混合动力汽车监控
│   └── hpv-micro/       # 插电式混动汽车监控
├── shared/               # 共享资源
├── package.json
├── pnpm-workspace.yaml   # pnpm workspace 配置文件
└── pnpm-lock.yaml       # pnpm 依赖锁定文件
```

## 快速开始

### 环境要求
- Node.js >= 18
- pnpm >= 8
- Vue >= 3.5
- TypeScript >= 5.8

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

# 启动主应用
pnpm dev:main

# 启动具体微应用
pnpm dev:race  # 纯电动汽车微应用
pnpm dev:team  # 燃料电池汽车微应用
pnpm dev:hev  # 混合动力汽车微应用
pnpm dev:hpv  # 插电式混动微应用
```

### 构建项目
```bash
# 构建所有应用
pnpm build

# 构建主应用
pnpm build:main

# 构建具体微应用
pnpm build:race
pnpm build:team
pnpm build:hev
pnpm build:hpv
```

### 常用开发命令
| 命令 | 说明 |
|------|------|
| pnpm bootstrap | 初始化项目，安装依赖并构建 |
| pnpm dev | 启动所有应用（开发模式） |
| pnpm dev:main | 启动主应用 |
| pnpm dev:{app} | 启动指定微应用 |
| pnpm build | 构建所有应用 |
| pnpm build:{app} | 构建指定微应用 |
| pnpm clean | 清理所有 node_modules |
| pnpm lint | 运行代码检查 |
| pnpm format | 格式化代码 |

## 开发指南
1. 主应用配置位于 `packages/vehicle-main`
2. 各微应用独立开发，通过 qiankun 框架集成
3. 遵循 TypeScript 类型规范
4. 使用 Element Plus 组件库
5. 保持代码风格一致，使用 ESLint 和 Prettier

## 贡献指南
1. Fork 本仓库
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

## 许可证
[MIT License](LICENSE)