import { BanknoteArrowUp, Bot, CircleAlert, CreditCard, GraduationCap, IdCard } from "lucide-react";

import { buildMetadata, siteConfig } from "@/lib/site";
import { CategoryCard } from "@/components/category-card";
import { getAllCategoryStats } from "@/lib/content";

export const metadata = buildMetadata({
  title: `分类导航 | ${siteConfig.shortName}`,
  description: "按 AI 订阅、海外支付、美区 Apple ID、开发工具、学生方案和常见避坑来找内容。",
  path: "/category",
});

const iconMap = {
  "ai-subscription": CreditCard,
  payment: BanknoteArrowUp,
  "apple-id": IdCard,
  "dev-tools": Bot,
  student: GraduationCap,
  risk: CircleAlert,
} as const;

export default function CategoryIndexPage() {
  const categories = getAllCategoryStats();

  return (
    <div className="page-shell py-10 md:py-14">
      <div className="max-w-3xl">
        <span className="eyebrow">分类导航</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          先按你遇到的问题找入口
        </h1>
        <p className="mt-4 text-base leading-8 text-muted">
          这个站不是泛 AI 工具导航，而是围绕订阅、支付、账号和学生低成本方案来做内容整理。
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            icon={iconMap[category.slug]}
          />
        ))}
      </div>
    </div>
  );
}
