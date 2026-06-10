"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Compass,
  Info,
  PenNibStraight,
  UserCircle,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { NavMain, type NavMainItem } from "@/components/nav-main";
import { NavSecondary, type NavSecondaryItem } from "@/components/nav-secondary";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/* ── 将 siteConfig.navSections 转换为 NavMain 的可折叠分组格式 ── */

const sectionIcons: Record<string, React.ReactNode> = {
  "主航道": <Compass size={18} weight="duotone" />,
  "工具与补给": <Wrench size={18} weight="duotone" />,
  "日志与船员": <PenNibStraight size={18} weight="duotone" />,
};

const navMainItems: NavMainItem[] = siteConfig.navSections.map((section) => ({
  title: section.title,
  href: section.items[0]?.href ?? "#",
  icon: sectionIcons[section.title] ?? <Compass size={18} weight="duotone" />,
  isActive: false, // auto-detected by NavMain via pathname
  items: section.items.map((item) => ({
    label: item.label,
    href: item.href,
  })),
}));

/* ── 次要导航 ── */

const navSecondaryItems: NavSecondaryItem[] = [
  {
    title: "关于",
    href: "/about",
    icon: <Info size={16} weight="duotone" />,
  },
];

/* ── 用户区块（侧边栏底部） ── */

function SidebarUserFooter() {
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
    <button
      type="button"
      onClick={() => requestLogbookLogin()}
      className="flex w-full items-center gap-3 rounded-[12px] border border-sidebar-border bg-sidebar px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent"
    >
      <UserCircle size={17} weight="duotone" className="text-muted-foreground shrink-0" />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-sidebar-foreground">
          {userName || "登录 / 船员档案"}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {userEmail || "保存航线与投稿记录"}
        </span>
      </span>
    </button>
  );
}

/* ── 入口组件 ── */

export function SiteSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      {/* ── 品牌头部 ── */}
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-brand-mist">
                {/* Logo placeholder — 待插入图片 */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{siteConfig.shortName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {siteConfig.logline}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── 可滚动内容：主导航 + 主题切换 + 次要导航 ── */}
      <SidebarContent>
        <NavMain items={navMainItems} />
        <div className="px-2 mt-2">
          <ThemeToggle />
        </div>
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>

      {/* ── 底部用户入口 ── */}
      <SidebarFooter>
        <SidebarUserFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
