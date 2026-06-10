"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Medal,
  SignIn,
  Star,
  Trophy,
} from "@phosphor-icons/react/dist/ssr";
import {
  getCurrentLogbookUser,
  requestLogbookLogin,
} from "@/components/auth-dialog";

type Submission = { status?: string };

function read<T>(key: string): T[] {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
}

const crewLevels = [
  { level: "登船者", miles: 0, desc: "刚刚踏上甲板，从零开始探索航海日志。" },
  { level: "船员", miles: 80, desc: "已经开始积累航海里程，有自己的航线了。" },
  { level: "贡献船员", miles: 240, desc: "为船舱贡献了内容，帮到了其他船员。" },
  { level: "领航员", miles: 500, desc: "熟悉多条航线，能引导新登船者找到方向。" },
  { level: "大副", miles: 1200, desc: "船舱的核心维护者，贡献了大量航线与指南。" },
  { level: "船长", miles: 3000, desc: "社区的领航者，为后来者定义了出海标准。" },
  { level: "远洋船长", miles: 8000, desc: "跨越了不止一片海域，是真正的 AI 时代探索者。" },
];

export function CrewProfile() {
  const [userName, setUserName] = useState("");
  const [subs, setSubs] = useState<Submission[]>([]);
  const [prog, setProg] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setUserName(getCurrentLogbookUser()?.name ?? "");
      setSubs(read<Submission>("logbook.submissions"));
      setProg([
        ...read<string>("logbook.voyage.progress"),
        ...read<string>("logbook.routes.progress"),
      ]);
    };
    sync();
    window.addEventListener("logbook-auth-changed", sync);
    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  const stats = useMemo(() => {
    const accepted = subs.filter((s) =>
      ["accepted", "merged", "published"].includes(s.status ?? "")
    ).length;
    const miles = prog.length * 12 + subs.length * 30 + accepted * 80;
    const level =
      miles >= 8000
        ? "远洋船长"
        : miles >= 3000
          ? "船长"
          : miles >= 1200
            ? "大副"
            : miles >= 500
              ? "领航员"
              : miles >= 240
                ? "贡献船员"
                : miles >= 80
                  ? "船员"
                  : userName
                    ? "登船者"
                    : "游客";
    const nextLevel = crewLevels.find((l) => l.miles > miles);
    return { accepted, miles, level, nextLevel };
  }, [prog.length, subs, userName]);

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      {/* ── Hero ── */}
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface p-6 md:p-8">
          <p className="kicker">船员身份</p>
          <h1 className="heading-hero mt-4">
            {userName
              ? `${userName} 的船员档案`
              : "登录后继承你的航线。"}
          </h1>
          <p className="body-text mt-4">
            当前为前端预留版。未来接入账户系统后可迁移到云端。
          </p>
          {!userName ? (
            <button
              type="button"
              onClick={() =>
                requestLogbookLogin("登录后可保存航线、投稿和累积航海里程。")
              }
              className="btn-primary mt-6"
            >
              <SignIn size={16} /> 登录 / 注册
            </button>
          ) : null}
        </div>
        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["当前等级", stats.level],
            ["航海里程", `${stats.miles} 海里`],
            ["投稿数量", `${subs.length} 条`],
            ["被采纳", `${stats.accepted} 条`],
          ].map(([label, value]) => (
            <div key={label as string} className="surface-muted p-5">
              <Medal size={18} className="text-brand-sea" />
              <p className="mt-3 text-sm text-muted">{label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Crew Level System ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy size={18} weight="duotone" className="text-gold" />
          <h2 className="heading-section text-xl">船员等级体系</h2>
        </div>
        <p className="body-sm max-w-2xl">
          航海里程由航线完成度、投稿数量和被采纳次数计算。每一次贡献都在累积你的航海身份。
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {crewLevels.map((lvl) => {
            const isCurrent = stats.level === lvl.level;
            return (
              <div
                key={lvl.level}
                className={`surface p-4 transition-all ${
                  isCurrent
                    ? "border-brand/30 bg-brand-mist-soft"
                    : "opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`font-semibold ${isCurrent ? "text-brand" : "text-foreground"}`}>
                    {lvl.level}
                  </p>
                  {isCurrent ? (
                    <span className="rounded-full bg-brand text-white px-2 py-0.5 text-[10px] font-medium">
                      当前
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-faint [font-family:var(--font-mono)]">
                  {lvl.miles}+ 海里
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{lvl.desc}</p>
              </div>
            );
          })}
        </div>
        {stats.nextLevel ? (
          <div className="surface-mist p-4 text-center text-sm text-muted">
            距离下一级 <span className="font-semibold text-foreground">{stats.nextLevel.level}</span> 还差{" "}
            <span className="font-semibold text-brand-sea">
              {stats.nextLevel.miles - stats.miles} 海里
            </span>
            。每完成一个航线步骤 +12 海里，每提交一次投稿 +30 海里。
          </div>
        ) : null}
      </section>

      {/* ── Contributor Showcase (Placeholder) ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Star size={18} weight="duotone" className="text-gold" />
          <h2 className="heading-section text-xl">贡献榜</h2>
          <span className="tag tag-warning text-[10px]">即将上线</span>
        </div>
        <div className="surface-muted p-8 text-center">
          <p className="text-sm text-muted">
            贡献榜将在社区功能上线后展示。早期投稿者的贡献已记录在案，届时自动上榜。
          </p>
        </div>
      </section>

      {/* ── Project Showcase (Placeholder) ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Star size={18} weight="duotone" className="text-brand-sea" />
          <h2 className="heading-section text-xl">船员项目展示</h2>
          <span className="tag tag-warning text-[10px]">即将上线</span>
        </div>
        <div className="surface-muted p-8 text-center">
          <p className="text-sm text-muted">
            Vibe Coding 作品、独立开发项目、AI 变现案例将在社区上线后开放展示。现在就想分享？
          </p>
          <Link href="/contribute" className="btn-mist mt-4 inline-flex">
            去投稿
          </Link>
        </div>
      </section>
    </div>
  );
}
