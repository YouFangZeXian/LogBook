"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartBar,
  CheckCircle,
  EnvelopeSimple,
  MouseSimple,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";

import {
  listAdminSubmissionsSummary,
  listConversionEvents,
  listNewsletterSignups,
} from "@/lib/cloud-data";
import { isSupabaseConfigured } from "@/lib/supabase";

type SubmissionSummary = {
  id: string;
  status: string;
  type: string;
  created_at: string;
};

type Signup = {
  id?: string;
  email: string;
  channel: string;
  source: string;
  created_at?: string;
  createdAt?: string;
};

type ConversionEvent = {
  id?: string;
  event_type?: string;
  eventType?: string;
  target: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  createdAt?: string;
};

function dateLabel(value?: string) {
  if (!value) return "未知时间";
  return new Date(value).toLocaleString("zh-CN");
}

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [events, setEvents] = useState<ConversionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [submissionData, signupData, eventData] = await Promise.all([
          listAdminSubmissionsSummary(),
          listNewsletterSignups(30),
          listConversionEvents(60),
        ]);

        setSubmissions(submissionData as SubmissionSummary[]);
        setSignups(signupData as Signup[]);
        setEvents(eventData as ConversionEvent[]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "无法读取运营数据。请确认 Supabase 已配置，且当前账号是 admin 或 editor。",
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const metrics = useMemo(() => {
    const pending = submissions.filter((item) => item.status === "pending").length;
    const accepted = submissions.filter((item) =>
      ["accepted", "published"].includes(item.status),
    ).length;
    const productInterest = events.filter((item) =>
      [item.event_type, item.eventType].includes("product_interest"),
    ).length;
    const affiliateClicks = events.filter((item) =>
      [item.event_type, item.eventType].includes("affiliate_click"),
    ).length;

    return [
      { label: "待审核投稿", value: pending, icon: WarningCircle },
      { label: "已采纳/发布", value: accepted, icon: CheckCircle },
      { label: "邮件订阅", value: signups.length, icon: EnvelopeSimple },
      { label: "产品意向", value: productInterest, icon: ChartBar },
      { label: "资源点击", value: events.length, icon: MouseSimple },
      { label: "联盟点击", value: affiliateClicks, icon: ArrowUpRight },
    ];
  }, [events, signups.length, submissions]);

  const topTargets = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((event) => {
      counts.set(event.target, (counts.get(event.target) ?? 0) + 1);
    });

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [events]);

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      <section className="surface-panel p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">运营后台</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              路格舶运营工作台
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              汇总投稿审核、邮件订阅和转化事件。它不是复杂 CMS，先把最小运营闭环跑起来。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/submissions" className="btn-primary w-fit text-sm">
              进入投稿审核 <ArrowUpRight size={14} />
            </Link>
            <Link href="/admin/content" className="btn-secondary w-fit text-sm">
              生成内容草稿 <ArrowUpRight size={14} />
            </Link>
            <Link href="/admin/settings" className="btn-secondary w-fit text-sm">
              检查配置状态 <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {!isSupabaseConfigured() ? (
        <div className="rounded-[8px] border border-warning/20 bg-warning-soft p-4 text-sm leading-6 text-muted">
          当前未配置 Supabase 环境变量，后台会读取本地演示数据。部署后请在 Cloudflare Pages
          配置 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[8px] border border-danger/20 bg-danger-soft p-4 text-sm leading-6 text-danger">
          {error}
        </div>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="surface p-4">
              <Icon size={18} className="text-brand-sea" />
              <p className="mt-3 text-xs text-muted">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {loading ? "..." : metric.value}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="surface p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-foreground">最近转化事件</h2>
            <span className="tag">{events.length} 条</span>
          </div>
          <div className="mt-4 divide-y divide-border">
            {events.slice(0, 12).map((event, index) => (
              <div key={event.id ?? `${event.target}-${index}`} className="py-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{event.target}</p>
                  <span className="tag text-[10px]">{event.event_type ?? event.eventType}</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {dateLabel(event.created_at ?? event.createdAt)}
                </p>
              </div>
            ))}
            {!loading && !events.length ? (
              <p className="py-8 text-center text-sm text-muted">还没有转化事件。</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">热门目标</h2>
              <span className="tag">{topTargets.length} 个</span>
            </div>
            <div className="mt-4 space-y-3">
              {topTargets.map(([target, count]) => (
                <div key={target}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <p className="truncate font-medium text-foreground">{target}</p>
                    <span className="text-muted">{count}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-background-secondary">
                    <span
                      className="block h-full rounded-full bg-brand-sea"
                      style={{ width: `${Math.max(8, (count / Math.max(1, topTargets[0]?.[1] ?? 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              {!loading && !topTargets.length ? (
                <p className="py-6 text-center text-sm text-muted">暂无热门目标。</p>
              ) : null}
            </div>
          </div>

          <div className="surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">最近订阅</h2>
              <span className="tag">{signups.length} 条</span>
            </div>
            <div className="mt-4 divide-y divide-border">
              {signups.slice(0, 8).map((signup, index) => (
                <div key={signup.id ?? `${signup.email}-${index}`} className="py-3 text-sm">
                  <p className="font-medium text-foreground">{signup.email}</p>
                  <p className="mt-1 text-xs text-muted">
                    {signup.source} · {dateLabel(signup.created_at ?? signup.createdAt)}
                  </p>
                </div>
              ))}
              {!loading && !signups.length ? (
                <p className="py-6 text-center text-sm text-muted">还没有邮件订阅。</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
