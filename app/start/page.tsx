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
    <div className="page-shell space-y-8 py-10 md:space-y-10 md:py-14">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.05rem] border border-line bg-white/70 p-6 md:p-8">
          <span className="eyebrow">登船入口</span>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,5vw,4.6rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            AI 时代的出海新手村。
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            真正的问题从来不是某个工具怎么买，而是你手上是什么设备、处在什么状态、第一步应该先做什么。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[0.9rem] border border-sky-200/80 bg-sky-50 p-4">
              <Path size={18} className="text-sky-700" />
              <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">按顺序</p>
              <p className="mt-2 text-sm leading-7 text-muted">从身份准备一路走到工具启航，不让你乱跳步骤。</p>
            </div>
            <div className="rounded-[0.9rem] border border-emerald-200/80 bg-emerald-50 p-4">
              <CompassRose size={18} className="text-emerald-700" />
              <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">按设备</p>
              <p className="mt-2 text-sm leading-7 text-muted">Windows、Mac、iPhone、Android 会得到不同航线。</p>
            </div>
            <div className="rounded-[0.9rem] border border-amber-200/80 bg-amber-50 p-4">
              <Sparkle size={18} className="text-amber-700" />
              <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">按状态</p>
              <p className="mt-2 text-sm leading-7 text-muted">从未出海、部分出海、已有账号，起点不同，补给也不同。</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.05rem] border border-line bg-background/60 p-6 md:p-8">
          <p className="section-kicker">这页会做什么</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>先让你选设备，再选当前状态，然后把航路自动排出来。</p>
            <p>每个步骤都可以标记完成、收藏，继续点进对应内容学习。</p>
            <p>你不需要先读 100 篇攻略，只需要先跑通一条属于自己的顺序。</p>
          </div>
        </div>
      </section>

      <VoyagePlanner mode="full" />
      <DeviceDock />
    </div>
  );
}
