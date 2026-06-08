import type { BrandId, BrandTone } from "@/lib/brand-library";

export type DeviceId = "windows" | "mac" | "iphone" | "android";
export type AndroidBrandId =
  | "xiaomi"
  | "huawei"
  | "oppo-vivo"
  | "samsung"
  | "pixel"
  | "other";
export type StatusId =
  | "new"
  | "network"
  | "account-payment"
  | "using-tools"
  | "explore";

export type DeviceOption = {
  id: DeviceId;
  label: string;
  helper: string;
  tone: BrandTone;
};

export type AndroidBrandOption = {
  id: AndroidBrandId;
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
  faq: string;
  risk: string;
};

export type VoyageSegment = {
  id: string;
  title: string;
  note: string;
  tone: BrandTone;
  tasks: VoyageTask[];
};

export type RouteRecommendation = {
  id: string;
  name: string;
  device: DeviceId | "mixed";
  deviceLabel: string;
  status: StatusId;
  difficulty: "入门" | "进阶" | "探索";
  estimatedTime: string;
  tone: BrandTone;
  summary: string;
  segments: VoyageSegment[];
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
    helper: "更偏网页与 Google 体系，设备品牌会影响路径。",
    tone: "sunrise",
  },
];

export const androidBrandOptions: AndroidBrandOption[] = [
  {
    id: "xiaomi",
    label: "小米 / Redmi",
    helper: "适合先检查 Google 服务与浏览器路线。",
    tone: "sunrise",
  },
  {
    id: "huawei",
    label: "华为 / 荣耀",
    helper: "需要更谨慎地判断 Google 服务和替代方案。",
    tone: "berry",
  },
  {
    id: "oppo-vivo",
    label: "OPPO / vivo / iQOO",
    helper: "先确认系统限制，再决定 Play Store 或网页路线。",
    tone: "forest",
  },
  {
    id: "samsung",
    label: "三星",
    helper: "通常更接近标准 Android 路线。",
    tone: "graphite",
  },
  {
    id: "pixel",
    label: "Pixel",
    helper: "Google 体系最完整，适合优先跑通账号与工具。",
    tone: "ocean",
  },
  {
    id: "other",
    label: "其他 Android",
    helper: "先从浏览器、账号和网络稳定性判断起。",
    tone: "graphite",
  },
];

export const statusOptions: StatusOption[] = [
  {
    id: "new",
    label: "我从未出海",
    helper: "身份、网络到支付都需要完整走一次。",
  },
  {
    id: "network",
    label: "能访问外网，但账号还没准备好",
    helper: "从邮箱、Google / Apple 账号和恢复方式开始补。",
  },
  {
    id: "account-payment",
    label: "已有海外账号，但支付不顺畅",
    helper: "重点检查 App Store、礼品卡、虚拟卡和网页直订。",
  },
  {
    id: "using-tools",
    label: "已能使用部分 AI 工具",
    helper: "整理续费、备份和高频工具组合。",
  },
  {
    id: "explore",
    label: "已经出海，想自由探索",
    helper: "直接进入船坞、新大陆和支线玩法。",
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
    note: "Google 生态和创作者路线，先做账号与网络准备更省事。",
    tone: "berry",
    href: "/discoveries",
    brands: ["gemini", "perplexity"],
  },
  {
    id: "music",
    title: "AI 音乐",
    note: "音乐工具更看地区可用性和续费节奏。",
    tone: "forest",
    href: "/discoveries",
    brands: ["suno", "gemini"],
  },
  {
    id: "search",
    title: "AI 搜索",
    note: "从问答转向检索时，重点是账号连通和响应速度。",
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
    note: "付费和收款路线要尽早想清楚，不然后面越改越麻烦。",
    tone: "berry",
    href: "/products",
    brands: ["stripe", "lemonsqueezy", "paddle"],
  },
];

