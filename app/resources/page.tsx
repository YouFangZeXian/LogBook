import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { GiftCardCalculator } from "@/components/tools/gift-card-calculator";
import { SubscriptionCostCalculator } from "@/components/tools/subscription-cost-calculator";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `补给站 — 账号、支付、订阅 | ${siteConfig.shortName}`,
  description: "解决海外 AI 工具的账号注册、支付方式、订阅方案和常见问题。Apple Gift Card、外区 Apple ID、虚拟卡、香港卡、订阅失败排查。",
  path: "/resources",
});

/* ── Supply categories ── */

const supplyCategories = [
  {
    title: "Apple Gift Card",
    desc: "给美区 Apple ID 充值的常见方式。注意渠道质量差异很大，低价不等于划算。",
    href: "/articles/apple-gift-card-risks",
    tag: "支付",
  },
  {
    title: "外区 Apple ID",
    desc: "自己注册美区 Apple ID 的完整流程，无需代购、无需成品号。",
    href: "/articles/us-apple-id-guide",
    tag: "账号",
  },
  {
    title: "Google 账号",
    desc: "Google 生态（Gemini、Google Play 等）的账号准备和地区设置。",
    href: "/start",
    tag: "账号",
  },
  {
    title: "海外虚拟卡",
    desc: "适合网页直订和长期扣费，门槛比礼品卡高但更稳定。",
    href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
    tag: "支付",
  },
  {
    title: "香港银行卡",
    desc: "长期稳定方案，适合已经在稳定使用海外服务的用户。",
    href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
    tag: "支付",
  },
  {
    title: "订阅失败排查",
    desc: "信用卡被拒、PayPal 不可用、风控拦截……常见失败原因与解决方案。",
    href: "/articles/ai-tool-subscription-failure-reasons",
    tag: "排查",
  },
  {
    title: "优惠渠道提醒",
    desc: "学生折扣、教育优惠、免费额度的最新信息，持续更新。",
    href: "/articles/student-budget-ai-stack",
    tag: "省钱",
  },
  {
    title: "AI 工具订阅方式对比",
    desc: "ChatGPT、Claude、Cursor 等主流工具的订阅路径横向对比。",
    href: "/articles/chatgpt-plus-subscription-options",
    tag: "对比",
  },
];

/* ── Page ── */

export default function ResourcesPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      {/* ── Hero ── */}
      <section className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">补给站</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            账号、支付、订阅，
            <br />
            出海最容易被卡住的三关。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            补给站只做一件事：当你卡在"怎么付"、"怎么注册"、"为什么订阅失败"的时候，给你一条明确的解决路径。
          </p>
        </div>
        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">使用方式</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>先找你的问题属于哪一类（账号、支付、排查），再点进对应入口。</p>
            <p>所有内容都以合法购买和风险提示为前提，不碰灰色货源和成品号买卖。</p>
          </div>
        </div>
      </section>

      {/* ── Supply Categories Grid ── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {supplyCategories.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="surface group flex flex-col p-5 transition-all hover:border-brand/20 hover:-translate-y-0.5"
          >
            <span className="tag tag-brand w-fit text-[10px]">{item.tag}</span>
            <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-brand transition-colors">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
            <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-sea group-hover:text-brand transition-colors">
              查看详情 <ArrowUpRight size={12} />
            </span>
          </Link>
        ))}
      </section>

      {/* ── Calculators ── */}
      <section className="space-y-6">
        <div>
          <p className="section-kicker">计算工具</p>
          <h2 className="heading-section mt-2">先把账算清楚，再决定值不值得订。</h2>
          <p className="body-text mt-2 max-w-2xl">
            这两个计算器帮你算清实际成本和折扣，避免冲动订阅。
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <SubscriptionCostCalculator />
          <GiftCardCalculator />
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section>
        <div className="surface-mist p-5 text-sm leading-7 text-muted">
          <p className="font-medium text-foreground mb-2">⚓ 风险提示</p>
          补给站整理的所有支付和账号方案都以合法购买为前提。我们不提供代购、成品号、破解、黑卡等灰色服务。所有渠道建议仅供信息参考，请在购买前自行确认渠道可靠性和最新政策变化。
        </div>
      </section>
    </div>
  );
}
