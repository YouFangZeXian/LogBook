import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { buildMetadata, categories, categoryMap, siteConfig, type CategorySlug } from "@/lib/site";
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
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">{category.shortName}</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            {category.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">{category.intro}</p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">阅读方式</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>先从这个分类下的主线文章看判断框架，再回到具体工具和支付选择。</p>
            <p>如果你还不确定值不值得付费，建议先看可用性、预算和支付路径，再做长期订阅决定。</p>
            <Link href="/start" className="inline-flex items-center text-sm font-medium text-foreground">
              去看登船指南
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="section-kicker">这个分类下的文章</p>
            <h2 className="section-title">先把这一段海面看清楚</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="surface-panel p-6">
            <p className="section-kicker">推荐阅读</p>
            <div className="mt-5 space-y-5">
              {recommended.map((article) => (
                <div key={article.slug} className="border-b border-line pb-5 last:border-b-0 last:pb-0">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                    {article.readingTime}
                  </p>
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

          <div className="surface-muted p-6">
            <p className="section-kicker">小成本验证</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              先验证路径，再决定是否长期投入。
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              很多问题不是工具本身，而是账号、网络、支付和地区限制缠在一起。先拆开看，决策会容易很多。
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
