"use client";

import { useEffect, useState } from "react";
import { GithubLogo, GoogleLogo, X } from "@phosphor-icons/react/dist/ssr";

const AUTH_KEY = "logbook.auth.user";

type AuthUser = {
  email: string;
  name: string;
  joinedAt: string;
};

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function getCurrentLogbookUser() {
  return getStoredUser();
}

export function requestLogbookLogin(reason?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("logbook-auth-required", { detail: { reason } }));
}

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;
      setReason(detail?.reason ?? "");
      setOpen(true);
    };
    window.addEventListener("logbook-auth-required", handler);
    return () => window.removeEventListener("logbook-auth-required", handler);
  }, []);

  if (!open) return null;

  const submit = () => {
    const normalizedEmail = email.trim() || "crew@logbook.today";
    const user: AuthUser = {
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0] || "logbook-crew",
      joinedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("logbook-auth-changed"));
    setOpen(false);
    setPassword("");
  };

  const skip = () => setOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-10 backdrop-blur-sm">
      <section className="w-full max-w-[400px] rounded-[24px] border border-border bg-white p-6 shadow-[0_20px_60px_rgba(15,61,94,0.12)]">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={skip}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-faint transition-colors hover:bg-black/5 hover:text-foreground"
            aria-label="关闭"
          >
            <X size={16} />
          </button>
        </div>

        {/* Emotional headline */}
        <div className="text-center">
          <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
            路格舶 / Logbook.today
          </p>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground leading-snug">
            登录不是上锁，
            <br />
            而是让你的航线被记住。
          </h2>
          {reason ? (
            <p className="mt-3 text-sm leading-6 text-muted">{reason}</p>
          ) : null}
        </div>

        {/* Mode toggle */}
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-[14px] border border-border bg-background-secondary p-1">
          {(["login", "register"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-[10px] py-2 text-sm font-medium transition-all ${
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
        <div className="mt-5 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="crew@example.com"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="本地演示，不会发送到服务器"
            className="input-field"
          />
        </div>

        {/* Primary button */}
        <button type="button" onClick={submit} className="btn-primary mt-4 w-full py-3">
          {mode === "login" ? "登录并继续" : "创建船员档案"}
        </button>

        {/* Social login */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={submit}
            className="btn-secondary py-2.5 text-sm"
          >
            <GithubLogo size={16} weight="fill" />
            GitHub 预留
          </button>
          <button
            type="button"
            onClick={submit}
            className="btn-secondary py-2.5 text-sm"
          >
            <GoogleLogo size={16} weight="bold" />
            Google 预留
          </button>
        </div>

        {/* Prominent skip button */}
        <button type="button" onClick={skip} className="btn-mist mt-3 w-full py-3">
          不注册，直接访问
        </button>

        {/* Bottom text */}
        <p className="mt-5 text-center text-xs leading-6 text-faint">
          注册不是为了阻拦出海，而是船舱想听见你的故事。
        </p>
      </section>
    </div>
  );
}
