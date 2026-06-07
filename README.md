# AI 出海生存指南

一个面向中国学生和个人开发者的中文内容站，聚焦 AI 订阅、海外支付、美区 Apple ID、AI 开发工具、学生低成本方案和常见避坑信息。

站点目标不是做泛工具导航，而是做一个真实、克制、可长期扩展的实用信息站：

- 帮用户省时间
- 帮用户省钱
- 帮用户避坑
- 不碰违法、盗版、破解、黑卡、欺诈、违规账号买卖

## 技术栈

- Next.js 16（满足 Next.js 14+ 要求，App Router）
- TypeScript
- Tailwind CSS v4
- 本地 Markdown / MDX 内容系统
- 静态导出到 `out/`
- 可部署到 Cloudflare Pages

## 当前已实现

- 首页
- 分类页
- 文章详情页
- 工具页
- 资源页
- 产品占位页
- 关于页
- `/start` 新手路线图页
- 12 篇示例文章
- 自动阅读时长
- 自动目录
- 自动相关文章推荐
- `title / description / canonical`
- `robots.txt`
- `sitemap.xml`
- 首页和文章页 JSON-LD

## 本地运行

在项目根目录执行：

```bash
npm install
npm run dev
```

开发环境默认地址：

```bash
http://localhost:3000
```

## 生产构建

```bash
npm run build
```

构建完成后会输出静态站点到：

```bash
out/
```

如果你只想检查代码规范：

```bash
npm run lint
```

## 部署到 Cloudflare Pages

这是一个静态导出站点，最简单的部署方式是直接把 `out/` 作为 Cloudflare Pages 的输出目录。

### 方式一：连接 Git 仓库自动部署

1. 把项目推到 GitHub / GitLab
2. 在 Cloudflare Pages 新建项目
3. 选择对应仓库
4. 构建命令填：

```bash
npm run build
```

5. 输出目录填：

```bash
out
```

6. 环境变量建议补一个：

```bash
NEXT_PUBLIC_SITE_URL=https://你的正式域名
```

如果没有配置这个环境变量，项目会默认使用：

```bash
https://ai-overseas-survival-guide.pages.dev
```

### 方式二：本地构建后手动上传

1. 本地执行：

```bash
npm install
npm run build
```

2. 把 `out/` 目录内容上传到 Cloudflare Pages

## 项目结构

```text
app/
  about/
  articles/[slug]/
  category/
  category/[slug]/
  products/
  resources/
  start/
  tools/
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts

components/
  tools/
  article-card.tsx
  article-toc.tsx
  category-card.tsx
  mdx-components.tsx
  resource-card.tsx
  site-footer.tsx
  site-header.tsx

content/
  articles/
    *.mdx

data/
  products.ts
  resources.ts

lib/
  content.ts
  site.ts
  structured-data.ts
  utils.ts
```

## 如何新增文章

所有文章都放在：

```text
content/articles/
```

新建一个 `.mdx` 文件即可，文件名会直接成为文章 URL 的英文 slug。

例如：

```text
content/articles/my-new-article.mdx
```

对应访问路径：

```text
/articles/my-new-article
```

### 文章 Frontmatter 模板

```md
---
title: 文章标题
description: SEO 描述
publishedAt: 2026-06-07
updatedAt: 2026-06-07
category: ai-subscription
tags:
  - 标签1
  - 标签2
featured: false
---
```

### 可用分类值

- `ai-subscription`
- `payment`
- `apple-id`
- `dev-tools`
- `student`
- `risk`

### 文章内容说明

- 支持 Markdown / MDX
- `##` 和 `###` 标题会自动进入目录
- 阅读时间会自动计算
- 分类、标签、相关文章会自动关联

## 如何修改分类信息

分类名称、简介、推荐阅读等配置在：

```text
lib/site.ts
```

你可以在这里修改：

- 分类名称
- 分类描述
- 分类推荐文章
- 导航
- 站点标题
- 默认站点 URL

## 如何修改资源页和产品页

资源卡片数据在：

```text
data/resources.ts
```

可配置字段包括：

- 名称
- 用途
- 适合谁
- 风险提示
- 按钮链接
- `affiliateLink`

产品占位数据在：

```text
data/products.ts
```

## SEO 相关说明

当前项目已支持：

- 每页 `title`
- 每页 `description`
- 每页 `canonical`
- 自动生成 `robots.txt`
- 自动生成 `sitemap.xml`
- 首页 JSON-LD
- 文章页 JSON-LD

如果要上线正式域名，建议一定配置：

```bash
NEXT_PUBLIC_SITE_URL=https://你的正式域名
```

否则 canonical 和 sitemap 会继续使用默认域名。

## 设计方向

- 白底为主
- 深色文字
- 少量蓝色 / 绿色强调
- 卡片式布局
- 移动端优先
- 阅读体验优先
- 不使用花哨动画

## 合规边界

这个项目内容层面明确遵守以下原则：

- 不写破解
- 不写盗版
- 不写黑卡
- 不写盗刷
- 不写诈骗
- 不写违规账号买卖教程
- 不承诺收益
- 不写“保证成功”

支付和礼品卡相关内容只做：

- 合法购买信息整理
- 成本计算
- 渠道判断
- 风险提示

## 后续可扩展方向

- 接入邮箱订阅（Buttondown / Mailchimp / ConvertKit）
- 接入评论系统
- 增加专题合集页
- 增加 FAQ 页面
- 增加联盟链接管理
- 增加产品表单收集页
- 增加内容搜索

