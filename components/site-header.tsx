"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { List, MagnifyingGlass, SidebarSimple } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  onOpenSearch: () => void;
  onOpenSidebar: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
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
  onOpenSidebar,
  onToggleSidebar,
  sidebarCollapsed,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const sync = () => {
      setUserName(getCurrentLogbookUser()?.name ?? "");
    };

    sync();
    window.addEventListener("logbook-auth-changed", sync);

    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  const pageLabel = useMemo(() => {
    if (pathname.startsWith("/articles/")) {
      return "文章";
    }

    if (pathname.startsWith("/category/") && pathname !== "/category") {
      return "分类文章";
    }

    return pageTitleMap[pathname] ?? "路格舶";
  }, [pathname]);

  const logout = () => {
    window.localStorage.removeItem("logbook.auth.user");
    window.dispatchEvent(new Event("logbook-auth-changed"));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/94 backdrop-blur-xl">
      <div className="page-shell py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-white/60 text-muted transition-colors hover:border-foreground hover:text-foreground lg:hidden"
              aria-label="打开侧边栏"
            >
              <List size={16} />
            </button>

            <button
              type="button"
              onClick={onToggleSidebar}
              className="hidden h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-white/60 text-muted transition-colors hover:border-foreground hover:text-foreground lg:inline-flex"
              aria-label={sidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
              title={sidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
            >
              <SidebarSimple size={16} weight={sidebarCollapsed ? "regular" : "fill"} />
            </button>

            <Link href="/" className="flex shrink-0 items-center gap-3 lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[12px] border border-line bg-white/70">
                <Image
                  src="/logo-mark.png"
                  alt="路格舶 logo"
                  width={38}
                  height={38}
                  className="h-full w-full object-cover"
                />
              </span>
            </Link>

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                {siteConfig.logline}
              </p>
              <p className="truncate text-sm font-semibold tracking-tight text-foreground">{pageLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={onOpenSearch} className="button-secondary px-3 py-2.5 sm:px-5 sm:py-3">
              <MagnifyingGlass size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">搜索</span>
            </button>
            {userName ? (
              <button
                type="button"
                onClick={logout}
                className="button-secondary hidden max-w-40 truncate sm:inline-flex"
                title="退出本地船员身份"
              >
                {userName}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => requestLogbookLogin()}
                className="button-secondary hidden sm:inline-flex"
              >
                登录
              </button>
            )}
            <Link href="/start" className="button-primary px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm">
              登船
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
