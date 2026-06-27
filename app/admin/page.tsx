import { AdminDashboard } from "@/components/admin-dashboard";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `运营后台 | ${siteConfig.shortName}`,
  description: "查看投稿审核、邮件订阅、资源点击和产品意向等运营数据。",
  path: "/admin",
});

export default function AdminPage() {
  return <AdminDashboard />;
}
