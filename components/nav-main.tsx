"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export type NavMainItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  items?: { label: string; href: string }[];
};

export function NavMain({ items }: { items: NavMainItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>导航</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSub = !!item.items?.length;
          const active =
            item.isActive ??
            (item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`) ||
                item.items?.some(
                  (sub) =>
                    pathname === sub.href ||
                    pathname.startsWith(`${sub.href}/`)
                ));

          return (
            <Collapsible
              key={item.title}
              defaultOpen={true}
              render={<SidebarMenuItem />}
            >
              {hasSub ? (
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <span>{item.title}</span>
                      <CaretDown
                        size={14}
                        weight="bold"
                        className="ml-auto transition-transform duration-200 group-data-[open]:rotate-180"
                      />
                    </SidebarMenuButton>
                  }
                />
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={active}
                  render={<Link href={item.href} />}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
              {hasSub ? (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items!.map((sub) => {
                      const subActive =
                        sub.href === "/"
                          ? pathname === "/"
                          : pathname === sub.href ||
                            pathname.startsWith(`${sub.href}/`);
                      return (
                        <SidebarMenuSubItem key={sub.href}>
                          <SidebarMenuSubButton
                            isActive={subActive}
                            render={<Link href={sub.href} />}
                          >
                            <span>{sub.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              ) : null}
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
