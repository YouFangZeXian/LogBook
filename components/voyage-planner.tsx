"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle,
  Circle,
  Desktop,
  DeviceMobile,
  Laptop,
  Sparkle,
  Star,
  Warning,
} from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { saveProgress, saveVoyageSelection, loadProgress } from "@/lib/cloud-data";
import {
  androidBrandOptions,
  buildVoyagePlan,
  deviceOptions,
  statusOptions,
  type AndroidBrandId,
  type DeviceId,
  type StatusId,
  type VoyageTask,
} from "@/lib/voyage-system";

type VoyagePlannerProps = {
  mode?: "compact" | "full";
};

const PROGRESS_KEY = "logbook.voyage.progress";

const loadingLines = [
  "正在为你绘制航线",
  "正在检查你的设备甲板",
  "正在寻找适合你的登船指南",
  "正在整理补给清单",
  "正在打开第一张海图",
  "船员档案建立中",
  "航线生成中",
  "正在确认风向",
];

function deviceIcon(device: DeviceId) {
  if (device === "windows") return <Desktop size={20} weight="duotone" />;
  if (device === "mac") return <Laptop size={20} weight="duotone" />;
  return <DeviceMobile size={20} weight="duotone" />;
}

function statusIcon(status: StatusId) {
  if (status === "new") return <Circle size={20} />;
  if (status === "network") return <Sparkle size={20} />;
  if (status === "account-payment") return <Star size={20} />;
  if (status === "using-tools") return <CheckCircle size={20} />;
  return <ArrowUpRight size={20} />;
}

function taskKey(task: VoyageTask) {
  return `${task.id}:${task.label}`;
}

