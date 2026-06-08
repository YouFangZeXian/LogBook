"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BookmarkSimple,
  CheckCircle,
  Circle,
  Desktop,
  DeviceMobile,
  GlobeHemisphereWest,
  Laptop,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { getCurrentLogbookUser, requestLogbookLogin } from "@/components/auth-dialog";
import { toneClassMap, type BrandTone } from "@/lib/brand-library";
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

const SELECTION_KEY = "logbook.voyage.selection";
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

function deviceGlyph(device: DeviceId) {
  if (device === "windows") {
    return <Desktop size={16} weight="duotone" />;
  }

  if (device === "mac") {
    return <Laptop size={16} weight="duotone" />;
  }

  return <DeviceMobile size={16} weight="duotone" />;
}

function toneButtonClasses(tone: BrandTone, active: boolean) {
  const palette = toneClassMap[tone];
  return active ? palette.button : palette.buttonMuted;
}

function taskKey(task: VoyageTask) {
  return `${task.id}:${task.label}`;
}

function readProgress() {
  if (typeof window === "undefined") {
    return [];
  }

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
  const [saved, setSaved] = useState<string[]>([]);
  const [launching, setLaunching] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  const segments = useMemo(
    () => buildVoyagePlan(devices, status, androidBrand),
    [androidBrand, devices, status],
  );
  const allTasks = useMemo(() => segments.flatMap((segment) => segment.tasks), [segments]);
  const progress = allTasks.length
    ? Math.round((completed.filter((id) => allTasks.some((task) => taskKey(task) === id)).length / allTasks.length) * 100)
    : 0;
  const hasAndroid = devices.includes("android");

  const persistSelection = () => {
    window.localStorage.setItem(
      SELECTION_KEY,
      JSON.stringify({
        devices,
        androidBrand: hasAndroid ? androidBrand : undefined,
        status,
        updatedAt: new Date().toISOString(),
      }),
    );
  };

  const toggleDevice = (device: DeviceId) => {
    setDevices((current) => {
      if (current.includes(device)) {
        return current.length === 1 ? current : current.filter((item) => item !== device);
      }

      return [...current, device];
    });
  };

  const toggleComplete = (id: string) => {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleSaved = (id: string) => {
    if (!getCurrentLogbookUser()) {
      requestLogbookLogin("想让船舱记住这段收藏吗？登录后可以保存进度、提交问题和投稿你的发现。");
      return;
    }

    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const launch = () => {
    persistSelection();
    setLaunching(true);
    setLoadingIndex(Math.floor(Math.random() * loadingLines.length));

    const ticker = window.setInterval(() => {
      setLoadingIndex((current) => (current + 1) % loadingLines.length);
    }, 620);

    window.setTimeout(() => {
      window.clearInterval(ticker);
      router.push("/routes");
    }, 2800);
  };

  return (
    <section
      className={[
        "rounded-[1.05rem] border border-line bg-white/72",
        mode === "compact" ? "p-5 md:p-6" : "p-6 md:p-8",
      ].join(" ")}
    >
      {launching ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/92 px-6 backdrop-blur-md">
          <div className="w-full max-w-xl text-center">
            <div className="relative mx-auto h-28 overflow-hidden rounded-[1rem] border border-line bg-white/60">
              <div className="absolute inset-x-8 bottom-8 h-px bg-sky-300/80" />
              <div className="absolute bottom-8 left-8 h-8 w-16 animate-[sail_2.8s_ease-in-out_forwards]">
                <div className="absolute bottom-0 left-0 h-3 w-16 rounded-b-full border border-foreground bg-background" />
                <div className="absolute bottom-3 left-7 h-8 w-px bg-foreground" />
                <div className="absolute bottom-3 left-8 h-7 w-7 rounded-tr-full border border-foreground bg-sky-50" />
              </div>
            </div>
            <p className="mt-6 section-kicker">启航中</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              {loadingLines[loadingIndex]}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              如果航线生成失败，路格舶会给你一条默认基础航线。
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-b border-line pb-5">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <p className="section-kicker">
              {mode === "compact" ? "登船面板" : "AI 时代的出海新手村"}
            </p>
            <h2
              className={[
                "font-semibold tracking-tight text-foreground",
                mode === "compact" ? "text-2xl" : "text-[clamp(1.8rem,3vw,2.8rem)]",
              ].join(" ")}
            >
              欢迎登船。
              <br />
              请选择你的设备。
            </h2>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-line bg-background text-muted">
            <GlobeHemisphereWest size={18} />
          </span>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-muted">
          这不是传统攻略索引，而是会根据设备和状态自动给你排出一条先后顺序清楚的航路。
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
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
                  className={[
                    "flex items-start gap-3 rounded-[0.95rem] border px-4 py-4 text-left transition-all",
                    toneButtonClasses(device.tone, active),
                  ].join(" ")}
                >
                  <span className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] border border-current/12 ${toneClassMap[device.tone].soft}`}>
                    {deviceGlyph(device.id)}
                  </span>
                  <span className="space-y-1">
                    <span className="block text-sm font-semibold text-foreground">{device.label}</span>
                    <span className="block text-sm leading-6 text-muted">{device.helper}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {hasAndroid ? (
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
              Android 品牌
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {androidBrandOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAndroidBrand(option.id)}
                  className={[
                    "rounded-[0.95rem] border px-4 py-4 text-left transition-colors",
                    toneButtonClasses(option.tone, option.id === androidBrand),
                  ].join(" ")}
                >
                  <span className="block text-sm font-semibold text-foreground">{option.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{option.helper}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
            第二步：选择状态
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {statusOptions.map((option) => {
              const active = option.id === status;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setStatus(option.id)}
                  className={[
                    "rounded-[0.95rem] border px-4 py-4 text-left transition-colors",
                    active
                      ? "border-transparent bg-stone-900 text-white"
                      : "border-line bg-background/72 text-foreground hover:border-foreground",
                  ].join(" ")}
                >
                  <span className="block text-sm font-semibold tracking-tight">{option.label}</span>
                  <span className={`mt-2 block text-sm leading-6 ${active ? "text-white/76" : "text-muted"}`}>
                    {option.helper}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[0.95rem] border border-line bg-background/58 p-4 md:p-5">
        <div className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
              第三步：生成航路
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
              {devices.map((item) => deviceOptions.find((entry) => entry.id === item)?.label).join(" + ")}
              {" / "}
              {statusOptions.find((item) => item.id === status)?.label}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-[0.85rem] border border-sky-200/80 bg-sky-50/80 px-3 py-2 text-sm text-sky-800">
            <Sparkle size={15} className="text-foreground" />
            航线完成度 {progress}%
          </div>
        </div>

        <div className={`mt-4 ${mode === "compact" ? "space-y-3" : "space-y-4"}`}>
          {segments.map((segment) => (
            <article
              key={segment.id}
              className="rounded-[0.9rem] border border-line bg-white/74 p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${toneClassMap[segment.tone].line}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {segment.title}
                    </h3>
                    {mode === "full" ? (
                      <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${toneClassMap[segment.tone].badge}`}>
                        {segment.tasks.length} steps
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{segment.note}</p>

                  <div className="mt-4 space-y-3">
                    {segment.tasks.map((task) => {
                      const id = taskKey(task);
                      const isDone = completed.includes(id);
                      const isSaved = saved.includes(id);
                      const tone = toneClassMap[task.tone];

                      return (
                        <div
                          key={id}
                          className="rounded-[0.8rem] border border-line bg-background/70 px-3 py-3"
                        >
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => toggleComplete(id)}
                              className="mt-0.5 shrink-0 text-foreground"
                              aria-label={isDone ? "取消完成" : "标记完成"}
                            >
                              {isDone ? <CheckCircle size={18} weight="fill" /> : <Circle size={18} />}
                            </button>

                            <div className="min-w-0 flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                {task.brand ? <BrandMark brand={task.brand} size="sm" showLabel={false} /> : null}
                                <p className="text-sm font-semibold tracking-tight text-foreground">
                                  {task.label}
                                </p>
                                <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.22em] ${tone.badge}`}>
                                  {segment.title.replace("第一站：", "").replace("第二站：", "").replace("第三站：", "").replace("第四站：", "").replace("第五站：", "")}
                                </span>
                              </div>
                              <p className="text-sm leading-7 text-muted">{task.note}</p>
                              {mode === "full" ? (
                                <div className="grid gap-2 text-xs leading-6 text-muted sm:grid-cols-2">
                                  <p className="rounded-[0.7rem] border border-line bg-white/58 p-3">常见问题：{task.faq}</p>
                                  <p className="rounded-[0.7rem] border border-amber-200/70 bg-amber-50/70 p-3">风险提示：{task.risk}</p>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {mode === "full" ? (
                            <div className="mt-3 flex flex-wrap items-center gap-2 pl-8">
                              <button
                                type="button"
                                onClick={() => toggleSaved(id)}
                                className={[
                                  "inline-flex items-center gap-1.5 rounded-[0.75rem] border px-3 py-2 text-xs transition-colors",
                                  isSaved ? tone.button : tone.buttonMuted,
                                ].join(" ")}
                              >
                                <BookmarkSimple size={14} weight={isSaved ? "fill" : "regular"} />
                                收藏
                              </button>
                              <Link
                                href={task.href}
                                className="inline-flex items-center gap-1.5 rounded-[0.75rem] border border-line bg-white/72 px-3 py-2 text-xs text-foreground transition-colors hover:border-foreground"
                              >
                                继续学习
                                <ArrowUpRight size={12} />
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {mode === "compact" ? "完整航路可以继续标记完成、收藏并展开阅读。" : "选择完成后，启航动画会把你带到独立航线推荐页。"}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={launch}
            className="inline-flex items-center justify-center gap-2 rounded-[0.85rem] border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            启航生成航线
            <ArrowUpRight size={15} />
          </button>
          {mode === "compact" ? (
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-[0.85rem] border border-line bg-white/68 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              打开完整面板
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
