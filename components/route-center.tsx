"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Circle, Compass } from "@phosphor-icons/react/dist/ssr";
import { BrandMark } from "@/components/brand-mark";
import { requestLogbookLogin } from "@/components/auth-dialog";
import { androidBrandOptions, buildRouteRecommendations, statusOptions, type AndroidBrandId, type DeviceId, type RouteRecommendation, type StatusId, type VoyageTask } from "@/lib/voyage-system";

const SELECTION_KEY = "logbook.voyage.selection";
const ROUTE_PROGRESS_KEY = "logbook.routes.progress";

type StoredSelection = { devices: DeviceId[]; androidBrand?: AndroidBrandId; status: StatusId };

function readSelection(): StoredSelection {
  try { const raw = window.localStorage.getItem(SELECTION_KEY); return raw ? JSON.parse(raw) : { devices: ["windows", "iphone"], status: "new" }; } catch { return { devices: ["windows", "iphone"], status: "new" }; }
}
function readProgress(): string[] {
  try { return JSON.parse(window.localStorage.getItem(ROUTE_PROGRESS_KEY) ?? "[]"); } catch { return []; }
}
function taskKey(route: RouteRecommendation, task: VoyageTask) { return `${route.id}:${task.id}:${task.label}`; }

export function RouteCenter() {
  const [selection] = useState<StoredSelection>(() => readSelection());
  const [activeRouteId, setActiveRouteId] = useState("");
  const [progress, setProgress] = useState<string[]>(() => readProgress());

  const routes = useMemo(() => buildRouteRecommendations(selection.devices, selection.status, selection.androidBrand), [selection]);
  const activeRoute = routes.find((r) => r.id === activeRouteId) ?? routes[0];
  const activeTasks = activeRoute.segments.flatMap((s) => s.tasks);
  const activeProgress = activeTasks.length ? Math.round((progress.filter((id) => activeTasks.some((t) => taskKey(activeRoute, t) === id)).length / activeTasks.length) * 100) : 0;

  const toggleTask = (id: string) => {
    setProgress((c) => { const n = c.includes(id) ? c.filter((x) => x !== id) : [...c, id]; window.localStorage.setItem(ROUTE_PROGRESS_KEY, JSON.stringify(n)); return n; });
  };

  return (
    <div className="page-shell space-y-8 py-8 md:py-12">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface p-6 md:p-8">
          <p className="kicker">航线推荐页</p>
          <h1 className="heading-hero mt-4">你的第一条航线已生成。</h1>
          <p className="body-text mt-4">根据设备与状态，推荐先跑通一条主力设备航线。</p>
          <div className="mt-6 flex gap-2">
            <Link href="/start" className="btn-secondary">重新选择设备</Link>
            <Link href="/discoveries" className="btn-ghost">自由探索</Link>
          </div>
        </div>
        <div className="grid gap-3">
          {routes.map((route) => {
            const selected = route.id === activeRoute.id;
            return (
              <button key={route.id} type="button" onClick={() => setActiveRouteId(route.id)}
                className={`rounded-[18px] border p-5 text-left transition-all ${
                  selected ? "border-brand/30 bg-brand-mist-soft" : "border-border bg-white hover:border-border-medium"
                }`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-faint [font-family:var(--font-mono)]">{route.deviceLabel}</p>
                    <h2 className="mt-2 text-xl font-semibold text-foreground">{route.name}</h2>
                  </div>
                  <Compass size={18} className="text-brand-sea" />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{route.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="tag">{route.difficulty}</span>
                  <span className="tag">{route.estimatedTime}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="surface-muted p-5">
          <p className="kicker">完成度</p>
          <p className="mt-4 text-5xl font-semibold tracking-[-0.02em] text-foreground">{activeProgress}%</p>
          <div className="mt-5 h-2 rounded-full bg-white overflow-hidden"><span className="block h-full rounded-full bg-brand-sea transition-all duration-700 ease-out" style={{ width: `${Math.max(4, activeProgress)}%`, '--progress': activeProgress / 100 } as React.CSSProperties} /></div>
          <button type="button" onClick={() => requestLogbookLogin("登录后可保存航线到船员档案。")}
            className="btn-ghost mt-5 w-full text-sm">保存到船员档案</button>
        </aside>
        <div className="space-y-4">
          {activeRoute.segments.map((seg) => (
            <div key={seg.id} className="surface p-5">
              <h2 className="text-xl font-semibold text-foreground">{seg.title}</h2>
              <p className="mt-2 body-sm">{seg.note}</p>
              <div className="mt-4 space-y-3">
                {seg.tasks.map((task) => {
                  const id = taskKey(activeRoute, task);
                  const done = progress.includes(id);
                  return (
                    <div key={id} className="surface-muted flex gap-3 p-4">
                      <button type="button" onClick={() => toggleTask(id)} className="mt-0.5 shrink-0">
                        {done ? <CheckCircle size={20} weight="fill" className="text-success" /> : <Circle size={20} className="text-faint" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {task.brand ? <BrandMark brand={task.brand} size="sm" showLabel={false} /> : null}
                          <h3 className="text-base font-semibold text-foreground">{task.label}</h3>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted">{task.note}</p>
                        <p className="mt-2 text-xs leading-6 text-muted">✅ 常见：{task.faq}</p>
                        <p className="text-xs leading-6 text-warning">⚠️ 风险：{task.risk}</p>
                        <Link href={task.href} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-sea transition-colors hover:text-brand">
                          继续学习 <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
