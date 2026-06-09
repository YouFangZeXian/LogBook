"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Compass, Sparkle, Star } from "@phosphor-icons/react/dist/ssr";

import { VoyagePlanner } from "@/components/voyage-planner";
import { BrandMark } from "@/components/brand-mark";
import type { ResourceItem } from "@/data/resources";
import type { Article } from "@/lib/content";
import { siteConfig, type CategoryConfig } from "@/lib/site";
import { harborCategories } from "@/lib/voyage-system";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HomeExperienceProps = {
  latestArticles: Article[];
  featuredArticles: Article[];
  categories: (CategoryConfig & { count: number })[];
  resources: ResourceItem[];
};

/* ── Route Line SVG: 极简路线图视觉 ── */
function RouteLineVisual() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-auto w-full max-w-[320px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 柔和曲线路径 */}
      <path
        d="M24 172 Q 80 170, 120 140 Q 170 102, 200 70 Q 230 38, 296 28"
        stroke="var(--brand-sea)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
        opacity="0.5"
      />
      {/* 起点圆点 */}
      <circle cx="24" cy="172" r="6" fill="var(--brand-deep)" className="animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
      {/* 任务节点 */}
      <circle cx="120" cy="140" r="4" fill="var(--brand-sea)" opacity="0.7" />
      <circle cx="200" cy="70" r="4" fill="var(--brand-sea)" opacity="0.7" />
      {/* 终点光点 */}
      <circle cx="296" cy="28" r="5" fill="var(--gold)" opacity="0.9" className="animate-[route-glow_2s_ease-in-out_infinite]" />
      {/* 轻柔海面波纹 */}
      <path
        d="M10 182 Q 60 178, 110 182 Q 160 186, 210 182 Q 260 178, 310 182"
        stroke="var(--brand-sea)"
        strokeWidth="1"
        opacity="0.18"
        fill="none"
      />
      <path
        d="M20 190 Q 70 186, 120 190 Q 170 194, 220 190 Q 270 186, 310 190"
        stroke="var(--brand-sea)"
        strokeWidth="0.7"
        opacity="0.1"
        fill="none"
      />
    </svg>
  );
}

/* ── Section entrance animation ── */
function useReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        opacity: 0,
        y: 16,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => mm.revert();
  }, { scope: ref });
}

