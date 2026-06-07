import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import {
  buildMetadata,
  categoryMap,
  categories,
  siteConfig,
  type CategorySlug,
} from "@/lib/site";
import { getArticlesByCategory, getRecommendedArticles } from "@/lib/content";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryMap[slug as CategorySlug];

  if (!category) {
    return {};
  }

  return buildMetadata({
    title: `${category.name} | ${siteConfig.shortName}`,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export const dynamicParams = false;

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryMap[slug as CategorySlug];

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug);
  const recommended = getRecommendedArticles(category.recommendedSlugs);

  return (
    <div className="page-shell py-10 md:py-14">
      <section className="card p-6 md:p-8">
        <span className="eyebrow">{category.shortName}</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          {category.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          {category.intro}
        </p>
      </section>

      <section className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            这个分类下的文章
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              推荐阅读
            </h2>
            <div className="mt-5 space-y-5">
              {recommended.map((article) => (
                <div key={article.slug} className="border-b border-line pb-5 last:border-b-0 last:pb-0">
                  <p className="text-xs text-muted">{article.readingTime}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                    <Link href={`/articles/${article.slug}`} className="hover:text-accent">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{article.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-soft p-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              先从最小成本开始验证
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              如果你还不确定要不要长期使用某个工具，先看可用性、预算和支付路径，再决定是否付费。
            </p>
            <Link
              href="/start"
              className="mt-4 inline-flex text-sm font-medium text-accent hover:text-accent-strong"
            >
              去看新手路线图
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
