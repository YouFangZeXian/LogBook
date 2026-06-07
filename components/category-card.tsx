import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import type { CategoryConfig } from "@/lib/site";

type CategoryCardProps = {
  category: CategoryConfig & { count?: number };
  icon: LucideIcon;
};

export function CategoryCard({ category, icon: Icon }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="glass-card group flex h-full flex-col gap-4 p-5 transition-transform hover:-translate-y-0.5"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
            {category.name}
          </h3>
          {typeof category.count === "number" ? (
            <span className="text-sm text-muted">{category.count} 篇</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-7 text-muted">{category.description}</p>
      </div>
    </Link>
  );
}
