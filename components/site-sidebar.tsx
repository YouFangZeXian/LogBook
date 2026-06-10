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
import { NavUser } from "@/components/nav-user";
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

/* ── 将 siteConfig.navSections 转换为 NavMain 格式 ── */

const sectionIcons: Record<string, React.ReactNode> = {
  "主航道": <Compass size={18} weight="duotone" />,
  "工具与补给": <Wrench size={18} weight="duotone" />,
  "日志与船员": <PenNibStraight size={18} weight="duotone" />,
};

const navMainItems: NavMainItem[] = siteConfig.navSections.map((section) => ({
  title: section.title,
  url: section.items[0]?.href ?? "#",
  icon: sectionIcons[section.title] ?? <Compass size={18} weight="duotone" />,
  isActive: false,
  items: section.items.map((item) => ({
    title: item.label,
    url: item.href,
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

/* ── 入口组件 ── */

export function SiteSidebar() {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);

  useEffect(() => {
    const sync = () => {
      const u = getCurrentLogbookUser();
      setUser(u ? { name: u.name, email: u.email, avatar: "" } : null);
    };
    sync();
    window.addEventListener("logbook-auth-changed", sync);
    return () => window.removeEventListener("logbook-auth-changed", sync);
  }, []);

  return (
    <Sidebar variant="inset" collapsible="icon">
      {/* ── 品牌头部 ── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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

      {/* ── 可滚动内容：主导航 + 次要导航 ── */}
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>

      {/* ── 底部用户区 ── */}
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => requestLogbookLogin()}
                className="w-full"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserCircle size={16} weight="fill" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">登录 / 船员档案</span>
                  <span className="truncate text-xs text-muted-foreground">
                    保存航线与投稿记录
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
