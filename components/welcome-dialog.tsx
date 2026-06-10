"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "@phosphor-icons/react/dist/ssr";
import { requestLogbookLogin } from "@/components/auth-dialog";

const WELCOME_KEY = "logbook.welcome.seen";

function RouteLineVisual() {
  return (
    <svg viewBox="0 0 320 120" className="h-auto w-full max-w-[280px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 96 Q 80 94, 120 72 Q 170 44, 200 32 Q 240 18, 300 14" stroke="var(--brand-sea)" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" opacity="0.5" />
      <circle cx="20" cy="96" r="5" fill="var(--brand-deep)" className="animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
      <circle cx="120" cy="72" r="3.5" fill="var(--brand-sea)" opacity="0.7" />
      <circle cx="200" cy="32" r="3.5" fill="var(--brand-sea)" opacity="0.7" />
      <circle cx="300" cy="14" r="4.5" fill="var(--gold)" opacity="0.9" className="animate-[route-glow_2s_ease-in-out_infinite]" />
      <path d="M10 104 Q 60 100, 110 104 Q 160 108, 210 104 Q 260 100, 310 104" stroke="var(--brand-sea)" strokeWidth="1" opacity="0.15" fill="none" />
    </svg>
  );
}

export function WelcomeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(WELCOME_KEY)) return;
    // Small delay so the page loads first
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    window.localStorage.setItem(WELCOME_KEY, "1");
  };

  const skipAndLogin = () => {
    requestLogbookLogin("登录后你的航线会被记住，下次登船不需要重新选择。");
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-10 backdrop-blur-sm">
      <section className="w-full max-w-[420px] rounded-[24px] border border-border bg-white p-6 shadow-[0_20px_60px_rgba(15,61,94,0.12)]">
        {/* Close */}
        <div className="flex justify-end">
          <button type="button" onClick={close}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-faint transition-colors hover:bg-black/5"
            aria-label="关闭">
            <X size={16} />
          </button>
        </div>

        {/* Brand */}
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
            路格舶 / Logbook.today
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground leading-tight">
            寻未知路；
            <br />
            格世界物；
            <br />
            舶四海途。
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            AI 时代的设备出海新手村与船员航海日志社区。
          </p>
        </div>

        {/* Route line visual */}
        <div className="my-6">
          <RouteLineVisual />
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/login" onClick={close} className="btn-primary w-full py-3 text-base">
            开始登船 <ArrowUpRight size={16} />
          </Link>
          <button type="button" onClick={close} className="btn-secondary w-full py-3 text-base">
            查看航路
          </button>
          <button type="button" onClick={skipAndLogin} className="btn-mist w-full py-3 text-base">
            不注册，直接访问
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-faint">
          你的航线会被记住，从这里开始的每一步都会有回应。
        </p>
      </section>
    </div>
  );
}
