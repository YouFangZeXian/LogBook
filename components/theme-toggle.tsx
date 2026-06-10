"use client";

import { useEffect, useState } from "react";
import { MoonStars, Sun } from "@phosphor-icons/react/dist/ssr";

const THEME_KEY = "logbook.theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return getSystemTheme();
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  window.localStorage.setItem(THEME_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div className="flex h-9 w-full items-center gap-2.5 rounded-[10px] px-3">
        <span className="h-4 w-4 rounded-full bg-sidebar-border animate-pulse" />
        <span className="text-xs text-muted">主题</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-sm text-muted transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground"
    >
      {theme === "light" ? (
        <>
          <Sun size={16} weight="duotone" className="shrink-0 transition-transform duration-500 hover:rotate-90" />
          <span>浅色模式</span>
        </>
      ) : (
        <>
          <MoonStars size={16} weight="duotone" className="shrink-0 transition-transform duration-500 hover:rotate-12" />
          <span>深色模式</span>
        </>
      )}
    </button>
  );
}
