import { Compass, Handshake, ShieldCheck, Warning } from "@phosphor-icons/react/dist/ssr";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `关于 — 品牌·边界·原则 | ${siteConfig.shortName}`,
  description: "路格舶是什么、为什么叫路格舶、品牌释义、内容原则、不做什么以及联系方式。",
  path: "/about",
});

const principles = [
  "记录真实踩坑经验，不写空泛的工具测评合集。",
  "帮助学生和个人开发者低成本使用 AI，而不是制造焦虑。",
  "不提供违法、盗版、破解、黑卡、欺诈相关服务。",
  "不承诺收益，不写保证成功的表达。",
  "支付和订阅相关内容都以风险提示和合法购买为前提。",
];

const dontDo = [
  { label: "不做黑卡", desc: "不提供任何形式的黑卡、被盗卡、虚假支付工具。" },
  { label: "不做盗版", desc: "不提供破解软件、盗版内容或侵权资源。" },
  { label: "不做破解", desc: "不教人绕过正版授权或破解付费服务。" },
  { label: "不做诈骗", desc: "不做虚假承诺、收益保证或诱导性推广。" },
  { label: "不做夸张收益", desc: "不会写「月入10万」「轻松暴富」类的内容。" },
];

export default function AboutPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      {/* ── Hero ── */}
      <section className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">关于本站</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            这是一个给后来者指路的
            <br />
            实用信息站。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            站点的核心价值不是告诉你一切都很简单，而是尽量把真实世界里那些订阅、支付、账号和工具使用的细节说清楚，让你少走弯路。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">站点边界</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>这里整理的是合法、可持续、能长期复用的经验，不碰灰色路径。</p>
            <p>品牌词可以有世界观，SEO 和理解仍然用正常语言，这是路格舶的基本方法。</p>
          </div>
        </div>
      </section>

      {/* ── Brand Etymology ── */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="surface p-6 text-center">
          <Compass size={24} weight="duotone" className="mx-auto text-brand" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">路，是路径</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            出海的第一步不是工具，而是搞清楚自己手里的设备、状态和起点，找到那条能走通的路径。
          </p>
        </div>
        <div className="surface p-6 text-center">
          <Handshake size={24} weight="duotone" className="mx-auto text-brand-sea" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">格，是格物</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            不写空泛的测评，不堆砌工具列表。把每个工具、每种支付、每个账号的实际细节搞清楚。
          </p>
        </div>
        <div className="surface p-6 text-center">
          <ShieldCheck size={24} weight="duotone" className="mx-auto text-gold" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">舶，是远洋之船</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            一群人一起出海，比一个人孤船更安全。这里是船舱，每条航线都由船员共同绘制。
          </p>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="space-y-4">
        <h2 className="heading-section">内容原则</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle} className="surface p-5 text-sm leading-7 text-foreground/90">
              {principle}
            </div>
          ))}
        </div>
      </section>

      {/* ── What We Don't Do ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Warning size={20} weight="duotone" className="text-danger" />
          <h2 className="heading-section">路格舶不做什么</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dontDo.map((item) => (
            <div key={item.label} className="surface-muted border-danger/10 p-5">
              <p className="font-semibold text-foreground">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact & Disclaimer ── */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="surface p-6">
          <h2 className="heading-section text-lg">联系方式</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
            <p>📧 邮箱：hello@example.com（待更新）</p>
            <p>💬 QQ 群：待创建（早期船员社群）</p>
            <p>📱 微信：待补充</p>
            <p className="mt-4 text-faint text-xs">
              联系方式将在社群正式启动时更新。早期投稿者优先获得群入口和站长联系方式。
            </p>
          </div>
        </div>
        <div className="surface-muted p-6">
          <h2 className="heading-section text-lg">免责声明</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
            <p>
              本站所有内容仅供信息参考和经验整理，不构成任何形式的投资建议、购买建议或法律建议。
            </p>
            <p>
              支付渠道、订阅价格和可用性会随时间变化，请在操作前自行核实最新信息。本站不对因参考本站内容而导致的任何损失承担责任。
            </p>
            <p>
              本站不提供代购、代付、代注册等中介服务。所有链接和推荐基于编辑判断，部分链接可能包含 affiliate 标记。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
