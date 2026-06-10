"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  GlobeHemisphereWest,
  Globe,
  MusicNotes,
  VideoCamera,
  PaintBrush,
  Briefcase,
  Robot,
  CurrencyDollar,
  Code,
  Storefront,
  Calculator,
} from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import type { BrandId } from "@/lib/brand-library";

/* ── Tool data types ── */

type ToolCard = {
  name: string;
  oneLiner: string;
  suitableFor: string;
  accessCondition: string;
  freeTier: string;
  needsForeignAccount: boolean;
  needsPayment: boolean;
  category: ToolCategory;
  brand: BrandId;
  href: string;
};

type ToolCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const toolCategories: ToolCategory[] = [
  { id: "ai-dev", label: "AI 开发", icon: <Code size={16} weight="duotone" /> },
  { id: "ai-search", label: "AI 搜索", icon: <Globe size={16} weight="duotone" /> },
  { id: "ai-music", label: "AI 音乐", icon: <MusicNotes size={16} weight="duotone" /> },
  { id: "ai-video", label: "AI 视频", icon: <VideoCamera size={16} weight="duotone" /> },
  { id: "ai-design", label: "AI 设计", icon: <PaintBrush size={16} weight="duotone" /> },
  { id: "ai-office", label: "AI 办公", icon: <Briefcase size={16} weight="duotone" /> },
  { id: "ai-automation", label: "AI 自动化", icon: <Robot size={16} weight="duotone" /> },
  { id: "ai-monetize", label: "AI 变现", icon: <CurrencyDollar size={16} weight="duotone" /> },
  { id: "indie-dev", label: "独立开发", icon: <Storefront size={16} weight="duotone" /> },
  { id: "overseas", label: "海外服务", icon: <GlobeHemisphereWest size={16} weight="duotone" /> },
];

