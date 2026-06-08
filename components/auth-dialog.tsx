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
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getCurrentLogbookUser() {
  return getStoredUser();
}

export function requestLogbookLogin(reason?: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("logbook-auth-required", { detail: { reason } }));
}

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const openHandler = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;
      setReason(detail?.reason ?? "");
      setOpen(true);
    };

    window.addEventListener("logbook-auth-required", openHandler);

    return () => window.removeEventListener("logbook-auth-required", openHandler);
  }, []);

  if (!open) {
    return null;
  }

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/24 px-4 py-8 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-[1rem] border border-line bg-background p-5 shadow-[0_28px_80px_-58px_rgba(18,18,18,0.65)]">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="section-kicker">路格舶 / Logbook.today</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              登录不是上锁，而是让你的航线被记住。
            </h2>
            {reason ? <p className="mt-3 text-sm leading-7 text-muted">{reason}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.75rem] border border-line bg-white/60 text-muted transition-colors hover:text-foreground"
            aria-label="关闭登录窗口"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-[0.85rem] border border-line bg-white/55 p-1">
          {(["login", "register"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={[
                "rounded-[0.65rem] px-3 py-2 text-sm font-medium transition-colors",
                mode === item ? "bg-foreground text-background" : "text-muted hover:text-foreground",
              ].join(" ")}
            >
              {item === "login" ? "登录" : "注册"}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          <label className="block space-y-2 text-sm">
            <span className="font-medium text-foreground">邮箱</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="crew@example.com"
              className="w-full rounded-[0.8rem] border border-line bg-white/74 px-4 py-3 outline-none transition-colors focus:border-foreground"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="font-medium text-foreground">密码</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="本地演示，不会发送到服务器"
              className="w-full rounded-[0.8rem] border border-line bg-white/74 px-4 py-3 outline-none transition-colors focus:border-foreground"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={submit}
          className="mt-5 w-full rounded-[0.85rem] border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-black"
        >
          {mode === "login" ? "登录并继续" : "创建船员档案"}
        </button>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center justify-center gap-2 rounded-[0.8rem] border border-line bg-white/68 px-4 py-3 text-sm text-foreground transition-colors hover:border-foreground"
          >
            <GithubLogo size={16} weight="fill" />
            GitHub 预留
          </button>
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center justify-center gap-2 rounded-[0.8rem] border border-line bg-white/68 px-4 py-3 text-sm text-foreground transition-colors hover:border-foreground"
          >
            <GoogleLogo size={16} weight="bold" />
            Google 预留
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 w-full rounded-[0.85rem] border border-sky-200 bg-sky-50/80 px-4 py-3 text-sm font-medium text-sky-800 transition-colors hover:border-sky-300"
        >
          不注册，直接访问
        </button>

        <p className="mt-5 text-center text-xs leading-6 text-muted">
          注册不是为了阻拦出海，而是船舱想听见你的故事。
        </p>
      </section>
    </div>
  );
}
