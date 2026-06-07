import type { Metadata } from "next";

export type CategorySlug =
  | "ai-subscription"
  | "payment"
  | "apple-id"
  | "dev-tools"
  | "student"
  | "risk";

export type CategoryConfig = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  intro: string;
  recommendedSlugs: string[];
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://logbook.today";

export const siteConfig = {
  name: "路格舶-舶来四海之物",
  shortName: "路格舶",
  title: "路格舶-舶来四海之物 | 订阅、支付与工具避坑",
  motto: "寻未知路；格世界物；舶沧海途。",
  logline: "记录 AI 时代的舶海日志。",
  description:
    "ChatGPT、Claude、Cursor、美区 Apple ID、海外支付、订阅避坑，一站式整理，帮学生和个人开发者少踩坑、少花冤枉钱。",
  url: siteUrl,
  author: "路格舶",
  email: "hello@example.com",
  wechatPlaceholder: "微信联系位（待补充）",
  keywords: [
    "AI出海",
    "ChatGPT Plus",
    "Claude Pro",
    "Cursor Pro",
    "Apple Gift Card",
    "美区 Apple ID",
    "海外支付",
    "学生低成本 AI",
    "AI 工具订阅",
  ],
  navigation: [
    { href: "/", label: "首页" },
    { href: "/start", label: "新手开始" },
    { href: "/category", label: "分类" },
    { href: "/tools", label: "工具" },
    { href: "/resources", label: "资源" },
    { href: "/products", label: "产品" },
    { href: "/about", label: "关于" },
  ],
  footerDisclaimer:
    "本站内容仅用于经验整理与信息参考，不提供盗版、破解、黑卡、欺诈、违规账号买卖等服务，也不会承诺订阅一定成功或保证收益。",
} as const;

export const categories: CategoryConfig[] = [
  {
    slug: "ai-subscription",
    name: "AI 订阅",
    shortName: "AI 订阅",
    description:
      "围绕 ChatGPT、Claude、Perplexity 等订阅方式、适合人群、成本结构和避坑建议。",
    intro:
      "如果你现在最关心的是该不该付费、怎么付费、哪种方案最省心，这个分类会先帮你建立判断框架，再讲具体支付路径。",
    recommendedSlugs: [
      "chatgpt-plus-subscription-options",
      "claude-pro-worth-it",
      "ai-tool-subscription-failure-reasons",
    ],
  },
  {
    slug: "payment",
    name: "海外支付",
    shortName: "海外支付",
    description:
      "整理虚拟卡、香港卡、礼品卡等常见方式的差异、适用场景与合规风险提醒。",
    intro:
      "支付问题往往不是不能付，而是不知道哪种方式和自己的工具组合更匹配。这里重点讲路径选择、费用结构和风险边界。",
    recommendedSlugs: [
      "virtual-card-vs-hk-card-vs-gift-card",
      "how-to-evaluate-gift-card-channel",
      "apple-gift-card-risks",
    ],
  },
  {
    slug: "apple-id",
    name: "美区 Apple ID",
    shortName: "Apple ID",
    description:
      "聚焦美区 Apple ID 的注册、使用、充值和常见限制，不碰成品号买卖与违规玩法。",
    intro:
      "Apple ID 看似只是一个账号问题，实际会串联地区、支付、风控和长期可用性。先搞清规则，再决定要不要折腾。",
    recommendedSlugs: [
      "us-apple-id-guide",
      "apple-gift-card-risks",
      "why-not-buy-ready-made-apple-id",
    ],
  },
  {
    slug: "dev-tools",
    name: "Claude / Codex / Cursor",
    shortName: "开发工具",
    description:
      "关注个人开发者常用 AI 编程工具，讲清使用边界、场景差异和投入产出。",
    intro:
      "不是所有 AI 编程工具都适合所有人。这个分类会把开发工作流拆开，帮你判断该买什么、先用什么、暂时不用什么。",
    recommendedSlugs: [
      "cursor-claude-code-codex-comparison",
      "developer-ai-toolkit",
      "build-ai-workflow-from-zero",
    ],
  },
  {
    slug: "student",
    name: "学生省钱方案",
    shortName: "学生方案",
    description:
      "以预算有限为前提，设计更适合学生党的 AI 工具组合、替代思路和使用顺序。",
    intro:
      "学生方案的重点从来不是买得最多，而是把有限预算花在真正高频的环节上。这里优先讲组合思路和长期成本。",
    recommendedSlugs: [
      "student-budget-ai-stack",
      "build-ai-workflow-from-zero",
      "developer-ai-toolkit",
    ],
  },
  {
    slug: "risk",
    name: "常见避坑",
    shortName: "避坑",
    description:
      "集中整理风控、账号、礼品卡渠道和订阅失败等常见问题，帮助你少走弯路。",
    intro:
      "很多坑不是技术问题，而是信息不对称。这里专门收集那些别人通常在踩完之后才会告诉你的细节。",
    recommendedSlugs: [
      "why-not-buy-ready-made-apple-id",
      "ai-tool-subscription-failure-reasons",
      "how-to-evaluate-gift-card-channel",
    ],
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<CategorySlug, CategoryConfig>;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataOptions): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "zh_CN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
