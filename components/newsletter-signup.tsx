"use client";

import { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

import { saveNewsletterSignup, trackConversionEvent } from "@/lib/cloud-data";

type NewsletterSignupProps = {
  source: string;
  compact?: boolean;
};

export function NewsletterSignup({ source, compact = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      await saveNewsletterSignup({ email, channel: "email", source });
      await trackConversionEvent({
        eventType: "newsletter_signup",
        target: source,
        metadata: { channel: "email" },
      });
      setEmail("");
      setMessage("已记录，后续更新会优先发给你。");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "提交失败，请稍后再试。");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-3"}
    >
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="输入邮箱，接收更新"
        className="input-field"
      />
      <button
        type="submit"
        disabled={pending}
        className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PaperPlaneTilt size={16} weight="fill" />
        {pending ? "提交中" : "订阅更新"}
      </button>
      {message ? <p className="text-xs leading-6 text-muted">{message}</p> : null}
    </form>
  );
}
