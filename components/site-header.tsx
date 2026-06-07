import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-sm font-medium tracking-[0.22em] text-accent uppercase">
            AI 出海
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            生存指南
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/start"
          className="rounded-full border border-accent/15 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          新手先看
        </Link>
      </div>
    </header>
  );
}
