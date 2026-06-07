import Link from "next/link";

import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `第一次使用海外 AI 工具，从这里开始 | ${siteConfig.shortName}`,
  description: "按步骤理解工具选择、账号准备、支付方式、风险识别和低成本长期使用路径。",
  path: "/start",
});

const steps = [
  {
    title: "1. 选择要用的 AI 工具",
    description:
      "先判断自己是偏写作、偏学习、偏开发，还是三者都要。需求不同，订阅顺序完全不一样。",
    href: "/articles/cursor-claude-code-codex-comparison",
  },
  {
    title: "2. 准备账号",
    description:
      "不是所有工具都必须折腾美区账号。先看工具本身的可用路径，再决定是否需要额外账号体系。",
    href: "/articles/us-apple-id-guide",
  },
  {
    title: "3. 选择支付方式",
    description:
      "礼品卡、虚拟卡、香港卡各有适合场景。不要看别人怎么用，先看自己准备长期用什么。",
    href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
  },
  {
    title: "4. 避开常见风险",
    description:
      "成品号、可疑礼品卡渠道、支付失败反复重试，这些都可能让后续问题越来越大。",
    href: "/category/risk",
  },
  {
    title: "5. 低成本长期使用",
    description:
      "真正能长期用下来的方案，通常不是最花哨的，而是你的需求、预算和支付路径刚好匹配。",
    href: "/category/student",
  },
];

export default function StartPage() {
  return (
    <div className="page-shell space-y-8 py-10 md:py-14">
      <section className="card p-6 md:p-8">
        <span className="eyebrow">新手开始</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          第一次使用海外 AI 工具，从这里开始
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          这个页面适合完全从 0 开始的读者。目标不是一次性把所有账号、支付和订阅都开好，而是先做对第一步。
        </p>
      </section>

      <section className="grid gap-4">
        {steps.map((step) => (
          <article key={step.title} className="card flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
            </div>
            <Link
              href={step.href}
              className="inline-flex rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              查看对应内容
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
