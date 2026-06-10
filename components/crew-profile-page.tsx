"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle,
  Globe,
  Medal,
  SignIn,
  SignOut,
  Star,
  Trash,
  Trophy,
  UserCircle,
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

const LANG_KEY = "logbook.language";

export function CrewProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subs, setSubs] = useState<Submission[]>([]);
  const [prog, setProg] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Settings state
  const [editName, setEditName] = useState("");
  const [language, setLanguage] = useState("zh-CN");
  const [nameSaved, setNameSaved] = useState(false);
  const [langSaved, setLangSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const sync = () => {
      const u = getCurrentLogbookUser();
      setUserName(u?.name ?? "");
      setUserEmail(u?.email ?? "");
      setEditName(u?.name ?? "");
      setSubs(read<Submission>("logbook.submissions"));
      setProg([
        ...read<string>("logbook.voyage.progress"),
        ...read<string>("logbook.routes.progress"),
      ]);
      setLanguage(window.localStorage.getItem(LANG_KEY) ?? "zh-CN");
    };
    sync();
    setMounted(true);
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

  const saveName = () => {
    const current = getCurrentLogbookUser();
    if (!current) return;
    const updated = { ...current, name: editName.trim() || current.name };
    window.localStorage.setItem("logbook.auth.user", JSON.stringify(updated));
    window.dispatchEvent(new Event("logbook-auth-changed"));
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  };

  const saveLanguage = () => {
    window.localStorage.setItem(LANG_KEY, language);
    setLangSaved(true);
    setTimeout(() => setLangSaved(false), 2000);
  };

  const deleteAccount = () => {
    window.localStorage.removeItem("logbook.auth.user");
    window.localStorage.removeItem("logbook.voyage.progress");
    window.localStorage.removeItem("logbook.routes.progress");
    window.localStorage.removeItem("logbook.submissions");
    window.localStorage.removeItem("logbook.voyage.selection");
    window.dispatchEvent(new Event("logbook-auth-changed"));
    router.push("/");
  };

  const logout = () => {
    window.localStorage.removeItem("logbook.auth.user");
    window.dispatchEvent(new Event("logbook-auth-changed"));
    router.push("/");
  };

  if (!mounted) return null;

  if (!userName) {
    return (
      <div className="page-shell py-20 text-center">
        <UserCircle size={48} weight="duotone" className="mx-auto text-faint" />
        <h1 className="mt-6 heading-section">登录后查看船员档案</h1>
        <p className="mt-3 body-text max-w-md mx-auto">
          登录后可查看航海里程、编辑个人设置、管理投稿记录。
        </p>
        <button
          type="button"
          onClick={() => requestLogbookLogin()}
          className="btn-primary mt-6"
        >
          <SignIn size={16} /> 登录 / 注册
        </button>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      {/* ── Identity Header ── */}
      <section className="surface p-6 md:p-8">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-mist text-brand">
            <UserCircle size={32} weight="fill" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="kicker">{stats.level}</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {userName}
            </h1>
            <p className="mt-1 text-sm text-muted">{userEmail}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="surface-muted rounded-lg px-3 py-1.5 text-sm">
                <Medal size={14} className="inline text-brand-sea mr-1" />
                {stats.miles} 海里
              </div>
              <div className="surface-muted rounded-lg px-3 py-1.5 text-sm">
                <Star size={14} className="inline text-gold mr-1" />
                {subs.length} 条投稿
              </div>
              <div className="surface-muted rounded-lg px-3 py-1.5 text-sm">
                <CheckCircle size={14} className="inline text-success mr-1" />
                {stats.accepted} 条采纳
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Crew Level ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy size={18} weight="duotone" className="text-gold" />
          <h2 className="heading-section text-xl">船员等级</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {crewLevels.map((lvl) => {
            const isCurrent = stats.level === lvl.level;
            const isPast = stats.miles >= lvl.miles;
            return (
              <div
                key={lvl.level}
                className={`rounded-xl border p-3 text-sm transition-all ${
                  isCurrent
                    ? "border-brand/30 bg-brand-mist-soft"
                    : isPast
                      ? "border-border bg-white"
                      : "border-border bg-white/40 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${isCurrent ? "text-brand" : "text-foreground"}`}>
                    {lvl.level}
                  </span>
                  {isCurrent ? (
                    <span className="rounded-full bg-brand text-white px-2 py-0.5 text-[10px] font-medium">当前</span>
                  ) : isPast ? (
                    <CheckCircle size={14} weight="fill" className="text-success" />
                  ) : null}
                </div>
                <p className="mt-0.5 text-[10px] text-faint">{lvl.miles}+ 海里</p>
              </div>
            );
          })}
        </div>
        {stats.nextLevel ? (
          <p className="surface-mist p-3 text-center text-sm text-muted rounded-xl">
            距离 <span className="font-semibold text-foreground">{stats.nextLevel.level}</span> 还差{" "}
            <span className="font-semibold text-brand-sea">{stats.nextLevel.miles - stats.miles} 海里</span>
          </p>
        ) : null}
      </section>

      {/* ── Settings ── */}
      <section className="surface p-6 md:p-8 space-y-6">
        <h2 className="heading-section text-xl">个人设置</h2>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="crew-name" className="text-sm font-medium text-foreground">
            <UserCircle size={14} className="inline mr-1.5" />
            船员名称
          </label>
          <div className="flex gap-2">
            <input
              id="crew-name"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="input-field flex-1"
              placeholder="输入船员名称"
            />
            <button type="button" onClick={saveName} className="btn-primary">
              {nameSaved ? <CheckCircle size={16} weight="fill" /> : "保存"}
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label htmlFor="crew-lang" className="text-sm font-medium text-foreground">
            <Globe size={14} className="inline mr-1.5" />
            界面语言
          </label>
          <div className="flex gap-2">
            <select
              id="crew-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field flex-1"
            >
              <option value="zh-CN">简体中文</option>
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
            <button type="button" onClick={saveLanguage} className="btn-primary">
              {langSaved ? <CheckCircle size={16} weight="fill" /> : "保存"}
            </button>
          </div>
        </div>

        {/* Notification */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            <Bell size={14} className="inline mr-1.5" />
            通知偏好
          </label>
          <div className="surface-muted p-4 text-sm text-muted rounded-xl">
            通知功能将在社区上线后开放设置。届时可管理投稿审核通知、站点更新提醒和船员活动通知。
          </div>
        </div>
      </section>

      {/* ── Danger Zone ── */}
      <section className="surface border-danger/10 p-6 md:p-8 space-y-5">
        <div>
          <h2 className="heading-section text-xl text-danger">危险操作</h2>
          <p className="body-sm mt-1">以下操作不可撤销，请谨慎执行。</p>
        </div>

        {/* Logout */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background-secondary">
          <div>
            <p className="text-sm font-medium text-foreground">登出账号</p>
            <p className="text-xs text-muted mt-0.5">退出当前账号，不会删除任何数据。</p>
          </div>
          <button type="button" onClick={logout} className="btn-secondary text-sm">
            <SignOut size={14} />
            登出
          </button>
        </div>

        {/* Delete account */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-danger/20 bg-danger-soft">
          <div>
            <p className="text-sm font-medium text-foreground">注销账号</p>
            <p className="text-xs text-muted mt-0.5">删除所有本地存储的船员数据，包括航线进度、投稿记录和身份信息。</p>
          </div>
          {showDeleteConfirm ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-ghost text-sm"
              >
                取消
              </button>
              <button
                type="button"
                onClick={deleteAccount}
                className="rounded-[14px] bg-danger px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
              >
                确认注销
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-[14px] border border-danger/30 bg-white px-4 py-2 text-sm font-medium text-danger transition-all hover:bg-danger-soft"
            >
              <Trash size={14} className="inline mr-1" />
              注销账号
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
