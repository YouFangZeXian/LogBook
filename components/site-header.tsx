"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { siteConfig } from "@/lib/site";
import { SidebarTrigger } from "@/components/ui/sidebar";

type SiteHeaderProps = {
  onOpenSearch: () => void;
};

const pageTitleMap: Record<string, string> = {
  "/": "首页",
  "/start": "登船指南",
  "/routes": "航线页",
  "/category": "航路",
  "/tools": "船坞",
  "/resources": "补给站",
  "/discoveries": "新大陆",
  "/contribute": "投稿",
  "/crew": "船员",
  "/products": "产品",
  "/about": "关于",
};

export function SiteHeader({
  onOpenSearch,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setUserName(getCurrentLogbookUser()?.name ?? "");
    sync();
    window.addEventListener("logbook-auth-changed", sync);
    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pageLabel = useMemo(() => {
    if (pathname.startsWith("/articles/")) return "文章";
    if (pathname.startsWith("/category/") && pathname !== "/category") return "分类文章";
    return pageTitleMap[pathname] ?? "路格舶";
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/88 backdrop-blur-xl"
          : isHome
            ? "border-transparent bg-transparent"
            : "border-b border-border bg-white/80 backdrop-blur-lg"
      }`}
    >
      <div className="page-shell flex h-14 items-center justify-between">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu trigger */}
          <SidebarTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-black/5 hover:text-foreground lg:hidden" />

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-white">
              <Image
                src="/logo-mark.png"
                alt="路格舶"
                width={28}
                height={28}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden sm:block">
              <span className="text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
                {siteConfig.logline}
              </span>
              <span className="block text-sm font-semibold tracking-[-0.01em] text-foreground">
                {pageLabel}
              </span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop nav links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {[
            { href: "/start", label: "登船" },
            { href: "/category", label: "航路" },
            { href: "/tools", label: "船坞" },
            { href: "/resources", label: "补给" },
            { href: "/discoveries", label: "发现" },
          ].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[10px] px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand text-white"
                    : "text-muted hover:bg-black/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-black/5 hover:text-foreground"
            aria-label="搜索"
          >
            <MagnifyingGlass size={17} />
          </button>

          {userName ? (
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem("logbook.auth.user");
                window.dispatchEvent(new Event("logbook-auth-changed"));
              }}
              className="hidden rounded-[10px] px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-black/5 hover:text-foreground sm:block"
              title="退出"
            >
              {userName}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => requestLogbookLogin()}
              className="hidden rounded-[10px] px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-black/5 hover:text-foreground sm:block"
            >
              登录
            </button>
          )}

          <Link href="/start" className="btn-primary px-4 py-2 text-sm">
            登船
          </Link>
        </div>
      </div>
    </header>
  );
}
