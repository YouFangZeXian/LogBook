import { ContributionPanel } from "@/components/contribution-panel";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `投稿与勘误 — 把发现交给船舱 | ${siteConfig.shortName}`,
  description: "提交新工具发现、补充信息、错误纠正、问题求助、Vibe Coding 作品和 AI 变现经验。早期投稿者未来可继承高级船员身份。",
  path: "/contribute",
});

export default function ContributePage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      {/* ── Hero ── */}
      <section className="surface-panel p-6 md:p-8">
        <p className="section-kicker">投稿 / 勘误 / 问题反馈</p>
        <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
          船舱想听见你的故事。
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">
          你可以提交新工具发现、踩坑记录、补充信息、错误纠正，或者提出当前内容还没有覆盖的问题。每一次投稿，都是在帮下一位船员少绕一段远路。
        </p>
      </section>

      {/* ── Submission Panel ── */}
      <ContributionPanel />

      {/* ── Contribution Guide ── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="surface p-5">
          <p className="font-semibold text-foreground">什么内容适合投稿？</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted list-disc pl-4">
            <li>你发现的新的 AI 工具或服务</li>
            <li>比现有方案更优惠的订阅路径</li>
            <li>某个教程里没有覆盖的细节</li>
            <li>你踩过的坑和最终解决方案</li>
          </ul>
        </div>
        <div className="surface p-5">
          <p className="font-semibold text-foreground">投稿后会发生什么？</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted list-disc pl-4">
            <li>记录到本地投稿箱</li>
            <li>审核通过后更新到对应页面</li>
            <li>纳入你的航海里程统计</li>
            <li>优秀投稿者将显示在船员页</li>
          </ul>
        </div>
        <div className="surface p-5">
          <p className="font-semibold text-foreground">早期投稿者权益</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted list-disc pl-4">
            <li>未来社区上线时继承高级船员身份</li>
            <li>优先加入 QQ 群和社群</li>
            <li>获得站长联系方式</li>
            <li>参与网站方向和内容决策</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
