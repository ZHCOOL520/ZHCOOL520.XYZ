# ZHCOOL520.XYZ

> 个人技术主页与作品集展示网站

![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-React%2FTypeScript-blue)
![GitHub stars](https://img.shields.io/github/stars/ZHCOOL520/ZHCOOL520.XYZ?style=social)

---

## 项目介绍

本仓库是一个基于 React + Vite 构建的现代化个人技术主页网站，用于展示作者的技术栈、项目作品、资源分享和个人信息。

网站采用现代化设计风格，包含玻璃态效果、流畅动画、响应式布局等特性，为访客提供良好的浏览体验。

---

## 功能特性

| 模块 | 功能说明 |
|------|----------|
| **首页** | 个人介绍、动态打字效果、粒子背景 |
| **技术栈** | 技能展示、分类标签、技能详情子页面 |
| **项目作品** | 项目卡片展示、详细介绍、GitHub 链接、在线演示 |
| **资源分享** | 游戏资源、软件工具、系统镜像、元数据 |
| **天真的资源** | 独立资源子页面，展示精选资源 |
| **联系我** | 社交媒体链接、邮箱联系方式 |

---

## 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| React | 前端框架 | ^18 |
| Vite | 构建工具 | ^5 |
| React Router | 路由管理 | ^6 |
| Tailwind CSS | 样式框架 | ^3 |
| GSAP | 动画库 | ^3 |
| react-icons | 图标库 | ^5 |
| react-markdown | Markdown 渲染 | ^9 |

---

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

---

## 项目结构

```
.
├── src/
│   ├── components/          # 公共组件
│   │   ├── shared/          # 共享组件
│   │   ├── Hero.jsx         # 首页横幅
│   │   ├── Navbar.jsx       # 导航栏
│   │   ├── Projects.jsx     # 项目展示
│   │   ├── Skills.jsx       # 技术栈
│   │   └── ...
│   ├── pages/               # 页面组件
│   │   ├── resources/       # 资源页面
│   │   ├── 2019Card.jsx     # 健康码纪念版入口
│   │   ├── SkillDetail.jsx  # 技能详情页
│   │   ├── TzResources.jsx  # 天真的资源页
│   │   └── ...
│   ├── context/             # React Context
│   ├── utils/               # 工具函数
│   ├── App.jsx              # 应用入口
│   ├── main.jsx             # React 渲染
│   └── index.css            # 全局样式
├── public/
│   └── 2019-card/           # 健康码纪念版静态页面
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
├── package.json             # 项目配置
└── README.md                # 本文件
```

---

## 部署说明

### GitHub Pages

本项目已配置 GitHub Actions 自动部署，推送代码到 `main` 分支后会自动构建并部署到 GitHub Pages。

访问地址：https://zhcool520.xyz

### 自定义部署

```bash
# 构建项目
npm run build

# 将 dist 目录部署到任意静态托管服务
# 如 Vercel、Netlify、Cloudflare Pages 等
```

---

## 开源协议

本项目采用 **MIT License**，详见 [LICENSE](LICENSE) 文件。

---

## 链接

- 网站：[https://zhcool520.xyz](https://zhcool520.xyz)
- GitHub：[https://github.com/ZHCOOL520/ZHCOOL520.XYZ](https://github.com/ZHCOOL520/ZHCOOL520.XYZ)

---

<div align="center">

**如果觉得不错，记得点个 ⭐ Star 支持一下~**

*本文档由 AI 生成*

</div>