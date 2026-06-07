import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/content";

type ArticleTocProps = {
  items: TocItem[];
};

export function ArticleToc({ items }: ArticleTocProps) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="card sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto p-5 lg:block">
      <p className="text-sm font-semibold text-foreground">目录</p>
      <nav className="mt-4 space-y-3">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            className={cn(
              "block text-sm leading-6 text-muted transition-colors hover:text-accent",
              item.depth === 3 && "pl-4",
            )}
          >
            {item.value}
          </a>
        ))}
      </nav>
    </aside>
  );
}
