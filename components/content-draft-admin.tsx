"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  ClipboardText,
  DownloadSimple,
  FileText,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";

import { listReviewSubmissions, updateSubmissionReview } from "@/lib/cloud-data";
import { categories, type CategorySlug } from "@/lib/site";

type ReviewSubmission = {
  id: string;
  type: string;
  content: string;
  contact?: string | null;
  article_title?: string | null;
  article_slug?: string | null;
  status: "pending" | "accepted" | "rejected" | "published";
  reviewer_note?: string | null;
  created_at: string;
  profiles?: { email?: string | null; name?: string | null } | null;
};

type DraftState = {
  title: string;
  slug: string;
  category: CategorySlug;
  description: string;
  tags: string;
};

function fallbackTitle(content: string) {
  const firstLine = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);
  return firstLine ? firstLine.slice(0, 38) : "新的航海日志草稿";
}

function makeSlug(seed: string, id: string) {
  const ascii = seed
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 64);

  if (ascii.length >= 8) return ascii;

  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `community-submission-${date}-${id.slice(0, 8)}`;
}

function guessCategory(type: string, content: string): CategorySlug {
  const text = `${type} ${content}`.toLowerCase();
  if (/apple|gift card|礼品卡|apple id/.test(text)) return "apple-id";
  if (/支付|虚拟卡|银行卡|card|paypal/.test(text)) return "payment";
  if (/cursor|codex|claude code|开发|代码/.test(text)) return "dev-tools";
  if (/学生|省钱|低成本|教育/.test(text)) return "student";
  if (/风险|失败|避坑|风控/.test(text)) return "risk";
  return "ai-subscription";
}

function buildDescription(content: string) {
  return content.replace(/\s+/g, " ").trim().slice(0, 110) || "来自路格舶投稿箱的内容草稿。";
}

function initialDraft(item: ReviewSubmission): DraftState {
  const title = item.article_title || fallbackTitle(item.content);
  return {
    title,
    slug: item.article_slug || makeSlug(title, item.id),
    category: guessCategory(item.type, item.content),
    description: buildDescription(item.content),
    tags: [item.type, "投稿整理"].filter(Boolean).join(", "),
  };
}

function buildMdx(item: ReviewSubmission, draft: DraftState) {
  const today = new Date().toISOString().slice(0, 10);
  const tags = draft.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const tagBlock = tags.map((tag) => `  - ${tag}`).join("\n") || "  - 投稿整理";
  const contributor = item.profiles?.name || item.profiles?.email || "匿名船员";

  return `---\ntitle: ${draft.title}\ndescription: ${draft.description}\npublishedAt: ${today}\nupdatedAt: ${today}\ncategory: ${draft.category}\ntags:\n${tagBlock}\nfeatured: false\n---\n\n> 本文由路格舶投稿箱整理而来，原始投稿来自：${contributor}。\n\n## 背景\n\n${draft.description}\n\n## 投稿原文整理\n\n${item.content.trim()}\n\n## 站内补充\n\n这里补充编辑判断、风险提示、适用人群和下一步操作建议。\n\n## 风险提示\n\n本文仅为经验整理，不提供盗版、破解、欺诈、违规账号买卖服务。所有支付、订阅和礼品卡相关内容都应以合法购买、风险识别和个人判断为前提。\n`;
}

