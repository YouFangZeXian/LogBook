import { productItems } from "@/data/products";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `产品页 | ${siteConfig.shortName}`,
  description: "展示即将上线的数字产品占位，不接支付，只保留说明与联系方式。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">数字产品</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-serif leading-[0.98] tracking-[-0.05em] text-foreground">
            先把产品方向摆出来，
            <br />
            再决定什么时候正式上线。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            当前页面只负责展示产品方向、价格带和联系方式，不接支付，不承诺效果，也不会做夸张宣传。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">当前状态</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>产品区先作为后续转化入口占位，重点是让用户知道你后面会卖什么，而不是立刻逼单。</p>
            <p>真正接支付前，建议先补清售后边界、交付方式和联系方式，再决定是否上架。</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {productItems.map((product) => (
          <article key={product.title} className="surface-panel flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent [font-family:var(--font-mono),monospace]">
                  {product.status}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {product.title}
                </h2>
              </div>
              <span className="rounded-[10px] border border-line bg-background/72 px-3 py-1 text-sm font-medium text-foreground">
                {product.price}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{product.description}</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/85">
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="mt-auto pt-6 text-sm leading-7 text-muted">
              联系方式占位：hello@example.com / 微信待补充
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
