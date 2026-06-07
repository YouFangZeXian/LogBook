import Link from "next/link";

import type { Article } from "@/lib/content";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="card h-full p-6 transition-transform hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="rounded-full bg-soft px-3 py-1 font-medium text-accent">
          {article.categoryName}
        </span>
        <span>{article.readingTime}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
        <Link href={`/articles/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted">{article.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href={`/articles/${article.slug}`}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          继续阅读
        </Link>
      </div>
    </article>
  );
}
