export type ResourceItem = {
  name: string;
  category: "tool" | "payment" | "tutorial";
  purpose: string;
  audience: string;
  risk: string;
  href: string;
  buttonLabel: string;
  affiliateLink?: string;
};

export const resourceItems: ResourceItem[] = [
  {
    name: "ChatGPT Plus",
    category: "tool",
    purpose: "通用问答、写作、学习、轻量开发辅助。",
    audience: "第一次开始付费用 AI 的学生和自由职业者。",
    risk: "订阅前先确认支付路径是否稳定，避免续费中断。",
    href: "/articles/chatgpt-plus-subscription-options",
    buttonLabel: "看订阅建议",
    affiliateLink: "",
  },
  {
    name: "Claude Pro",
    category: "tool",
    purpose: "长文本阅读、总结、写作和更稳的对话体验。",
    audience: "重度写作、文档梳理和产品思考用户。",
    risk: "不同地区可用性和支付方式差异较大，先做小范围验证。",
    href: "/articles/claude-pro-worth-it",
    buttonLabel: "看适合谁",
    affiliateLink: "",
  },
  {
    name: "Cursor Pro",
    category: "tool",
    purpose: "把代码补全、理解和重构整合进 IDE 工作流。",
    audience: "个人开发者、学生项目和独立开发者。",
    risk: "不要把所有开发任务都交给 AI，仍然需要本地调试和代码审查。",
    href: "/articles/cursor-claude-code-codex-comparison",
    buttonLabel: "看工具对比",
    affiliateLink: "",
  },
  {
    name: "Apple Gift Card",
    category: "payment",
    purpose: "给美区 Apple ID 充值，适合 App Store 路径。",
    audience: "走 Apple 生态订阅路线的人。",
    risk: "礼品卡渠道质量差异很大，低价并不等于划算。",
    href: "/articles/apple-gift-card-risks",
    buttonLabel: "看风险提示",
    affiliateLink: "",
  },
  {
    name: "香港多币种银行卡",
    category: "payment",
    purpose: "适合长期稳定扣费，减少礼品卡来回折腾。",
    audience: "已经稳定使用海外服务、追求长期省心的人。",
    risk: "开卡、维护成本和门槛更高，不是所有学生都值得折腾。",
    href: "/articles/virtual-card-vs-hk-card-vs-gift-card",
    buttonLabel: "看方案差异",
    affiliateLink: "",
  },
  {
    name: "登船指南",
    category: "tutorial",
    purpose: "按步骤理解工具、账号、支付和风险问题。",
    audience: "完全从 0 开始的读者。",
    risk: "不要一次性把所有账号和支付都注册齐，先从明确需求开始。",
    href: "/start",
    buttonLabel: "从这里开始",
    affiliateLink: "",
  },
];
