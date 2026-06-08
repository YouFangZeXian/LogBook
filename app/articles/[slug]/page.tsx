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
import { articleJsonLd } from "@/lib/structured-data";
import { buildMetadata, categoryMap, siteConfig } from "@/lib/site";
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

  if (!article) {
    return {};
  }

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

  if (!article) {
    notFound();
  }

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

      <div className="page-shell py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <header className="card p-6 md:p-8">
              <Link
                href={`/category/${article.category}`}
                className="eyebrow hover:bg-accent hover:text-white"
              >
                {categoryMap[article.category].name}
              </Link>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-[2.9rem] md:leading-[1.18]">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
                {article.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
                <span>更新时间：{formatDate(article.updatedAt)}</span>
                <span>阅读时间：{article.readingTime}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 rounded-[0.95rem] border border-line bg-background/62 p-4 text-sm md:grid-cols-4">
                <div>
                  <p className="text-xs text-muted">关联航线</p>
                  <p className="mt-1 font-medium text-foreground">{article.route}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">适用设备</p>
                  <p className="mt-1 font-medium text-foreground">{article.deviceType?.join(" / ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">难度</p>
                  <p className="mt-1 font-medium text-foreground">{article.difficulty}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">预计操作</p>
                  <p className="mt-1 font-medium text-foreground">{article.estimatedTime}</p>
                </div>
              </div>
            </header>

            <div className="card mt-8 p-6 md:p-8">
              <div className="prose-rich">{renderedContent}</div>
            </div>

            <section className="card mt-8 p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                需要礼品卡 / 订阅方案？查看这里
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                如果你已经确定要继续用工具，但还在支付、礼品卡或长期订阅方案上犹豫，可以先去资源页按场景筛选。
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/resources"
                  className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
                >
                  查看资源页
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  查看数字产品占位
                </Link>
              </div>
            </section>

            <section className="mt-8 grid gap-8">
              <div className="card p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  相关文章
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.slug} article={related} />
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  资源推荐
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  这些入口不是“万能解法”，只是更适合继续深入了解的下一步。
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {relatedResources.map((item) => (
                    <ResourceCard key={item.name} item={item} />
                  ))}
                </div>
              </div>

              <ContributionPanel articleTitle={article.title} articleSlug={article.slug} />

              <div className="card grid gap-5 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    订阅更新
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    后续可以在这里接入邮箱订阅、微信提醒或资源更新通知。当前先保留占位，方便后续做内容增长闭环。
                  </p>
                </div>
                <div className="rounded-3xl bg-soft p-5 text-sm leading-7 text-muted">
                  邮箱：hello@example.com
                  <br />
                  微信：待补充
                  <br />
                  说明：这里只做合法信息整理，不做违规服务对接。
                </div>
              </div>

              <div className="card p-6 md:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  风险与免责声明
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  本文仅为经验整理，不提供盗版、破解、欺诈、违规账号买卖服务。所有支付、订阅和礼品卡相关内容都应以合法购买、风险识别和个人判断为前提。
                </p>
              </div>
            </section>
          </article>

          <ArticleToc items={article.toc} />
        </div>
      </div>
    </>
  );
}
