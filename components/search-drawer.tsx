"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles, X } from "lucide-react";

import type { SearchEntry } from "@/lib/content";

type SearchDrawerProps = {
  entries: SearchEntry[];
  open: boolean;
  onClose: () => void;
};

const labels: Record<SearchEntry["type"], string> = {
  article: "文章",
  category: "分类",
  resource: "资源",
  page: "页面",
};

export function SearchDrawer({ entries, open, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return entries.slice(0, 8);
    }

    return entries
      .filter((entry) => {
        const haystack = [
          entry.title,
          entry.description,
          ...entry.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized);
      })
      .slice(0, 10);
  }, [entries, query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/22 px-4 py-5 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="glass-card-strong overflow-hidden">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Search className="h-4 w-4 text-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索文章、分类、工具或航路"
              className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/35 text-muted transition-colors hover:border-foreground hover:text-foreground"
              aria-label="关闭搜索"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-3 py-3">
            {results.length ? (
              <div className="space-y-2">
                {results.map((entry) => (
                  <Link
                    key={`${entry.type}-${entry.href}`}
                    href={entry.href}
                    onClick={() => {
                      setQuery("");
                      onClose();
                    }}
                    className="flex flex-col gap-2 rounded-[22px] border border-transparent bg-white/34 px-4 py-4 transition-colors hover:border-line-strong hover:bg-white/56"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-line bg-white/45 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted [font-family:var(--font-mono),monospace]">
                        {labels[entry.type]}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {entry.title}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-muted">{entry.description}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <Sparkles className="h-5 w-5 text-foreground" />
                <p className="text-sm text-foreground">没有找到匹配内容</p>
                <p className="max-w-md text-sm leading-7 text-muted">
                  可以试试搜 ChatGPT、Apple ID、Cursor、礼品卡、学生方案这类关键词。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
