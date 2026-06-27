import { AdminSettings } from "@/components/admin-settings";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `配置状态 | ${siteConfig.shortName}`,
  description: "检查 Supabase 环境变量、当前账号、后台角色和数据库 RLS 权限状态。",
  path: "/admin/settings",
});

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