const toolCards: ToolCard[] = [
  {
    name: "ChatGPT",
    oneLiner: "最通用的 AI 对话助手，写作、编程、学习都能用。",
    suitableFor: "所有出海用户",
    accessCondition: "需要外区账号或 Plus 订阅",
    freeTier: "GPT-4o mini 免费",
    needsForeignAccount: true,
    needsPayment: false,
    category: { id: "ai-search", label: "AI 搜索", icon: <Globe size={16} /> },
    brand: "chatgpt",
    href: "/articles/chatgpt-plus-subscription-options",
  },
  {
    name: "Claude",
    oneLiner: "长文本分析与编程能力突出，适合深度工作。",
    suitableFor: "开发者、研究者、写作者",
    accessCondition: "需要海外账号",
    freeTier: "Sonnet 免费额度有限",
    needsForeignAccount: true,
    needsPayment: false,
    category: { id: "ai-dev", label: "AI 开发", icon: <Code size={16} /> },
    brand: "claude",
    href: "/articles/claude-pro-worth-it",
  },
  {
    name: "Claude Code",
    oneLiner: "终端里的 AI 编程代理，直接操作文件和命令行。",
    suitableFor: "有命令行经验的开发者",
    accessCondition: "需要 Claude API 或订阅",
    freeTier: "无免费额度",
    needsForeignAccount: true,
    needsPayment: true,
    category: { id: "ai-dev", label: "AI 开发", icon: <Code size={16} /> },
    brand: "claude",
    href: "/articles/cursor-claude-code-codex-comparison",
  },
  {
    name: "Cursor",
    oneLiner: "AI 原生代码编辑器，最适合 Vibe Coding。",
    suitableFor: "所有开发者，尤其适合快速原型",
    accessCondition: "可直接下载，Pro 需付费",
    freeTier: "免费版有额度限制",
    needsForeignAccount: false,
    needsPayment: false,
    category: { id: "ai-dev", label: "AI 开发", icon: <Code size={16} /> },
    brand: "cursor",
    href: "/articles/cursor-claude-code-codex-comparison",
  },
  {
    name: "Codex",
    oneLiner: "OpenAI 的编程代理，可自动化复杂开发任务。",
    suitableFor: "有编程基础的用户",
    accessCondition: "需要 ChatGPT Plus/Pro",
    freeTier: "无免费额度",
    needsForeignAccount: true,
    needsPayment: true,
    category: { id: "ai-dev", label: "AI 开发", icon: <Code size={16} /> },
    brand: "chatgpt",
    href: "/articles/cursor-claude-code-codex-comparison",
  },
  {
    name: "Perplexity",
    oneLiner: "带引用的 AI 搜索，做资料整理和选题研究很顺手。",
    suitableFor: "研究者、内容创作者",
    accessCondition: "可直接访问，Pro 需付费",
    freeTier: "每日免费搜索额度",
    needsForeignAccount: false,
    needsPayment: false,
    category: { id: "ai-search", label: "AI 搜索", icon: <Globe size={16} /> },
    brand: "perplexity",
    href: "/resources",
  },
  {
    name: "Gemini",
    oneLiner: "Google 全家桶原生集成的 AI，适合生态用户。",
    suitableFor: "已备好 Google 账号的用户",
    accessCondition: "需要 Google 账号",
    freeTier: "Gemini 2.0 Flash 免费",
    needsForeignAccount: true,
    needsPayment: false,
    category: { id: "ai-search", label: "AI 搜索", icon: <Globe size={16} /> },
    brand: "gemini",
    href: "/start",
  },
  {
    name: "Suno",
    oneLiner: "文字生成音乐，支持多种风格和语言。",
    suitableFor: "音乐爱好者、内容创作者",
    accessCondition: "部分地区需 VPN",
    freeTier: "每日免费生成额度",
    needsForeignAccount: false,
    needsPayment: false,
    category: { id: "ai-music", label: "AI 音乐", icon: <MusicNotes size={16} /> },
    brand: "suno",
    href: "/resources",
  },
  {
    name: "Midjourney",
    oneLiner: "最出片的 AI 图像生成工具，设计感强。",
    suitableFor: "设计师、创意工作者",
    accessCondition: "需要 Discord + 付费订阅",
    freeTier: "无免费额度",
    needsForeignAccount: true,
    needsPayment: true,
    category: { id: "ai-design", label: "AI 设计", icon: <PaintBrush size={16} /> },
    brand: "suno",
    href: "/resources",
  },
  {
    name: "Notion AI",
    oneLiner: "笔记 + AI 写作 + 知识库，办公场景覆盖广。",
    suitableFor: "学生、上班族、自由职业者",
    accessCondition: "Notion 账号 + AI 附加订阅",
    freeTier: "Notion 基础版免费，AI 需付费",
    needsForeignAccount: false,
    needsPayment: true,
    category: { id: "ai-office", label: "AI 办公", icon: <Briefcase size={16} /> },
    brand: "notion",
    href: "/resources",
  },
  {
    name: "Make (Integromat)",
    oneLiner: "可视化 AI 工作流自动化，连接各种服务。",
    suitableFor: "想减少重复劳动的人",
    accessCondition: "注册即可使用",
    freeTier: "每月 1000 次免费操作",
    needsForeignAccount: false,
    needsPayment: false,
    category: { id: "ai-automation", label: "AI 自动化", icon: <Robot size={16} /> },
    brand: "stripe",
    href: "/resources",
  },
  {
    name: "Vercel",
    oneLiner: "前端部署 + AI 应用托管，独立开发者首选。",
    suitableFor: "独立开发者、Vibe Coder",
    accessCondition: "注册即可使用",
    freeTier: "Hobby 计划免费",
    needsForeignAccount: false,
    needsPayment: false,
    category: { id: "indie-dev", label: "独立开发", icon: <Storefront size={16} /> },
    brand: "replit",
    href: "/resources",
  },
];

/* ── Component ── */

