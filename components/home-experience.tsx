"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  CompassRose,
  MagnifyingGlass,
  Screwdriver,
  ShieldCheck,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";

import type { Article } from "@/lib/content";
import { siteConfig, type CategoryConfig } from "@/lib/site";
import type { ResourceItem } from "@/data/resources";

type HomeExperienceProps = {
  latestArticles: Article[];
  featuredArticles: Article[];
  categories: (CategoryConfig & { count: number })[];
  resources: ResourceItem[];
};

const journeySteps = [
  {
    id: "01",
    label: "主线",
    title: "先定目的",
    body: "先回答你是为了学习、写作、开发，还是先跑通第一个可用账号。出发前先选方向。",
    href: "/start",
  },
  {
    id: "02",
    label: "主线",
    title: "再过账号",
    body: "Apple 路线、网页订阅路线、先用免费组合路线，入口不同，后面的成本和风险也不同。",
    href: "/category/apple-id",
  },
  {
    id: "03",
    label: "支线 A",
    title: "处理支付",
    body: "礼品卡、虚拟卡、香港卡不是平替关系，而是对应不同使用场景的补给方式。",
    href: "/category/payment",
  },
  {
    id: "04",
    label: "主线",
    title: "接入工具",
    body: "只先把一到两个高频工具接进工作流，别把首页看到的所有名字都一次性买完。",
    href: "/category/dev-tools",
  },
  {
    id: "05",
    label: "支线 B",
    title: "长期方案",
    body: "确认它真的会长期用，再决定续费节奏、低成本组合和更稳的支付方式。",
    href: "/category/student",
  },
];

const routePanels = [
  {
    title: "航路总图",
    description: "主线先走顺，再决定要不要展开别的站点。",
    href: "/start",
    tone:
      "linear-gradient(180deg, rgba(252,235,197,0.96) 0%, rgba(242,195,159,0.96) 50%, rgba(140,169,221,0.88) 100%)",
    variant: "large" as const,
  },
  {
    title: "补给站",
    description: "支付与充值都退到支线，不占主甲板。",
    href: "/category/payment",
    tone:
      "linear-gradient(180deg, rgba(231,236,191,0.88) 0%, rgba(219,194,204,0.82) 55%, rgba(121,148,212,0.84) 100%)",
    variant: "small" as const,
  },
  {
    title: "船坞",
    description: "工具只留高频入口，不在首页开工具超市。",
    href: "/category/dev-tools",
    tone:
      "linear-gradient(180deg, rgba(229,176,205,0.86) 0%, rgba(194,169,214,0.82) 52%, rgba(133,196,173,0.82) 100%)",
    variant: "small" as const,
  },
  {
    title: "航海日志",
    description: "踩坑、更新和复盘留在档案层，按需翻阅。",
    href: "/articles/build-ai-workflow-from-zero",
    tone: "",
    variant: "plain" as const,
  },
];

