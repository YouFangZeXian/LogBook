import Link from "next/link";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { toneClassMap } from "@/lib/brand-library";
import { buildMetadata, siteConfig } from "@/lib/site";
import { discoveryItems } from "@/data/discoveries";

export const metadata = buildMetadata({
  title: `新大陆 — 新工具·新玩法·新发现 | ${siteConfig.shortName}`,
  description: "发现新的 AI 工具、免费额度、订阅方式、玩法、渠道和项目案例。与首页精选不同，这里展示完整的发现流。",
  path: "/discoveries",
});

export default function DiscoveriesPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      {/* ── Hero ── */}
      <section className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-panel p-6 md:p-8">
          <p className="section-kicker">新大陆</p>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            主航道跑通后，
            <br />
            再来看新的入口和玩法。
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">
            这里记录新 AI 工具、新免费额度、新项目案例和临时开放机会。它不是主线教程，而是自由探索的海图。与首页精选不同，这里展示完整发现流。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <Sparkle size={22} className="text-accent" />
          <p className="mt-5 text-sm leading-8 text-muted">
            新大陆内容变化快，所有入口都默认带风险提示：先小范围测试，再考虑订阅、绑定支付或长期迁移。
          </p>
          <p className="mt-4 text-sm leading-8 text-muted">
            如果你有新的发现，欢迎<Link href="/contribute" className="text-brand-sea underline underline-offset-4 hover:text-brand">投稿到船舱</Link>。
          </p>
        </div>
      </section>

      {/* ── Discovery Feed ── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Sparkle size={18} weight="duotone" className="text-gold" />
          <h2 className="heading-section text-xl">全部发现</h2>
          <span className="text-sm text-muted">（共 {discoveryItems.length} 条）</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {discoveryItems.map((item) => {
            const tone = toneClassMap[item.tone];
            return (
              <Link
                key={item.title}
                href={item.href}
                className="surface-panel p-5 transition-all hover:border-brand/20 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${tone.badge}`}
                      >
                        {item.kind}
                      </span>
                      {item.timeLabel ? (
                        <span className="text-[11px] text-faint [font-family:var(--font-mono)]">
                          {item.timeLabel}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <BrandMark brand={item.brand} size="sm" showLabel={false} />
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{item.note}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-sea hover:text-brand transition-colors">
                  继续查看
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Bottom note ── */}
      <section>
        <div className="surface-mist p-6 text-center">
          <p className="text-sm leading-7 text-muted">
            没找到你想要的？<Link href="/contribute" className="text-brand-sea underline underline-offset-4 font-medium hover:text-brand">把你知道的新大陆告诉船舱</Link>，帮下一位船员发现新航线。
          </p>
        </div>
      </section>
    </div>
  );
}
