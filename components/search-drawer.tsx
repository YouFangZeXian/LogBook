"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, Sparkle, X } from "@phosphor-icons/react/dist/ssr";
import type { SearchEntry } from "@/lib/content";

type SearchDrawerProps = {
  entries: SearchEntry[];
  open: boolean;
  onClose: () => void;
};

const labels: Record<SearchEntry["type"], string> = {
  article: "文章", category: "分类", resource: "资源", page: "页面",
};

export function SearchDrawer({ entries, open, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  const results = useMemo(() => {
    const n = query.trim().toLowerCase();
    if (!n) return entries.slice(0, 8);
    return entries.filter((e) => [e.title, e.description, ...e.keywords].join(" ").toLowerCase().includes(n)).slice(0, 10);
  }, [entries, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/25 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="overflow-hidden rounded-[22px] border border-border bg-white shadow-[0_20px_60px_rgba(15,61,94,0.12)]">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <MagnifyingGlass size={17} className="text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章、分类、工具或航路"
              className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-faint"
            />
            <button type="button" onClick={onClose} className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-faint transition-colors hover:bg-black/5" aria-label="关闭">
              <X size={16} />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-3">
            {results.length ? (
              <div className="space-y-1">
                {results.map((entry) => (
                  <Link key={`${entry.type}-${entry.href}`} href={entry.href} onClick={() => { setQuery(""); onClose(); }}
                    className="flex flex-col gap-1 rounded-[14px] px-4 py-3 transition-colors hover:bg-background-secondary">
                    <div className="flex items-center gap-2">
                      <span className="tag text-[10px]">{labels[entry.type]}</span>
                      <span className="text-sm font-semibold text-foreground">{entry.title}</span>
                    </div>
                    <p className="text-sm leading-6 text-muted">{entry.description}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-14 text-center">
                <Sparkle size={20} className="text-foreground" />
                <p className="text-sm font-medium text-foreground">没有找到匹配内容</p>
                <p className="text-sm leading-6 text-muted">试试搜 ChatGPT、Apple ID、Cursor、礼品卡</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
