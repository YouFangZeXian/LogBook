"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser } from "@/components/auth-dialog";
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
        {/* Left: Sidebar trigger + page title */}
        <div className="flex min-w-0 items-center gap-2">
          <SidebarTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-all duration-200 hover:bg-black/5 hover:text-foreground hover:scale-105 active:scale-95" />
          <h1 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-all duration-300 select-none">
            {pageLabel}
          </h1>
        </div>

        {/* Right: search + login/user + cta */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-all duration-200 hover:bg-black/5 hover:text-foreground hover:scale-105 active:scale-95"
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
              className="hidden rounded-[10px] px-3 py-1.5 text-sm font-medium text-muted transition-all duration-200 hover:bg-black/5 hover:text-foreground sm:block"
              title="退出"
            >
              {userName}
            </button>
          ) : null}

          <Link
            href="/login"
            className="btn-primary px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md active:scale-95"
          >
            登船
          </Link>
        </div>
      </div>
    </header>
  );
}
