import { ResourceCard } from "@/components/resource-card";
import { resourceItems } from "@/data/resources";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `资源页 | ${siteConfig.shortName}`,
  description: "集中整理推荐工具、支付方案和教程卡片，并预留 affiliate link 字段。",
  path: "/resources",
});

export default function ResourcesPage() {
  const groups = [
    {
      title: "推荐工具卡片",
      items: resourceItems.filter((item) => item.category === "tool"),
    },
    {
      title: "推荐支付方案卡片",
      items: resourceItems.filter((item) => item.category === "payment"),
    },
    {
      title: "推荐教程卡片",
      items: resourceItems.filter((item) => item.category === "tutorial"),
    },
  ];

  return (
    <div className="page-shell space-y-10 py-10 md:py-14">
      <section className="card p-6 md:p-8">
        <span className="eyebrow">资源页</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          不做大而空的导航，只保留真正有用的入口
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          每个资源卡都会说明用途、适合谁、风险提示，并预留 affiliate link 字段，方便后续做联盟推广但不影响阅读体验。
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {group.title}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <ResourceCard key={item.name} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
