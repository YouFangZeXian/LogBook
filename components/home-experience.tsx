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

type JourneyStep = {
  id: string;
  track: string;
  title: string;
  body: string;
  href: string;
  branch?: "right";
};

const journeySteps: JourneyStep[] = [
  {
    id: "01",
    track: "主航道",
    title: "先定目的",
    body: "先分清你是为了写作、开发还是上课，不同目的会带你走向完全不同的工具顺序。",
    href: "/start",
  },
  {
    id: "02",
    track: "主航道",
    title: "再过账号",
    body: "Apple 生态、网页直订、纯免费组合，入口不同，后面会遇到的成本和限制也不同。",
    href: "/category/apple-id",
  },
  {
    id: "03",
    track: "支线 A",
    title: "处理支付",
    body: "礼品卡、虚拟卡、香港卡不是替代关系，而是对应不同航段的补给方式。",
    href: "/category/payment",
    branch: "right",
  },
  {
    id: "04",
    track: "主航道",
    title: "接入工具",
    body: "只先接一到两个高频工具，不把看见的名字一次性全搬上船。",
    href: "/category/dev-tools",
  },
  {
    id: "05",
    track: "支线 B",
    title: "长期方案",
    body: "确认真的会长期用，再决定续费节奏、学生组合和更稳的支付路线。",
    href: "/category/student",
    branch: "right",
  },
];

