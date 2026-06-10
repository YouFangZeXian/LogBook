# 路格舶 LogBook.today — 完整设计文档

> **版本**：v0.2.0  
> **最后更新**：2026-06-10  
> **技术栈**：Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui (base-nova) + TypeScript

---

## 目录

1. [项目概述](#1-项目概述)
2. [设计理念](#2-设计理念)
3. [品牌系统](#3-品牌系统)
4. [信息架构](#4-信息架构)
5. [视觉设计系统](#5-视觉设计系统)
6. [组件库](#6-组件库)
7. [页面设计规范](#7-页面设计规范)
8. [交互设计规范](#8-交互设计规范)
9. [暗色模式](#9-暗色模式)
10. [认证系统](#10-认证系统)
11. [航线系统](#11-航线系统)
12. [内容管理](#12-内容管理)
13. [技术实现](#13-技术实现)
14. [部署与运维](#14-部署与运维)
15. [待办与路线图](#15-待办与路线图)

---

## 1. 项目概述

### 1.1 项目定位

**路格舶 Logbook.today** 是一个面向 AI 时代出海新手的实用信息站。它的核心定位是：

> **AI 时代的设备出海新手村 + 船员航海日志社区**

不是泛 AI 工具导航站，不是新闻聚合站，不是课程销售页。而是一个以"设备 → 状态 → 航线 → 补给"为逻辑主线的结构化指南库。

### 1.2 目标用户

| 用户画像 | 特征 | 核心需求 |
|---------|------|---------|
| 学生个人开发者 | 预算有限、设备单一、刚接触 AI 工具 | 低成本的 AI 工具组合、合法支付路径 |
| 出海新人 | 从未使用海外 AI 服务、网络/账号/支付都空白 | 从零开始的完整出海路线 |
| 进阶探索者 | 已能用部分 AI 工具、想拓展更多工具和玩法 | 新工具发现、支付优化、社区交流 |
| 独立开发者 | 有编程基础、想做 AI 应用或工具 | Vibe Coding 路线、部署方案、变现思路 |

### 1.3 核心价值主张

1. **不制造焦虑**：不写"再不学 AI 就晚了"，不承诺收益
2. **按设备和状态出发**：不是看 100 篇攻略，而是按你的具体情况生成路线
3. **合法可持续**：只整理合法、可长期复用的经验，不碰灰色路径
4. **社区共建**：用户可投稿、补充、纠错，早期贡献者将继承高级船员身份

---

## 2. 设计理念

### 2.1 航海隐喻

整个网站以**大航海时代**作为核心隐喻：

| 概念 | 隐喻 | 说明 |
|------|------|------|
| 用户 | 船员 | 每个注册用户都是船员，拥有航海里程 |
| AI 出海 | 航海 | 使用海外 AI 工具的过程被视为出海航行 |
| 设备 | 船只 | Windows/Mac/iPhone/Android 是不同的船 |
| 航线 | 路线图 | 按设备和状态生成的步骤序列 |
| 航路 | 教程文档 | 具体问题的解决手册 |
| 船坞 | 工具库 | AI 工具的发现和分类区 |
| 补给站 | 资源中心 | 账号、支付、订阅的解决方案 |
| 新大陆 | 发现流 | 新工具、新玩法、新渠道 |
| 投稿 | 航海日志 | 用户贡献的内容 |
| 首页 | 港口大厅 | 信息聚合的入口 |

### 2.2 设计原则

1. **职责单一**：每个页面只做一件事，用户可以立刻理解"这个页面是干什么的"
2. **层级清晰**：首页 → 登船 → 航线 → 航路，从宏观到微观，从选择到执行
3. **边界明确**：工具发现（船坞）≠ 支付资源（补给站）≠ 新鲜资讯（新大陆）
4. **克制商业化**：不接支付、不强行推销、所有 affiliate 链接需标注
5. **可访问性**：暗色模式支持、语义化 HTML、合理的色相对比度

### 2.3 页面职责矩阵

```
          广度（发现）  ← →  深度（教程）
          ─────────────────────────
          新大陆           航路
          船坞             补给站
          首页             航线
                           登船指南

          横轴：从内容聚合到深度教程
          纵轴：从通用发现到个人任务
```

---

## 3. 品牌系统

### 3.1 品牌名称

**路格舶** — 三个字各有含义：

| 字 | 释义 | 品牌含义 |
|----|------|---------|
| 路 | 路径 | 找到属于你自己的出海路线 |
| 格 | 格物 | 把每个工具、每种支付的细节搞清楚 |
| 舶 | 远洋之船 | 一群人一起出海，比一个人孤船更安全 |

英文名 **LogBook.today**：LogBook = 航海日志，.today = 记录当下。

### 3.2 品牌口号

- 主标语：**舶来四海之物**
- 副标语：**寻未知路；格世界物；舶四海途。**
- 尾标语：**记录 AI 时代的舶海日志。**

### 3.3 品牌调性

- **信任感** > 营销感
- **实用** > 花哨
- **温暖** > 冰冷
- **专业** > 随意
- **克制** > 夸张

### 3.4 品牌色彩

```
品牌主色：
  深海蓝  #0f3d5e  — 信任、专业、海洋
  海天蓝  #4ea8c7  — 活力、链接、晴朗
  
辅助色：
  沙滩金  #c8a96a  — 温暖、荣誉、发现
  沙色    #f2e7d2  — 柔和、背景
  
功能色：
  成功绿  #47b881  — 完成、通过
  警告橙  #f59e0b  — 注意、风险
  危险红  #ef4444  — 禁止、危险操作
```

---

## 4. 信息架构

### 4.1 侧边栏导航结构

```
路格舶
│
├── 主航道 ──────────────────
│   ├── 首页        →  /
│   ├── 登船指南    →  /start
│   ├── 航线        →  /routes
│   └── 航路        →  /category
│
├── 工具与补给 ──────────────
│   ├── 船坞        →  /tools
│   ├── 补给站      →  /resources
│   ├── 新大陆      →  /discoveries
│   └── 产品        →  /products
│
└── 日志与船员 ──────────────
    ├── 投稿        →  /contribute
    ├── 船员        →  /crew
    └── 关于        →  /about
```

### 4.2 页面职责定义（五层约束）

#### 首页 `/`
| 维度 | 内容 |
|------|------|
| **定位** | 港口大厅 — 信息聚合入口 |
| **核心问题** | 用户回到路格舶，今天有什么值得看？ |
| **主要内容** | 欢迎横幅、今日风向（最新文章 x3）、最新新大陆（精选 x2）、快速入口 x4、站点公告 |
| **不应该放** | 完整设备选择流程、大量教程正文、完整航线步骤、大面积工具导航 |
| **页面气质** | 活跃、更新、信息流、港口大厅 |

#### 登船指南 `/start`
| 维度 | 内容 |
|------|------|
| **定位** | 交互登船面板 — 选设备、定状态、生成航线 |
| **核心问题** | 我是新手，我该从哪里开始？ |
| **主要内容** | 设备选择（Win/Mac/iPhone/Android + Android 品牌细分）、状态选择（5 级出海状态）、航线预览、设备舱管理 |
| **不应该放** | 首页资讯流、工具推荐、社区内容 |
| **页面气质** | 仪式感、引导、选择、生成 |

#### 航线 `/routes`
| 维度 | 内容 |
|------|------|
| **定位** | 任务面板 — 管理和执行航线 |
| **核心问题** | 我已经有航线了，现在继续做哪一步？ |
| **主要内容** | 多设备航线列表、完成度追踪、步骤标记完成、继续上次进度、推荐航线 |
| **不应该放** | 设备选择器、首页资讯、完整文章库 |
| **页面气质** | 任务路线、进度管理、继续完成 |

#### 航路 `/category`
| 维度 | 内容 |
|------|------|
| **定位** | 结构化教程库 / 文档中心 |
| **核心问题** | 我想直接查某个具体问题怎么做？ |
| **主要内容** | 6 大分类（AI 订阅、海外支付、Apple ID、开发工具、学生方案、避坑）的文章索引 |
| **不应该放** | 个人航线进度、首页热议信息流 |
| **页面气质** | 手册、教程、查询、解决问题 |

#### 船坞 `/tools`
| 维度 | 内容 |
|------|------|
| **定位** | AI 工具发现区 |
| **核心问题** | 我已经能出海了，有什么工具值得探索？ |
| **主要内容** | 10 大分类（AI 开发/搜索/音乐/视频/设计/办公/自动化/变现/独立开发/海外服务）、12+ 工具卡片（含适用人群、免费额度、访问条件）、计算器入口 |
| **不应该放** | 支付教程正文、设备出海步骤、个人航线进度 |
| **页面气质** | 工具发现、探索、分类、船坞 |

#### 补给站 `/resources`
| 维度 | 内容 |
|------|------|
| **定位** | 账号、支付、订阅补给中心 |
| **核心问题** | 卡在账号/支付/订阅怎么办？ |
| **主要内容** | 8 大补给分类（Apple Gift Card、外区 Apple ID、Google 账号、虚拟卡、香港卡、订阅失败排查、优惠渠道、工具订阅对比）、计算器、风险提示 |
| **不应该放** | 泛 AI 工具列表、社区帖子流、首页热议内容 |
| **页面气质** | 补给、支付、账号、风险提示 |

#### 新大陆 `/discoveries`
| 维度 | 内容 |
|------|------|
| **定位** | 新工具、新玩法、新机会发现流 |
| **核心问题** | 最近有什么新东西？ |
| **主要内容** | 10 条发现卡片（含类别标签、时间标签、品牌标识） |
| **与首页区别** | 首页只展示精选 2 条，这里展示完整发现流 |
| **页面气质** | 发现、动态、趋势、探索 |

#### 产品 `/products`
| 维度 | 内容 |
|------|------|
| **定位** | 商业化入口（早期占位） |
| **核心问题** | 路格舶有什么可以买/合作/支持的？ |
| **主要内容** | 产品卡片（状态 + 价格带 + 亮点 + 联系方式） |
| **页面气质** | 克制商业化、可信、预告 |

#### 投稿 `/contribute`
| 维度 | 内容 |
|------|------|
| **定位** | 用户贡献入口 / 社区种子 |
| **核心问题** | 我有东西想交给船舱，怎么做？ |
| **主要内容** | 7 种投稿类型、投稿表单、提交成功反馈（QQ群/站长联系/早期权益）、投稿指南 |
| **页面气质** | 邀请、贡献、温暖、船员感 |

#### 船员 `/crew`
| 维度 | 内容 |
|------|------|
| **定位** | 身份体系 + 个人设置 |
| **核心问题** | 谁在贡献？我的身份是什么？ |
| **主要内容** | 船员身份展示、等级体系（7 级）、个人设置（名称/语言/通知）、登出/注销 |
| **页面气质** | 身份、荣誉、贡献、社区铺垫 |

#### 关于 `/about`
| 维度 | 内容 |
|------|------|
| **定位** | 品牌介绍 + 规则 + 边界 + 信任页 |
| **核心问题** | 这个网站是什么？靠谱吗？不做什么？ |
| **主要内容** | 品牌释义（路·格·舶）、5 条内容原则、5 条"不做什么"、联系方式、免责声明 |
| **页面气质** | 可信、坦诚、边界清晰 |

---

## 5. 视觉设计系统

### 5.1 设计风格

**Apple × Notion 极简航海风** — 大量留白、克制的色彩、柔和的圆角、清晰的层级。融合 Apple 的精致感和 Notion 的实用主义。

### 5.2 色彩系统

#### 浅色模式

```css
/* 背景层级 */
--bg-primary:    #fafaf7;   /* 页面底色（暖白） */
--bg-secondary:  #f7f8fa;   /* 次级背景（浅灰蓝） */
--bg-tertiary:   #f3f7f8;   /* 三级背景 */
--bg-white:      #ffffff;   /* 卡片表面 */

/* 文字层级 */
--text-primary:   #172033;   /* 主文字（近黑） */
--text-secondary: #667085;   /* 次要文字（灰） */
--text-tertiary:  #98a2b3;   /* 辅助文字（浅灰） */

/* 边框 */
--border-light:   rgba(15,61,94,0.12);  /* 浅边框 */
--border-medium:  rgba(15,61,94,0.20);  /* 中边框 */

/* 品牌 */
--brand-deep:  #0f3d5e;   /* 深海蓝 */
--brand-sea:   #4ea8c7;   /* 海天蓝 */
--brand-mist:  #eaf6f8;   /* 雾蓝背景 */
```

#### 深色模式

```css
/* 背景层级 */
--bg-primary:    #0f172a;   /* 页面底色（深海军蓝） */
--bg-secondary:  #1a2332;   /* 次级背景 */
--bg-white:      #1a2332;   /* 卡片表面 */

/* 文字层级 */
--text-primary:   #e2e8f0;   /* 主文字（浅灰白） */
--text-secondary: #94a3b8;   /* 次要文字 */
--text-tertiary:  #64748b;   /* 辅助文字 */

/* 边框 */
--border-light:   rgba(148,163,184,0.16);  /* 浅边框 */
--border-medium:  rgba(148,163,184,0.26);  /* 中边框 */
```

### 5.3 圆角系统

```
--radius-sm:   10px    →  标签、小按钮、输入框内边距
--radius-md:   16px    →  按钮、卡片内容、分隔区域
--radius-lg:   22px    →  卡片、面板
--radius-xl:   28px    →  大型容器
--radius-2xl:  36px    →  弹窗
--radius-3xl:  44px    →  大弹窗
--radius-4xl:  52px    →  特大容器
```

### 5.4 阴影系统

```css
/* 浅色 */
--shadow-card:       0 1px 3px rgba(15,61,94,0.06), 0 1px 2px rgba(15,61,94,0.04);
--shadow-card-hover: 0 4px 16px rgba(15,61,94,0.10), 0 2px 6px rgba(15,61,94,0.06);
--shadow-modal:      0 20px 60px rgba(15,61,94,0.16);

/* 深色 */
--shadow-card:       0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.25);
--shadow-card-hover: 0 4px 16px rgba(0,0,0,0.40), 0 2px 6px rgba(0,0,0,0.30);
--shadow-modal:      0 20px 60px rgba(0,0,0,0.50);
```

### 5.5 字体系统

```
字体栈（Sans）：
  "Inter", "SF Pro Display", "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif

字体栈（Mono）：
  "SF Mono", "JetBrains Mono", "IBM Plex Mono", "Cascadia Mono",
  ui-monospace, monospace

正文字号级联：
  .heading-hero:    clamp(2.5rem, 5vw, 4rem)    → 首页大标题
  .heading-section: clamp(1.5rem, 2.5vw, 2rem)  → 段落标题
  .heading-card:    1.125rem                      → 卡片标题
  .body-text:       0.9375rem / 1.75 line-height  → 正文
  .body-sm:         0.8125rem                      → 小字正文
  .kicker:          0.6875rem / uppercase          → 分类标签（等宽字体）
```

### 5.6 间距系统

```
页面级：
  .page-shell: max-width 1200px, padding-inline 1rem (sm:1.5rem, lg:2rem)
  section gap: 1.25rem-2rem (space-y-5 ~ space-y-8)

组件级：
  卡片内边距: p-5 (1.25rem) ~ p-8 (2rem)
  按钮内边距: px-4 py-2 (标准) / py-3 (全宽)
  元素间距: gap-2 ~ gap-4
```

### 5.7 侧边栏选中状态

| 模式 | 框选颜色 | 背景色 | 图标色 |
|------|---------|--------|--------|
| 浅色 | `hsl(215 70% 45%)` 深蓝环 | `hsl(215 70% 92%)` 浅蓝 | `hsl(215 70% 40%)` |
| 深色 | `hsl(42 65% 42%)` 深金环 | `hsl(42 30% 18%)` 深金 | `hsl(42 65% 55%)` 金色 |

实现方式：`box-shadow: inset 0 0 0 2px <color>` 环形框选，非填充背景。

---

## 6. 组件库

### 6.1 shadcn/ui 组件（`components/ui/`）

| 组件 | 用途 |
|------|------|
| `avatar` | 用户头像 |
| `button` | 基础按钮 |
| `card` | 卡片容器 |
| `collapsible` | 折叠面板 |
| `dropdown-menu` | 下拉菜单 |
| `field` | 表单字段组（含 FieldLabel, FieldDescription, FieldSeparator, FieldError） |
| `input` | 输入框 |
| `label` | 表单标签 |
| `separator` | 分隔线 |
| `sidebar` | 侧边栏系统（含 Provider, Trigger, Menu, MenuButton, MenuSub 等全套） |
| `sheet` | 抽屉面板 |
| `skeleton` | 骨架屏 |
| `tooltip` | 工具提示 |

### 6.2 业务组件（`components/`）

| 组件 | 文件 | 类型 | 用途 |
|------|------|------|------|
| `SiteShell` | `site-shell.tsx` | Client | 全局布局壳（SidebarProvider + AuthDialog + SearchDrawer + WelcomeDialog） |
| `SiteHeader` | `site-header.tsx` | Client | 顶部导航栏（面包屑标题、主题切换、搜索、登船按钮） |
| `SiteSidebar` | `site-sidebar.tsx` | Client | 侧边栏（品牌头、NavMain、用户区） |
| `SiteFooter` | `site-footer.tsx` | Server | 页脚 |
| `NavMain` | `nav-main.tsx` | Client | 主导航菜单（可折叠三段式） |
| `NavSecondary` | `nav-secondary.tsx` | — | 次要导航（已废弃，保留备用） |
| `NavUser` | `nav-user.tsx` | Client | 侧边栏用户区（popover 小卡片：头像+名字 → 船员档案 → 登出） |
| `HomeExperience` | `home-experience.tsx` | Client | 首页港口大厅（欢迎横幅 + 快速入口 + 今日风向 + 新大陆精选 + 公告） |
| `VoyagePlanner` | `voyage-planner.tsx` | Client | 登船面板（设备选择 + 状态选择 + 航线预览 + 启航动画） |
| `RouteCenter` | `route-center.tsx` | Client | 航线任务面板（多设备航线列表 + 完成度追踪） |
| `DeviceDock` | `device-dock.tsx` | Client | 设备舱管理（添加/编辑/删除设备卡片） |
| `AuthDialog` | `auth-dialog.tsx` | Client | 登录/注册弹窗（localStorage 认证） |
| `WelcomeDialog` | `welcome-dialog.tsx` | Client | 首次访问欢迎弹窗 |
| `SearchDrawer` | `search-drawer.tsx` | Client | 全站搜索抽屉 |
| `ContributionPanel` | `contribution-panel.tsx` | Client | 投稿表单（7 种类型 + 提交反馈） |
| `CrewProfilePage` | `crew-profile-page.tsx` | Client | 船员档案页（身份展示 + 等级 + 设置 + 登出/注销） |
| `CrewProfile` | `crew-profile.tsx` | Client | 旧版船员组件（保留兼容） |
| `ArticleCard` | `article-card.tsx` | Server | 文章卡片 |
| `ArticleToc` | `article-toc.tsx` | Server | 文章目录 |
| `CategoryCard` | `category-card.tsx` | Server | 分类卡片 |
| `ResourceCard` | `resource-card.tsx` | Server | 资源卡片 |
| `BrandMark` | `brand-mark.tsx` | Server | 品牌标识（图标 + 标签） |
| `ToolsPageContent` | `tools-page-content.tsx` | Client | 船坞页内容（分类筛选 + 工具卡片网格 + 计算器入口） |
| `ThemeToggle` | `theme-toggle.tsx` | Client | 主题切换按钮 |
| `MdxComponents` | `mdx-components.tsx` | Server | MDX 渲染组件映射 |
| `tools/*` | `components/tools/` | Client | 计算器组件（GiftCardCalculator, SubscriptionCostCalculator, PlanComparisonTable） |

### 6.3 自定义 CSS 类

| 类名 | 用途 |
|------|------|
| `.page-shell` | 页面内容容器（max-width + 响应式 padding） |
| `.surface` | 卡片面板（白底 + 边框 + 阴影 + hover 效果） |
| `.surface-panel` | 同 surface（别名） |
| `.surface-muted` | 次级卡片（灰底 + 无阴影 + hover 边框） |
| `.surface-mist` | 品牌色卡片（雾蓝底 + 品牌色边框） |
| `.surface-sand` | 暖色卡片（沙色底 + 金色边框） |
| `.btn-primary` | 主按钮（深蓝底白字） |
| `.btn-secondary` | 次级按钮（白底蓝字边框） |
| `.btn-ghost` | 幽灵按钮（透明 + hover 灰底） |
| `.btn-mist` | 品牌按钮（雾蓝底蓝字） |
| `.heading-hero` | Hero 标题（特大 + 紧凑字距） |
| `.heading-section` | 段落标题（大 + 紧凑字距） |
| `.heading-card` | 卡片标题 |
| `.kicker` | 分类标签文字（小号大写等宽） |
| `.body-text` | 正文 |
| `.body-sm` | 小字正文 |
| `.tag` | 标签 |
| `.tag-brand` / `.tag-success` / `.tag-warning` / `.tag-gold` | 彩色标签变体 |
| `.input-field` | 表单输入框 |
| `.divider` | 分隔线 |
| `.hide-scrollbar` | 隐藏滚动条 |
| `.prose-rich` | 文章阅读样式（Notion-like） |

---

## 7. 页面设计规范

### 7.1 Hero 区域规范

每个内容页面顶部使用 `grid lg:grid-cols-[1.04fr_0.96fr]` 两栏布局：

- **左栏**（`surface-panel`）：标题区
  - `.section-kicker` 分类标签
  - `<h1>` Hero 标题（`font-serif leading-[0.98] tracking-[-0.05em]`）
  - `<p>` 副标题描述

- **右栏**（`surface-muted`）：使用说明
  - `.section-kicker` 使用方式标签
  - 2-3 条使用提示

### 7.2 卡片规范

#### 标准卡片（`.surface`）
```html
<div class="surface group flex flex-col p-5 transition-all 
     hover:border-brand/20 hover:-translate-y-0.5">
  <!-- 内容 -->
</div>
```

#### 次级卡片（`.surface-muted`）
```html
<div class="surface-muted p-5 transition-all 
     hover:border-brand/20">
  <!-- 内容 -->
</div>
```

#### 品牌卡片（`.surface-mist`）
```html
<div class="surface-mist p-5">
  <!-- 公告、提示类内容 -->
</div>
```

### 7.3 网格规范

| 场景 | 类名 |
|------|------|
| 2 列 | `grid gap-4 sm:grid-cols-2` |
| 3 列 | `grid gap-4 sm:grid-cols-2 lg:grid-cols-3` |
| 4 列 | `grid gap-4 sm:grid-cols-2 lg:grid-cols-4` |
| Hero 2 栏 | `grid gap-5 lg:grid-cols-[1.04fr_0.96fr]` |
| 侧边栏 + 内容 | `grid gap-6 lg:grid-cols-[0.9fr_1.1fr]` |

---

## 8. 交互设计规范

### 8.1 登录/注册流程

```
用户点击「登船」按钮
  → 如果未登录：弹出 AuthDialog（本地存储认证）
  → 如果已登录：侧边栏底部显示 NavUser popover

AuthDialog：
  - 登录/注册切换（Tab 式）
  - 邮箱 + 密码输入
  - GitHub/Google 占位按钮
  - 「不注册，直接访问」跳过
  - 提交 → 写入 localStorage → 广播 logbook-auth-changed 事件

/v1/page 独立登录页：
  - 全屏视频背景（background.MP4，静音自动循环）
  - 玻璃拟态卡片（bg-white/10 backdrop-blur-xl）
  - 同样使用 localStorage 认证
```

### 8.2 主题切换

```
localStorage key: "logbook.theme"
值: "light" | "dark"

切换时：
  1. 设置 document.documentElement.setAttribute("data-theme", theme)
  2. 添加/移除 .dark class
  3. 存储到 localStorage
  4. 所有 CSS 变量通过 .dark / [data-theme="dark"] 选择器覆盖

初始加载：
  beforeInteractive 脚本读取 localStorage → 匹配系统偏好
  → 设置 data-theme 和 .dark class
  → 防止 FOUC (Flash of Unstyled Content)
```

### 8.3 侧边栏交互

```
展开/收起：
  - 点击 SidebarTrigger → toggleSidebar()
  - 快捷键 Ctrl/Cmd + B
  - 收起后宽度: 3rem (--sidebar-width-icon)
  - 展开后宽度: 16rem (--sidebar-width)

折叠菜单：
  - 点击整行文字 → 展开/收起子菜单
  - 箭头旋转: 收起 → (朝右), 展开 → rotate(90deg) (朝下)
  - 默认全部展开 (defaultOpen=true)

选中状态：
  - 匹配当前路径 → isActive=true → data-active 属性
  - 样式: 2px inset box-shadow ring + 浅色背景 + 深色文字
```

### 8.4 航线系统交互

```
登船面板 (VoyagePlanner):
  Step 1: 选择设备（多选，至少保留一个）
  Step 2: Android 用户选择品牌（条件渲染）
  Step 3: 选择当前出海状态
  Step 4: 预览生成的航线
  Step 5: 点击「启航生成航线」→ 动画过渡 → 跳转 /routes

航线页 (RouteCenter):
  - 读取 localStorage 中保存的设备/状态选择
  - 展示多条航线（按设备分类）
  - 每条航线显示完成度百分比
  - 步骤可标记完成/取消完成
  - 「保存到船员档案」需登录
```

### 8.5 微交互

| 交互 | 实现 |
|------|------|
| 卡片 hover | `hover:-translate-y-0.5` 轻微上浮 + 阴影增强 + 边框变色 |
| 按钮 active | `active:scale-95` 轻微缩小 |
| 启航动画 | SVG 小船划过海面 + 文字轮播加载提示 |
| 登录成功 | 页面跳转到首页 + 侧边栏底部显示用户信息 |
| 投稿成功 | 绿色提示框 + QQ群/站长联系/早期权益三条引导 |
| 主题切换 | 全局 0.3s background-color transition |

---

## 9. 暗色模式

### 9.1 实现机制

三层覆盖确保全局暗色：

1. **CSS 变量覆盖**：`.dark, [data-theme="dark"]` 选择器重定义所有颜色变量
2. **@theme inline 依赖**：Tailwind 的 `bg-background` 等类通过 `var()` 链引用 CSS 变量
3. **显式覆盖**：为关键元素（surface、tag、button、input、header）添加 `.dark` 显式规则，防止 CSS 变量传播失败

### 9.2 覆盖清单

| 元素 | 浅色 | 深色 |
|------|------|------|
| body | `#fafaf7` | `#0f172a` |
| .surface | `#ffffff` | `#1a2332` |
| .surface-muted | `#f7f8fa` | `#141e2c` |
| .surface-mist | `#eaf6f8` | `#162a3d` |
| .input-field | `#ffffff` | `#141e2c` |
| header | `#ffffff` | `#0f172a` |
| .tag | `#f7f8fa` | `#141e2c` |
| 主文字 | `#172033` | `#e2e8f0` |
| 次要文字 | `#667085` | `#94a3b8` |

### 9.3 深色模式 hover 防止白化

```css
.dark .surface:hover { background: #1e293b !important; }
.dark .btn-secondary:hover { background: #1e293b !important; }
.dark .btn-ghost:hover { background: rgba(255,255,255,0.06) !important; }
```

---

## 10. 认证系统

### 10.1 存储方案

```
localStorage keys:
  logbook.auth.user          → { email, name, joinedAt }
  logbook.voyage.selection   → { devices[], androidBrand?, status }
  logbook.voyage.progress    → string[]
  logbook.routes.progress    → string[]
  logbook.submissions        → { id, type, content, contact, articleTitle?, articleSlug?, status, createdAt }[]
  logbook.devices            → { id, type, brand?, name, status, progress, updatedAt }[]
  logbook.theme              → "light" | "dark"
  logbook.language           → "zh-CN" | "en" | ...
```

### 10.2 事件系统

```
logbook-auth-changed  → 自定义事件，登录/登出/修改用户信息时广播
                        所有显示用户状态的组件监听此事件
logbook-auth-required → 触发的组件传入 reason 参数，AuthDialog 显示理由
```

### 10.3 认证流程

```
注册/登录：
  1. 用户填写邮箱（默认 crew@logbook.today）和密码（不校验）
  2. 生成 AuthUser: { email, name: email前缀, joinedAt: ISO时间 }
  3. 写入 localStorage
  4. 广播 logbook-auth-changed
  5. 跳转首页

登出：
  1. 移除 localStorage logbook.auth.user
  2. 广播 logbook-auth-changed
  3. UI 自动更新（侧边栏显示登录入口）

注销：
  1. 移除所有 localStorage 数据
  2. 广播 logbook-auth-changed
  3. 跳转首页
```

> **注意**：当前为前端模拟认证，密码不做验证。后续接入真实账户系统时可迁移。

---

## 11. 航线系统

### 11.1 设备类型

```typescript
type DeviceId = "windows" | "mac" | "iphone" | "android"
```

### 11.2 Android 品牌细分

```
xiaomi (小米/Redmi)
huawei (华为/荣耀)
oppo (OPPO/vivo/iQOO)
samsung (三星)
pixel (Pixel)
other (其他)
```

### 11.3 出海状态

| ID | 标签 | 说明 |
|----|------|------|
| `new` | 从未出海 | 完全从零开始 |
| `network` | 能访问外网但账号未准备 | 已有网络条件 |
| `account-payment` | 已有海外账号但支付不顺畅 | 卡在支付环节 |
| `using-tools` | 已能使用部分 AI 工具 | 想继续拓展 |
| `exploring` | 已出海，想自由探索 | 寻找新大陆 |

### 11.4 航线数据结构

```typescript
type VoyageTask = {
  id: string;
  label: string;
  note: string;
  href: string;
  risk: string;
  faq: string;
  brand?: BrandId;
};

type VoyageSegment = {
  id: string;
  title: string;
  note: string;
  tasks: VoyageTask[];
};

// 航线 = 设备组合 + 状态 → 段列表
buildVoyagePlan(devices: DeviceId[], status: StatusId, androidBrand?: AndroidBrandId): VoyageSegment[]
```

### 11.5 航海里程计算

```
里程 = 航线步骤完成数 × 12 + 投稿数 × 30 + 被采纳数 × 80

等级映射：
  0         → 游客（未登录）
  0-79      → 登船者
  80-239    → 船员
  240-499   → 贡献船员
  500-1199  → 领航员
  1200-2999 → 大副
  3000-7999 → 船长
  8000+     → 远洋船长
```

---

## 12. 内容管理

### 12.1 文章系统

```
content/articles/
  ├── ai-tool-subscription-failure-reasons.mdx
  ├── apple-gift-card-risks.mdx
  ├── build-ai-workflow-from-zero.mdx
  ├── chatgpt-plus-subscription-options.mdx
  ├── claude-pro-worth-it.mdx
  ├── cursor-claude-code-codex-comparison.mdx
  ├── developer-ai-toolkit.mdx
  ├── how-to-evaluate-gift-card-channel.mdx
  ├── student-budget-ai-stack.mdx
  ├── us-apple-id-guide.mdx
  ├── virtual-card-vs-hk-card-vs-gift-card.mdx
  └── why-not-buy-ready-made-apple-id.mdx
```

每篇文章的 frontmatter：
```yaml
title: string
description: string
publishedAt: string (ISO date)
updatedAt: string (ISO date)
category: CategorySlug
tags: string[]
featured?: boolean
deviceType?: string[]
relatedTools?: string[]
difficulty?: string
estimatedTime?: string
```

### 12.2 分类体系

| Slug | 名称 | 描述 |
|------|------|------|
| `ai-subscription` | AI 订阅 | ChatGPT/Claude 等订阅方式与避坑 |
| `payment` | 海外支付 | 虚拟卡/香港卡/礼品卡方案对比 |
| `apple-id` | 美区 Apple ID | 注册/使用/充值/限制 |
| `dev-tools` | 开发工具 | Claude Code/Cursor/Codex 对比 |
| `student` | 学生省钱 | 预算有限的 AI 工具组合 |
| `risk` | 常见避坑 | 风控/账号/渠道等问题 |

### 12.3 品牌库

支持的品牌标识（`BrandId`）：
```
codex, claude, claude-code, cursor, windsurf, replit,
chatgpt, gemini, perplexity, suno, notion, stripe,
paddle, lemonsqueezy, apple-gift-card, apple-id
```

每个品牌支持 5 种色调：`ocean` / `forest` / `sunrise` / `berry` / `graphite`

---

## 13. 技术实现

### 13.1 项目结构

```
LogBook/
├── app/                      # Next.js App Router 页面
│   ├── layout.tsx            # 根布局（字体、主题初始化、SiteShell）
│   ├── globals.css           # 全局样式（设计系统 + 暗色模式 + 组件类）
│   ├── page.tsx              # 首页（服务器组件，获取文章后传给 HomeExperience）
│   ├── login/                # 独立登录页（视频背景）
│   ├── start/                # 登船指南
│   ├── routes/               # 航线页
│   ├── category/             # 航路分类 + 文章详情
│   ├── tools/                # 船坞
│   ├── resources/            # 补给站
│   ├── discoveries/          # 新大陆
│   ├── products/             # 产品
│   ├── contribute/           # 投稿
│   ├── crew/                 # 船员
│   ├── about/                # 关于
│   └── articles/[slug]/      # 文章详情
├── components/
│   ├── ui/                   # shadcn/ui 组件
│   ├── tools/                # 计算器组件
│   └── *.tsx                 # 业务组件
├── lib/                      # 工具库
│   ├── site.ts               # 站点配置 + 分类定义 + SEO 工具
│   ├── content.ts            # MDX 内容加载 + 搜索索引
│   ├── voyage-system.ts      # 航线生成引擎
│   ├── brand-library.ts      # 品牌标识库
│   ├── utils.ts              # 通用工具（cn, etc）
│   └── structured-data.ts    # JSON-LD 结构化数据
├── data/                     # 数据文件
│   ├── resources.ts          # 资源卡片数据
│   ├── products.ts           # 产品卡片数据
│   └── discoveries.ts        # 新大陆发现数据
├── content/articles/         # MDX 文章
├── hooks/                    # React Hooks
│   └── use-mobile.ts         # 移动端检测
├── public/                   # 静态资源
│   └── background.MP4        # 登录页背景视频
├── components.json           # shadcn 配置
├── next.config.ts            # Next.js 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 依赖管理
```

### 13.2 关键依赖

| 包 | 版本 | 用途 |
|----|------|------|
| `next` | 16.2.7 | React 框架 |
| `react` | 19.2.4 | UI 库 |
| `tailwindcss` | v4 | CSS 框架 |
| `shadcn` | 4.11.0 | UI 组件管理 |
| `@base-ui/react` | 1.5.0 | shadcn 底层 UI 原语 |
| `lucide-react` | 1.17.0 | 图标库 |
| `@phosphor-icons/react` | 2.1.10 | 补充图标库 |
| `next-mdx-remote` | 6.0.0 | MDX 内容渲染 |
| `class-variance-authority` | 0.7.1 | 组件变体管理 |
| `tailwind-merge` | 3.6.0 | Tailwind 类名合并 |
| `tw-animate-css` | 1.4.0 | Tailwind 动画 |
| `gsap` | 3.15.0 | 高级动画（预留） |

### 13.3 服务器/客户端组件分工

```
服务器组件（.tsx 无 "use client"）：
  ├── app/page.tsx           → 获取文章数据，传给客户端
  ├── app/*/page.tsx          → 导出 metadata
  ├── 所有 MDX 渲染
  └── lib/*.ts                → 文件系统操作

客户端组件（"use client"）：
  ├── 所有交互组件（表单、按钮、弹窗）
  ├── 使用 localStorage 的组件
  ├── 使用 useState/useEffect 的组件
  └── 事件处理组件
```

### 13.4 性能优化

1. **静态生成**：所有非交互页面预渲染为静态 HTML
2. **动态导入**：重组件（如计算器）可改为 `dynamic(() => import(...))`
3. **字体优化**：`next/font/google` 自动子集化中文字体
4. **图片优化**：`next/image` 自动 WebP 转换和懒加载
5. **CSS 优化**：Tailwind v4 的 JIT 模式按需生成 CSS

---

## 14. 部署与运维

### 14.1 部署架构

```
GitHub (github.com/YouFangZeXian/LogBook)
  └── main 分支 push
       └── Cloudflare Pages 自动构建部署
            └── https://logbook.today
```

### 14.2 部署命令

```bash
# 本地开发
npm run dev

# 生产构建
npm run build

# 提交部署
git add -A
git commit -m "描述"
git push  # → Cloudflare 自动部署
```

### 14.3 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | `https://logbook.today` |
| `SITE_URL` | 站点 URL（服务端） | 同上 |

---

## 15. 待办与路线图

### 15.1 近期计划

- [ ] 真实认证系统（Supabase / Auth0 / NextAuth）
- [ ] 投稿后台审核流（从 localStorage 迁移到数据库）
- [ ] QQ 群/社群创建
- [ ] 站点 Logo 和 favicon 设计
- [ ] 文章搜索功能增强
- [ ] 移动端体验优化
- [ ] 国际化（多语言支持）

### 15.2 中期计划

- [ ] 船员社区上线（用户列表、主页、勋章系统）
- [ ] 评论/讨论功能
- [ ] Affiliate link 系统
- [ ] 邮件订阅通知
- [ ] 数据分析面板
- [ ] 数字产品销售

### 15.3 长期计划

- [ ] 会员体系
- [ ] API 服务（航线数据开放）
- [ ] 多语言内容
- [ ] 社区线下活动
- [ ] 开源部分组件

---

> **维护者**：路格舶 Logbook.today  
> **设计系统版本**：v0.2.0  
> **文档生成日期**：2026-06-10  
> **仓库**：github.com/YouFangZeXian/LogBook
