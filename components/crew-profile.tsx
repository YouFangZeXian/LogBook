"use client";

import { useEffect, useMemo, useState } from "react";
import { Medal, SignIn } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";

type Submission = {
  status?: string;
};

function readArray<T>(key: string): T[] {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
}

export function CrewProfile() {
  const [userName, setUserName] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [progress, setProgress] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setUserName(getCurrentLogbookUser()?.name ?? "");
      setSubmissions(readArray<Submission>("logbook.submissions"));
      setProgress([
        ...readArray<string>("logbook.voyage.progress"),
        ...readArray<string>("logbook.routes.progress"),
      ]);
    };

    sync();
    window.addEventListener("logbook-auth-changed", sync);

    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  const stats = useMemo(() => {
    const accepted = submissions.filter((item) =>
      ["accepted", "merged", "published"].includes(item.status ?? ""),
    ).length;
    const miles = progress.length * 12 + submissions.length * 30 + accepted * 80;
    const level =
      miles >= 500
        ? "领航员"
        : miles >= 240
          ? "贡献船员"
          : miles >= 80
            ? "船员"
            : userName
              ? "登船者"
              : "游客";

    return { accepted, miles, level };
  }, [progress.length, submissions, userName]);

  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel p-6 md:p-8">
          <p className="section-kicker">船员身份</p>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            {userName ? `${userName} 的船员档案` : "登录后继承你的航线。"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">
            当前是前端预留版：等级、航海里程、投稿数量和被采纳数量都已存在。未来接入账户系统后可以迁移到云端。
          </p>
          {!userName ? (
            <button
              type="button"
              onClick={() => requestLogbookLogin("登录后可以保存航线、投稿和累积航海里程。")}
              className="mt-6 inline-flex items-center gap-2 rounded-[0.85rem] border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background"
            >
              <SignIn size={16} />
              登录 / 注册
            </button>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["当前等级", stats.level],
            ["航海里程", `${stats.miles} 海里`],
            ["投稿数量", `${submissions.length} 条`],
            ["被采纳数量", `${stats.accepted} 条`],
          ].map(([label, value]) => (
            <div key={label} className="surface-muted p-5">
              <Medal size={18} className="text-accent" />
              <p className="mt-4 text-sm text-muted">{label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-muted p-6 md:p-8">
        <p className="section-kicker">身份字段预留</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["早期船员", "投稿者", "领航员", "大副", "船长", "远洋船长"].map((item) => (
            <div key={item} className="rounded-[12px] border border-line bg-white/58 p-4 text-sm text-muted">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
