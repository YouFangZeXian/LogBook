"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowsLeftRight,
  BookOpenText,
  Compass,
  House,
  Info,
  Lifebuoy,
  ListDashes,
  Package,
  PenNibStraight,
  RocketLaunch,
  Sparkle,
  UserCircle,
  Wrench,
  X,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { siteConfig, type NavItem } from "@/lib/site";

type SiteSidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

const iconMap: Record<string, typeof House> = {
  "/": House,
  "/start": RocketLaunch,
  "/routes": Compass,
  "/category": ListDashes,
  "/tools": Wrench,
  "/resources": Lifebuoy,
  "/discoveries": Sparkle,
  "/products": Package,
  "/contribute": PenNibStraight,
  "/crew": UserCircle,
  "/about": Info,
};

function SidebarLink({
  item,
  collapsed,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = iconMap[item.href] ?? BookOpenText;
  const active =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={[
        "group flex items-center gap-3 rounded-[12px] border px-3 py-2.5 text-sm transition-colors",
        collapsed ? "justify-center px-2.5" : "",
        active
          ? "border-foreground bg-white text-foreground"
          : "border-transparent text-muted hover:border-line hover:bg-white/70 hover:text-foreground",
      ].join(" ")}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-line bg-background/72 text-foreground">
        <Icon size={17} weight={active ? "fill" : "regular"} />
      </span>
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
    </Link>
  );
}

function SidebarContent({
  collapsed,
  mobile,
  onNavigate,
  onToggleCollapse,
}: {
  collapsed: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
  onToggleCollapse: () => void;
}) {
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
      <div className={`border-b border-line px-3 py-3 ${collapsed && !mobile ? "px-2.5" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed && !mobile ? "justify-center" : ""}`}>
          <Link href="/" onClick={onNavigate} className="group flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border border-line bg-white/70">
              <Image
                src="/logo-mark.png"
                alt="路格舶 logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            {!collapsed || mobile ? (
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-muted [font-family:var(--font-mono),monospace]">
                  Logbook.today
                </span>
                <span className="block truncate text-sm font-semibold tracking-tight text-foreground">
                  {siteConfig.shortName}
                </span>
              </span>
            ) : null}
          </Link>

          {!mobile ? (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-white/60 text-muted transition-colors hover:border-foreground hover:text-foreground"
              aria-label={collapsed ? "展开侧边栏" : "收起侧边栏"}
              title={collapsed ? "展开侧边栏" : "收起侧边栏"}
            >
              <ArrowsLeftRight size={16} />
            </button>
          ) : null}
        </div>

        {!collapsed || mobile ? (
          <p className="mt-3 text-xs leading-6 text-muted">{siteConfig.logline}</p>
        ) : null}
      </div>

      <div className="hide-scrollbar flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {siteConfig.navSections.map((section) => (
            <div key={section.title} className="space-y-2">
              {!collapsed || mobile ? <p className="section-kicker px-1">{section.title}</p> : null}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <SidebarLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    collapsed={collapsed && !mobile}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`border-t border-line px-3 py-3 ${collapsed && !mobile ? "px-2.5" : ""}`}>
        <button
          type="button"
          onClick={() => requestLogbookLogin()}
          title={collapsed && !mobile ? userName || "登录" : undefined}
          className={[
            "flex w-full items-center gap-3 rounded-[12px] border border-line bg-white/62 px-3 py-2.5 text-left transition-colors hover:border-foreground hover:bg-white",
            collapsed && !mobile ? "justify-center px-2.5" : "",
          ].join(" ")}
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-line bg-background/72 text-foreground">
            <UserCircle size={17} weight="duotone" />
          </span>
          {!collapsed || mobile ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {userName || "登录 / 船员档案"}
              </span>
              <span className="block truncate text-xs text-muted">
                {userEmail || "保存航线与投稿记录"}
              </span>
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}

export function SiteSidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
}: SiteSidebarProps) {
  return (
    <>
      <aside
        className={[
          "hidden border-r border-line bg-background-soft/72 backdrop-blur-xl lg:flex lg:min-h-screen lg:flex-col",
          collapsed ? "lg:w-[92px]" : "lg:w-[272px]",
        ].join(" ")}
      >
        <div className="sticky top-0 h-screen">
          <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
        </div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/26 backdrop-blur-sm"
            aria-label="关闭侧边栏"
          />
          <aside className="absolute inset-y-0 left-0 w-[86vw] max-w-[320px] border-r border-line bg-background-soft shadow-[0_20px_80px_-40px_rgba(20,19,17,0.38)]">
            <div className="flex items-center justify-end border-b border-line px-3 py-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-white/60 text-muted"
                aria-label="关闭侧边栏"
              >
                <X size={16} />
              </button>
            </div>
            <div className="h-[calc(100%-61px)]">
              <SidebarContent
                collapsed={false}
                mobile
                onNavigate={onClose}
                onToggleCollapse={onToggleCollapse}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
