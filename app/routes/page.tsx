import { RouteCenter } from "@/components/route-center";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `航线推荐页 | ${siteConfig.shortName}`,
  description: "根据设备和当前状态生成推荐航线，展示难度、预计时间、步骤数和完成度。",
  path: "/routes",
});

export default function RoutesPage() {
  return <RouteCenter />;
}
