"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  onOpenSearch: () => void;
};

export function SiteHeader({ onOpenSearch }: SiteHeaderProps) {
  const primaryNav = siteConfig.navigation.slice(0, 6);
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

  const logout = () => {
    window.localStorage.removeItem("logbook.auth.user");
    window.dispatchEvent(new Event("logbook-auth-changed"));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/94 backdrop-blur-xl">
      <div className="page-shell py-3">
        <div className="grid gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="返回路格舶首页"
            >
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border border-line bg-white/70 transition-transform duration-200 group-hover:scale-[1.03]">
                <Image
                  src="/logo-mark.png"
                  alt="路格舶 logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                  Logbook.today
                </p>
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                  {siteConfig.shortName}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-white/55 text-muted transition-colors hover:border-foreground hover:text-foreground"
                aria-label="打开搜索"
              >
                <MagnifyingGlass size={16} />
              </button>
              <Link href="/start" className="button-primary px-4 py-2.5 text-xs">
                登船
              </Link>
            </div>
          </div>

          <div className="hidden items-center justify-center gap-8 lg:flex">
            <nav className="flex items-center gap-1 rounded-[12px] border border-line bg-white/40 px-2 py-1.5">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={[
                    "rounded-[8px] px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-white text-foreground"
                      : "text-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center justify-end gap-3 lg:flex">
            <button type="button" onClick={onOpenSearch} className="button-secondary">
              <MagnifyingGlass size={16} className="mr-2" />
              搜索
            </button>
            {userName ? (
              <button
                type="button"
                onClick={logout}
                className="button-secondary max-w-40 truncate"
                title="退出本地船员身份"
              >
                {userName}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => requestLogbookLogin()}
                className="button-secondary"
              >
                登录
              </button>
            )}
            <Link href="/start" className="button-primary">
              登船指南
            </Link>
          </div>
        </div>

        <div className="mt-3 hidden items-center justify-between gap-4 border-t border-line/80 pt-3 lg:flex">
          <p className="text-[11px] uppercase leading-5 tracking-[0.2em] text-muted [font-family:var(--font-mono),monospace]">
            {siteConfig.motto}
          </p>
          <p className="text-xs text-muted">{siteConfig.logline}</p>
        </div>

        <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={[
                "shrink-0 rounded-[8px] border px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "border-foreground bg-white/72 text-foreground"
                  : "border-transparent text-muted hover:border-line hover:bg-white/50 hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
