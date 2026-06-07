import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  onOpenSearch: () => void;
};

export function SiteHeader({ onOpenSearch }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/55 backdrop-blur-2xl">
      <div className="page-shell py-4">
        <div className="glass-card flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="group flex items-center gap-3" aria-label="返回路格舶首页">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white/6 shadow-[0_0_24px_rgba(83,140,255,0.18)] transition-transform duration-200 group-hover:scale-[1.04]">
              <Image
                src="/logo-mark.png"
                alt="路格舶 logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
                Logbook
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                路格舶
              </span>
            </div>
          </Link>

          <div className="hidden min-w-[340px] flex-1 px-4 md:block">
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex w-full items-center gap-3 rounded-full border border-line bg-white/6 px-4 py-3 text-left text-sm text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              <Search className="h-4 w-4 text-accent" />
              搜索文章、分类、工具或航路
            </button>
          </div>

          <nav className="hidden items-center gap-2 xl:flex">
            {siteConfig.navigation.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-white/6 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/6 text-muted transition-colors hover:text-foreground md:hidden"
              aria-label="打开搜索"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link href="/start" className="button-primary hidden md:inline-flex">
              登船指南
            </Link>
            <Link href="/category" className="button-secondary hidden sm:inline-flex xl:hidden">
              航路
            </Link>
          </div>
        </div>

        <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 xl:hidden">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-line bg-white/6 px-3 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