function readProgress() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function VoyagePlanner({ mode = "compact" }: VoyagePlannerProps) {
  const router = useRouter();
  const [devices, setDevices] = useState<DeviceId[]>(["windows", "iphone"]);
  const [androidBrand, setAndroidBrand] = useState<AndroidBrandId>("xiaomi");
  const [status, setStatus] = useState<StatusId>("new");
  const [completed, setCompleted] = useState<string[]>(() => readProgress());
  const [launching, setLaunching] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    void loadProgress("voyage").then(setCompleted);
  }, []);

  const hasAndroid = devices.includes("android");

  const segments = useMemo(
    () => buildVoyagePlan(devices, status, androidBrand),
    [androidBrand, devices, status],
  );
  const allTasks = useMemo(() => segments.flatMap((s) => s.tasks), [segments]);
  const progress = allTasks.length
    ? Math.round((completed.filter((id) => allTasks.some((t) => taskKey(t) === id)).length / allTasks.length) * 100)
    : 0;

  const toggleDevice = (device: DeviceId) => {
    setDevices((c) =>
      c.includes(device) ? (c.length === 1 ? c : c.filter((d) => d !== device)) : [...c, device],
    );
  };

  const toggleComplete = (id: string) => {
    setCompleted((c) => {
      const next = c.includes(id) ? c.filter((x) => x !== id) : [...c, id];
      void saveProgress("voyage", next);
      return next;
    });
  };

  const launch = () => {
    void saveVoyageSelection({ devices, androidBrand: hasAndroid ? androidBrand : undefined, status, updatedAt: new Date().toISOString() });
    setLaunching(true);
    setLoadingIndex(Math.floor(Math.random() * loadingLines.length));
    const ticker = window.setInterval(() => setLoadingIndex((i) => (i + 1) % loadingLines.length), 620);
    window.setTimeout(() => {
      window.clearInterval(ticker);
      router.push("/routes");
    }, 2800);
  };

  /* ── Launching overlay ── */
  if (launching) {
    return (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 px-6 backdrop-blur-sm">
        <div className="w-full max-w-sm text-center">
          {/* Simple boat animation */}
          <div className="relative mx-auto h-24 w-full max-w-[240px] overflow-hidden rounded-2xl border border-border bg-background-secondary">
            <svg viewBox="0 0 240 96" className="h-full w-full" aria-hidden="true">
              <path d="M0 72 Q 60 68, 120 72 Q 180 76, 240 72" stroke="var(--brand-sea)" strokeWidth="1" opacity="0.3" fill="none" />
              <g className="animate-[sail-across_3s_ease-in-out_forwards]">
                <rect x="20" y="58" width="28" height="6" rx="3" fill="var(--brand-deep)" opacity="0.8" />
                <line x1="34" y1="58" x2="34" y2="34" stroke="var(--brand-deep)" strokeWidth="1.5" />
                <path d="M34 34 L34 52 L50 43 Z" fill="var(--brand-sea)" opacity="0.7" />
              </g>
            </svg>
          </div>
          <p className="mt-6 kicker">启航中</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground">
            {loadingLines[loadingIndex]}
          </h2>
        </div>
      </section>
    );
  }

  /* ── Main planner ── */
  return (
    <section className={`surface ${mode === "compact" ? "p-5" : "p-6 md:p-8"}`}>
      {/* Header */}
      <div className="mb-6 space-y-2">
        <p className="kicker">登船面板</p>
        <h2 className="heading-section">选择你的出海设备</h2>
        <p className="body-text max-w-lg">
          每一段航线，都从你手里的设备开始。选择设备后，路格舶会为你生成对应的登船指南。
        </p>
      </div>

      {/* Step 1: Device cards */}
      <div className="mb-6 space-y-3">
        <p className="text-xs font-medium tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
          第一步：选择设备
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {deviceOptions.map((device) => {
            const active = devices.includes(device.id);
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => toggleDevice(device.id)}
                className={`flex items-start gap-3 rounded-[16px] border p-4 text-left transition-all ${
                  active
                    ? "border-brand/30 bg-brand-mist-soft"
                    : "border-border bg-white hover:border-border-medium"
                }`}
              >
                <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border transition-colors ${
                  active ? "border-brand/20 bg-brand-mist text-brand" : "border-border bg-background-secondary text-muted"
                }`}>
                  {deviceIcon(device.id)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{device.label}</span>
                    {active ? <CheckCircle size={16} weight="fill" className="shrink-0 text-brand-sea" /> : null}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{device.helper}</span>
                </span>
              </button>
            );
          })}
        </div>
        {devices.length > 1 ? (
          <p className="rounded-[14px] border border-border bg-background-secondary p-3 text-xs leading-6 text-muted">
            你可以同时拥有多条航线。建议先完成一个设备的基础出海，再继续下一台设备。
          </p>
        ) : null}
      </div>

      {/* Android brand picker */}
      {hasAndroid ? (
        <div className="mb-6 space-y-3">
          <p className="text-xs font-medium tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
            Android 品牌
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {androidBrandOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAndroidBrand(option.id)}
                className={`rounded-[14px] border p-3 text-left text-sm transition-all ${
                  option.id === androidBrand
                    ? "border-brand/30 bg-brand-mist-soft font-semibold text-brand"
                    : "border-border bg-white text-muted hover:border-border-medium"
                }`}
              >
                {option.label}
                <span className="mt-0.5 block text-xs font-normal leading-5">{option.helper}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Step 2: Status cards */}
      <div className="mb-6 space-y-3">
        <p className="text-xs font-medium tracking-[0.12em] text-faint [font-family:var(--font-mono)]">
          第二步：你现在在哪片海域？
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {statusOptions.map((option) => {
            const active = option.id === status;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setStatus(option.id)}
                className={`flex items-start gap-3 rounded-[16px] border p-4 text-left transition-all ${
                  active
                    ? "border-brand/30 bg-brand-mist-soft"
                    : "border-border bg-white hover:border-border-medium"
                }`}
              >
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors ${
                  active ? "border-brand/20 bg-brand-mist text-brand" : "border-border bg-background-secondary text-muted"
                }`}>
                  {statusIcon(option.id)}
                </span>
                <span className="min-w-0">
                  <span className="text-sm font-semibold text-foreground">{option.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{option.helper}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Generated route */}
      <div className="mb-6 space-y-4 rounded-[16px] border border-border bg-background-secondary p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">第三步：航线预览</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
              {devices.map((d) => deviceOptions.find((e) => e.id === d)?.label).join(" + ")}
              {" / "}
              {statusOptions.find((s) => s.id === status)?.label}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-brand-sea">
            <Sparkle size={14} />
            完成度 {progress}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-white">
          <span
            className="block h-full rounded-full bg-brand-sea transition-all duration-700 ease-out"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>

        {/* Segments preview */}
        <div className="space-y-2">
          {segments.slice(0, mode === "compact" ? 3 : 5).map((segment, si) => (
            <div key={segment.id} className="rounded-[14px] border border-border bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background-secondary text-xs font-semibold [font-family:var(--font-mono)]">
                  {si + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{segment.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-muted">{segment.note}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 pl-10">
                {segment.tasks.slice(0, mode === "compact" ? 2 : 4).map((task) => {
                  const id = taskKey(task);
                  const done = completed.includes(id);
                  return (
                    <div key={id} className="flex items-start gap-3 rounded-[10px] border border-border bg-background-secondary p-3">
                      <button
                        type="button"
                        onClick={() => toggleComplete(id)}
                        className="mt-0.5 shrink-0"
                        aria-label={done ? "取消完成" : "标记完成"}
                      >
                        {done ? (
                          <CheckCircle size={18} weight="fill" className="text-success" />
                        ) : (
                          <Circle size={18} className="text-faint" />
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {task.brand ? <BrandMark brand={task.brand} size="sm" showLabel={false} /> : null}
                          <p className="text-sm font-semibold text-foreground">{task.label}</p>
                        </div>
                        <p className="mt-1 text-xs leading-6 text-muted">{task.note}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Link href={task.href} className="inline-flex items-center gap-1 text-xs font-medium text-brand-sea transition-colors hover:text-brand">
                            继续学习 <ArrowUpRight size={11} />
                          </Link>
                          <span className="inline-flex items-center gap-1 text-xs text-muted">
                            <Warning size={11} className="text-warning" />
                            {task.risk.length > 20 ? task.risk.slice(0, 20) + "…" : task.risk}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="body-sm">
          {mode === "compact"
            ? "完整航路可继续标记完成并展开阅读。"
            : "选择完成后，启航动画会把你带到独立航线推荐页。"}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={launch} className="btn-primary">
            启航生成航线 <ArrowUpRight size={15} />
          </button>
          {mode === "compact" ? (
            <Link href="/start" className="btn-secondary">
              打开完整面板
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