export function HomeExperience({
  latestArticles,
  featuredArticles,
  categories,
  resources,
}: HomeExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  const primaryArticle = featuredArticles[0] ?? latestArticles[0];
  const secondaryArticle = featuredArticles[1] ?? latestArticles[1] ?? primaryArticle;
  const paymentResource =
    resources.find((item) => item.category === "payment") ?? resources[0];
  const dockResource =
    resources.find((item) => item.category === "tool") ?? resources[1] ?? resources[0];

  const categorySummary = useMemo(
    () =>
      categories
        .slice()
        .sort((a, b) => b.count - a.count)
        .slice(0, 4),
    [categories],
  );

  const openSearch = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("site-search-open"));
    }
  };

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll("[data-hero-item]"), {
            opacity: 0.82,
            y: 14,
            stagger: 0.07,
            duration: 0.64,
            ease: "power2.out",
          });
        }

        if (mapRef.current) {
          gsap.from(mapRef.current.querySelectorAll("[data-map-item]"), {
            opacity: 0.88,
            y: 14,
            stagger: 0.06,
            duration: 0.58,
            ease: "power2.out",
            delay: 0.1,
          });
        }

        if (archiveRef.current) {
          gsap.from(archiveRef.current.querySelectorAll("[data-archive-item]"), {
            opacity: 0.9,
            y: 12,
            stagger: 0.05,
            duration: 0.56,
            ease: "power2.out",
            delay: 0.14,
          });
        }
      });

      return () => media.revert();
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="page-shell space-y-14 py-8 md:space-y-[4.5rem] md:py-10">
      <section className="space-y-8 border-b border-line pb-10 md:space-y-10">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {journeySteps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className="min-w-[12.5rem] shrink-0 rounded-[1.05rem] border border-line bg-white/45 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                  {step.id}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted [font-family:var(--font-mono),monospace]">
                  {step.label}
                </span>
              </div>
              <p className="mt-3 text-base font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-sm leading-7 text-muted">{step.body.slice(0, 20)}…</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="border-b border-line pb-3">
                <p className="eyebrow">航海主线</p>
              </div>

              <ol className="mt-6 space-y-5">
                {journeySteps.map((step, index) => (
                  <li key={step.id} className="relative pl-10">
                    {index < journeySteps.length - 1 ? (
                      <span className="absolute left-[11px] top-7 h-[calc(100%+0.75rem)] w-px bg-black/15" />
                    ) : null}
                    <span className="absolute left-0 top-1 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-foreground bg-background text-[10px] text-foreground [font-family:var(--font-mono),monospace]">
                      {step.id}
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-semibold text-foreground">{step.title}</p>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-muted [font-family:var(--font-mono),monospace]">
                          {step.label}
                        </span>
                      </div>
                      <p className="text-sm leading-7 text-muted">{step.body}</p>
                      <Link
                        href={step.href}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground [font-family:var(--font-mono),monospace] hover:text-accent"
                      >
                        进入此站
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div ref={heroRef} className="space-y-8">
            <div
              data-hero-item
              className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-start md:justify-between"
            >
              <div className="max-w-md space-y-2">
                <p className="text-[11px] uppercase tracking-[0.26em] text-muted [font-family:var(--font-mono),monospace]">
                  {siteConfig.logline}
                </p>
                <p className="text-sm leading-7 text-muted">
                  不把资讯一股脑推到你面前，而是先把主线排出来，再告诉你哪里该拐弯。
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={openSearch} className="button-secondary">
                  <MagnifyingGlass size={16} className="mr-2" />
                  搜索航路
                </button>
                <Link href="/start" className="button-primary">
                  先走主线
                </Link>
              </div>
            </div>

            <div data-hero-item className="space-y-5">
              <h1 className="max-w-5xl font-serif text-[clamp(3.3rem,8vw,7rem)] leading-[0.96] tracking-[-0.05em] text-foreground">
                寻未知路；格世界物；
                <br />
                舶沧海途。
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-muted">
                路格舶更像一份航海总图。先告诉你该从哪里起步，再把支付、工具和长期方案放进该出现的位置。
              </p>
            </div>

            <div
              data-hero-item
              className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)]"
            >
              <Link
                href={`/articles/${primaryArticle.slug}`}
                className="flex min-h-[22rem] flex-col justify-between rounded-[1.2rem] border border-line-strong bg-white/44 p-6 transition-colors hover:border-foreground"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.26em] text-muted [font-family:var(--font-mono),monospace]">
                    当前主线
                  </span>
                  <CompassRose size={16} className="text-foreground" />
                </div>

                <div className="space-y-4">
                  <h2 className="max-w-2xl text-[clamp(1.9rem,3vw,3rem)] font-semibold tracking-[-0.04em] text-foreground">
                    {primaryArticle.title}
                  </h2>
                  <p className="max-w-xl text-sm leading-8 text-muted">
                    {primaryArticle.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted [font-family:var(--font-mono),monospace]">
                  <span>{primaryArticle.categoryName}</span>
                  <span>{primaryArticle.readingTime}</span>
                </div>
              </Link>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href={paymentResource.href}
                  className="flex min-h-[10rem] flex-col justify-between rounded-[1rem] border border-line bg-transparent p-5 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                      补给站
                    </span>
                    <Wallet size={16} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-foreground">
                      {paymentResource.name}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted">{paymentResource.risk}</p>
                  </div>
                </Link>

                <Link
                  href={dockResource.href}
                  className="flex min-h-[10rem] flex-col justify-between rounded-[1rem] border border-line bg-transparent p-5 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                      船坞
                    </span>
                    <Screwdriver size={16} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-foreground">
                      {dockResource.name}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted">{dockResource.purpose}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">有收有放的入口</p>
            <h2 className="section-title mt-3">先把入口排好，再决定哪些内容值得展开</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">
            这些不是并列推荐，而是不同站点。你可以从主线进入，也可以在需要时拐进支付、工具和日志。
          </p>
        </div>

        <div
          ref={mapRef}
          className="grid gap-4 md:grid-cols-[1.08fr_0.92fr] md:grid-rows-[minmax(12rem,1fr)_minmax(12rem,1fr)]"
        >
          {routePanels.map((panel) => (
            <Link
              key={panel.title}
              href={panel.href}
              data-map-item
              className={[
                "group relative flex flex-col justify-between overflow-hidden border border-black/10 p-6 text-black transition-transform duration-200 hover:-translate-y-0.5",
                panel.variant === "large"
                  ? "min-h-[23rem] rounded-[1.3rem] md:row-span-2"
                  : panel.variant === "small"
                    ? "min-h-[12rem] rounded-[1rem]"
                    : "min-h-[12rem] rounded-[1rem] bg-white/40",
              ].join(" ")}
              style={panel.tone ? { backgroundImage: panel.tone } : undefined}
            >
              <span className="text-[11px] uppercase tracking-[0.26em] text-black/72 [font-family:var(--font-mono),monospace]">
                路格舶
              </span>

              <div className={panel.variant === "plain" ? "space-y-4" : "space-y-3"}>
                <h3
                  className={[
                    "tracking-[-0.05em]",
                    panel.variant === "large"
                      ? "max-w-xs text-[clamp(2.6rem,4vw,4rem)] font-semibold"
                      : panel.variant === "plain"
                        ? "max-w-sm text-3xl font-semibold text-foreground"
                        : "max-w-xs text-[clamp(1.7rem,2.6vw,2.3rem)] font-semibold",
                  ].join(" ")}
                >
                  {panel.title}
                </h3>
                <p
                  className={[
                    "max-w-sm text-sm leading-7",
                    panel.variant === "plain" ? "text-muted" : "text-black/72",
                  ].join(" ")}
                >
                  {panel.description}
                </p>

                {panel.variant === "plain" ? (
                  <div className="grid gap-2 border-t border-line pt-4 text-sm text-muted">
                    <span>把踩坑、更新和补充阅读压进档案层。</span>
                    <span>首页只保留会帮你做决定的内容。</span>
                  </div>
                ) : null}
              </div>

              <ArrowUpRight
                size={22}
                className="absolute bottom-6 right-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </section>

      <section
        ref={archiveRef}
        className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div data-archive-item className="space-y-5">
          <div className="space-y-3">
            <p className="section-kicker">档案与支线</p>
            <h2 className="section-title">资讯继续保留，但退后一步成为档案层</h2>
            <p className="max-w-md text-sm leading-8 text-muted">
              你需要的资讯还在，只是不再抢占首页主叙事。主线看顺序，支线按需翻。
            </p>
          </div>

          <div className="grid gap-2 text-sm">
            {categorySummary.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex items-center justify-between border-b border-line py-3 text-muted transition-colors hover:text-foreground"
              >
                <span>{category.name}</span>
                <span className="text-[11px] uppercase tracking-[0.22em] [font-family:var(--font-mono),monospace]">
                  {category.count} 篇
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div data-archive-item className="grid gap-4">
          <Link
            href={`/articles/${secondaryArticle.slug}`}
            className="rounded-[1.05rem] border border-line bg-white/44 p-6 transition-colors hover:border-foreground"
          >
            <p className="section-kicker">主线延伸</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
              {secondaryArticle.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">
              {secondaryArticle.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
              继续展开
              <ArrowUpRight size={16} />
            </div>
          </Link>

          <details className="rounded-[1.05rem] border border-line bg-white/28 p-6 open:bg-white/42">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <p className="section-kicker">最新日志</p>
                <p className="mt-2 text-xl font-semibold text-foreground">最近更新的文章与补充阅读</p>
              </div>
              <ShieldCheck size={20} className="text-foreground" />
            </summary>

            <div className="mt-5 space-y-4">
              {latestArticles.slice(0, 4).map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block border-b border-line pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                    {article.categoryName} / {article.readingTime}
                  </p>
                  <p className="mt-2 text-lg font-medium text-foreground">{article.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{article.description}</p>
                </Link>
              ))}
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
