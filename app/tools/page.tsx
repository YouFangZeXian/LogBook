import { GiftCardCalculator } from "@/components/tools/gift-card-calculator";
import { PlanComparisonTable } from "@/components/tools/plan-comparison";
import { SubscriptionCostCalculator } from "@/components/tools/subscription-cost-calculator";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `工具页 | ${siteConfig.shortName}`,
  description: "提供 AI 订阅成本计算器、Apple Gift Card 折扣计算器和订阅方案对比表。",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">实用工具</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            先把账算清楚，
            <br />
            再决定值不值得订。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            这里先做三个轻量工具，帮助你判断订阅成本、礼品卡折扣和主流方案差异。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">使用方式</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>工具页只做计算和对比，不替你做最终决策。</p>
            <p>算完之后再回到文章和航线页，看对应场景下的风险提示和使用顺序。</p>
          </div>
        </div>
      </section>

      <SubscriptionCostCalculator />
      <GiftCardCalculator />
      <PlanComparisonTable />
    </div>
  );
}
