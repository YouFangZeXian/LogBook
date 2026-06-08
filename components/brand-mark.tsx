import * as simpleIcons from "simple-icons";
import { AppleLogo, Gift, TerminalWindow } from "@phosphor-icons/react/dist/ssr";

import { brandRegistry, toneClassMap, type BrandId } from "@/lib/brand-library";

type BrandMarkProps = {
  brand: BrandId;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
};

const sizeMap = {
  sm: {
    shell: "h-8 min-w-8 gap-2 rounded-[0.75rem] px-2.5",
    icon: "h-3.5 w-3.5",
    text: "text-xs",
  },
  md: {
    shell: "h-10 min-w-10 gap-2.5 rounded-[0.9rem] px-3",
    icon: "h-4 w-4",
    text: "text-sm",
  },
} as const;

function FallbackGlyph({ brand, iconClassName }: { brand: BrandId; iconClassName: string }) {
  if (brand === "codex") {
    return <TerminalWindow size={16} className={iconClassName} weight="bold" />;
  }

  if (brand === "apple-gift-card") {
    return (
      <span className="relative inline-flex items-center">
        <AppleLogo size={15} className={iconClassName} weight="fill" />
        <Gift
          size={10}
          className="absolute -right-1.5 -top-1.5 rounded-full bg-white/90 p-[1px] text-emerald-700"
          weight="fill"
        />
      </span>
    );
  }

  const fallback = brandRegistry[brand].fallback ?? brandRegistry[brand].label.slice(0, 2).toUpperCase();

  return (
    <span className={`${iconClassName} text-[10px] font-semibold uppercase tracking-[0.18em]`}>
      {fallback}
    </span>
  );
}

export function BrandMark({
  brand,
  size = "sm",
  showLabel = true,
  className = "",
}: BrandMarkProps) {
  const meta = brandRegistry[brand];
  const tone = toneClassMap[meta.tone];
  const dimensions = sizeMap[size];
  const icon = meta.simpleIcon
    ? (simpleIcons as unknown as Record<string, { path: string }>)[meta.simpleIcon]
    : undefined;

  return (
    <span
      className={[
        "inline-flex items-center border transition-colors",
        tone.chip,
        dimensions.shell,
        className,
      ].join(" ")}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center">
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={dimensions.icon}
            fill="currentColor"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <FallbackGlyph brand={brand} iconClassName={dimensions.icon} />
        )}
      </span>
      {showLabel ? (
        <span className={`${dimensions.text} font-medium tracking-tight`}>{meta.label}</span>
      ) : null}
    </span>
  );
}
