"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Notebook,
  Package,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { VoyagePlanner } from "@/components/voyage-planner";
import type { Article } from "@/lib/content";
import { toneClassMap } from "@/lib/brand-library";
import { siteConfig, type CategoryConfig } from "@/lib/site";
import {
  harborCategories,
  logbookPanels,
  type LogbookPanel,
  type HarborCategory,
} from "@/lib/voyage-system";
import type { ResourceItem } from "@/data/resources";

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
    note: "邮箱、资料与恢复方式先理清，不让后面的注册和验证反复回头。",
  },
  {
    id: "02",
    title: "网络准备",
    label: "主航道",
    note: "网络与浏览器是底座。先跑稳，再去碰订阅与扣费。",
  },
  {
    id: "03",
    title: "账号准备",
    label: "支线 A",
    note: "Apple 体系与 Google 体系分开看，别一开始全堆在一起。",
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
    note: "工具只开高频入口，不把所有名字一次搬上船。",
  },
];

function HarborCard({ item }: { item: HarborCategory }) {
  const tone = toneClassMap[item.tone];

  return (
    <Link
      href={item.href}
      className="group rounded-[1rem] border border-line bg-white/66 p-5 transition-colors hover:border-foreground hover:bg-white/82"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">船坞</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
            {item.title}
          </h3>
        </div>
        <span className={`mt-1 inline-flex h-2.5 w-2.5 rounded-full ${tone.line}`} />
      </div>

      <p className="mt-3 text-sm leading-7 text-muted">{item.note}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.brands.map((brand) => (
          <BrandMark key={brand} brand={brand} size="sm" />
        ))}
      </div>

      <div className={`mt-5 inline-flex items-center gap-2 rounded-[0.8rem] px-3 py-2 text-xs font-medium ${tone.badge}`}>
        进入这一类玩法
        <ArrowUpRight size={13} />
      </div>
    </Link>
  );
}

