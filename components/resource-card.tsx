import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BrandMark } from "@/components/brand-mark";
import type { ResourceItem } from "@/data/resources";

type ResourceCardProps = { item: ResourceItem };

export function ResourceCard({ item }: ResourceCardProps) {
  return (
    <article className="surface group flex h-full flex-col p-5">
      <span className="tag w-fit">
        {item.category === "tool" ? "工具" : item.category === "payment" ? "支付方案" : "教程"}
      </span>
      <div className="mt-4 space-y-2">
        {item.brand ? <BrandMark brand={item.brand} size="sm" /> : null}
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-brand">
          {item.name}
        </h3>
        <p className="text-sm leading-6 text-muted">{item.purpose}</p>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div><dt className="font-medium text-foreground">适合谁</dt><dd className="text-muted">{item.audience}</dd></div>
        <div><dt className="font-medium text-foreground">风险提示</dt><dd className="text-muted">{item.risk}</dd></div>
      </dl>
      <div className="mt-auto pt-5">
        <Link href={item.href} className="btn-mist text-sm">
          {item.buttonLabel} <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