export function ToolsPageContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? toolCards.filter((t) => t.category.id === activeCategory)
    : toolCards;

  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      {/* ── Hero ── */}
      <section className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">船坞</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            探索 AI 时代的工具，
            <br />
            按玩法，不按品牌。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            真正的问题不是"有哪些工具"，而是"我现在适合用哪个"。按你的场景找到对应的工具，再去看对应的航路和补给方案。
          </p>
        </div>
        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">使用方式</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>先选你感兴趣的玩法分类，再根据"适合谁"和"访问条件"判断是否适合你现在的情况。</p>
            <p>如果你还没准备好账号和支付，先去补给站把基础打牢，再回来看工具。</p>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !activeCategory
                ? "bg-brand text-white shadow-[0_1px_3px_rgba(15,61,94,0.15)]"
                : "border border-border bg-white text-muted hover:border-border-medium hover:text-foreground"
            }`}
          >
            全部工具
          </button>
          {toolCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-brand text-white shadow-[0_1px_3px_rgba(15,61,94,0.15)]"
                  : "border border-border bg-white text-muted hover:border-border-medium hover:text-foreground"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tool Cards Grid ── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 stagger">
        {filtered.map((tool) => {
          const category = toolCategories.find((c) => c.id === tool.category.id);
          return (
            <Link
              key={tool.name + tool.category.id}
              href={tool.href}
              className="surface group flex flex-col p-5 transition-all hover:border-brand/20 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <BrandMark brand={tool.brand} size="sm" showLabel />
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted">
                  {category?.icon}
                  {tool.category.label}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-brand transition-colors">
                {tool.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{tool.oneLiner}</p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-faint">适合谁</span>
                  <span className="text-xs font-medium text-foreground">
                    {tool.suitableFor}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-faint">免费额度</span>
                  <span className="text-xs font-medium text-success">
                    {tool.freeTier}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-faint">访问条件</span>
                  <span className="text-xs text-muted">{tool.accessCondition}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                {tool.needsForeignAccount ? (
                  <span className="tag tag-warning text-[10px]">需外区账号</span>
                ) : (
                  <span className="tag tag-success text-[10px]">无需外区账号</span>
                )}
                {tool.needsPayment ? (
                  <span className="tag tag-warning text-[10px]">需付费</span>
                ) : (
                  <span className="tag tag-success text-[10px]">可免费</span>
                )}
              </div>

              <div className="mt-auto pt-5">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-sea group-hover:text-brand transition-colors">
                  查看相关航路 <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── Calculator Quick Entry ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calculator size={18} weight="duotone" className="text-brand-sea" />
          <h2 className="heading-section text-xl">计算工具</h2>
        </div>
        <p className="body-sm max-w-xl">
          船坞主区是工具发现，计算器作为附属工具，帮你算清楚成本再决定订阅。
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/resources"
            className="surface-muted group flex items-center gap-4 p-5 transition-all hover:border-brand/20"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mist text-brand">
              <Calculator size={18} weight="duotone" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                订阅成本计算器
              </h3>
              <p className="mt-1 text-xs text-muted">对比各 AI 工具月度/年度支出</p>
            </div>
          </Link>
          <Link
            href="/resources"
            className="surface-muted group flex items-center gap-4 p-5 transition-all hover:border-brand/20"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
              <CurrencyDollar size={18} weight="duotone" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                Gift Card 折扣计算器
              </h3>
              <p className="mt-1 text-xs text-muted">算清礼品卡实际折扣与汇率差</p>
            </div>
          </Link>
          <Link
            href="/resources"
            className="surface-muted group flex items-center gap-4 p-5 transition-all hover:border-brand/20"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand-soft text-brand-sea">
              <ArrowUpRight size={18} weight="duotone" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                方案对比表
              </h3>
              <p className="mt-1 text-xs text-muted">横向对比主流 AI 工具订阅方案</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
