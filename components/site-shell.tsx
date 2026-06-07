"use client";

import { useEffect, useState } from "react";

import type { SearchEntry } from "@/lib/content";
import { SearchDrawer } from "@/components/search-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteShellProps = {
  children: React.ReactNode;
  searchEntries: SearchEntry[];
};

export function SiteShell({ children, searchEntries }: SiteShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setSearchOpen(true);
    window.addEventListener("site-search-open", handler);

    return () => window.removeEventListener("site-search-open", handler);
  }, []);

  return (
    <>
      <SearchDrawer
        entries={searchEntries}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader onOpenSearch={() => setSearchOpen(true)} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
