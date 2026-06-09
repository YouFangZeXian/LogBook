"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowsLeftRight, BookOpenText, Compass, House, Info, Lifebuoy, ListDashes, Package, PenNibStraight, RocketLaunch, Sparkle, UserCircle, Wrench, X } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { siteConfig, type NavItem } from "@/lib/site";

type SiteSidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

const iconMap: Record<string, typeof House> = {
  "/": House, "/start": RocketLaunch, "/routes": Compass,
  "/category": ListDashes, "/tools": Wrench, "/resources": Lifebuoy,
  "/discoveries": Sparkle, "/products": Package, "/contribute": PenNibStraight,
  "/crew": UserCircle, "/about": Info,
};

function SidebarLink({ item, collapsed, pathname, onNavigate }: { item: NavItem; collapsed: boolean; pathname: string; onNavigate?: () => void }) {
  const Icon = iconMap[item.href] ?? BookOpenText;
  const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <Link href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-colors ${
        collapsed ? "justify-center px-2.5" : ""
      } ${
        active ? "bg-brand text-white" : "text-muted hover:bg-black/5 hover:text-foreground"
      }`}>
      <Icon size={17} weight={active ? "fill" : "regular"} />
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
    </Link>
  );
}

function SidebarContent({ collapsed, mobile, onNavigate, onToggleCollapse }: { collapsed: boolean; mobile?: boolean; onNavigate?: () => void; onToggleCollapse: () => void }) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const sync = () => {
      const user = getCurrentLogbookUser();
      setUserName(user?.name ?? "");
      setUserEmail(user?.email ?? "");
    };
    sync();
    window.addEventListener("logbook-auth-changed", sync);
    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className={`border-b border-border px-3 py-3 ${collapsed && !mobile ? "px-2.5" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed && !mobile ? "justify-center" : ""}`}>
          <Link href="/" onClick={onNavigate} className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[12px] border border-border bg-white">
              <Image src="/logo-mark.png" alt="路格舶" width={36} height={36} className="h-full w-full object-cover" priority />
            </span>
            {!collapsed || mobile ? (
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">Logbook.today</span>
                <span className="block truncate text-sm font-semibold text-foreground">{siteConfig.shortName}</span>
              </span>
            ) : null}
          </Link>
          {!mobile ? (
            <button type="button" onClick={onToggleCollapse}
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-faint transition-colors hover:bg-black/5"
              aria-label={collapsed ? "展开" : "收起"}>
              <ArrowsLeftRight size={16} />
            </button>
          ) : null}
        </div>
        {!collapsed || mobile ? <p className="mt-3 text-xs leading-6 text-muted">{siteConfig.logline}</p> : null}
      </div>

      <div className="hide-scrollbar flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {siteConfig.navSections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              {!collapsed || mobile ? <p className="kicker px-1">{section.title}</p> : null}
              {section.items.map((item) => (
                <SidebarLink key={item.href} item={item} pathname={pathname} collapsed={collapsed && !mobile} onNavigate={onNavigate} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`border-t border-border px-3 py-3 ${collapsed && !mobile ? "px-2.5" : ""}`}>
        <button type="button" onClick={() => requestLogbookLogin()}
          className={`flex w-full items-center gap-3 rounded-[12px] border border-border bg-white px-3 py-2.5 text-left transition-colors hover:bg-background-secondary ${
            collapsed && !mobile ? "justify-center px-2.5" : ""
          }`}>
          <UserCircle size={17} weight="duotone" className="text-muted" />
          {!collapsed || mobile ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">{userName || "登录 / 船员档案"}</span>
              <span className="block truncate text-xs text-muted">{userEmail || "保存航线与投稿记录"}</span>
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}

export function SiteSidebar({ open, collapsed, onClose, onToggleCollapse }: SiteSidebarProps) {
  return (
    <>
      <aside className={`hidden border-r border-border bg-white lg:flex lg:min-h-screen lg:flex-col ${collapsed ? "lg:w-[88px]" : "lg:w-[268px]"}`}>
        <div className="sticky top-0 h-screen">
          <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
        </div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" onClick={onClose} className="absolute inset-0 bg-black/25 backdrop-blur-sm" aria-label="关闭菜单" />
          <aside className="absolute inset-y-0 left-0 w-[86vw] max-w-[300px] border-r border-border bg-white">
            <div className="flex items-center justify-end border-b border-border px-3 py-3">
              <button type="button" onClick={onClose} className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-faint hover:bg-black/5" aria-label="关闭">
                <X size={16} />
              </button>
            </div>
            <div className="h-[calc(100%-57px)]">
              <SidebarContent collapsed={false} mobile onNavigate={onClose} onToggleCollapse={onToggleCollapse} />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
