import { CompassRose, Path, Sparkle } from "@phosphor-icons/react/dist/ssr";

import { DeviceDock } from "@/components/device-dock";
import { VoyagePlanner } from "@/components/voyage-planner";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `欢迎登船 | ${siteConfig.shortName}`,
  description:
    "按设备与当前状态生成身份、网络、账号、支付与 AI 工具启航顺序。不是看 100 篇攻略，而是先给你一条能走通的航路。",
  path: "/start",
});

export default function StartPage() {
  return (
    <div className="page-shell space-y-6 py-6 md:space-y-8 md:py-10">
      {/* ── Compact Hero ── */}
      <section className="surface-panel p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="section-kicker">登船入口</span>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
              选设备、定状态，航线自己长出来。
            </h1>
          </div>
          <div className="flex gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1"><Path size={14} className="text-accent" />按顺序</span>
            <span className="inline-flex items-center gap-1"><CompassRose size={14} className="text-accent" />按设备</span>
            <span className="inline-flex items-center gap-1"><Sparkle size={14} className="text-accent" />按状态</span>
          </div>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted max-w-3xl">
          先让你选设备，再选当前状态，主航道和支线自动排出来。不需要先读 100 篇攻略，只需要先跑通一条属于自己的顺序。
        </p>
      </section>

      <VoyagePlanner mode="full" />
      <DeviceDock />
    </div>
  );
}
