"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ArrowClockwise,
  CheckCircle,
  ClipboardText,
  Database,
  Key,
  ShieldCheck,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";

import {
  getAdminAccessStatus,
  type AdminAccessCheck,
  type AdminAccessStatus,
} from "@/lib/cloud-data";
import { getSupabaseConfigStatus } from "@/lib/supabase";

type StatusTone = AdminAccessCheck["status"];

const statusCopy: Record<StatusTone, { label: string; className: string; Icon: typeof CheckCircle }> = {
  ok: {
    label: "正常",
    className: "border-success/20 bg-success-soft text-success",
    Icon: CheckCircle,
  },
  warning: {
    label: "需确认",
    className: "border-warning/20 bg-warning-soft text-warning",
    Icon: WarningCircle,
  },
  blocked: {
    label: "未通过",
    className: "border-danger/20 bg-danger-soft text-danger",
    Icon: XCircle,
  },
};

const emptyChecks: AdminAccessCheck[] = [];

function statusRank(status: StatusTone) {
  return status === "blocked" ? 0 : status === "warning" ? 1 : 2;
}

function getOverallStatus(checks: AdminAccessCheck[], configured: boolean): StatusTone {
  if (!configured) return "blocked";
  if (checks.some((check) => check.status === "blocked")) return "blocked";
  if (checks.some((check) => check.status === "warning")) return "warning";
  return "ok";
}

