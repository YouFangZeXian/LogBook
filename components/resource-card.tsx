import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { toneClassMap } from "@/lib/brand-library";
import type { ResourceItem } from "@/data/resources";

type ResourceCardProps = {
  item: ResourceItem;
  compact?: boolean;
};

export function ResourceCard({ item, compact = false }: ResourceCardProps) {
  const tone = toneClassMap[item.tone ?? "graphite"];

  return (
    <article className="glass-card flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}>
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

      <div className="space-y-3">
        {item.brand ? <BrandMark brand={item.brand} size="sm" /> : null}
        <div>
          <h3
            className={`font-semibold tracking-tight text-foreground ${
              compact ? "text-lg" : "text-xl"
            }`}
          >
            {item.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{item.purpose}</p>
        </div>
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
          className={`inline-flex rounded-[0.8rem] border px-4 py-2 text-sm font-medium transition-colors ${tone.chip}`}
        >
          {item.buttonLabel}
        </Link>
      </div>
    </article>
  );
}