/* ── Article row ── */
function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex items-start gap-4 border-b border-border py-4 transition-colors last:border-b-0 hover:bg-brand-mist-soft/50 hover:-mx-3 hover:px-3 hover:rounded-xl"
    >
      <span className="mt-0.5 shrink-0 text-xs text-faint [font-family:var(--font-mono)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover:text-brand">
          {article.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-muted line-clamp-2">{article.description}</p>
      </div>
      <div className="hidden shrink-0 items-center gap-2 text-xs text-faint [font-family:var(--font-mono)] md:flex">
        <span>{article.readingTime}</span>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════ */
export function HomeExperience({
  latestArticles,
  featuredArticles,
  categories,
  resources,
}: HomeExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const routeSectionRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);

  const primaryArticle = featuredArticles[0] ?? latestArticles[0];
  const harborList = useMemo(() => harborCategories.slice(0, 4), []);
  const latestList = useMemo(() => latestArticles.slice(0, 5), [latestArticles]);
  const topCategories = useMemo(
    () => categories.sort((a, b) => b.count - a.count).slice(0, 4),
    [categories],
  );
  const quickResources = useMemo(() => resources.slice(0, 2), [resources]);

  /* Hero entrance */
  useGSAP(() => {
    if (!heroRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(heroRef.current!.querySelectorAll("[data-hero-item]"), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    });
    return () => mm.revert();
  }, { scope: heroRef });

  useReveal(routeSectionRef);
  useReveal(dockRef);
  useReveal(archiveRef);

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* ═══ HERO — 登船第一屏 ═══ */}
      <section ref={heroRef} className="page-shell pb-12 pt-8 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          {/* Left: text + CTAs */}
          <div className="max-w-2xl space-y-6">
            {/* kicker */}
            <div data-hero-item className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-mist bg-brand-mist-soft px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-brand [font-family:var(--font-mono)]">
                <Compass size={13} />
                AI 时代的出海新手村
              </span>
            </div>

            {/* Site name */}
            <p data-hero-item className="text-lg font-medium tracking-[-0.02em] text-brand">
              路格舶
            </p>

            {/* H1 — big and clean */}
            <h1 data-hero-item className="heading-hero max-w-2xl">
              寻未知路；
              <br />
              格世界物；
              <br />
              舶沧海途。
            </h1>

            {/* Subtitle */}
            <p data-hero-item className="body-text max-w-lg">
              AI 时代的设备出海新手村与船员航海日志社区。先选设备，再生成航线，让方向自然长出来。
            </p>

            {/* CTAs */}
            <div data-hero-item className="flex flex-wrap gap-3 pt-2">
              <Link href="/start" className="btn-primary px-6 py-3 text-base">
                开始登船
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/category" className="btn-secondary px-6 py-3 text-base">
                查看航路
              </Link>
              <Link
                href={primaryArticle ? `/articles/${primaryArticle.slug}` : "/category"}
                className="btn-ghost px-6 py-3 text-base"
              >
                不注册，直接访问
              </Link>
            </div>
          </div>

          {/* Right: route line visual (desktop) */}
          <div data-hero-item className="hidden lg:block">
            <RouteLineVisual />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — 入口航线 ═══ */}
      <section ref={routeSectionRef} className="border-t border-border bg-background-secondary">
        <div className="page-shell py-12 md:py-20">
          <div className="mb-8 space-y-3" data-reveal>
            <p className="kicker">主航道</p>
            <h2 className="heading-section">先决定你在哪一段海面，再决定往哪个码头靠。</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "第一次出海",
                desc: "完全从零开始。先建立账号与支付秩序。",
                href: "/start",
                meta: "5 站主航道",
                highlight: true,
              },
              {
                title: "支付卡住了",
                desc: "网络已通，但扣费总不稳定。先排查支付路线。",
                href: "/category/payment",
                meta: "补给支线",
              },
              {
                title: "已经出海",
                desc: "不再从头学起。直接进工具、发现与日志层。",
                href: "/discoveries",
                meta: "自由探索",
              },
            ].map((route, i) => (
              <Link
                key={route.title}
                href={route.href}
                data-reveal
                className={`surface flex flex-col gap-3 p-5 ${
                  route.highlight ? "border-brand/15 bg-brand-mist-soft/60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold [font-family:var(--font-mono)]">
                    {i + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
                    {route.meta}
                  </span>
                </div>
                <h3 className="heading-card">{route.title}</h3>
                <p className="body-sm">{route.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — 船坞 ═══ */}
      <section ref={dockRef} className="page-shell py-12 md:py-20">
        <div className="mb-8 space-y-3" data-reveal>
          <p className="kicker">船坞</p>
          <h2 className="heading-section">玩法分类。哪个码头近就先靠哪个。</h2>
          <p className="body-text max-w-xl">
            工具不按品牌堆砌，而是按玩法归类。先找到适合你的码头。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {harborList.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              data-reveal
              className="surface flex flex-col gap-3 p-5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-border bg-brand-mist-soft text-brand-sea">
                  <Compass size={16} />
                </span>
                <span className="tag tag-brand">{item.title.replace("AI ", "")}</span>
              </div>
              <p className="body-sm">{item.note}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {item.brands.slice(0, 3).map((brand) => (
                  <BrandMark key={brand} brand={brand} size="sm" />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 4 — 登船面板 (VoyagePlanner) ═══ */}
      <section className="border-t border-border bg-background-secondary">
        <div className="page-shell py-12 md:py-20">
          <div className="mb-8 text-center space-y-3">
            <p className="kicker">交互登船面板</p>
            <h2 className="heading-section">选设备、定状态，剩下的航线自己长出来。</h2>
          </div>
          <VoyagePlanner mode="full" />
        </div>
      </section>

      {/* ═══ SECTION 5 — 档案层 (文章 + 分类 + 资源) ═══ */}
      <section ref={archiveRef} className="page-shell border-t border-border py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Articles */}
          <div>
            <div className="mb-6 flex items-end justify-between" data-reveal>
              <div className="space-y-2">
                <p className="kicker">最新信号</p>
                <h2 className="heading-section">航海日志</h2>
              </div>
              <Link href="/category" className="btn-ghost text-sm">
                查看全部 →
              </Link>
            </div>

            <div data-reveal className="surface p-5">
              {latestList.map((article, i) => (
                <ArticleRow key={article.slug} article={article} index={i} />
              ))}
            </div>

            {/* 投稿入口 */}
            <div data-reveal className="surface-mist mt-6 p-5 text-center">
              <Sparkle size={18} className="mx-auto text-brand-sea" />
              <p className="mt-3 text-sm font-semibold text-brand">
                你也有航海发现？
              </p>
              <p className="mt-1 body-sm">把你的发现交给船舱，帮下一位船员少绕远路。</p>
              <Link href="/contribute" className="btn-mist mt-4">
                我要投稿 <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Categories */}
            <div data-reveal className="surface p-5">
              <p className="kicker mb-4">高频航路</p>
              {topCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex items-center justify-between border-b border-border py-3 text-sm transition-colors last:border-b-0 hover:text-brand"
                >
                  <span className="text-muted">{cat.name}</span>
                  <span className="text-xs text-faint [font-family:var(--font-mono)]">{cat.count} 篇</span>
                </Link>
              ))}
            </div>

            {/* Quick resources */}
            <div data-reveal className="surface-sand p-5">
              <div className="mb-4 flex items-center gap-2">
                <Star size={14} className="text-gold" />
                <p className="kicker">补给短单</p>
              </div>
              {quickResources.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block border-b border-black/5 py-3 last:border-b-0 last:pb-0 transition-colors hover:text-brand"
                >
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs leading-6 text-muted">{item.risk}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