export const logbookPanels: LogbookPanel[] = [
  {
    id: "supply",
    title: "补给站",
    note: "支付、礼品卡、账号和区域切换都归到这里。",
    tone: "forest",
    href: "/category/payment",
  },
  {
    id: "discoveries",
    title: "新大陆",
    note: "免费额度、开放测试、新入口，用来追正在发生的新变化。",
    tone: "ocean",
    href: "/discoveries",
  },
  {
    id: "logbook",
    title: "航海日志",
    note: "把踩坑、复盘和一线体验留在日志层。",
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

function task(
  id: string,
  label: string,
  note: string,
  href: string,
  tone: BrandTone,
  faq: string,
  risk: string,
  brand?: BrandId,
): VoyageTask {
  return { id, label, note, href, brand, tone, faq, risk };
}

export function buildVoyagePlan(
  devices: DeviceId[],
  status: StatusId,
  androidBrand?: AndroidBrandId,
): VoyageSegment[] {
  const selectedDevices: DeviceId[] = devices.length ? devices : ["windows"];
  const apple = includesApple(selectedDevices);
  const google = includesGoogle(selectedDevices);
  const android = selectedDevices.includes("android");
  const androidBrandLabel = androidBrandOptions.find((item) => item.id === androidBrand)?.label;

  const identityTasks: VoyageTask[] =
    status === "using-tools" || status === "explore"
      ? [
          task(
            "identity-archive",
            "现有账号归档",
            "把邮箱、验证方式、恢复邮箱和常用登录设备整理清楚。",
            "/category/risk",
            "graphite",
            "为什么已经能用工具还要整理账号？",
            "账号恢复方式混乱时，后续支付失败或风控会更难排查。",
          ),
        ]
      : [
          task(
            "identity-mail",
            "Gmail / Outlook 邮箱",
            "先把收信链路准备好，后面注册和验证会轻松很多。",
            "/category/risk",
            "graphite",
            "一定要 Gmail 吗？",
            "不要把所有工具都绑在一个无法恢复的临时邮箱上。",
          ),
          task(
            "identity-profile",
            "账单姓名与常用资料",
            "保持支付资料与账号资料一致，能少很多风控麻烦。",
            "/category/payment",
            "sunrise",
            "资料需要和证件完全一致吗？",
            "不要使用无法解释来源或明显不一致的资料。",
          ),
        ];

  const networkTasks: VoyageTask[] = [
    task(
      "network-access",
      "网络环境准备",
      "先保证常用节点稳定，再去处理后面的注册和支付。",
      "/category/risk",
      "ocean",
      "网络不稳定会影响订阅吗？",
      "频繁切换地区、设备和登录环境会提高验证频率。",
    ),
    task(
      "network-browser",
      "浏览器与 DNS",
      "把浏览器 profile、翻译和 DNS 基础一次整理好。",
      "/category/risk",
      "ocean",
      "需要单独浏览器配置吗？",
      "同一浏览器里混用太多账号容易让排查变复杂。",
    ),
  ];

  const accountTasks: VoyageTask[] = [
    ...(apple
      ? [
          task(
            "account-apple",
            "Apple ID",
            "如果你会走 App Store 路线，这一步最好单独理顺。",
            "/category/apple-id",
            "forest",
            "要不要直接买成品 Apple ID？",
            "不建议购买成品号，恢复权和长期可用性都不可控。",
            "apple-id",
          ),
        ]
      : []),
    ...(google
      ? [
          task(
            "account-google",
            "Google Account",
            android && androidBrandLabel
              ? `${androidBrandLabel} 路线先确认 Google 服务，再处理账号登录。`
              : "Google 体系会影响 Gemini、Flow 和视频类产品入口。",
            "/start",
            "berry",
            "国内设备怎么判断 Google 体系是否可用？",
            "不要在账号刚注册后立刻高频切换地区和支付方式。",
            "gemini",
          ),
        ]
      : []),
  ];

  const paymentTasks: VoyageTask[] = [
    ...(apple
      ? [
          task(
            "payment-giftcard",
            "Apple Gift Card",
            "适合 App Store 路线，但先确认渠道与地区规则。",
            "/articles/apple-gift-card-risks",
            "forest",
            "礼品卡折扣越低越好吗？",
            "低价不等于划算，渠道异常时可能出现余额或账号风险。",
            "apple-gift-card",
          ),
        ]
      : []),
    task(
      "payment-card",
      "虚拟卡 / 香港卡",
      "不同扣费路径对应不同支付工具，不要把它们看成完全平替。",
      "/articles/virtual-card-vs-hk-card-vs-gift-card",
      "sunrise",
      "学生一开始需要办卡吗？",
      "先验证自己真实会长期使用的工具，再决定是否投入更高成本。",
    ),
  ];

  const launchTasks: VoyageTask[] = [
    task(
      "launch-chatgpt",
      "ChatGPT",
      "通用问答、写作和检索的第一入口。",
      "/articles/chatgpt-plus-subscription-options",
      "forest",
      "ChatGPT Plus 应该第一时间订阅吗？",
      "先确认使用频率和支付路径，再做长期订阅。",
      "chatgpt",
    ),
    task(
      "launch-claude",
      "Claude",
      "长文整理和持续对话能力更稳。",
      "/articles/claude-pro-worth-it",
      "sunrise",
      "Claude 和 ChatGPT 要不要同时订？",
      "不要为了新鲜感同时开太多订阅，先保留一个主力工具。",
      "claude",
    ),
    ...(selectedDevices.includes("windows") || selectedDevices.includes("mac")
      ? [
          task(
            "launch-codex",
            "Codex / Cursor",
            "如果你要写代码，这一段才是开发工具的启航口。",
            "/articles/cursor-claude-code-codex-comparison",
            "ocean",
            "Codex、Claude Code、Cursor 怎么选？",
            "AI 开发工具不能替代本地测试和代码审查。",
            "codex",
          ),
        ]
      : []),
    ...(status === "explore"
      ? [
          task(
            "launch-suno",
            "Suno / AI 音乐",
            "自由探索阶段可以从音乐、视频和创作工具打开支线。",
            "/discoveries",
            "forest",
            "AI 音乐适合放在主线里吗？",
            "创作类工具的地区和版权规则变化更快，需要单独判断。",
            "suno",
          ),
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
      note: "网络和浏览器不是附件，而是整条航线的地基。",
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

function routeForDevice(device: DeviceId, status: StatusId, androidBrand?: AndroidBrandId): RouteRecommendation {
  const option = deviceOptions.find((item) => item.id === device) ?? deviceOptions[0];
  const segments = buildVoyagePlan([device], status, androidBrand);
  const stepCount = segments.reduce((sum, segment) => sum + segment.tasks.length, 0);

  const copy: Record<DeviceId, Pick<RouteRecommendation, "name" | "difficulty" | "estimatedTime" | "summary">> = {
    windows: {
      name: "Windows 出海基础航线",
      difficulty: status === "new" ? "入门" : "进阶",
      estimatedTime: `${Math.max(3, stepCount)}0-90 分钟`,
      summary: "从浏览器、网络、Google 账号到 AI 开发工具，适合先跑通主力电脑。",
    },
    mac: {
      name: "Mac 出海基础航线",
      difficulty: "入门",
      estimatedTime: `${Math.max(3, stepCount)}0-80 分钟`,
      summary: "同时检查 Apple 生态和网页直订，让桌面工作流先稳定下来。",
    },
    iphone: {
      name: "iPhone / iPad 出海基础航线",
      difficulty: "入门",
      estimatedTime: `${Math.max(3, stepCount)}0-70 分钟`,
      summary: "重点处理 Apple ID、App Store、礼品卡和移动端工具下载。",
    },
    android: {
      name: "Android 出海基础航线",
      difficulty: androidBrand === "huawei" ? "进阶" : "入门",
      estimatedTime: `${Math.max(3, stepCount)}0-90 分钟`,
      summary: "先判断 Google 服务与设备限制，再选择网页、Play Store 或替代路线。",
    },
  };

  return {
    id: `${device}-${status}`,
    device,
    deviceLabel: option.label,
    status,
    tone: option.tone,
    segments,
    ...copy[device],
  };
}

export function buildRouteRecommendations(
  devices: DeviceId[],
  status: StatusId,
  androidBrand?: AndroidBrandId,
): RouteRecommendation[] {
  const selectedDevices: DeviceId[] = devices.length ? devices : ["windows"];
  const routes = selectedDevices.map((device) => routeForDevice(device, status, androidBrand));

  if (selectedDevices.length > 1) {
    routes.unshift({
      id: `mixed-${status}`,
      name: "多设备登船总航线",
      device: "mixed",
      deviceLabel: selectedDevices
        .map((device) => deviceOptions.find((item) => item.id === device)?.label ?? device)
        .join(" + "),
      status,
      difficulty: "进阶",
      estimatedTime: "90-150 分钟",
      tone: "ocean",
      summary: "先完成一台主力设备，再把账号、支付和工具经验迁移到第二台设备。",
      segments: buildVoyagePlan(selectedDevices, status, androidBrand),
    });
  }

  return routes;
}
