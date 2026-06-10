"use client";

import { useEffect, useState } from "react";

import type { SearchEntry } from "@/lib/content";
import { AuthDialog } from "@/components/auth-dialog";
import { SearchDrawer } from "@/components/search-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteSidebar } from "@/components/site-sidebar";
import { WelcomeDialog } from "@/components/welcome-dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
      <WelcomeDialog />
      <SearchDrawer entries={searchEntries} open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthDialog />
      <SidebarProvider>
        <SiteSidebar />
        <SidebarInset>
          <SiteHeader
            onOpenSearch={() => setSearchOpen(true)}
          />
          <main className="min-w-0 flex-1">{children}</main>
          <SiteFooter />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
