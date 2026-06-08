import Image from "next/image";
import Link from "next/link";
import { List, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  onOpenSearch: () => void;
};

export function SiteHeader({ onOpenSearch }: SiteHeaderProps) {
  const primaryNav = siteConfig.navigation.slice(0, 5);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/92 backdrop-blur-md">
      <div className="page-shell py-4">
        <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="返回路格舶首页"
            >
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line bg-white/55 transition-transform duration-200 group-hover:scale-[1.04]">
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
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/35 text-muted transition-colors hover:border-foreground hover:text-foreground"
                aria-label="打开搜索"
              >
                <MagnifyingGlass size={16} />
              </button>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/25 text-muted">
                <List size={16} />
              </span>
            </div>
          </div>

          <div className="hidden items-center justify-center gap-8 lg:flex">
            <p className="max-w-sm text-center text-[11px] uppercase leading-5 tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
              {siteConfig.motto}
            </p>

            <nav className="flex items-center gap-4">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
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
            <Link href="/start" className="button-primary">
              登船指南
            </Link>
          </div>
        </div>

        <div className="hide-scrollbar mt-3 flex gap-4 overflow-x-auto pb-1 lg:hidden">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 border-b border-transparent px-0 py-2 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
