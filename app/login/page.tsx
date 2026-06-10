"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { LoginForm } from "@/components/login-form";
import { getCurrentLogbookUser } from "@/components/auth-dialog";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getCurrentLogbookUser()) {
      router.replace("/");
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      {/* ── Video Background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/background.MP4" type="video/mp4" />
      </video>

      {/* ── Dark Overlay ── */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* ── Content ── */}
      <div className="relative z-10 flex w-full flex-col items-center gap-6 px-6 py-10 md:px-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-[10px] px-2 py-1 text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          返回首页
        </Link>

        {/* Branding */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/50 [font-family:var(--font-mono)]">
              路格舶 / Logbook.today
            </span>
          </div>
        </div>

        {/* Login Form Card */}
        <LoginForm />
      </div>
    </div>
  );
}
