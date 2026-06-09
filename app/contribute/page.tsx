import { ContributionPanel } from "@/components/contribution-panel";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `投稿与勘误 | ${siteConfig.shortName}`,
  description: "提交投稿、补充、纠错和还没有写到的问题，帮助路格舶完善航海日志。",
  path: "/contribute",
});

export default function ContributePage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="surface-panel p-6 md:p-8">
        <p className="section-kicker">投稿 / 勘误 / 问题反馈</p>
        <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
          船舱想听见你的故事。
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">
          你可以提交新工具发现、踩坑记录、补充信息、错误纠正，或者提出当前内容还没有覆盖的问题。
        </p>
      </section>
      <ContributionPanel />
    </div>
  );
}
