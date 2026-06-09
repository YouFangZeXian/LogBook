"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/content";

type ArticleTocProps = { items: TocItem[] };

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!items.length) return;
    const update = () => {
      const headings = items
        .map((item) => { const el = document.getElementById(item.url.replace("#", "")); return el ? { id: el.id, top: el.getBoundingClientRect().top } : null; })
        .filter(Boolean) as { id: string; top: number }[];
      const active = headings.find((h) => h.top > 80) ?? headings[headings.length - 1];
      if (active) setActiveId(active.id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-20 space-y-3 rounded-[18px] border border-border bg-white p-4">
        <p className="text-sm font-semibold text-foreground">目录</p>
        <ul className="space-y-1.5">
          {items.map((item) => {
            const id = item.url.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={item.url}>
                <a
                  href={item.url}
                  onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setActiveId(id); }}
                  className={cn(
                    "block border-l-2 py-1 text-sm leading-6 transition-all",
                    item.depth === 3 && "pl-6",
                    !item.depth || item.depth === 2 ? "pl-3" : "",
                    isActive ? "border-brand-sea font-medium text-brand-sea" : "border-transparent text-muted hover:text-foreground"
                  )}
                >
                  {item.value}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
