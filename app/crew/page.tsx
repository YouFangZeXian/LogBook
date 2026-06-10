import type { Metadata } from "next";
import { CrewProfilePage } from "@/components/crew-profile-page";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `船员档案 — 身份与设置 | ${siteConfig.shortName}`,
  description: "管理船员身份、个人头像、名称、语言、密码和安全设置。查看航海里程和投稿记录。",
  path: "/crew",
});

export default function CrewPage() {
  return <CrewProfilePage />;
}
