"use client";

import { useEffect, useState } from "react";

import type { SearchEntry } from "@/lib/content";
import { AuthDialog } from "@/components/auth-dialog";
import { SearchDrawer } from "@/components/search-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteSidebar } from "@/components/site-sidebar";

type SiteShellProps = {
  children: React.ReactNode;
  searchEntries: SearchEntry[];
};

const SIDEBAR_KEY = "logbook.sidebar.collapsed";

export function SiteShell({ children, searchEntries }: SiteShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_KEY) === "1";
  });

  useEffect(() => {
    const handler = () => setSearchOpen(true);
    window.addEventListener("site-search-open", handler);
    return () => window.removeEventListener("site-search-open", handler);
  }, []);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <>
      <SearchDrawer
        entries={searchEntries}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <AuthDialog />
      <div className="min-h-screen lg:grid lg:grid-cols-[auto_minmax(0,1fr)]">
        <SiteSidebar
          open={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={toggleSidebarCollapse}
        />
        <div className="flex min-h-screen min-w-0 flex-col">
          <SiteHeader
            onOpenSearch={() => setSearchOpen(true)}
            onOpenSidebar={() => setSidebarOpen(true)}
            onToggleSidebar={toggleSidebarCollapse}
            sidebarCollapsed={sidebarCollapsed}
          />
          <main className="min-w-0 flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
