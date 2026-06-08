import { CrewProfile } from "@/components/crew-profile";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `船员档案 | ${siteConfig.shortName}`,
  description: "查看本地船员身份、航海里程、投稿数量和被采纳数量等身份体系预留字段。",
  path: "/crew",
});

export default function CrewPage() {
  return <CrewProfile />;
}
