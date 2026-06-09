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
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">登船入口</span>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.7rem)] font-serif leading-[0.96] tracking-[-0.05em] text-foreground">
            先确认你手里的设备，
            <br />
            再确认你现在在哪段海面。
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            真正的问题从来不是某个工具怎么买，而是你现在手上是什么设备、处在什么状态、第一步应该先做什么。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="surface-muted p-4">
              <Path size={18} className="text-accent" />
              <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">按顺序</p>
              <p className="mt-2 text-sm leading-7 text-muted">从身份准备一路走到工具启航，不让你乱跳步骤。</p>
            </div>
            <div className="surface-muted p-4">
              <CompassRose size={18} className="text-accent" />
              <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">按设备</p>
              <p className="mt-2 text-sm leading-7 text-muted">Windows、Mac、iPhone、Android 会得到不同航线。</p>
            </div>
            <div className="surface-muted p-4">
              <Sparkle size={18} className="text-accent" />
              <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">按状态</p>
              <p className="mt-2 text-sm leading-7 text-muted">起点不同，后面需要的补给和工具也不同。</p>
            </div>
          </div>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">这页会做什么</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>先让你选设备，再选当前状态，然后把主航道和支线自动排出来。</p>
            <p>每个步骤都可以标记完成、收藏，并继续点进对应内容学习。</p>
            <p>你不需要先读 100 篇攻略，只需要先跑通一条属于自己的顺序。</p>
          </div>
        </div>
      </section>

      <VoyagePlanner mode="full" />
      <DeviceDock />
    </div>
  );
}
