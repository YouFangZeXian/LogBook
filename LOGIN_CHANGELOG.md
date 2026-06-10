# LogBook 登录页改造记录

> 2026-06-10 — shadcn login-03 + 视频背景 + 侧边栏修复

## 改造内容

### 1. 登录页 (`app/login/page.tsx`)
- 使用 `npx shadcn@latest add login-03` 引入 shadcn 登录块
- **全屏视频背景**：`public/background.MP4`，静音自动循环播放
- 半透明玻璃拟态卡片 (`bg-white/10 backdrop-blur-xl`) 浮于视频之上
- 保留路格舶 / Logbook.today 品牌标识

### 2. 登录表单 (`components/login-form.tsx`)
- shadcn Card + Field + FieldGroup + FieldSeparator 组件
- 登录/注册切换（复用 localStorage 认证）
- GitHub / Google 社交登录占位
- "不注册，直接访问" 跳过入口

### 3. 侧边栏修复 (`components/site-sidebar.tsx`)
- **移除重复"关于"**：删除 NavSecondary 中的"关于"链接，只保留"日志与船员"分组下的
- 底部登录按钮改为导航到 `/login` 页面（原为弹窗）

### 4. 用户菜单 (`components/nav-user.tsx`)
- "船员档案"菜单项导航到 `/crew`

### 5. 新增 shadcn 组件
- `components/ui/card.tsx`
- `components/ui/field.tsx`
- `components/ui/label.tsx`

## 文件清单

| 文件 | 操作 |
|------|------|
| `app/login/page.tsx` | 重写 - 视频背景 + 品牌 |
| `components/login-form.tsx` | 新建 - shadcn 登录表单 |
| `components/site-sidebar.tsx` | 修改 - 移除重复关于、导航到 /login |
| `components/nav-user.tsx` | 修改 - 船员档案导航 |
| `components/ui/card.tsx` | 新建 - shadcn |
| `components/ui/field.tsx` | 新建 - shadcn |
| `components/ui/label.tsx` | 新建 - shadcn |
| `public/background.MP4` | 新建 - 背景视频 |
