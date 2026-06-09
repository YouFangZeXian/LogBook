import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { ArticleToc } from "@/components/article-toc";
import { ContributionPanel } from "@/components/contribution-panel";
import { ResourceCard } from "@/components/resource-card";
import { resourceItems } from "@/data/resources";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  renderArticle,
} from "@/lib/content";
import { buildMetadata, categoryMap, siteConfig } from "@/lib/site";
import { articleJsonLd } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return buildMetadata({
    title: `${article.title} | ${siteConfig.shortName}`,
    description: article.description,
    path: `/articles/${article.slug}`,
    keywords: article.tags,
  });
}

export const dynamicParams = false;

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const renderedContent = await renderArticle(article.content);
  const relatedArticles = getRelatedArticles(article, 3);
  const relatedResources = resourceItems
    .filter(
      (item) =>
        item.href.includes(article.slug) ||
        item.href.includes(article.category) ||
        item.category !== "tutorial",
    )
    .slice(0, 3);

  return (
    <>
      <Script
        id={`article-jsonld-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: article.title,
              description: article.description,
              slug: article.slug,
              publishedAt: article.publishedAt,
              updatedAt: article.updatedAt,
              tags: article.tags,
            }),
          ),
        }}
      />

      <div className="page-shell py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0 space-y-8">
            {/* Header card */}
            <header className="surface-panel overflow-hidden p-6 md:p-10">
              {/* Ambient glow behind header */}
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-accent/6 blur-[6rem]" aria-hidden="true" />

              <Link
                href={`/category/${article.category}`}
                className="section-kicker relative transition-colors hover:text-foreground"
              >
                {categoryMap[article.category].name}
              </Link>

              <h1 className="relative mt-6 font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.02] tracking-[-0.05em] text-foreground">
                {article.title}
              </h1>

              <p className="relative mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg md:leading-9">
                {article.description}
              </p>

              <div className="relative mt-6 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.16em] text-muted [font-family:var(--font-mono),monospace]">
                <span>更新 {formatDate(article.updatedAt)}</span>
                <span className="before:content-['·'] before:mr-4">{article.readingTime}</span>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[8px] border border-line bg-background/66 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-line-strong"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta grid */}
              <div className="relative mt-8 grid gap-3 rounded-[16px] border border-line bg-background/50 p-5 text-sm sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted [font-family:var(--font-mono),monospace]">关联航线</p>
                  <p className="mt-1 font-semibold text-foreground">{article.route}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted [font-family:var(--font-mono),monospace]">适用设备</p>
                  <p className="mt-1 font-semibold text-foreground">{article.deviceType?.join(" / ")}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted [font-family:var(--font-mono),monospace]">难度</p>
                  <p className="mt-1 font-semibold text-foreground">{article.difficulty}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted [font-family:var(--font-mono),monospace]">预计操作</p>
                  <p className="mt-1 font-semibold text-foreground">{article.estimatedTime}</p>
                </div>
              </div>
            </header>

            {/* Article body */}
            <div className="surface-panel p-6 md:p-10">
              <div className="prose-rich">{renderedContent}</div>
            </div>

            {/* Resource CTA */}
            <section className="surface-muted p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                需要礼品卡 / 订阅方案？查看这里
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                如果你已经确定要继续用工具，但还在支付、礼品卡或长期订阅方案上犹豫，先去资源页按场景筛选。
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/resources" className="button-primary">查看资源页</Link>
                <Link href="/products" className="button-secondary">查看数字产品占位</Link>
              </div>
            </section>

            {/* Related articles */}
            <section>
              <div className="surface-panel p-6 md:p-8">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">相关文章</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.slug} article={related} />
                  ))}
                </div>
              </div>

              <div className="mt-8 surface-panel p-6 md:p-8">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">资源推荐</h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  这些入口不是万能解法，只是更适合继续深入了解的下一步。
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {relatedResources.map((item) => (
                    <ResourceCard key={item.name} item={item} />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <ContributionPanel articleTitle={article.title} articleSlug={article.slug} />
              </div>
            </section>

            {/* Disclaimer */}
            <div className="surface-muted p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">风险与免责声明</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                本文仅为经验整理，不提供盗版、破解、欺诈、违规账号买卖服务。所有支付、订阅和礼品卡相关内容都应以合法购买、风险识别和个人判断为前提。
              </p>
            </div>
          </article>

          {/* Sidebar TOC */}
          <ArticleToc items={article.toc} />
        </div>
      </div>
    </>
  );
}
