"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  NewspaperClipping,
  PenNibStraight,
  Sparkle,
  UserCircle,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { ArticleCard } from "@/components/article-card";
import { BrandMark } from "@/components/brand-mark";
import { getCurrentLogbookUser } from "@/components/auth-dialog";
import type { Article } from "@/lib/content";
import { toneClassMap } from "@/lib/brand-library";
import { discoveryItems } from "@/data/discoveries";

/* ── Quick entry cards ── */

const quickEntries = [
  {
    href: "/start",
    icon: <Compass size={20} weight="duotone" />,
    title: "开始登船",
    desc: "选设备、定状态，生成专属航线",
    accent: "bg-brand-mist text-brand",
  },
  {
    href: "/routes",
    icon: <Sparkle size={20} weight="duotone" />,
    title: "我的航线",
    desc: "查看进度，继续上次的航程",
    accent: "bg-sand-soft text-brand-sea",
  },
  {
    href: "/tools",
    icon: <Wrench size={20} weight="duotone" />,
    title: "船坞",
    desc: "探索 AI 工具，按玩法分类",
    accent: "bg-gold-soft text-gold",
  },
  {
    href: "/contribute",
    icon: <PenNibStraight size={20} weight="duotone" />,
    title: "投稿",
    desc: "把你的发现交给船舱",
    accent: "bg-success-soft text-success",
  },
];

/* ── Component ── */

type HomeExperienceProps = {
  latestArticles: Article[];
};

export function HomeExperience({ latestArticles }: HomeExperienceProps) {
  const [userName, setUserName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserName(getCurrentLogbookUser()?.name ?? "");
  }, []);

  if (!mounted) return null;

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* ── Welcome Banner ── */}
      <section className="bg-background-secondary">
        <div className="page-shell py-12 md:py-20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="kicker">港口大厅</p>
            <h1 className="heading-hero">
              {userName
                ? `${userName}，今天海面还不错。`
                : "舶来四海之物"}
            </h1>
            <p className="body-text text-base">
              {userName
                ? "看看今天有什么值得关注的新发现、新工具和新航线。"
                : "记录 AI 时代的舶海日志。帮你避开订阅、支付和账号的暗礁，找到属于自己的航线。"}
            </p>
            {!userName ? (
              <Link href="/login" className="btn-primary mt-2">
                <UserCircle size={16} weight="fill" />
                登船 / 注册
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Quick Entries ── */}
      <section className="page-shell -mt-6 pb-10 md:pb-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickEntries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="surface group flex items-start gap-4 p-5 transition-all hover:border-brand/20 hover:-translate-y-0.5"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${entry.accent}`}
              >
                {entry.icon}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                  {entry.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted">{entry.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Today's Wind + New Discoveries ── */}
      <section className="page-shell pb-10 md:pb-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          {/* 今日风向 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <NewspaperClipping size={18} weight="duotone" className="text-brand-sea" />
                <h2 className="heading-section text-xl">今日风向</h2>
              </div>
              <Link
                href="/category"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-sea hover:text-brand transition-colors"
              >
                全部航路 <ArrowUpRight size={12} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.length ? (
                latestArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} compact />
                ))
              ) : (
                <div className="col-span-full surface-muted p-8 text-center text-sm text-muted">
                  航海日志正在整理中，稍后回来看看。
                </div>
              )}
            </div>
          </div>

          {/* 最新新大陆 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkle size={18} weight="duotone" className="text-gold" />
                <h2 className="heading-section text-xl">最新新大陆</h2>
              </div>
              <Link
                href="/discoveries"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-sea hover:text-brand transition-colors"
              >
                全部 <ArrowUpRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {discoveryItems.slice(0, 2).map((item) => {
                const tone = toneClassMap[item.tone];
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="surface block p-4 transition-colors hover:border-brand/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${tone.badge}`}
                        >
                          {item.kind}
                        </span>
                        <h3 className="mt-2 text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-muted">
                          {item.note.length > 60
                            ? item.note.slice(0, 60) + "…"
                            : item.note}
                        </p>
                      </div>
                      <BrandMark brand={item.brand} size="sm" showLabel={false} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Site Announcement ── */}
      <section className="page-shell pb-10 md:pb-14">
        <div className="surface-mist p-6 md:p-8 rounded-[22px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="kicker">站点公告</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">
                路格舶正在招募早期船员
              </h2>
              <p className="mt-1 text-sm leading-7 text-muted max-w-xl">
                早期投稿者将在未来社区上线时继承高级船员身份。把你踩过的坑、发现的工具、省下来的钱写成航海日志，帮下一位船员少绕一段远路。
              </p>
            </div>
            <Link
              href="/contribute"
              className="btn-primary shrink-0"
            >
              <PenNibStraight size={16} weight="fill" />
              我要投稿
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
