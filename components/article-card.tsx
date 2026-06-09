import Link from "next/link";
import type { Article } from "@/lib/content";

type ArticleCardProps = { article: Article; compact?: boolean };

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  return (
    <article className="surface group flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="tag tag-brand">{article.categoryName}</span>
        <span className="text-faint [font-family:var(--font-mono)]">{article.readingTime}</span>
      </div>
      <h3 className={`mt-4 font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-brand ${compact ? "text-base" : "text-lg"}`}>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{article.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag text-[11px]">#{tag}</span>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <Link href={`/articles/${article.slug}`} className="text-sm font-medium text-brand-sea transition-colors hover:text-brand">
          继续阅读 →
        </Link>
      </div>
    </article>
  );
}
