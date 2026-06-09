"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Compass,
  Notebook,
  Package,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { VoyagePlanner } from "@/components/voyage-planner";
import type { ResourceItem } from "@/data/resources";
import { toneClassMap } from "@/lib/brand-library";
import type { Article } from "@/lib/content";
import { siteConfig, type CategoryConfig } from "@/lib/site";
import {
  harborCategories,
  logbookPanels,
  type HarborCategory,
  type LogbookPanel,
} from "@/lib/voyage-system";

type HomeExperienceProps = {
  latestArticles: Article[];
  featuredArticles: Article[];
  categories: (CategoryConfig & { count: number })[];
  resources: ResourceItem[];
};

const masterRoute = [
  {
    id: "01",
    title: "身份准备",
    label: "主航道",
    note: "邮箱、资料和恢复方式先整理，后面的注册不会反复倒退。",
  },
  {
    id: "02",
    title: "网络准备",
    label: "主航道",
    note: "先让访问环境稳定下来，再碰订阅与扣费。",
  },
  {
    id: "03",
    title: "账号准备",
    label: "支线 A",
    note: "Apple 与 Google 分开看，别一开始全混在一起。",
  },
  {
    id: "04",
    title: "支付准备",
    label: "支线 B",
    note: "礼品卡、虚拟卡、香港卡分别对应不同航段。",
  },
  {
    id: "05",
    title: "工具启航",
    label: "主航道",
    note: "高频入口先跑通，后面再开扩展航线。",
  },
];

const entryRoutes = [
  {
    title: "第一次出海",
    note: "适合完全从零开始的人，先建立账号和支付秩序。",
    href: "/start",
    meta: "5 站主航道",
  },
  {
    title: "支付卡住",
    note: "已经能访问外网，但续费和扣费总是不稳定。",
    href: "/category/payment",
    meta: "补给支线",
  },
  {
    title: "已经出海",
    note: "不再从头学起，直接进入工具、发现和日志层。",
    href: "/discoveries",
    meta: "自由探索",
  },
];

