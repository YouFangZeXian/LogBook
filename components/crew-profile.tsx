"use client";

import { useEffect, useMemo, useState } from "react";
import { Medal, SignIn, Star } from "@phosphor-icons/react/dist/ssr";
import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";

type Submission = { status?: string };

function read<T>(key: string): T[] { try { return JSON.parse(window.localStorage.getItem(key) ?? "[]") as T[]; } catch { return []; } }

export function CrewProfile() {
  const [userName, setUserName] = useState("");
  const [subs, setSubs] = useState<Submission[]>([]);
  const [prog, setProg] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setUserName(getCurrentLogbookUser()?.name ?? "");
      setSubs(read<Submission>("logbook.submissions"));
      setProg([...read<string>("logbook.voyage.progress"), ...read<string>("logbook.routes.progress")]);
    };
    sync();
    window.addEventListener("logbook-auth-changed", sync);
    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  const stats = useMemo(() => {
    const accepted = subs.filter((s) => ["accepted", "merged", "published"].includes(s.status ?? "")).length;
    const miles = prog.length * 12 + subs.length * 30 + accepted * 80;
    const level = miles >= 500 ? "领航员" : miles >= 240 ? "贡献船员" : miles >= 80 ? "船员" : userName ? "登船者" : "游客";
    return { accepted, miles, level };
  }, [prog.length, subs, userName]);

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface p-6 md:p-8">
          <p className="kicker">船员身份</p>
          <h1 className="heading-hero mt-4">{userName ? `${userName} 的船员档案` : "登录后继承你的航线。"}</h1>
          <p className="body-text mt-4">当前为前端预留版。未来接入账户系统后可迁移到云端。</p>
          {!userName ? (
            <button type="button" onClick={() => requestLogbookLogin("登录后可保存航线、投稿和累积航海里程。")}
              className="btn-primary mt-6"><SignIn size={16} /> 登录 / 注册</button>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[["当前等级", stats.level], ["航海里程", `${stats.miles} 海里`], ["投稿数量", `${subs.length} 条`], ["被采纳", `${stats.accepted} 条`]].map(([label, value]) => (
            <div key={label} className="surface-muted p-5">
              <Medal size={18} className="text-brand-sea" />
              <p className="mt-3 text-sm text-muted">{label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="surface-muted p-6 md:p-8">
        <div className="flex items-center gap-2"><Star size={16} className="text-gold" /><p className="kicker">身份字段预留</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["早期船员", "投稿者", "领航员", "大副", "船长", "远洋船长"].map((item) => (
            <div key={item} className="rounded-[12px] border border-border bg-white p-4 text-sm text-muted">{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
