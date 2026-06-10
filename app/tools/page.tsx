import { ToolsPageContent } from "@/components/tools-page-content";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `船坞 — AI 工具发现 | ${siteConfig.shortName}`,
  description: "按玩法分类发现 AI 工具：AI 开发、搜索、音乐、视频、设计、办公、自动化、变现、独立开发和海外服务。",
  path: "/tools",
});

export default function ToolsPage() {
  return <ToolsPageContent />;
}
