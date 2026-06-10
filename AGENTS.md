<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-deploy-rules -->
# 部署规则

**修改代码后必须推送到 GitHub：**
```bash
git add -A && git commit -m "<描述>" && git push
```
推送后 Cloudflare Pages 会自动部署到 https://logbook.today。

- 仓库地址：`github.com/YouFangZeXian/LogBook`
- 分支：`main`
- 部署服务：Cloudflare Pages（自动监听 main 分支变更）

**⚠️ 不推送 = 改动不会上线。**
<!-- END:project-deploy-rules -->
