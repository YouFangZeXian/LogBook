"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Compass,
  CreditCard,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import type { Article } from "@/lib/content";
import { siteConfig, type CategoryConfig } from "@/lib/site";
import type { ResourceItem } from "@/data/resources";
import { ArticleCard } from "@/components/article-card";
import { ResourceCard } from "@/components/resource-card";

type HomeExperienceProps = {
  latestArticles: Article[];
  featuredArticles: Article[];
  categories: (CategoryConfig & { count: number })[];
  resources: ResourceItem[];
};

const quickPaths = [
  { label: "先看 ChatGPT Plus", href: "/articles/chatgpt-plus-subscription-options" },
  { label: "先看支付方式", href: "/category/payment" },
  { label: "学生低成本方案", href: "/category/student" },
  { label: "避坑总入口", href: "/category/risk" },
];

const modules = [
  {
    key: "routes",
    title: "登船指南",
    description: "先定场景，再选账号和支付，不要反过来先堆工具。",
    icon: Compass,
  },
  {
    key: "plans",
    title: "支付补给",
    description: "把真实月成本、礼品卡折扣和长期维护成本一起看。",
    icon: CreditCard,
  },
  {
    key: "risk",
    title: "风险与边界",
    description: "只保留合规做法，灰产路径和夸张承诺直接排除。",
    icon: ShieldCheck,
  },
];

export function HomeExperience({
  latestArticles,
  featuredArticles,
  categories,
  resources,
}: HomeExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [openPanel, setOpenPanel] = useState<"guides" | "resources" | "updates">(
    "guides",
  );

  const openSearch = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("site-search-open"));
    }
  };

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as {
          reduceMotion: boolean;
          desktop: boolean;
        };

        if (!reduceMotion) {
          if (glowRef.current) {
            gsap.to(glowRef.current, {
              scale: 1.05,
              opacity: 0.82,
              duration: 2.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }

          if (heroRef.current) {
            gsap.from(heroRef.current, {
              y: 16,
              opacity: 0.84,
              duration: 0.9,
              ease: "power2.out",
            });
          }

          if (cardsRef.current) {
            gsap.from(cardsRef.current.children, {
              y: 18,
              opacity: 0.82,
              duration: 0.75,
              stagger: 0.05,
              ease: "power2.out",
              delay: 0.08,
            });
          }
        }

        return () => {
          gsap.killTweensOf([glowRef.current, heroRef.current, cardsRef.current]);
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-10">
      <section className="glass-card-strong overflow-hidden">
        <div className="grid gap-8 px-5 py-6 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-8">
          <div ref={heroRef} className="relative space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="action-pill">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                订阅 · 支付 · 工具避坑
              </span>
              <span className="action-pill">路格舶 · 舶海日志</span>
            </div>

            <div>
              <h1 className="max-w-3xl text-[clamp(2rem,5vw,4.1rem)] font-semibold tracking-tight text-foreground">
                {siteConfig.motto}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-8 text-muted md:text-lg">
                {siteConfig.logline} 路格舶把 AI 出海、支付、Apple ID 与开发工具信息压成一个更短、更快、更容易检索的入口。
              </p>
            </div>

            <button
              type="button"
              onClick={openSearch}
              className="glass-card relative block w-full overflow-hidden border-white/10 bg-white/[0.05] p-2 text-left"
            >
              <div
                ref={glowRef}
                className="pointer-events-none absolute inset-y-1 left-1/3 w-24 rounded-full bg-accent/30 blur-2xl"
              />
              <div className="relative flex items-center gap-3 rounded-[22px] border border-white/8 bg-slate-950/55 px-4 py-4">
                <Search className="h-4 w-4 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    搜索文章、分类、礼品卡、Cursor、Apple ID…
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted">
                  /
                </span>
              </div>
            </button>

            <div className="flex flex-wrap gap-2">
              {quickPaths.map((item) => (
                <Link key={item.href} href={item.href} className="action-pill">
                  {item.label}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">快速航路</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  先选你现在最急的事
                </h2>
              </div>
              <Layers3 className="mt-1 h-5 w-5 text-accent" />
            </div>
            <div className="mt-5 grid gap-3">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <div
                    key={module.key}
                    className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{module.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section ref={cardsRef} className="grid gap-4 md:grid-cols-3">
        {categories.slice(0, 3).map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="glass-card group p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">{category.name}</span>
              <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-muted">
                {category.count} 篇
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">{category.description}</p>
            <div className="mt-5 flex items-center gap-2 text-sm text-accent">
              进入分类
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card-strong p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenPanel("guides")}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                openPanel === "guides"
                  ? "bg-white text-slate-950"
                  : "bg-white/6 text-muted hover:text-foreground"
              }`}
            >
              精选教程
            </button>
            <button
              type="button"
              onClick={() => setOpenPanel("resources")}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                openPanel === "resources"
                  ? "bg-white text-slate-950"
                  : "bg-white/6 text-muted hover:text-foreground"
              }`}
            >
              推荐资源
            </button>
            <button
              type="button"
              onClick={() => setOpenPanel("updates")}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                openPanel === "updates"
                  ? "bg-white text-slate-950"
                  : "bg-white/6 text-muted hover:text-foreground"
              }`}
            >
              最近更新
            </button>
          </div>

          <div className="mt-6">
            {openPanel === "guides" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {featuredArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} compact />
                ))}
              </div>
            ) : null}

            {openPanel === "resources" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {resources.slice(0, 4).map((item) => (
                  <ResourceCard key={item.name} item={item} compact />
                ))}
              </div>
            ) : null}

            {openPanel === "updates" ? (
              <div className="grid gap-3">
                {latestArticles.slice(0, 5).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4 transition-colors hover:border-line-strong hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">
                        {article.title}
                      </p>
                      <span className="text-xs text-muted">{article.readingTime}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <details open className="glass-card group overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="section-kicker">折叠模块</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  登船指南
                </h3>
              </div>
              <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="soft-divider px-5 pb-5 pt-4">
              <div className="space-y-3">
                {[
                  "先决定你到底要用聊天、写作还是开发类工具。",
                  "账号路径和支付路径只先跑通一条，不要一开始就并行折腾。",
                  "先小额验证可用性，再决定长期订阅与礼品卡储值。",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-muted">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/start" className="mt-4 inline-flex text-sm font-medium text-accent">
                查看完整登船指南
              </Link>
            </div>
          </details>

          <details className="glass-card group overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="section-kicker">折叠模块</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  补给与订阅入口
                </h3>
              </div>
              <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="soft-divider px-5 pb-5 pt-4">
              <p className="text-sm leading-7 text-muted">
                暂时先用邮箱和微信占位，不把首页继续拉得过长。等内容跑顺后，再接邮件订阅或更精细的转化页。
              </p>
              <div className="mt-4 rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-muted">
                邮箱：hello@example.com
                <br />
                微信：待补充
              </div>
            </div>
          </details>
        </div>
      </section>

      <section className="glass-card-strong p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">更多航路</p>
            <h2 className="section-title mt-2">剩余内容先收短，再按需展开</h2>
          </div>
          <Link href="/category" className="button-secondary w-fit">
            查看全部分类
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full border border-line bg-white/6 px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
