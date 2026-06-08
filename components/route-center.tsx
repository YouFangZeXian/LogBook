"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle,
  Circle,
  Compass,
  ListChecks,
} from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { requestLogbookLogin } from "@/components/auth-dialog";
import { toneClassMap } from "@/lib/brand-library";
import {
  androidBrandOptions,
  buildRouteRecommendations,
  statusOptions,
  type AndroidBrandId,
  type DeviceId,
  type RouteRecommendation,
  type StatusId,
  type VoyageTask,
} from "@/lib/voyage-system";

const SELECTION_KEY = "logbook.voyage.selection";
const ROUTE_PROGRESS_KEY = "logbook.routes.progress";

type StoredSelection = {
  devices: DeviceId[];
  androidBrand?: AndroidBrandId;
  status: StatusId;
};

function taskKey(route: RouteRecommendation, task: VoyageTask) {
  return `${route.id}:${task.id}:${task.label}`;
}

function readSelection(): StoredSelection {
  if (typeof window === "undefined") {
    return { devices: ["windows", "iphone"], status: "new" };
  }

  try {
    const raw = window.localStorage.getItem(SELECTION_KEY);
    return raw ? (JSON.parse(raw) as StoredSelection) : { devices: ["windows", "iphone"], status: "new" };
  } catch {
    return { devices: ["windows", "iphone"], status: "new" };
  }
}

function readProgress(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(ROUTE_PROGRESS_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function RouteCenter() {
  const [selection] = useState<StoredSelection>(() => readSelection());
  const [activeRouteId, setActiveRouteId] = useState("");
  const [progress, setProgress] = useState<string[]>(() => readProgress());

  const routes = useMemo(
    () => buildRouteRecommendations(selection.devices, selection.status, selection.androidBrand),
    [selection],
  );

  const activeRoute = routes.find((route) => route.id === activeRouteId) ?? routes[0];
  const activeTasks = activeRoute.segments.flatMap((segment) => segment.tasks);
  const activeProgress = activeTasks.length
    ? Math.round((progress.filter((id) => activeTasks.some((task) => taskKey(activeRoute, task) === id)).length / activeTasks.length) * 100)
    : 0;

  const toggleTask = (id: string) => {
    setProgress((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(ROUTE_PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const statusLabel = statusOptions.find((item) => item.id === selection.status)?.label ?? "从未出海";
  const androidLabel = androidBrandOptions.find((item) => item.id === selection.androidBrand)?.label;

  return (
    <div className="page-shell space-y-8 py-10 md:py-14">
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[1.05rem] border border-line bg-white/66 p-6 md:p-8">
          <p className="section-kicker">航线推荐页</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            你的第一条航线已生成。
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">
            当前状态：{statusLabel}
            {androidLabel ? ` / Android：${androidLabel}` : ""}。建议先完成一条主力设备航线，再扩展到其他设备。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/start" className="button-secondary">
              重新选择设备
            </Link>
            <Link href="/discoveries" className="button-secondary">
              自由探索
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          {routes.map((route) => {
            const tone = toneClassMap[route.tone];
            const selected = route.id === activeRoute.id;
            const stepCount = route.segments.reduce((sum, segment) => sum + segment.tasks.length, 0);

            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setActiveRouteId(route.id)}
                className={[
                  "rounded-[1rem] border p-5 text-left transition-colors",
                  selected ? tone.button : "border-line bg-white/58 hover:border-foreground",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted">{route.deviceLabel}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                      {route.name}
                    </h2>
                  </div>
                  <Compass size={20} className={tone.text} />
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{route.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className={`rounded-full px-2.5 py-1 ${tone.badge}`}>{route.difficulty}</span>
                  <span className="rounded-full border border-line bg-white/50 px-2.5 py-1 text-muted">
                    {route.estimatedTime}
                  </span>
                  <span className="rounded-full border border-line bg-white/50 px-2.5 py-1 text-muted">
                    {stepCount} 步
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="rounded-[1rem] border border-line bg-white/60 p-5">
          <p className="section-kicker">完成度</p>
          <p className="mt-4 text-5xl font-semibold tracking-tight text-foreground">
            {activeProgress}%
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/80">
            <span
              className={`block h-full ${toneClassMap[activeRoute.tone].line}`}
              style={{ width: `${Math.max(3, activeProgress)}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => requestLogbookLogin("登录后可以把这条航线保存到船员档案，未来换设备也能继续。")}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[0.85rem] border border-line bg-white/70 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            <ListChecks size={16} />
            保存到船员档案
          </button>
        </aside>

        <div className="space-y-4">
          {activeRoute.segments.map((segment) => (
            <article key={segment.id} className="rounded-[1rem] border border-line bg-white/64 p-5">
              <div className="flex items-start gap-3">
                <span className={`mt-2 inline-flex h-2.5 w-2.5 rounded-full ${toneClassMap[segment.tone].line}`} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">{segment.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">{segment.note}</p>
                  <div className="mt-4 space-y-3">
                    {segment.tasks.map((task) => {
                      const id = taskKey(activeRoute, task);
                      const done = progress.includes(id);
                      const tone = toneClassMap[task.tone];

                      return (
                        <div key={id} className="rounded-[0.9rem] border border-line bg-background/66 p-4">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => toggleTask(id)}
                              className="mt-0.5 text-foreground"
                              aria-label={done ? "取消完成" : "标记完成"}
                            >
                              {done ? <CheckCircle size={19} weight="fill" /> : <Circle size={19} />}
                            </button>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                {task.brand ? <BrandMark brand={task.brand} size="sm" showLabel={false} /> : null}
                                <h3 className="text-base font-semibold tracking-tight text-foreground">{task.label}</h3>
                                <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.22em] ${tone.badge}`}>
                                  {segment.title.replace(/第.站：/, "")}
                                </span>
                              </div>
                              <p className="mt-2 text-sm leading-7 text-muted">{task.note}</p>
                              <div className="mt-3 grid gap-2 text-xs leading-6 text-muted md:grid-cols-2">
                                <p className="rounded-[0.75rem] border border-line bg-white/60 p-3">常见问题：{task.faq}</p>
                                <p className="rounded-[0.75rem] border border-amber-200/70 bg-amber-50/80 p-3">风险提示：{task.risk}</p>
                              </div>
                              <Link
                                href={task.href}
                                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
                              >
                                继续学习
                                <ArrowUpRight size={13} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
