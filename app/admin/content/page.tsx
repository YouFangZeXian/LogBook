import { ContentDraftAdmin } from "@/components/content-draft-admin";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `内容工作台 | ${siteConfig.shortName}`,
  description: "把已采纳投稿整理成 MDX 草稿，形成审核到发布的内容运营闭环。",
  path: "/admin/content",
});

export default function AdminContentPage() {
  return <ContentDraftAdmin />;
}