function HarborCard({ item }: { item: HarborCategory }) {
  const tone = toneClassMap[item.tone];

  return (
    <Link
      href={item.href}
      className="surface-panel group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="section-kicker">船坞</p>
          <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-foreground">
            {item.title}
          </h3>
        </div>
        <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${tone.badge}`}>
          靠岸
        </span>
      </div>

      <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{item.note}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.brands.slice(0, 3).map((brand) => (
          <BrandMark key={brand} brand={brand} size="sm" />
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
        进入这一类玩法
        <ArrowUpRight size={14} />
      </div>
    </Link>
  );
}

function SignalRow({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid gap-3 border-b border-line/80 py-4 transition-colors last:border-b-0 hover:text-foreground md:grid-cols-[3rem_minmax(0,1fr)_auto]"
    >
      <span className="text-[11px] uppercase tracking-[0.2em] text-muted [font-family:var(--font-mono),monospace]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="space-y-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{article.title}</h3>
        <p className="max-w-2xl text-sm leading-7 text-muted">{article.description}</p>
      </div>
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
        <span>{article.categoryName}</span>
        <span>{article.readingTime}</span>
      </div>
    </Link>
  );
}

function LogbookCard({ panel, article }: { panel: LogbookPanel; article?: Article }) {
  const Icon = panel.id === "supply" ? Package : panel.id === "logbook" ? Notebook : Sparkle;
  const tone = toneClassMap[panel.tone];

  return (
    <Link
      href={panel.id === "logbook" && article ? `/articles/${article.slug}` : panel.href}
      className="surface-muted p-5 transition-colors hover:border-foreground hover:bg-white/72"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker">{panel.title}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground">
            {panel.id === "logbook" && article ? article.title : panel.title}
          </h3>
        </div>
        <Icon size={18} className={tone.text} />
      </div>

      <p className="mt-3 text-sm leading-7 text-muted">
        {panel.id === "logbook" && article ? article.description : panel.note}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
        继续展开
        <ArrowUpRight size={14} />
      </div>
    </Link>
  );
}

gsap.registerPlugin(useGSAP);

export function HomeExperience({
  latestArticles,
  featuredArticles,
  categories,
  resources,
}: HomeExperienceProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);

  const primaryArticle = featuredArticles[0] ?? latestArticles[0];
  const archiveArticle = latestArticles[1] ?? featuredArticles[1] ?? primaryArticle;

  const harborFocus = useMemo(() => harborCategories.slice(0, 4), []);
  const latestSignals = useMemo(() => latestArticles.slice(0, 4), [latestArticles]);
  const quickResources = useMemo(() => resources.slice(0, 2), [resources]);
  const categorySummary = useMemo(
    () =>
      categories
        .slice()
        .sort((a, b) => b.count - a.count)
        .slice(0, 4),
    [categories],
  );

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const groups = [
          { ref: heroRef, selector: "[data-hero-item]", y: 16, delay: 0 },
          { ref: dockRef, selector: "[data-dock-item]", y: 14, delay: 0.08 },
          { ref: archiveRef, selector: "[data-archive-item]", y: 12, delay: 0.12 },
        ];

        groups.forEach(({ ref, selector, y, delay }) => {
          if (!ref.current) {
            return;
          }

          gsap.from(ref.current.querySelectorAll(selector), {
            opacity: 0,
            y,
            stagger: 0.06,
            duration: 0.56,
            delay,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        });

        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll("[data-line-grow]"), {
            scaleX: 0.75,
            transformOrigin: "left center",
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.14,
            clearProps: "transform,opacity",
          });
        }
      });

      return () => media.revert();
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="page-shell space-y-10 py-6 md:space-y-14 md:py-8">
      <section className="xl:hidden">
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {masterRoute.map((stop) => (
            <div key={stop.id} className="surface-panel min-w-[15rem] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="section-kicker">{stop.label}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                  {stop.id}
                </span>
              </div>
              <p className="mt-3 text-base font-semibold tracking-tight text-foreground">{stop.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{stop.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line pb-10 md:pb-14">
        <div
          ref={heroRef}
          className="grid gap-6 xl:grid-cols-[15rem_minmax(0,1fr)_minmax(20rem,23rem)]"
        >
          <aside data-hero-item className="hidden xl:block">
            <div className="surface-panel sticky top-28 p-5">
              <div className="border-b border-line/90 pb-4">
                <p className="section-kicker">主航道总图</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  首页先给顺序，工具和补给都退回到它们该出现的位置。
                </p>
              </div>

              <ol className="relative mt-6 space-y-5">
                <span className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-black/10" />
                {masterRoute.map((stop, index) => (
                  <li key={stop.id} className={`relative pl-9 ${index > 1 && index < 4 ? "ml-5" : ""}`}>
                    {index > 1 && index < 4 ? (
                      <span className="absolute -left-5 top-[0.95rem] h-px w-5 bg-black/10" />
                    ) : null}
                    <span className="absolute left-0 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-foreground bg-background text-[10px] [font-family:var(--font-mono),monospace]">
                      {stop.id}
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold tracking-tight text-foreground">{stop.title}</p>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                          {stop.label}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-muted">{stop.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="space-y-6">
            <div data-hero-item className="space-y-4 border-b border-line/90 pb-5">
              <p className="section-kicker">{siteConfig.logline}</p>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                路格舶不再把文章、支付、工具和发现平铺给你看，而是先告诉你下一步该往哪里走。
              </p>
            </div>

            <div data-hero-item className="space-y-5">
              <span className="inline-flex rounded-full border border-accent/15 bg-accent-soft px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-accent [font-family:var(--font-mono),monospace]">
                AI 时代的出海新手村
              </span>
              <h1 className="max-w-4xl font-serif text-[clamp(2.95rem,7vw,6.3rem)] leading-[0.94] tracking-[-0.055em] text-foreground">
                <span className="block">寻未知路；</span>
                <span className="block">格世界物；</span>
                <span className="block">舶沧海途。</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted md:text-lg md:leading-9">
                欢迎登船。先选设备，再选状态，然后让航线自己长出来。首页只保留你第一次来最需要看到的东西。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/start" className="button-primary">
                  生成你的登船指南
                </Link>
                <Link href={`/articles/${primaryArticle.slug}`} className="button-secondary">
                  看今天这篇主线
                </Link>
              </div>
            </div>

            <div data-hero-item className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)]">
              <Link
                href={`/articles/${primaryArticle.slug}`}
                className="surface-panel p-5 transition-colors hover:border-foreground hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="section-kicker">今日主线</p>
                    <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-foreground">
                      {primaryArticle.title}
                    </h2>
                  </div>
                  <ArrowUpRight size={16} className="mt-1 text-muted" />
                </div>
                <p className="mt-3 max-w-xl text-sm leading-8 text-muted">{primaryArticle.description}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                  <span>{primaryArticle.categoryName}</span>
                  <span>{primaryArticle.readingTime}</span>
                </div>
              </Link>

              <div className="surface-muted p-5">
                <p className="section-kicker">首页原则</p>
                <div className="mt-4 space-y-3">
                  <div data-line-grow className="border-b border-line/80 pb-3">
                    <p className="text-base font-semibold tracking-tight text-foreground">先给顺序</p>
                    <p className="mt-1 text-sm leading-7 text-muted">把新手真正要走的五站放回主航道。</p>
                  </div>
                  <div data-line-grow className="border-b border-line/80 pb-3">
                    <p className="text-base font-semibold tracking-tight text-foreground">再给靠岸点</p>
                    <p className="mt-1 text-sm leading-7 text-muted">工具按玩法归类，而不是一股脑列品牌。</p>
                  </div>
                  <div data-line-grow>
                    <p className="text-base font-semibold tracking-tight text-foreground">最后才给档案层</p>
                    <p className="mt-1 text-sm leading-7 text-muted">补给站、日志和新大陆都往后收，避免首屏过载。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-hero-item className="space-y-4">
            <VoyagePlanner mode="compact" />

            <div className="surface-muted p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="section-kicker">补给短单</p>
                <Compass size={16} className="text-muted" />
              </div>
              <div className="mt-4 space-y-4">
                {quickResources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block border-b border-line/80 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold tracking-tight text-foreground">{item.name}</p>
                        <p className="mt-2 text-sm leading-7 text-muted">{item.risk}</p>
                      </div>
                      {item.brand ? <BrandMark brand={item.brand} size="sm" showLabel={false} /> : null}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={dockRef} className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div data-dock-item className="space-y-3">
            <p className="section-kicker">主航道 / 支线图</p>
            <h2 className="section-title">先决定你在哪一段海面，再决定往哪个码头靠</h2>
            <p className="max-w-xl text-sm leading-8 text-muted">
              这部分不再把所有工具和文章都摊开，只保留三条最常见的入口航线，帮你快速找到当前应该走的那条。
            </p>
          </div>

          <div className="grid gap-3" data-dock-item>
            {entryRoutes.map((route) => (
              <Link
                key={route.title}
                href={route.href}
                className="surface-panel p-5 transition-colors hover:border-foreground hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{route.title}</h3>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                    {route.meta}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{route.note}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {harborFocus.map((item) => (
            <div key={item.id} data-dock-item>
              <HarborCard item={item} />
            </div>
          ))}
          <div data-dock-item className="surface-muted flex flex-col justify-between p-5 md:col-span-2">
            <div>
              <p className="section-kicker">继续靠岸</p>
              <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.04em] text-foreground">
                其他支线先收起来，需要时再展开。
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">
                AI 创业、AI 视频、AI 音乐和更多开发支线仍然都在，只是不再抢首页的第一眼注意力。
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/category" className="button-secondary">
                查看全部航路
              </Link>
              <Link href="/discoveries" className="button-secondary">
                进入新大陆
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={archiveRef} className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="space-y-4">
          <div data-archive-item className="space-y-3">
            <p className="section-kicker">档案层</p>
            <h2 className="section-title">当你已经知道方向，才轮到文章、补给和日志接手</h2>
            <p className="max-w-2xl text-sm leading-8 text-muted">
              首页不承担所有内容分发，只保留最近几条最值得看的信号。剩下的归文章页、分类页和独立航线页去承接。
            </p>
          </div>

          <div data-archive-item className="surface-panel p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="section-kicker">最新信号</p>
              <Link href="/category" className="text-sm font-medium text-foreground">
                查看全部
              </Link>
            </div>
            <div className="mt-3">
              {latestSignals.map((article, index) => (
                <SignalRow key={article.slug} article={article} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div data-archive-item className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {logbookPanels.map((panel, index) => (
              <LogbookCard
                key={panel.id}
                panel={panel}
                article={index === 2 ? archiveArticle : undefined}
              />
            ))}
          </div>

          <div data-archive-item className="grid gap-4 md:grid-cols-2">
            <div className="surface-muted p-5">
              <p className="section-kicker">高频分类</p>
              <div className="mt-4 grid gap-2">
                {categorySummary.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between border-b border-line/80 py-2.5 text-sm transition-colors last:border-b-0 hover:text-foreground"
                  >
                    <span className="text-muted">{category.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                      {category.count} 篇
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <p className="section-kicker">世界观</p>
              <div className="mt-4 space-y-3">
                <p className="text-base font-semibold tracking-tight text-foreground">一级标题继续说人话。</p>
                <p className="text-sm leading-7 text-muted">出海、支付、Apple ID、开发工具这些词继续保留，用来服务理解和 SEO。</p>
                <p className="text-base font-semibold tracking-tight text-foreground">二级文案再用品牌词。</p>
                <p className="text-sm leading-7 text-muted">航路、船坞、补给站、航海日志、新大陆，这些只负责建立记忆点和品牌气味。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