function LogbookCard({
  panel,
  article,
}: {
  panel: LogbookPanel;
  article?: Article;
}) {
  const tone = toneClassMap[panel.tone];
  const Icon = panel.id === "supply" ? Package : panel.id === "logbook" ? Notebook : Sparkle;

  return (
    <Link
      href={panel.id === "logbook" && article ? `/articles/${article.slug}` : panel.href}
      className="rounded-[0.95rem] border border-line bg-background/72 p-5 transition-colors hover:border-foreground hover:bg-white/42"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${tone.badge}`}>
            {panel.title}
          </span>
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground">
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

export function HomeExperience({
  latestArticles,
  featuredArticles,
  categories,
  resources,
}: HomeExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const harborRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  const primaryArticle = featuredArticles[0] ?? latestArticles[0];
  const archiveArticle = latestArticles[1] ?? featuredArticles[1] ?? primaryArticle;

  const categorySummary = useMemo(
    () =>
      categories
        .slice()
        .sort((a, b) => b.count - a.count)
        .slice(0, 4),
    [categories],
  );

  const quickResources = useMemo(
    () => resources.slice(0, 3),
    [resources],
  );

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll("[data-hero-item]"), {
            opacity: 0.92,
            y: 14,
            stagger: 0.07,
            duration: 0.54,
            ease: "power2.out",
          });
        }

        if (harborRef.current) {
          gsap.from(harborRef.current.querySelectorAll("[data-harbor-item]"), {
            opacity: 0.9,
            y: 12,
            stagger: 0.06,
            duration: 0.46,
            ease: "power2.out",
            delay: 0.08,
          });
        }

        if (archiveRef.current) {
          gsap.from(archiveRef.current.querySelectorAll("[data-archive-item]"), {
            opacity: 0.92,
            y: 10,
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
    <div ref={scopeRef} className="page-shell space-y-14 py-8 md:space-y-[4.8rem] md:py-10">
      <section className="space-y-8 border-b border-line pb-12">
        <div
          ref={heroRef}
          className="grid gap-8 xl:grid-cols-[16.5rem_minmax(0,1fr)_minmax(22rem,0.88fr)]"
        >
          <aside data-hero-item className="hidden xl:block">
            <div className="sticky top-28 rounded-[1rem] border border-line bg-white/62 p-5">
              <div className="border-b border-line pb-4">
                <p className="eyebrow">主航道总图</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  首页先给方向。支付、工具与日志都被压回它们该出现的航段里。
                </p>
              </div>

              <ol className="relative mt-6 space-y-6">
                <span className="absolute left-[10px] top-2 h-[calc(100%-1.2rem)] w-px bg-black/12" />
                {masterRoute.map((stop, index) => (
                  <li key={stop.id} className={`relative pl-9 ${index > 1 && index < 4 ? "ml-5" : ""}`}>
                    {index > 1 && index < 4 ? (
                      <span className="absolute -left-5 top-[0.95rem] h-px w-5 bg-black/12" />
                    ) : null}
                    <span className="absolute left-0 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-foreground bg-background text-[10px] [font-family:var(--font-mono),monospace]">
                      {stop.id}
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold tracking-tight text-foreground">{stop.title}</p>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-muted [font-family:var(--font-mono),monospace]">
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

          <div data-hero-item className="space-y-7">
            <div className="space-y-3 border-b border-line pb-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                {siteConfig.logline}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                路格舶不再是一排排攻略卡，而是把第一次上船的人先带到正确的起点，再告诉他下一步该往哪走。
              </p>
            </div>

            <div className="space-y-5">
              <span className="rounded-full border border-sky-200/90 bg-sky-50 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-sky-700 [font-family:var(--font-mono),monospace]">
                AI 时代的出海新手村
              </span>
              <h1 className="max-w-4xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.95] tracking-[-0.05em] text-foreground">
                <span className="block">寻未知路；</span>
                <span className="block">格世界物；</span>
                <span className="block">舶沧海途。</span>
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-muted">
                欢迎登船。先选设备，再选状态，然后让整条航路自己长出来。
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Link
                href={`/articles/${primaryArticle.slug}`}
                className="rounded-[1rem] border border-line bg-white/66 p-5 transition-colors hover:border-foreground hover:bg-white/82"
              >
                <p className="section-kicker">今日主线</p>
                <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-foreground">
                  {primaryArticle.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-8 text-muted">
                  {primaryArticle.description}
                </p>
                <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted [font-family:var(--font-mono),monospace]">
                  <span>{primaryArticle.categoryName}</span>
                  <span>{primaryArticle.readingTime}</span>
                </div>
              </Link>

              <div className="grid gap-3">
                {quickResources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-[0.95rem] border border-line bg-background/66 p-4 transition-colors hover:border-foreground hover:bg-white/52"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="section-kicker">
                          {item.category === "payment"
                            ? "补给站"
                            : item.category === "tool"
                              ? "船坞"
                              : "教程"}
                        </p>
                        <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                          {item.name}
                        </p>
                      </div>
                      {item.brand ? <BrandMark brand={item.brand} size="sm" showLabel={false} /> : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.risk}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div data-hero-item>
            <VoyagePlanner mode="compact" />
          </div>
        </div>
      </section>

      <section ref={harborRef} className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="section-kicker">船坞</p>
          <h2 className="section-title">按玩法靠岸，而不是按品牌乱逛</h2>
          <p className="text-sm leading-8 text-muted">
            工具不是越多越好。先按你要解决的问题靠岸，再决定要不要继续开新航线。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {harborCategories.map((item) => (
            <div key={item.id} data-harbor-item>
              <HarborCard item={item} />
            </div>
          ))}
        </div>
      </section>

      <section ref={archiveRef} className="space-y-6 border-t border-line pt-8">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div data-archive-item className="space-y-3">
            <p className="section-kicker">后续玩法</p>
            <h2 className="section-title">主线之外，才轮到补给、日志与新大陆</h2>
            <p className="max-w-md text-sm leading-8 text-muted">
              先把主航道走通，再去看新发现和日志，体验会清楚得多。
            </p>

            <div className="mt-6 rounded-[0.95rem] border border-line bg-white/46 p-4">
              <p className="section-kicker">分类索引</p>
              <div className="mt-4 grid gap-2">
                {categorySummary.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between border-b border-line py-3 text-sm text-muted transition-colors last:border-b-0 hover:text-foreground"
                  >
                    <span>{category.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] [font-family:var(--font-mono),monospace]">
                      {category.count} 篇
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3" data-archive-item>
            {logbookPanels.map((panel, index) => (
              <LogbookCard
                key={panel.id}
                panel={panel}
                article={index === 2 ? archiveArticle : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