const routeStations = [
  {
    title: "出海指南",
    subtitle: "主航道",
    description: "先走完整顺序，再决定要不要拐进别的港口。",
    href: "/start",
  },
  {
    title: "支付方案",
    subtitle: "补给站",
    description: "把充值、扣费、汇率和手续费都放回补给逻辑里看。",
    href: "/category/payment",
  },
  {
    title: "开发工具",
    subtitle: "船坞",
    description: "只保留高频工具入口，不在首页开工具超市。",
    href: "/category/dev-tools",
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

  const archiveArticles = latestArticles.slice(0, 4);

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
            opacity: 0.88,
            y: 12,
            stagger: 0.06,
            duration: 0.52,
            ease: "power2.out",
          });
        }

        if (mapRef.current) {
          gsap.from(mapRef.current.querySelectorAll("[data-map-item]"), {
            opacity: 0.9,
            y: 10,
            stagger: 0.06,
            duration: 0.48,
            ease: "power2.out",
            delay: 0.08,
          });
        }

        if (archiveRef.current) {
          gsap.from(archiveRef.current.querySelectorAll("[data-archive-item]"), {
            opacity: 0.92,
            y: 8,
            stagger: 0.05,
            duration: 0.42,
            ease: "power2.out",
            delay: 0.12,
          });
        }
      });

      return () => media.revert();
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="page-shell space-y-14 py-8 md:space-y-[4.6rem] md:py-10">
      <section className="space-y-8 border-b border-line pb-10 md:space-y-10">
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2 lg:hidden">
          {journeySteps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className="min-w-[13rem] shrink-0 rounded-[0.95rem] border border-line bg-white/56 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                  {step.id}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                  {step.track}
                </span>
              </div>
              <p className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{step.body}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <div className="border-b border-line pb-3">
                <p className="eyebrow">航海主线</p>
              </div>

              <div className="rounded-[1rem] border border-line bg-white/56 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-muted [font-family:var(--font-mono),monospace]">
                      route map
                    </p>
                    <p className="text-sm leading-7 text-muted">
                      主航道只保留必须先走的顺序。支线只在需要时靠港，不跟首屏抢方向。
                    </p>
                  </div>
                  <CompassRose size={18} className="mt-1 text-foreground" />
                </div>

                <ol className="relative mt-8 space-y-0">
                  <span className="absolute left-[13px] top-1 h-[calc(100%-0.5rem)] w-px bg-black/14" />

                  {journeySteps.map((step, index) => (
                    <li
                      key={step.id}
                      className={[
                        "relative pb-9 last:pb-0",
                        step.branch ? "ml-9 pl-11" : "pl-11",
                      ].join(" ")}
                    >
                      {step.branch ? (
                        <span className="absolute left-[-23px] top-[0.95rem] h-px w-[2.2rem] bg-black/14" />
                      ) : null}

                      <span
                        className={[
                          "absolute top-1 flex h-[25px] w-[25px] items-center justify-center rounded-full border border-foreground bg-background text-[10px] text-foreground [font-family:var(--font-mono),monospace]",
                          step.branch ? "left-[1.9rem]" : "left-0",
                        ].join(" ")}
                      >
                        {step.id}
                      </span>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <p className="text-[15px] font-semibold tracking-tight text-foreground">
                            {step.title}
                          </p>
                          <span className="text-[10px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                            {step.track}
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

                      {index === 1 ? (
                        <div className="mt-5 rounded-[0.85rem] border border-line bg-background/70 px-4 py-3 text-xs leading-6 text-muted">
                          这里开始会分出两条支线：
                          <br />
                          一条去补给，一条去长期方案。
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
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
                  不是把资讯一股脑摊开，而是先把顺序理给你看，再告诉你哪里值得继续展开。
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
                <span className="block">寻未知路；</span>
                <span className="block">格世界物；</span>
                <span className="block">舶沧海途。</span>
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-muted">
                路格舶更像一份航海总图。先告诉你从哪里出发，再把支付、工具和长期方案放回它们该出现的位置。
              </p>
            </div>

            <div
              data-hero-item
              className="grid gap-4 lg:grid-cols-[minmax(0,1.34fr)_minmax(16rem,0.66fr)]"
            >
              <Link
                href={`/articles/${primaryArticle.slug}`}
                className="flex min-h-[22rem] flex-col justify-between rounded-[1.05rem] border border-line-strong bg-white/68 p-6 transition-colors hover:border-foreground"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
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

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href={paymentResource.href}
                  className="flex min-h-[9.5rem] flex-col justify-between rounded-[0.95rem] border border-line bg-white/56 p-5 transition-colors hover:border-foreground hover:bg-white/76"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                      补给站
                    </span>
                    <Wallet size={16} className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold tracking-tight text-foreground">
                      {paymentResource.name}
                    </p>
                    <p className="text-sm leading-7 text-muted">{paymentResource.risk}</p>
                  </div>
                </Link>

                <Link
                  href={dockResource.href}
                  className="flex min-h-[9.5rem] flex-col justify-between rounded-[0.95rem] border border-line bg-white/56 p-5 transition-colors hover:border-foreground hover:bg-white/76"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                      船坞
                    </span>
                    <Screwdriver size={16} className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold tracking-tight text-foreground">
                      {dockResource.name}
                    </p>
                    <p className="text-sm leading-7 text-muted">{dockResource.purpose}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="max-w-3xl space-y-3">
          <p className="section-kicker">航路入口</p>
          <h2 className="section-title">首页只保留方向感，具体资讯都退后一步</h2>
          <p className="text-sm leading-8 text-muted">
            下面不是内容堆叠，而是三个港口入口。先找方向，再决定要不要靠岸。
          </p>
        </div>

        <div ref={mapRef} className="grid gap-4 lg:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)]">
          <div
            data-map-item
            className="rounded-[1.05rem] border border-black/10 p-6 text-black md:p-7"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(252,236,201,0.92) 0%, rgba(241,210,180,0.9) 44%, rgba(171,190,230,0.78) 100%)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/70 [font-family:var(--font-mono),monospace]">
                  main chart
                </p>
                <h3 className="mt-3 text-[clamp(2.2rem,4vw,3.7rem)] font-semibold tracking-[-0.05em]">
                  航路总图
                </h3>
              </div>
              <CompassRose size={20} className="shrink-0" />
            </div>

            <div className="mt-10 space-y-5">
              {routeStations.map((station) => (
                <Link
                  key={station.title}
                  href={station.href}
                  className="flex flex-col gap-3 border-t border-black/12 pt-5 transition-transform hover:translate-x-1 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="text-[1.45rem] font-semibold tracking-[-0.04em]">
                        {station.title}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-black/60 [font-family:var(--font-mono),monospace]">
                        {station.subtitle}
                      </span>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-black/72">
                      {station.description}
                    </p>
                  </div>
                  <ArrowUpRight size={20} className="shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Link
              href="/start"
              data-map-item
              className="rounded-[0.95rem] border border-line bg-white/50 p-6 transition-colors hover:border-foreground"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                登船指南
              </p>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                第一次上船的人，直接走这条顺序
              </p>
              <div className="mt-8 grid gap-2 border-t border-line pt-4 text-sm text-muted">
                <span>01 选工具</span>
                <span>02 过账号</span>
                <span>03 处理支付</span>
              </div>
            </Link>

            <div
              data-map-item
              className="rounded-[0.95rem] border border-line bg-background/72 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                  轻量补充
                </p>
                <ArrowUpRight size={16} className="text-foreground" />
              </div>

              <div className="mt-5 space-y-4">
                <Link
                  href={paymentResource.href}
                  className="flex items-start justify-between gap-4 border-b border-line pb-4 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <div>
                    <p className="font-medium text-foreground">补给站</p>
                    <p className="mt-1 leading-7">{paymentResource.name}</p>
                  </div>
                  <Wallet size={16} className="mt-1 shrink-0 text-foreground" />
                </Link>

                <Link
                  href={dockResource.href}
                  className="flex items-start justify-between gap-4 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <div>
                    <p className="font-medium text-foreground">船坞</p>
                    <p className="mt-1 leading-7">{dockResource.name}</p>
                  </div>
                  <Screwdriver size={16} className="mt-1 shrink-0 text-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={archiveRef} className="border-t border-line pt-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div data-archive-item className="max-w-md space-y-3">
            <p className="section-kicker">档案层</p>
            <h2 className="section-title">资讯继续保留，但不再抢首页主叙事</h2>
            <p className="text-sm leading-8 text-muted">
              分类、更新和延伸阅读都退到这一层。你需要时再翻，它们不会先一步压住主线。
            </p>
          </div>

          <div data-archive-item className="space-y-4">
            <div className="grid gap-2 rounded-[0.95rem] border border-line bg-white/34 p-5 sm:grid-cols-2">
              {categorySummary.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between border-b border-line py-3 text-sm text-muted transition-colors last:border-b-0 hover:text-foreground sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span>{category.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.24em] [font-family:var(--font-mono),monospace]">
                    {category.count} 篇
                  </span>
                </Link>
              ))}
            </div>

            <details className="rounded-[0.95rem] border border-line bg-background/66 p-5 open:bg-white/32">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                    航海日志
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                    最近更新的文章与补充阅读
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-foreground" />
              </summary>

              <div className="mt-5 space-y-4">
                {archiveArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="block border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                      {article.categoryName} / {article.readingTime}
                    </p>
                    <p className="mt-2 text-base font-medium tracking-tight text-foreground">
                      {article.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted">{article.description}</p>
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
