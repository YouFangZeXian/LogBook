import Link from "next/link";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react/dist/ssr";

import { BrandMark } from "@/components/brand-mark";
import { toneClassMap, type BrandId, type BrandTone } from "@/lib/brand-library";
import { buildMetadata, siteConfig } from "@/lib/site";

const discoveries: {
  title: string;
  kind: string;
  note: string;
  href: string;
  brand: BrandId;
  tone: BrandTone;
}[] = [
  {
    title: "Codex 项目实战路线",
    kind: "AI 开发",
    note: "适合已经能访问基础 AI 工具，想把想法快速做成网站或小工具的人。",
    href: "/articles/cursor-claude-code-codex-comparison",
    brand: "codex",
    tone: "ocean",
  },
  {
    title: "Suno 音乐支线",
    kind: "AI 音乐",
    note: "适合先试创作，不急着订阅，重点关注地区可用性和版权边界。",
    href: "/resources",
    brand: "suno",
    tone: "forest",
  },
  {
    title: "Gemini / Google 生态入口",
    kind: "AI 视频与搜索",
    note: "适合已经准备好 Google 账号，想继续探索 Flow、Veo 和 Gemini 的用户。",
    href: "/start",
    brand: "gemini",
    tone: "berry",
  },
  {
    title: "Perplexity 资料检索",
    kind: "AI 搜索",
    note: "适合做资料整理、选题研究和快速查证，不建议当成唯一主力模型。",
    href: "/resources",
    brand: "perplexity",
    tone: "ocean",
  },
];

export const metadata = buildMetadata({
  title: `新大陆 | ${siteConfig.shortName}`,
  description: "整理新的 AI 工具、免费额度、新玩法和适合继续探索的支线入口。",
  path: "/discoveries",
});

export default function DiscoveriesPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-panel p-6 md:p-8">
          <p className="section-kicker">新大陆</p>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            主航道跑通后，
            <br />
            再来看新的入口和玩法。
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">
            这里记录新 AI 工具、新免费额度、新项目案例和临时开放机会。它不是主线教程，而是自由探索的海图。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <Sparkle size={22} className="text-accent" />
          <p className="mt-5 text-sm leading-8 text-muted">
            新大陆内容变化快，所有入口都默认带风险提示：先小范围测试，再考虑订阅、绑定支付或长期迁移。
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {discoveries.map((item) => {
          const tone = toneClassMap[item.tone];

          return (
            <Link
              key={item.title}
              href={item.href}
              className="surface-panel p-5 transition-colors hover:border-foreground hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${tone.badge}`}>
                    {item.kind}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                </div>
                <BrandMark brand={item.brand} size="sm" showLabel={false} />
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{item.note}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                继续查看
                <ArrowUpRight size={14} />
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
