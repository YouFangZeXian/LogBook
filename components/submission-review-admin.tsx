"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, XCircle } from "@phosphor-icons/react/dist/ssr";

import {
  listReviewSubmissions,
  updateSubmissionReview,
} from "@/lib/cloud-data";

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

const statusOptions = [
  { value: "pending", label: "待审核", icon: Clock },
  { value: "accepted", label: "已采纳", icon: CheckCircle },
  { value: "published", label: "已发布", icon: CheckCircle },
  { value: "rejected", label: "已退回", icon: XCircle },
] as const;

export function SubmissionReviewAdmin() {
  const [items, setItems] = useState<ReviewSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const data = (await listReviewSubmissions()) as ReviewSubmission[];
      setItems(data);
      setNotes(
        Object.fromEntries(data.map((item) => [item.id, item.reviewer_note ?? ""])),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "无法读取审核队列。请确认当前账号是 admin 或 editor。",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const updateStatus = async (id: string, status: ReviewSubmission["status"]) => {
    try {
      await updateSubmissionReview({
        id,
        status,
        reviewerNote: notes[id] ?? "",
      });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新失败。");
    }
  };

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      <section className="surface-panel p-6 md:p-8">
        <p className="section-kicker">运营后台</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          投稿审核队列
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          这里处理“投稿进站 → 审核 → 发布/退回”的最小闭环。发布状态不会自动生成 MDX，
          但会把内容标记为可整理进正式文章或新大陆页面。
        </p>
      </section>

      {error ? (
        <div className="rounded-[8px] border border-danger/20 bg-danger-soft p-4 text-sm leading-6 text-danger">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="surface-muted p-8 text-sm text-muted">正在读取审核队列...</div>
      ) : null}

      <section className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="surface p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag tag-brand">{item.type}</span>
                  <span className="tag">{item.status}</span>
                  <span className="text-xs text-muted">
                    {new Date(item.created_at).toLocaleString("zh-CN")}
                  </span>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground">
                  {item.content}
                </p>
                <div className="mt-4 grid gap-2 text-xs leading-6 text-muted sm:grid-cols-3">
                  <p>投稿人：{item.profiles?.name ?? item.profiles?.email ?? "未知"}</p>
                  <p>联系方式：{item.contact || "未填写"}</p>
                  <p>关联文章：{item.article_slug || "无"}</p>
                </div>
              </div>

              <div className="w-full space-y-3 lg:w-72">
                <textarea
                  value={notes[item.id] ?? ""}
                  onChange={(event) =>
                    setNotes((current) => ({ ...current, [item.id]: event.target.value }))
                  }
                  rows={3}
                  placeholder="审核备注，可写发布位置、退回原因或后续处理。"
                  className="input-field"
                />
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateStatus(item.id, option.value)}
                        className="btn-secondary justify-start px-3 py-2 text-xs"
                      >
                        <Icon size={14} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {!loading && !items.length ? (
        <div className="surface-muted p-8 text-center text-sm text-muted">
          目前没有投稿。
        </div>
      ) : null}
    </div>
  );
}
