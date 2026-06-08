export type BrandTone = "ocean" | "forest" | "sunrise" | "berry" | "graphite";

export type BrandId =
  | "codex"
  | "claude"
  | "claude-code"
  | "cursor"
  | "windsurf"
  | "replit"
  | "chatgpt"
  | "gemini"
  | "perplexity"
  | "suno"
  | "notion"
  | "stripe"
  | "paddle"
  | "lemonsqueezy"
  | "apple-gift-card"
  | "apple-id";

export type BrandMeta = {
  label: string;
  tone: BrandTone;
  simpleIcon?: string;
  fallback?: string;
};

export const toneClassMap: Record<
  BrandTone,
  {
    chip: string;
    badge: string;
    line: string;
    text: string;
    soft: string;
    button: string;
    buttonMuted: string;
  }
> = {
  ocean: {
    chip: "border-sky-200/90 bg-sky-50 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    line: "bg-sky-500",
    text: "text-sky-700",
    soft: "border-sky-200/70 bg-sky-50/75",
    button: "border-sky-300/90 bg-sky-50 text-sky-800 hover:border-sky-400 hover:bg-sky-100/90",
    buttonMuted:
      "border-line bg-white/70 text-foreground hover:border-sky-300 hover:bg-sky-50/80 hover:text-sky-800",
  },
  forest: {
    chip: "border-emerald-200/90 bg-emerald-50 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    line: "bg-emerald-500",
    text: "text-emerald-700",
    soft: "border-emerald-200/70 bg-emerald-50/75",
    button:
      "border-emerald-300/90 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100/90",
    buttonMuted:
      "border-line bg-white/70 text-foreground hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-800",
  },
  sunrise: {
    chip: "border-amber-200/90 bg-amber-50 text-amber-700",
    badge: "bg-amber-50 text-amber-700",
    line: "bg-amber-500",
    text: "text-amber-700",
    soft: "border-amber-200/70 bg-amber-50/75",
    button: "border-amber-300/90 bg-amber-50 text-amber-800 hover:border-amber-400 hover:bg-amber-100/90",
    buttonMuted:
      "border-line bg-white/70 text-foreground hover:border-amber-300 hover:bg-amber-50/80 hover:text-amber-800",
  },
  berry: {
    chip: "border-rose-200/90 bg-rose-50 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    line: "bg-rose-500",
    text: "text-rose-700",
    soft: "border-rose-200/70 bg-rose-50/75",
    button: "border-rose-300/90 bg-rose-50 text-rose-800 hover:border-rose-400 hover:bg-rose-100/90",
    buttonMuted:
      "border-line bg-white/70 text-foreground hover:border-rose-300 hover:bg-rose-50/80 hover:text-rose-800",
  },
  graphite: {
    chip: "border-stone-200/90 bg-stone-100 text-stone-700",
    badge: "bg-stone-100 text-stone-700",
    line: "bg-stone-500",
    text: "text-stone-700",
    soft: "border-stone-200/70 bg-stone-100/85",
    button: "border-stone-300/90 bg-stone-100 text-stone-800 hover:border-stone-400 hover:bg-stone-200/90",
    buttonMuted:
      "border-line bg-white/70 text-foreground hover:border-stone-300 hover:bg-stone-100/80 hover:text-stone-800",
  },
};

export const brandRegistry: Record<BrandId, BrandMeta> = {
  codex: {
    label: "Codex",
    tone: "ocean",
    fallback: "CX",
  },
  claude: {
    label: "Claude",
    tone: "sunrise",
    simpleIcon: "siClaude",
  },
  "claude-code": {
    label: "Claude Code",
    tone: "sunrise",
    simpleIcon: "siClaudecode",
  },
  cursor: {
    label: "Cursor",
    tone: "graphite",
    simpleIcon: "siCursor",
  },
  windsurf: {
    label: "Windsurf",
    tone: "ocean",
    simpleIcon: "siWindsurf",
  },
  replit: {
    label: "Replit",
    tone: "sunrise",
    simpleIcon: "siReplit",
  },
  chatgpt: {
    label: "ChatGPT",
    tone: "forest",
    fallback: "AI",
  },
  gemini: {
    label: "Gemini",
    tone: "berry",
    simpleIcon: "siGooglegemini",
  },
  perplexity: {
    label: "Perplexity",
    tone: "ocean",
    simpleIcon: "siPerplexity",
  },
  suno: {
    label: "Suno",
    tone: "forest",
    simpleIcon: "siSuno",
  },
  notion: {
    label: "Notion AI",
    tone: "graphite",
    simpleIcon: "siNotion",
  },
  stripe: {
    label: "Stripe",
    tone: "berry",
    simpleIcon: "siStripe",
  },
  paddle: {
    label: "Paddle",
    tone: "ocean",
    simpleIcon: "siPaddle",
  },
  lemonsqueezy: {
    label: "LemonSqueezy",
    tone: "sunrise",
    simpleIcon: "siLemonsqueezy",
  },
  "apple-gift-card": {
    label: "Apple Gift Card",
    tone: "forest",
    simpleIcon: "siApple",
  },
  "apple-id": {
    label: "Apple ID",
    tone: "graphite",
    simpleIcon: "siApple",
  },
};
