import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import type { CategoryConfig } from "@/lib/site";

type CategoryCardProps = { category: CategoryConfig & { count?: number }; icon: Icon };

export function CategoryCard({ category, icon: Icon }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="surface group flex h-full flex-col gap-3 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-border bg-background-secondary text-brand-sea transition-colors group-hover:border-brand/20 group-hover:bg-brand-mist-soft">
        <Icon size={20} weight="duotone" />
      </span>
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-brand">
            {category.name}
          </h3>
          {typeof category.count === "number" ? (
            <span className="text-[10px] text-faint [font-family:var(--font-mono)]">{category.count} 篇</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
      </div>
    </Link>
  );
}
