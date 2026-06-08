import type { BrandId, BrandTone } from "@/lib/brand-library";

export type DeviceId = "windows" | "mac" | "iphone" | "android";
export type StatusId = "new" | "partial" | "account" | "explore";

export type DeviceOption = {
  id: DeviceId;
  label: string;
  helper: string;
  tone: BrandTone;
};

export type StatusOption = {
  id: StatusId;
  label: string;
  helper: string;
};

export type VoyageTask = {
  id: string;
  label: string;
  note: string;
  href: string;
  brand?: BrandId;
  tone: BrandTone;
};

export type VoyageSegment = {
  id: string;
  title: string;
  note: string;
  tone: BrandTone;
  tasks: VoyageTask[];
};

export type HarborCategory = {
  id: string;
  title: string;
  note: string;
  tone: BrandTone;
  href: string;
  brands: BrandId[];
};

export type LogbookPanel = {
  id: string;
  title: string;
  note: string;
  tone: BrandTone;
  href: string;
};

export const deviceOptions: DeviceOption[] = [
  {
    id: "windows",
    label: "Windows",
    helper: "开发、浏览器和网页订阅的主力环境。",
    tone: "ocean",
  },
  {
    id: "mac",
    label: "Mac",
    helper: "网页直订与 Apple 生态并行时更顺手。",
    tone: "graphite",
  },
  {
    id: "iphone",
    label: "iPhone / iPad",
    helper: "App Store 路线、礼品卡和 Apple ID 会更重要。",
    tone: "forest",
  },
  {
    id: "android",
    label: "Android",
    helper: "更偏网页与 Google 体系，适合轻量先试。",
    tone: "sunrise",
  },
];

export const statusOptions: StatusOption[] = [
  {
    id: "new",
    label: "我从未出海",
    helper: "从身份、网络到支付都需要完整走一次。",
  },
  {
    id: "partial",
    label: "我已部分出海",
    helper: "已经会一点，但路径还不稳定。",
  },
  {
    id: "account",
    label: "我已经有海外账号",
    helper: "重点不是注册，而是整理和续航。",
  },
  {
    id: "explore",
    label: "自由探索",
    helper: "我想直接看有哪些港口和玩法。",
  },
];

export const harborCategories: HarborCategory[] = [
  {
    id: "dev",
    title: "AI 开发",
    note: "把编程协作、代理写码和 IDE 插件收进同一个船坞。",
    tone: "ocean",
    href: "/category/dev-tools",
    brands: ["codex", "claude-code", "cursor", "windsurf", "replit"],
  },
  {
    id: "video",
    title: "AI 视频",
    note: "偏 Google 生态和创作者路线，先做账号与网络准备更省事。",
    tone: "berry",
    href: "/start",
    brands: ["gemini", "perplexity"],
  },
  {
    id: "music",
    title: "AI 音乐",
    note: "音乐工具往往更看地区可用性和续费节奏。",
    tone: "forest",
    href: "/resources",
    brands: ["suno", "gemini"],
  },
  {
    id: "search",
    title: "AI 搜索",
    note: "从问答转向检索时，重点是账户连通和响应速度。",
    tone: "graphite",
    href: "/category/ai-subscription",
    brands: ["chatgpt", "perplexity", "gemini", "claude"],
  },
  {
    id: "office",
    title: "AI 办公",
    note: "写作、整理和脑图类工具适合学生与自由职业者先上手。",
    tone: "sunrise",
    href: "/resources",
    brands: ["notion", "claude", "chatgpt"],
  },
  {
    id: "business",
    title: "AI 创业",
    note: "付费和收款路线要尽早想清楚，不然越往后越难改。",
    tone: "berry",
    href: "/products",
    brands: ["stripe", "lemonsqueezy", "paddle"],
  },
];

export const logbookPanels: LogbookPanel[] = [
  {
    id: "supply",
    title: "补给站",
    note: "支付、礼品卡、账号和区域切换都归到这里，不再散落在首页。",
    tone: "forest",
    href: "/category/payment",
  },
  {
    id: "discoveries",
    title: "新大陆",
    note: "免费额度、开放测试、新入口，适合用来追踪正在发生的新变化。",
    tone: "ocean",
    href: "/resources",
  },
  {
    id: "logbook",
    title: "航海日志",
    note: "把踩坑、复盘和一线体验留在日志层，而不是把攻略堆到脸上。",
    tone: "graphite",
    href: "/articles/build-ai-workflow-from-zero",
  },
];

function includesApple(devices: DeviceId[]) {
  return devices.includes("iphone") || devices.includes("mac");
}

function includesGoogle(devices: DeviceId[]) {
  return devices.includes("windows") || devices.includes("android");
}

