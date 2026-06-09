import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";

import type { CategoryConfig } from "@/lib/site";

type CategoryCardProps = {
  category: CategoryConfig & { count?: number };
  icon: Icon;
};

export function CategoryCard({ category, icon: Icon }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="surface-panel group flex h-full flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-white"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-background/78 text-accent">
        <Icon size={20} weight="duotone" />
      </span>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {category.name}
          </h3>
          {typeof category.count === "number" ? (
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
              {category.count} 篇
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-7 text-muted">{category.description}</p>
      </div>
    </Link>
  );
}
