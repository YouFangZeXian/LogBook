"use client";

import { useState } from "react";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";

const SUBMISSIONS_KEY = "logbook.submissions";

type ContributionType = "投稿" | "补充" | "纠错" | "提问";

type ContributionPanelProps = {
  articleTitle?: string;
  articleSlug?: string;
};

function readSubmissions() {
  try {
    return JSON.parse(window.localStorage.getItem(SUBMISSIONS_KEY) ?? "[]") as unknown[];
  } catch {
    return [];
  }
}

export function ContributionPanel({ articleTitle, articleSlug }: ContributionPanelProps) {
  const [type, setType] = useState<ContributionType>("补充");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if (!getCurrentLogbookUser()) {
      requestLogbookLogin("想把你的发现交给船舱吗？登录后可以留下投稿、勘误和问题反馈。");
      return;
    }

    const submissions = readSubmissions();
    submissions.unshift({
      id: crypto.randomUUID(),
      type,
      content,
      contact,
      articleTitle,
      articleSlug,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    window.localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    setSuccess(true);
    setContent("");
  };

  return (
    <section className="surface-panel p-6 md:p-8">
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="section-kicker">船舱来信</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            投稿、补充、纠错，或者把没写到的问题丢上来。
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            当前先记录到本地投稿箱，状态默认为 pending。后续接后台后，可以迁移为审核流。
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["投稿", "补充", "纠错", "提问"] as ContributionType[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                className={[
                  "rounded-[0.75rem] border px-3 py-2 text-sm font-medium transition-colors",
                  type === item
                    ? "border-foreground bg-foreground text-background"
                    : "border-line bg-white/68 text-muted hover:text-foreground",
                ].join(" ")}
              >
                我要{item}
              </button>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="写下你的发现、补充、错误位置或遇到的问题。"
            rows={5}
            className="w-full rounded-[0.9rem] border border-line bg-white/74 px-4 py-3 text-sm leading-7 outline-none transition-colors focus:border-foreground"
          />
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="联系方式，可填微信、邮箱或 QQ，选填"
            className="w-full rounded-[0.9rem] border border-line bg-white/74 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          />

          <button
            type="button"
            onClick={submit}
            disabled={!content.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-[0.85rem] border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-black disabled:cursor-not-allowed disabled:border-line disabled:bg-white/50 disabled:text-muted"
          >
            <PaperPlaneTilt size={16} weight="fill" />
            提交到船舱
          </button>
        </div>
      </div>

      {success ? (
        <div className="mt-5 rounded-[14px] border border-accent/20 bg-accent-soft p-4 text-sm leading-7 text-accent">
          <div className="flex items-start gap-3">
            <CheckCircle size={18} weight="fill" className="mt-1 shrink-0" />
            <p>
              已收到，状态为 pending。后续可以在这里接入 QQ 群或站长联系方式，引导你继续补充材料。
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
