import { buildMetadata } from "@/lib/site";
import { SubscriptionCostCalculator } from "@/components/tools/subscription-cost-calculator";
import { GiftCardCalculator } from "@/components/tools/gift-card-calculator";
import { PlanComparisonTable } from "@/components/tools/plan-comparison";

export const metadata = buildMetadata({
  title: "工具页 | AI 出海生存指南",
  description: "提供 AI 订阅成本计算器、Apple Gift Card 折扣计算器和订阅方案对比表。",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="page-shell space-y-8 py-10 md:py-14">
      <section className="card p-6 md:p-8">
        <span className="eyebrow">实用工具</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          先把账算清楚，再决定值不值得订
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          这里先做三个轻量工具，帮助你判断订阅成本、礼品卡折扣和主流方案差异。
        </p>
      </section>

      <SubscriptionCostCalculator />
      <GiftCardCalculator />
      <PlanComparisonTable />
    </div>
  );
}
