"use client";

import { useEffect, useState } from "react";
import { GithubLogo, GoogleLogo, X } from "@phosphor-icons/react/dist/ssr";

import {
  getLocalLogbookUser,
  signInOrRegister,
  signInWithProvider,
  syncCurrentUserFromCloud,
  type LogbookUser,
} from "@/lib/cloud-data";

export function getCurrentLogbookUser() {
  return getLocalLogbookUser();
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
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void syncCurrentUserFromCloud();

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;
      setReason(detail?.reason ?? "");
      setOpen(true);
    };

    window.addEventListener("logbook-auth-required", handler);
    return () => window.removeEventListener("logbook-auth-required", handler);
  }, []);

  if (!open) return null;

  const submit = async () => {
    setPending(true);
    setError("");
    try {
      const user: LogbookUser = await signInOrRegister({ mode, email, password });
      window.localStorage.setItem("logbook.auth.user", JSON.stringify(user));
      window.dispatchEvent(new Event("logbook-auth-changed"));
      setOpen(false);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败，请稍后再试。");
    } finally {
      setPending(false);
    }
  };

  const providerLogin = async (provider: "github" | "google") => {
    setPending(true);
    setError("");
    try {
      await signInWithProvider(provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : "第三方登录暂时不可用。");
      setPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-10 backdrop-blur-sm">
      <section className="w-full max-w-[400px] rounded-[16px] border border-border bg-white p-6 shadow-[0_20px_60px_rgba(15,61,94,0.12)]">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-faint transition-colors hover:bg-black/5 hover:text-foreground"
            aria-label="关闭"
          >
            <X size={16} />
          </button>
        </div>

        <div className="text-center">
          <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
            Logbook.today
          </p>
          <h2 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.03em] text-foreground">
            登录不是上锁，
            <br />
            而是让你的航线被记住。
          </h2>
          {reason ? <p className="mt-3 text-sm leading-6 text-muted">{reason}</p> : null}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-[10px] border border-border bg-background-secondary p-1">
          {(["login", "register"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-[8px] py-2 text-sm font-medium transition-all ${
                mode === item ? "bg-brand text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {item === "login" ? "登录" : "注册"}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="crew@example.com"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="至少 6 位密码"
            className="input-field"
          />
        </div>

        {error ? <p className="mt-3 text-sm leading-6 text-danger">{error}</p> : null}

        <button
          type="button"
          onClick={submit}
          disabled={pending}
          className="btn-primary mt-4 w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "处理中..." : mode === "login" ? "登录并继续" : "创建船员档案"}
        </button>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => providerLogin("github")}
            disabled={pending}
            className="btn-secondary py-2.5 text-sm disabled:opacity-50"
          >
            <GithubLogo size={16} weight="fill" />
            GitHub
          </button>
          <button
            type="button"
            onClick={() => providerLogin("google")}
            disabled={pending}
            className="btn-secondary py-2.5 text-sm disabled:opacity-50"
          >
            <GoogleLogo size={16} weight="bold" />
            Google
          </button>
        </div>

        <button type="button" onClick={() => setOpen(false)} className="btn-mist mt-3 w-full py-3">
          不注册，直接访问
        </button>

        <p className="mt-5 text-center text-xs leading-6 text-faint">
          未配置 Supabase 时会使用本地体验；配置后自动切换到云端账户。
        </p>
      </section>
    </div>
  );
}
