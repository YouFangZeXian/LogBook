"use client";

import { useState } from "react";
import {
  CheckCircle,
  PaperPlaneTilt,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { createSubmission } from "@/lib/cloud-data";

type ContributionType =
  | "投稿"
  | "补充"
  | "纠错"
  | "提问"
  | "Vibe Coding 作品"
  | "独立开发项目"
  | "AI 变现经验";

type ContributionPanelProps = {
  articleTitle?: string;
  articleSlug?: string;
};

const types: ContributionType[] = [
  "投稿",
  "补充",
  "纠错",
  "提问",
  "Vibe Coding 作品",
  "独立开发项目",
  "AI 变现经验",
];

export function ContributionPanel({
  articleTitle,
  articleSlug,
}: ContributionPanelProps) {
  const [type, setType] = useState<ContributionType>("补充");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!getCurrentLogbookUser()) {
      requestLogbookLogin("想把你的发现交给船舱吗？登录后投稿会进入审核队列。");
      return;
    }

    setPending(true);
    setError("");
    try {
      await createSubmission({
        type,
        content,
        contact,
        articleTitle,
        articleSlug,
      });
      setSuccess(true);
      setContent("");
      setContact("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后再试。");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="surface p-6 md:p-8">
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkle size={16} className="text-brand-sea" />
            <p className="kicker">船舱来信</p>
          </div>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-foreground">
            投稿、补充、纠错，或者把没写到的问题丢上来。
          </h2>
          <p className="mt-2 body-sm">
            提交后会进入审核队列。审核通过后，会更新到对应页面或整理成新的航海日志。
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {types.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                className={`rounded-[8px] border px-3 py-2 text-sm font-medium transition-all ${
                  type === item
                    ? "border-brand/30 bg-brand-mist-soft text-brand"
                    : "border-border bg-white text-muted hover:border-border-medium"
                }`}
              >
                {item.length > 6 ? item : `我要${item}`}
              </button>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="写下你的发现、补充、错误位置或遇到的问题。"
            rows={5}
            className="input-field"
          />
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="联系方式，可填 QQ / 微信 / 邮箱"
            className="input-field"
          />

          {error ? <p className="text-sm leading-6 text-danger">{error}</p> : null}

          <button
            type="button"
            onClick={submit}
            disabled={!content.trim() || pending}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PaperPlaneTilt size={16} weight="fill" />
            {pending ? "提交中..." : "提交到船舱"}
          </button>
        </div>
      </div>

      {success ? (
        <div className="mt-5 rounded-[12px] border border-success/20 bg-success-soft p-5">
          <div className="flex items-start gap-3">
            <CheckCircle
              size={18}
              weight="fill"
              className="mt-0.5 shrink-0 text-success"
            />
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-success">已进入审核队列</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  感谢你的补给。你可以在船员档案里看到自己的投稿记录。
                </p>
              </div>
              <div className="grid gap-2 text-sm leading-6 sm:grid-cols-3">
                <div className="rounded-[8px] border border-border bg-white p-3">
                  <p className="font-medium text-foreground">审核状态</p>
                  <p className="mt-1 text-xs text-muted">默认 pending，后台可改为采纳、发布或退回。</p>
                </div>
                <div className="rounded-[8px] border border-border bg-white p-3">
                  <p className="font-medium text-foreground">联系站长</p>
                  <p className="mt-1 text-xs text-muted">
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@logbook.today"}
                  </p>
                </div>
                <div className="rounded-[8px] border border-border bg-white p-3">
                  <p className="font-medium text-foreground">早期船员权益</p>
                  <p className="mt-1 text-xs text-muted">社区上线时继承贡献记录。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
