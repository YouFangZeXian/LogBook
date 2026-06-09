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
const THEME_KEY = "logbook.theme";

export function SiteShell({ children, searchEntries }: SiteShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(SIDEBAR_KEY) === "1";
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const rootTheme = document.documentElement.getAttribute("data-theme");
    return rootTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const handler = () => setSearchOpen(true);
    window.addEventListener("site-search-open", handler);

    return () => window.removeEventListener("site-search-open", handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
      return next;
    });
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
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
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <main className="min-w-0 flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
