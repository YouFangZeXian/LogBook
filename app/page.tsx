import Link from "next/link";
import Script from "next/script";
import {
  BanknoteArrowUp,
  Bot,
  CircleAlert,
  CreditCard,
  GraduationCap,
  IdCard,
} from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { CategoryCard } from "@/components/category-card";
import { ResourceCard } from "@/components/resource-card";
import { getAllCategoryStats, getFeaturedArticles, getLatestArticles } from "@/lib/content";
import { homeJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";
import { resourceItems } from "@/data/resources";

const iconMap = {
  "ai-subscription": CreditCard,
  payment: BanknoteArrowUp,
  "apple-id": IdCard,
  "dev-tools": Bot,
  student: GraduationCap,
  risk: CircleAlert,
} as const;

const roadmap = [
  "先确认自己到底要用什么：通用问答、写作，还是开发。",
  "再决定账号路径：浏览器直充、Apple 路线，还是先观望。",
  "支付方式只选一种主力，不要同时开太多渠道。",
  "每做一步都留出回退空间，先小额验证再长期订阅。",
  "把高频工具和低频工具分开，长期成本才会稳。",
];

export default function Home() {
  const latestArticles = getLatestArticles(6);
  const featuredArticles = getFeaturedArticles(3);
  const categoryStats = getAllCategoryStats();

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />

      <div className="page-shell space-y-14 py-10 md:py-14">
        <section className="card overflow-hidden">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12">
            <div>
              <span className="eyebrow">真实踩坑经验整理</span>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.12]">
                中国学生和个人开发者的 AI 出海生存指南
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
                ChatGPT、Claude、Cursor、美区 Apple ID、海外支付、订阅避坑，一站式整理。
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/articles/chatgpt-plus-subscription-options"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
                >
                  查看最新教程
                </Link>
                <Link
                  href="/category/student"
                  className="rounded-full border border-line bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  查看低成本方案
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-[2rem] bg-soft p-6">
              <p className="text-sm font-medium text-foreground">这个站优先解决什么问题</p>
              <ul className="space-y-3 text-sm leading-7 text-muted">
                <li>订阅工具到底该选网页直充、Apple 路线还是先不付费。</li>
                <li>预算有限时，学生和个人开发者该如何搭组合。</li>
                <li>礼品卡、支付卡、账号地区这些细节里最容易踩的坑。</li>
                <li>不碰破解、不碰黑卡、不碰违规账号买卖，只讲合规避坑。</li>
              </ul>
              <div className="rounded-3xl bg-white p-5">
                <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                  新手路线图
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  第一次使用海外 AI 工具，从这里开始
                </p>
                <Link
                  href="/start"
                  className="mt-4 inline-flex text-sm font-medium text-accent hover:text-accent-strong"
                >
                  去看步骤版指南
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                分类入口
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                先按问题分，再按工具选
              </h2>
            </div>
            <Link href="/category" className="hidden text-sm font-medium text-accent md:block">
              查看全部分类
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categoryStats.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                icon={iconMap[category.slug]}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                最新文章
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                最近更新的实用内容
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card p-6">
              <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                推荐阅读
              </p>
              <div className="mt-5 space-y-5">
                {featuredArticles.map((article) => (
                  <div key={article.slug} className="border-b border-line pb-5 last:border-b-0 last:pb-0">
                    <p className="text-xs text-muted">
                      {article.categoryName} · {article.readingTime}
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

            <div className="card bg-foreground p-6 text-white">
              <p className="text-sm font-medium tracking-[0.18em] text-white/70 uppercase">
                订阅更新 / 微信引流占位
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                先留一个联系位，后续再接邮件或企微。
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/75">
                当前先预留：邮箱订阅、微信联系、更新通知和资源入口。后续可以接 Buttondown、Mailchimp 或微信引流说明。
              </p>
              <div className="mt-5 rounded-3xl bg-white/10 p-4 text-sm leading-7 text-white/80">
                联系邮箱：{siteConfig.email}
                <br />
                微信占位：{siteConfig.wechatPlaceholder}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
              新手路线图
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              不是先买，而是先把路径理顺
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted">
              很多人一开始就去找代充、买成品号、囤礼品卡，结果是问题越来越多。更稳的做法是先明确需求，再选路径。
            </p>
          </div>
          <div className="grid gap-4">
            {roadmap.map((item, index) => (
              <div key={item} className="card flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-soft font-semibold text-accent">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-foreground/90">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                推荐资源
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                先看方案，再决定去哪里继续
              </h2>
            </div>
            <Link href="/resources" className="hidden text-sm font-medium text-accent md:block">
              查看资源页
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resourceItems.slice(0, 6).map((item) => (
              <ResourceCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        <section className="card p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                免责声明
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-muted">
                本站只整理合法购买、使用和风险提示，不提供盗版、破解、黑卡、欺诈、违规账号买卖服务，也不会承诺“保证成功”或“保证赚钱”。
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              查看站点定位
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
