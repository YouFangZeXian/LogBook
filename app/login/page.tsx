"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  GithubLogo,
  GoogleLogo,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser } from "@/components/auth-dialog";

/* ── Types ── */

type AuthUser = {
  email: string;
  name: string;
  joinedAt: string;
};

const AUTH_KEY = "logbook.auth.user";

/* ── Helpers ── */

function saveAndBroadcast(user: AuthUser) {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("logbook-auth-changed"));
}

/* ── Page ── */

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Already logged in? Redirect home
    if (getCurrentLogbookUser()) {
      router.replace("/");
    }
  }, [router]);

  const submit = () => {
    const normalizedEmail = email.trim() || "crew@logbook.today";
    const user: AuthUser = {
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0] || "logbook-crew",
      joinedAt: new Date().toISOString(),
    };
    saveAndBroadcast(user);
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-2">
      {/* ── Left: Form ── */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-20">
        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[10px] px-2 py-1 -ml-2 text-sm text-muted transition-colors hover:bg-black/5 hover:text-foreground"
          >
            <ArrowLeft size={14} />
            返回首页
          </Link>
        </div>

        {/* Branding */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-brand-mist">
              {/* Logo placeholder — 待插入图片 */}
            </div>
            <span className="text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
              路格舶 / Logbook.today
            </span>
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-foreground lg:text-3xl">
            {mode === "login" ? "欢迎回来，船员。" : "创建你的船员档案"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            {mode === "login"
              ? "登录后继续你的航线，查看投稿记录与收藏。"
              : "注册不是为了阻拦出海，而是让你的航线被记住。"}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-[14px] border border-border bg-background-secondary p-1">
          {(["login", "register"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-[10px] py-2.5 text-sm font-medium transition-all ${
                mode === item
                  ? "bg-brand text-white shadow-[0_1px_3px_rgba(15,61,94,0.15)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item === "login" ? "登录" : "注册"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              邮箱
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="crew@example.com"
              className="input-field w-full"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              密码
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="本地演示，不会发送到服务器"
              className="input-field w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={submit}
            className="btn-primary w-full py-3 text-base mt-2"
          >
            {mode === "login" ? "登录并继续" : "创建船员档案"}
          </button>
        </div>

        {/* Social login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-faint [font-family:var(--font-mono)]">
                或
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={submit}
              className="btn-secondary py-2.5 text-sm"
            >
              <GithubLogo size={16} weight="fill" />
              GitHub
            </button>
            <button
              type="button"
              onClick={submit}
              className="btn-secondary py-2.5 text-sm"
            >
              <GoogleLogo size={16} weight="bold" />
              Google
            </button>
          </div>
        </div>

        {/* Skip */}
        <Link
          href="/"
          className="btn-mist mt-4 w-full py-3 text-center text-sm"
        >
          不注册，直接访问
        </Link>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs leading-6 text-faint">
          注册不是为了阻拦出海，而是船舱想听见你的故事。
        </p>
      </div>

      {/* ── Right: Image Placeholder ── */}
      <div className="relative hidden lg:flex items-center justify-center bg-background-secondary">
        <div className="flex flex-col items-center gap-4 text-center px-8">
          <div className="flex h-48 w-48 items-center justify-center rounded-[24px] border-2 border-dashed border-border bg-white/60">
            <span className="text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
              Image
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              舶来四海之物
            </p>
            <p className="mt-1 text-xs text-muted">
              此处将放置航海主题插图
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
