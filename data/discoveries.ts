import type { BrandId, BrandTone } from "@/lib/brand-library";

export type DiscoveryItem = {
  title: string;
  kind: string;
  note: string;
  href: string;
  brand: BrandId;
  tone: BrandTone;
  timeLabel?: string;
};

export const discoveryItems: DiscoveryItem[] = [
  {
    title: "Codex 项目实战路线",
    kind: "AI 开发",
    note: "适合已经能访问基础 AI 工具，想把想法快速做成网站或小工具的人。",
    href: "/articles/cursor-claude-code-codex-comparison",
    brand: "codex",
    tone: "ocean",
    timeLabel: "近期更新",
  },
  {
    title: "Suno 音乐支线",
    kind: "AI 音乐",
    note: "适合先试创作，不急着订阅，重点关注地区可用性和版权边界。",
    href: "/resources",
    brand: "suno",
    tone: "forest",
    timeLabel: "近期更新",
  },
  {
    title: "Gemini / Google 生态入口",
    kind: "AI 视频与搜索",
    note: "适合已经准备好 Google 账号，想继续探索 Flow、Veo 和 Gemini 的用户。",
    href: "/start",
    brand: "gemini",
    tone: "berry",
    timeLabel: "近期更新",
  },
  {
    title: "Perplexity 资料检索",
    kind: "AI 搜索",
    note: "适合做资料整理、选题研究和快速查证，不建议当成唯一主力模型。",
    href: "/resources",
    brand: "perplexity",
    tone: "ocean",
    timeLabel: "近期更新",
  },
  {
    title: "Claude Code 编程伴侣",
    kind: "AI 开发",
    note: "终端里的 AI 编程助手，适合已经熟悉命令行的开发者。",
    href: "/articles/cursor-claude-code-codex-comparison",
    brand: "claude",
    tone: "berry",
    timeLabel: "上周",
  },
  {
    title: "美区 Apple ID 自助注册",
    kind: "新渠道",
    note: "无需代购、无需成品号，自己注册美区 Apple ID 的最新路径。",
    href: "/articles/us-apple-id-guide",
    brand: "apple-id",
    tone: "forest",
    timeLabel: "上周",
  },
  {
    title: "虚拟卡 vs 香港卡对比",
    kind: "支付",
    note: "2026 年最新虚拟卡和香港银行卡的适用场景与费用对比。",
    href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
    brand: "stripe",
    tone: "ocean",
    timeLabel: "本月",
  },
  {
    title: "学生党 AI 工具最低成本方案",
    kind: "省钱方案",
    note: "预算有限的学生怎么组合 AI 工具，月费控制在 50 元以内。",
    href: "/articles/student-budget-ai-stack",
    brand: "replit",
    tone: "berry",
    timeLabel: "本月",
  },
  {
    title: "Cursor + Claude Code 双修工作流",
    kind: "新玩法",
    note: "IDE 和终端各司其职，最大化 AI 编程效率的实操路线。",
    href: "/articles/cursor-claude-code-codex-comparison",
    brand: "cursor",
    tone: "forest",
    timeLabel: "本月",
  },
  {
    title: "ChatGPT Plus 订阅方案 2026",
    kind: "订阅指南",
    note: "最新订阅路径、价格变化和避坑要点汇总。",
    href: "/articles/chatgpt-plus-subscription-options",
    brand: "chatgpt",
    tone: "ocean",
    timeLabel: "本月",
  },
];
