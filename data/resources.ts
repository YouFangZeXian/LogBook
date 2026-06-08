import type { BrandId, BrandTone } from "@/lib/brand-library";

export type ResourceItem = {
  name: string;
  category: "tool" | "payment" | "tutorial";
  purpose: string;
  audience: string;
  risk: string;
  href: string;
  buttonLabel: string;
  affiliateLink?: string;
  brand?: BrandId;
  tone?: BrandTone;
};

export const resourceItems: ResourceItem[] = [
  {
    name: "ChatGPT Plus",
    category: "tool",
    purpose: "通用问答、写作、学习和轻量开发辅助的第一入口。",
    audience: "第一次开始付费用 AI 的学生和个人开发者。",
    risk: "订阅前先确认支付路线是否稳定，避免续费时中断。",
    href: "/articles/chatgpt-plus-subscription-options",
    buttonLabel: "看订阅建议",
    affiliateLink: "",
    brand: "chatgpt",
    tone: "forest",
  },
  {
    name: "Claude Pro",
    category: "tool",
    purpose: "长文本阅读、总结和持续对话的体验更稳。",
    audience: "重度写作、文档整理和产品思考用户。",
    risk: "不同地区可用性与支付方式差异较大，先做小范围验证。",
    href: "/articles/claude-pro-worth-it",
    buttonLabel: "看是否适合",
    affiliateLink: "",
    brand: "claude",
    tone: "sunrise",
  },
  {
    name: "Cursor Pro",
    category: "tool",
    purpose: "把代码补全、理解与重构接进 IDE 工作流。",
    audience: "学生项目、独立开发者和个人工具作者。",
    risk: "不要把所有开发任务都交给 AI，依然需要本地调试与代码审查。",
    href: "/articles/cursor-claude-code-codex-comparison",
    buttonLabel: "看工具对比",
    affiliateLink: "",
    brand: "cursor",
    tone: "graphite",
  },
  {
    name: "Apple Gift Card",
    category: "payment",
    purpose: "给美区 Apple ID 充值，适合 App Store 路线。",
    audience: "走 Apple 生态订阅路径的人。",
    risk: "礼品卡渠道质量差异很大，低价并不等于划算。",
    href: "/articles/apple-gift-card-risks",
    buttonLabel: "看风险提示",
    affiliateLink: "",
    brand: "apple-gift-card",
    tone: "forest",
  },
  {
    name: "香港银行卡 / 虚拟卡",
    category: "payment",
    purpose: "适合网页直订和长期稳定扣费的路线。",
    audience: "已经稳定使用海外服务，希望后续少折腾的人。",
    risk: "门槛和维护成本更高，不是所有学生都值得一开始就折腾。",
    href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
    buttonLabel: "看方案差异",
    affiliateLink: "",
    tone: "sunrise",
  },
  {
    name: "登船指南",
    category: "tutorial",
    purpose: "按设备和状态生成身份、网络、账号、支付与启航顺序。",
    audience: "完全从 0 开始，或者路线一直混乱的读者。",
    risk: "不要一次性把所有账号与支付都注册齐，先把主线跑通。",
    href: "/start",
    buttonLabel: "从这里开始",
    affiliateLink: "",
    tone: "ocean",
  },
];