export function ContentDraftAdmin() {
  const [items, setItems] = useState<ReviewSubmission[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = (await listReviewSubmissions()) as ReviewSubmission[];
        const usable = data.filter((item) => ["accepted", "published"].includes(item.status));
        setItems(usable);
        if (usable[0]) {
          setSelectedId(usable[0].id);
          setDraft(initialDraft(usable[0]));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "无法读取内容素材。");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const selected = items.find((item) => item.id === selectedId) ?? null;
  const mdx = selected && draft ? buildMdx(selected, draft) : "";

  const stats = useMemo(() => {
    const accepted = items.filter((item) => item.status === "accepted").length;
    const publishedCount = items.filter((item) => item.status === "published").length;
    return { accepted, publishedCount };
  }, [items]);

  const selectItem = (item: ReviewSubmission) => {
    setSelectedId(item.id);
    setDraft(initialDraft(item));
    setCopied(false);
    setPublished(false);
  };

  const copyMdx = async () => {
    if (!mdx) return;
    await navigator.clipboard.writeText(mdx);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadMdx = () => {
    if (!mdx || !draft) return;
    const blob = new Blob([mdx], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${draft.slug}.mdx`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const markPublished = async () => {
    if (!selected) return;
    await updateSubmissionReview({
      id: selected.id,
      status: "published",
      reviewerNote: selected.reviewer_note ?? "已生成 MDX 草稿，等待合入内容库。",
    });
    setPublished(true);
  };

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      <section className="surface-panel p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">内容工作台</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              从投稿生成 MDX 草稿
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              先把已采纳投稿整理成可发布草稿，再放入 `content/articles/`。这是轻量 CMS 的第一步。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:w-72">
            <div className="surface-muted p-3">
              <p className="text-xs text-muted">已采纳素材</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{stats.accepted}</p>
            </div>
            <div className="surface-muted p-3">
              <p className="text-xs text-muted">已标记发布</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{stats.publishedCount}</p>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-[8px] border border-danger/20 bg-danger-soft p-4 text-sm leading-6 text-danger">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="surface-muted p-8 text-sm text-muted">正在读取已采纳素材...</div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="surface p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-foreground">素材列表</h2>
            <span className="tag">{items.length} 条</span>
          </div>
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectItem(item)}
                className={`w-full rounded-[8px] border p-3 text-left transition-colors ${
                  item.id === selectedId
                    ? "border-brand/30 bg-brand-mist-soft"
                    : "border-border bg-white hover:border-border-medium"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="tag text-[10px]">{item.status}</span>
                  <span className="text-[10px] text-muted">{item.type}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-foreground">
                  {item.content}
                </p>
              </button>
            ))}
            {!loading && !items.length ? (
              <div className="rounded-[8px] border border-border bg-background-secondary p-5 text-sm leading-6 text-muted">
                还没有已采纳投稿。先去 `/admin/submissions` 把合适的投稿标记为“已采纳”。
              </div>
            ) : null}
          </div>
        </aside>

        <div className="space-y-6">
          {selected && draft ? (
            <>
              <section className="surface p-5">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-brand-sea" />
                  <h2 className="text-lg font-semibold text-foreground">草稿信息</h2>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">标题</span>
                    <input
                      value={draft.title}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, title: event.target.value } : current,
                        )
                      }
                      className="input-field"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">英文 slug</span>
                    <input
                      value={draft.slug}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, slug: event.target.value } : current,
                        )
                      }
                      className="input-field"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">分类</span>
                    <select
                      value={draft.category}
                      onChange={(event) =>
                        setDraft((current) =>
                          current
                            ? { ...current, category: event.target.value as CategorySlug }
                            : current,
                        )
                      }
                      className="input-field"
                    >
                      {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">标签，逗号分隔</span>
                    <input
                      value={draft.tags}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, tags: event.target.value } : current,
                        )
                      }
                      className="input-field"
                    />
                  </label>
                  <label className="space-y-2 text-sm md:col-span-2">
                    <span className="font-medium text-foreground">SEO 描述</span>
                    <textarea
                      value={draft.description}
                      rows={3}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, description: event.target.value } : current,
                        )
                      }
                      className="input-field"
                    />
                  </label>
                </div>
              </section>

              <section className="surface p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">MDX 预览</h2>
                    <p className="mt-1 text-xs text-muted">
                      文件建议保存到 `content/articles/{draft.slug}.mdx`
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={copyMdx} className="btn-secondary text-sm">
                      <ClipboardText size={15} />
                      {copied ? "已复制" : "复制 MDX"}
                    </button>
                    <button type="button" onClick={downloadMdx} className="btn-secondary text-sm">
                      <DownloadSimple size={15} />
                      下载文件
                    </button>
                    <button type="button" onClick={markPublished} className="btn-primary text-sm">
                      <CheckCircle size={15} />
                      {published ? "已标记" : "标记已发布"}
                    </button>
                  </div>
                </div>
                <pre className="mt-4 max-h-[32rem] overflow-auto rounded-[8px] border border-border bg-background-secondary p-4 text-xs leading-6 text-foreground">
                  {mdx}
                </pre>
              </section>
            </>
          ) : (
            <section className="surface-muted p-8 text-center">
              <WarningCircle size={24} className="mx-auto text-muted" />
              <p className="mt-3 text-sm text-muted">选择一条已采纳投稿后生成草稿。</p>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