export function buildVoyagePlan(devices: DeviceId[], status: StatusId): VoyageSegment[] {
  const selectedDevices: DeviceId[] = devices.length ? devices : ["windows"];
  const apple = includesApple(selectedDevices);
  const google = includesGoogle(selectedDevices);

  const identityTasks: VoyageTask[] =
    status === "account"
      ? [
          {
            id: "identity-archive",
            label: "现有账号归档",
            note: "先把邮箱、验证码与恢复方式整理清楚。",
            href: "/category/risk",
            tone: "graphite",
          },
        ]
      : [
          {
            id: "identity-gmail",
            label: "Gmail / 国外邮箱",
            note: "先把收信链路准备好，后面注册和验证会轻松很多。",
            href: "/category/risk",
            tone: "graphite",
          },
          {
            id: "identity-name",
            label: "账单姓名与常用资料",
            note: "保持支付资料与账号资料一致，能少很多风控麻烦。",
            href: "/category/payment",
            tone: "graphite",
          },
        ];

  const networkTasks: VoyageTask[] = [
    {
      id: "network-access",
      label: "网络准备",
      note: "先保证常用节点稳定，再去处理后面的注册和支付。",
      href: "/category/risk",
      tone: "ocean",
    },
    {
      id: "network-browser",
      label: "浏览器与 DNS",
      note: "把浏览器 profile、翻译和 DNS 基础一次整理好。",
      href: "/category/risk",
      tone: "ocean",
    },
  ];

  const accountTasks: VoyageTask[] = [
    ...(apple
      ? [
          {
            id: "account-apple",
            label: "Apple ID",
            note: "如果你会走 App Store 路线，这一步最好单独理顺。",
            href: "/category/apple-id",
            brand: "apple-id" as BrandId,
            tone: "forest" as BrandTone,
          },
        ]
      : []),
    ...(google
      ? [
          {
            id: "account-google",
            label: "Google Account",
            note: "Google 体系常常影响 Gemini、Flow 和视频类产品的入口。",
            href: "/start",
            brand: "gemini" as BrandId,
            tone: "berry" as BrandTone,
          },
        ]
      : []),
    ...(status === "account"
      ? [
          {
            id: "account-existing",
            label: "现有海外账号梳理",
            note: "核对订阅路径、邮箱归属和恢复方式是否还可控。",
            href: "/category/risk",
            tone: "graphite" as BrandTone,
          },
        ]
      : []),
  ];

  const paymentTasks: VoyageTask[] = [
    ...(apple
      ? [
          {
            id: "payment-giftcard",
            label: "Apple Gift Card",
            note: "适合 App Store 路线，但先确认渠道与地区规则。",
            href: "/articles/apple-gift-card-risks",
            brand: "apple-gift-card" as BrandId,
            tone: "forest" as BrandTone,
          },
        ]
      : []),
    {
      id: "payment-vcard",
      label: "虚拟卡 / 香港卡",
      note: "不同扣费路径对应不同支付工具，不要把它们看成完全平替。",
      href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
      tone: "sunrise",
    },
  ];

  const launchTasks: VoyageTask[] = [
    {
      id: "launch-chatgpt",
      label: "ChatGPT",
      note: "通用问答、写作和检索的第一入口。",
      href: "/articles/chatgpt-plus-subscription-options",
      brand: "chatgpt",
      tone: "forest",
    },
    {
      id: "launch-claude",
      label: "Claude",
      note: "长文整理和持续对话能力更稳。",
      href: "/articles/claude-pro-worth-it",
      brand: "claude",
      tone: "sunrise",
    },
    {
      id: "launch-gemini",
      label: "Gemini",
      note: "适合顺带打开 Google 系路线索。",
      href: "/resources",
      brand: "gemini",
      tone: "berry",
    },
    {
      id: "launch-perplexity",
      label: "Perplexity",
      note: "搜索导向更强，适合快速查证。",
      href: "/resources",
      brand: "perplexity",
      tone: "ocean",
    },
    ...((selectedDevices.includes("windows") || selectedDevices.includes("mac"))
      ? [
          {
            id: "launch-codex",
            label: "Codex / Cursor",
            note: "如果你要写代码，这一段才是开发工具的启航口。",
            href: "/articles/cursor-claude-code-codex-comparison",
            brand: "codex" as BrandId,
            tone: "ocean" as BrandTone,
          },
        ]
      : []),
  ];

  return [
    {
      id: "identity",
      title: "第一站：身份准备",
      note: "先把身份和收信链路准备好，后面所有验证都会顺得多。",
      tone: "graphite",
      tasks: identityTasks,
    },
    {
      id: "network",
      title: "第二站：网络准备",
      note: "网络和浏览器不是附属件，而是整条航线的地基。",
      tone: "ocean",
      tasks: networkTasks,
    },
    {
      id: "account",
      title: "第三站：账号准备",
      note: "根据设备不同，决定 Apple 体系还是 Google 体系优先。",
      tone: apple ? "forest" : "berry",
      tasks: accountTasks,
    },
    {
      id: "payment",
      title: "第四站：支付准备",
      note: "不要先买卡，再找用途。先有路径，再选支付。",
      tone: "sunrise",
      tasks: paymentTasks,
    },
    {
      id: "launch",
      title: "第五站：AI 工具启航",
      note: "真正该打开的工具并不多，先跑通高频工具再扩展。",
      tone: "berry",
      tasks: launchTasks,
    },
  ];
}
