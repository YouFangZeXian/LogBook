"use client";

import { useState } from "react";
import { CheckCircle, PaperPlaneTilt, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";

const SUBMISSIONS_KEY = "logbook.submissions";
type ContributionType = "投稿" | "补充" | "纠错" | "提问";

type ContributionPanelProps = { articleTitle?: string; articleSlug?: string };

export function ContributionPanel({ articleTitle, articleSlug }: ContributionPanelProps) {
  const [type, setType] = useState<ContributionType>("补充");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if (!getCurrentLogbookUser()) { requestLogbookLogin("想把你的发现交给船舱吗？"); return; }
    const submissions = JSON.parse(window.localStorage.getItem(SUBMISSIONS_KEY) ?? "[]");
    submissions.unshift({ id: crypto.randomUUID(), type, content, contact, articleTitle, articleSlug, status: "pending", createdAt: new Date().toISOString() });
    window.localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    setSuccess(true);
    setContent("");
  };

  return (
    <section className="surface p-6 md:p-8">
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <div className="flex items-center gap-2"><Sparkle size={16} className="text-brand-sea" /><p className="kicker">船舱来信</p></div>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-foreground">投稿、补充、纠错，或者把没写到的问题丢上来。</h2>
          <p className="mt-2 body-sm">当前记录到本地投稿箱，后续接入后台后可迁移为审核流。</p>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["投稿", "补充", "纠错", "提问"] as ContributionType[]).map((item) => (
              <button key={item} type="button" onClick={() => setType(item)}
                className={`rounded-[12px] border px-3 py-2 text-sm font-medium transition-all ${
                  type === item ? "border-brand/30 bg-brand-mist-soft text-brand" : "border-border bg-white text-muted hover:border-border-medium"
                }`}>
                我要{item}
              </button>
            ))}
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="写下你的发现、补充、错误位置或遇到的问题。" rows={5} className="input-field" />
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="联系方式（选填）" className="input-field" />
          <button type="button" onClick={submit} disabled={!content.trim()} className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed">
            <PaperPlaneTilt size={16} weight="fill" /> 提交到船舱
          </button>
        </div>
      </div>
      {success ? (
        <div className="mt-5 rounded-[16px] border border-success/20 bg-success-soft p-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-success" />
            <div>
              <p className="text-sm font-semibold text-success">航海日志已提交</p>
              <p className="mt-1 text-sm leading-6 text-muted">感谢你的补给。你的发现可能会帮下一位船员少绕一段远路。</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
