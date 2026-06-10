"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  CaretUpDown,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const logout = () => {
    window.localStorage.removeItem("logbook.auth.user")
    window.dispatchEvent(new Event("logbook-auth-changed"))
    setOpen(false)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="relative" ref={ref}>
          <SidebarMenuButton
            size="lg"
            onClick={() => setOpen(!open)}
            className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                <UserCircle size={16} weight="fill" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <CaretUpDown size={16} weight="bold" className="ml-auto" />
          </SidebarMenuButton>

          {/* Popover card */}
          {open ? (
            <div
              className={`absolute z-50 w-56 overflow-hidden rounded-xl border border-border bg-white shadow-[0_12px_40px_rgba(15,61,94,0.12)] ${
                isMobile
                  ? "bottom-full mb-2 left-0"
                  : "left-full ml-2 bottom-0"
              }`}
            >
              {/* Header: avatar + name */}
              <div className="flex items-center gap-3 px-4 py-3">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    <UserCircle size={18} weight="fill" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left">
                  <span className="text-sm font-semibold text-foreground truncate">{user.name}</span>
                  <span className="text-xs text-muted truncate">{user.email}</span>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Crew profile link */}
              <button
                type="button"
                onClick={() => { router.push("/crew"); setOpen(false) }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-background-secondary"
              >
                <UserCircle size={16} weight="duotone" className="text-muted" />
                船员档案
              </button>

              <div className="h-px bg-border" />

              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-danger transition-colors hover:bg-danger-soft"
              >
                <SignOut size={16} weight="duotone" />
                登出账号
              </button>
            </div>
          ) : null}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