function StatusBadge({ status }: { status: StatusTone }) {
  const meta = statusCopy[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.className}`}>
      <meta.Icon size={13} weight="fill" />
      {meta.label}
    </span>
  );
}

function buildAdminSql(email?: string) {
  const safeEmail = email?.replace(/'/g, "''") || "你的邮箱";
  return `update public.profiles
set role = 'admin'
where email = '${safeEmail}';`;
}

export function AdminSettings() {
  const [config] = useState(() => getSupabaseConfigStatus());
  const [status, setStatus] = useState<AdminAccessStatus | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const loadStatus = () => {
    startTransition(async () => {
      setError("");
      try {
        setStatus(await getAdminAccessStatus());
      } catch (err) {
        setError(err instanceof Error ? err.message : "无法完成后台配置检查。");
      }
    });
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const checks = status?.checks ?? emptyChecks;
  const overallStatus = getOverallStatus(checks, config.configured);
  const hasAdminRole = checks.some((check) => check.id === "admin-role" && check.status === "ok");
  const checkSummary = useMemo(() => {
    const ok = checks.filter((check) => check.status === "ok").length;
    const warning = checks.filter((check) => check.status === "warning").length;
    const blocked = checks.filter((check) => check.status === "blocked").length;
    return { ok, warning, blocked };
  }, [checks]);

  const adminSql = buildAdminSql(status?.user?.email);

  const copyAdminSql = async () => {
    await navigator.clipboard.writeText(adminSql);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const nextSteps = [
    {
      label: "配置 Supabase 环境变量",
      done: config.configured,
      note: "NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY 必须存在。",
    },
    {
      label: "完成云端登录",
      done: Boolean(status?.user?.id),
      note: "只有 Supabase 登录会话能同步进度、投稿和船员档案。",
    },
    {
      label: "提升当前账号为 admin",
      done: hasAdminRole,
      note: "审核、订阅、转化事件需要 admin/editor 角色。",
    },
    {
      label: "确认 RLS 表访问",
      done: checks.length > 0 && checks.every((check) => statusRank(check.status) >= 1),
      note: "如果有红色阻塞项，优先看错误详情和 schema.sql。",
    },
  ];

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      <section className="surface-panel p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">配置状态</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              后台权限与后端体检
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              把 Supabase 环境变量、登录会话、管理员角色和 RLS 数据表权限拆开检查。出问题时先看这里，不用在后台页面之间来回猜。
            </p>
          </div>
          <button
            type="button"
            onClick={loadStatus}
            className="btn-primary w-fit text-sm disabled:opacity-60"
            disabled={isPending}
          >
            <ArrowClockwise size={15} className={isPending ? "animate-spin" : ""} />
            {isPending ? "检查中" : "重新检查"}
          </button>
        </div>
      </section>

      {error ? (
        <div className="rounded-[8px] border border-danger/20 bg-danger-soft p-4 text-sm leading-6 text-danger">
          {error}
        </div>
      ) : null}

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <article className="surface p-5">
          <ShieldCheck size={20} className="text-brand-sea" />
          <p className="mt-4 text-xs text-muted">总体状态</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xl font-semibold text-foreground">{statusCopy[overallStatus].label}</p>
            <StatusBadge status={overallStatus} />
          </div>
        </article>
        <article className="surface p-5">
          <Database size={20} className="text-brand-sea" />
          <p className="mt-4 text-xs text-muted">Supabase</p>
          <p className="mt-2 text-xl font-semibold text-foreground">
            {config.configured ? "已连接" : "未配置"}
          </p>
        </article>
        <article className="surface p-5">
          <Key size={20} className="text-brand-sea" />
          <p className="mt-4 text-xs text-muted">当前账号</p>
          <p className="mt-2 truncate text-xl font-semibold text-foreground">
            {status?.user?.email ?? "未登录"}
          </p>
        </article>
        <article className="surface p-5">
          <CheckCircle size={20} className="text-brand-sea" />
          <p className="mt-4 text-xs text-muted">检查结果</p>
          <p className="mt-2 text-xl font-semibold text-foreground">
            {checkSummary.ok} 正常 / {checkSummary.warning} 确认 / {checkSummary.blocked} 阻塞
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <section className="surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">环境变量</h2>
              <StatusBadge status={config.configured ? "ok" : "blocked"} />
            </div>
            <div className="mt-4 divide-y divide-border">
              {config.envVars.map((item) => (
                <div key={item.key} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted">{item.key}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="max-w-56 truncate text-muted">
                      {item.configured ? item.value || "已配置" : "未配置"}
                    </span>
                    <StatusBadge status={item.configured ? "ok" : item.required ? "blocked" : "warning"} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="surface p-5">
            <h2 className="text-lg font-semibold text-foreground">管理员 SQL</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              如果“后台角色”是红色，把下面 SQL 放进 Supabase SQL Editor 执行一次，再刷新本页。
            </p>
            <pre className="mt-4 overflow-auto rounded-[8px] border border-border bg-background-secondary p-4 text-xs leading-6 text-foreground">
              {adminSql}
            </pre>
            <button type="button" onClick={copyAdminSql} className="btn-secondary mt-4 text-sm">
              <ClipboardText size={15} />
              {copied ? "已复制" : "复制 SQL"}
            </button>
          </section>
        </div>

        <div className="space-y-6">
          <section className="surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">权限检查</h2>
              <span className="tag">{checks.length || 0} 项</span>
            </div>
            <div className="mt-4 space-y-3">
              {isPending && !checks.length ? (
                <div className="surface-muted p-5 text-sm text-muted">正在检查后台权限...</div>
              ) : null}
              {checks.map((check) => (
                <article key={check.id} className="rounded-[10px] border border-border bg-background-secondary p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{check.label}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{check.message}</p>
                    </div>
                    <StatusBadge status={check.status} />
                  </div>
                  {check.detail ? (
                    <p className="mt-3 rounded-[8px] border border-border bg-white/70 p-3 font-mono text-[11px] leading-5 text-muted">
                      {check.detail}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="surface p-5">
            <h2 className="text-lg font-semibold text-foreground">上线前检查清单</h2>
            <div className="mt-4 space-y-3">
              {nextSteps.map((step) => (
                <div key={step.label} className="flex gap-3 rounded-[10px] border border-border bg-background-secondary p-4">
                  {step.done ? (
                    <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-success" />
                  ) : (
                    <WarningCircle size={20} className="mt-0.5 shrink-0 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
