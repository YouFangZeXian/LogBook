"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass, MoonStars, Sun } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

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

const THEME_KEY = "logbook.theme";

function getStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  window.localStorage.setItem(THEME_KEY, theme);
}

export function SiteHeader({
  onOpenSearch,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => setUserName(getCurrentLogbookUser()?.name ?? "");
    sync();
    window.addEventListener("logbook-auth-changed", sync);
    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);
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

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

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
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-all duration-300 select-none">
            {pageLabel}
          </h1>
        </div>

        {/* Right: theme toggle + search + login/user + cta */}
        <div className="flex items-center gap-2">
          {mounted ? (
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-all duration-200 hover:bg-black/5 hover:text-foreground hover:scale-105 active:scale-95"
              aria-label={theme === "light" ? "切换深色模式" : "切换浅色模式"}
            >
              {theme === "light" ? (
                <MoonStars size={17} weight="duotone" />
              ) : (
                <Sun size={17} weight="duotone" />
              )}
            </button>
          ) : (
            <div className="h-9 w-9" />
          )}

          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-all duration-200 hover:bg-black/5 hover:text-foreground hover:scale-105 active:scale-95"
            aria-label="搜索"
          >
            <MagnifyingGlass size={17} />
          </button>

          {userName ? (
            <span className="hidden rounded-[10px] px-3 py-1.5 text-sm font-medium text-brand-sea/70 select-none sm:inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              您已登船
            </span>
          ) : (
            <button
              type="button"
              onClick={() => requestLogbookLogin()}
              className="btn-primary px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md active:scale-95"
            >
              登船
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
