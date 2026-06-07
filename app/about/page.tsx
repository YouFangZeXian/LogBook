import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `关于本站 | ${siteConfig.shortName}`,
  description: "说明网站定位、服务边界和内容原则。",
  path: "/about",
});

const principles = [
  "记录真实踩坑经验，不写空泛“工具测评合集”。",
  "帮助学生和个人开发者低成本使用 AI，而不是制造焦虑。",
  "不提供违法、盗版、破解、黑卡、欺诈相关服务。",
  "不承诺收益，不写“保证成功”的表达。",
  "支付和订阅相关内容都以风险提示和合法购买为前提。",
];

export default function AboutPage() {
  return (
    <div className="page-shell space-y-8 py-10 md:py-14">
      <section className="card p-6 md:p-8">
        <span className="eyebrow">关于本站</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          这是一个给后来者指路的实用信息站
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          站点的核心价值不是“告诉你一切都很简单”，而是尽量把真实世界里那些订阅、支付、账号和工具使用的细节说清楚，让你少走弯路。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {principles.map((principle) => (
          <div key={principle} className="card p-6 text-sm leading-7 text-foreground/90">
            {principle}
          </div>
        ))}
      </section>
    </div>
  );
}
