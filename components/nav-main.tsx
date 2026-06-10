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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

export type NavMainItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  items?: { title: string; url: string }[];
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
            (item.url === "/"
              ? pathname === "/"
              : pathname === item.url || pathname.startsWith(`${item.url}/`) ||
                item.items?.some(
                  (sub) =>
                    pathname === sub.url ||
                    pathname.startsWith(`${sub.url}/`)
                ));

          return (
            <Collapsible
              key={item.title}
              defaultOpen={true}
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                tooltip={item.title}
                isActive={active}
                render={<Link href={item.url} />}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
              {hasSub ? (
                <>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuAction className="[&[aria-expanded=true]>svg]:rotate-90" />
                    }
                  >
                    <CaretRight size={14} weight="bold" className="transition-transform duration-200" />
                    <span className="sr-only">展开/收起</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items!.map((sub) => {
                        const subActive =
                          sub.url === "/"
                            ? pathname === "/"
                            : pathname === sub.url ||
                              pathname.startsWith(`${sub.url}/`);
                        return (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              isActive={subActive}
                              render={<Link href={sub.url} />}
                            >
                              <span>{sub.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
