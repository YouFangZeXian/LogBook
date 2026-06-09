import * as simpleIcons from "simple-icons";
import { AppleLogo, Gift, TerminalWindow } from "@phosphor-icons/react/dist/ssr";
import { brandRegistry, type BrandId } from "@/lib/brand-library";

type BrandMarkProps = { brand: BrandId; size?: "sm" | "md"; showLabel?: boolean; className?: string };

const sizeMap = {
  sm: { shell: "h-7 min-w-7 gap-1.5 rounded-[8px] px-2", icon: "h-3 w-3", text: "text-[11px]" },
  md: { shell: "h-9 min-w-9 gap-2 rounded-[10px] px-2.5", icon: "h-3.5 w-3.5", text: "text-xs" },
} as const;

function FallbackGlyph({ brand, iconClassName }: { brand: BrandId; iconClassName: string }) {
  if (brand === "codex") return <TerminalWindow size={14} className={iconClassName} weight="bold" />;
  if (brand === "apple-gift-card") return (
    <span className="relative inline-flex items-center">
      <AppleLogo size={13} className={iconClassName} weight="fill" />
      <Gift size={9} className="absolute -right-1 -top-1 rounded-full bg-white p-[1px] text-emerald-700" weight="fill" />
    </span>
  );
  const fallback = brandRegistry[brand].fallback ?? brandRegistry[brand].label.slice(0, 2).toUpperCase();
  return <span className={`${iconClassName} text-[9px] font-semibold tracking-[0.16em]`}>{fallback}</span>;
}

export function BrandMark({ brand, size = "sm", showLabel = true, className = "" }: BrandMarkProps) {
  const meta = brandRegistry[brand];
  const dim = sizeMap[size];
  const icon = meta.simpleIcon ? (simpleIcons as unknown as Record<string, { path: string }>)[meta.simpleIcon] : undefined;

  return (
    <span className={`inline-flex items-center border border-border bg-white transition-colors hover:border-border-medium ${dim.shell} ${className}`}>
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center text-muted">
        {icon ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className={dim.icon} fill="currentColor"><path d={icon.path} /></svg>
        ) : (
          <FallbackGlyph brand={brand} iconClassName={dim.icon} />
        )}
      </span>
      {showLabel ? <span className={`${dim.text} font-medium text-muted`}>{meta.label}</span> : null}
    </span>
  );
}
