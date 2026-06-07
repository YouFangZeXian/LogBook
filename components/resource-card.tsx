import Link from "next/link";

import type { ResourceItem } from "@/data/resources";

type ResourceCardProps = {
  item: ResourceItem;
};

export function ResourceCard({ item }: ResourceCardProps) {
  return (
    <article className="card flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-accent">
          {item.category === "tool"
            ? "工具"
            : item.category === "payment"
              ? "支付方案"
              : "教程"}
        </span>
        <span className="text-xs text-muted">
          affiliate：{item.affiliateLink ? "已配置" : "预留字段"}
        </span>
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {item.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">{item.purpose}</p>
      </div>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="font-medium text-foreground">适合谁</dt>
          <dd className="mt-1 leading-7 text-muted">{item.audience}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">风险提示</dt>
          <dd className="mt-1 leading-7 text-muted">{item.risk}</dd>
        </div>
      </dl>
      <div className="mt-auto pt-2">
        <Link
          href={item.href}
          className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {item.buttonLabel}
        </Link>
      </div>
    </article>
  );
}
