import Link from "next/link";

import type { Article } from "@/lib/content";

type ArticleCardProps = {
  article: Article;
  compact?: boolean;
};

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  return (
    <article className="surface-panel flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-white">
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent [font-family:var(--font-mono),monospace]">
          {article.categoryName}
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] [font-family:var(--font-mono),monospace]">
          {article.readingTime}
        </span>
      </div>

      <h3 className={`mt-4 font-semibold tracking-tight text-foreground ${compact ? "text-lg" : "text-xl"}`}>
        <Link href={`/articles/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted">{article.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-[8px] border border-line bg-background/66 px-2.5 py-1 text-[11px] text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          继续阅读
        </Link>
      </div>
    </article>
  );
}
