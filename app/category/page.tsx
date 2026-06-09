import {
  Bank,
  CreditCard,
  GraduationCap,
  ShieldWarning,
  TerminalWindow,
  UserCircleGear,
} from "@phosphor-icons/react/dist/ssr";

import { CategoryCard } from "@/components/category-card";
import { getAllCategoryStats } from "@/lib/content";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `分类导航 | ${siteConfig.shortName}`,
  description: "按 AI 订阅、海外支付、美区 Apple ID、开发工具、学生方案和常见避坑来找内容。",
  path: "/category",
});

const iconMap = {
  "ai-subscription": CreditCard,
  payment: Bank,
  "apple-id": UserCircleGear,
  "dev-tools": TerminalWindow,
  student: GraduationCap,
  risk: ShieldWarning,
} as const;

export default function CategoryIndexPage() {
  const categories = getAllCategoryStats();

  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">分类航路</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            先按你遇到的问题找入口，
            <br />
            再决定往哪条航路走。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            这个站不是泛 AI 工具导航，而是把 AI 出海过程拆成几条更清晰的航路，方便你按问题定位。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">分类原则</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>优先按问题分层，不按品牌堆砌，不要求你一开始就认识所有工具名字。</p>
            <p>支付、Apple ID、订阅和开发工具分开收口，减少第一次访问时的信息纠缠。</p>
            <p>每个分类都只负责把你带进正确航段，真正的细节留给对应文章与路线页。</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} icon={iconMap[category.slug]} />
        ))}
      </section>
    </div>
  );
}
