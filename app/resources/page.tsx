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
      note: "先放真正会高频打开的主力入口，不做一屏塞满的导航站。",
      items: resourceItems.filter((item) => item.category === "tool"),
    },
    {
      title: "推荐支付方案卡片",
      note: "只讲合法购买、费用结构和风险边界，不讲灰色货源。",
      items: resourceItems.filter((item) => item.category === "payment"),
    },
    {
      title: "推荐教程卡片",
      note: "把更适合从头阅读的入口单独收起来，减少干扰。",
      items: resourceItems.filter((item) => item.category === "tutorial"),
    },
  ];

  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">资源页</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            不做大而空的导航，
            <br />
            只保留真正有用的入口。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            每个资源卡都会说明用途、适合谁、风险提示，并预留 affiliate link 字段，方便后续做联盟推广但不影响阅读体验。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">使用方式</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>先按“工具 / 支付 / 教程”区分，再点进对应文章或路线，不要同时开太多支线。</p>
            <p>如果你还没跑通主航道，优先从登船指南进入；资源页更适合已经知道自己要找什么的人。</p>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="space-y-5">
          <div className="space-y-2">
            <p className="section-kicker">{group.title}</p>
            <p className="max-w-3xl text-sm leading-7 text-muted">{group.note}</p>
          </div>
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
