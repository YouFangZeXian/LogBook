import { productItems } from "@/data/products";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  title: "产品页 | AI 出海生存指南",
  description: "展示即将上线的数字产品占位，不接支付，只保留说明与联系方式。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="page-shell space-y-8 py-10 md:py-14">
      <section className="card p-6 md:p-8">
        <span className="eyebrow">数字产品</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          先做内容占位，后续再决定什么时候正式上线
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          当前页面只负责展示产品方向、价格带和联系方式，不接支付，不承诺效果，也不会做夸张宣传。
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {productItems.map((product) => (
          <article key={product.title} className="card flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                  {product.status}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {product.title}
                </h2>
              </div>
              <span className="rounded-full bg-soft px-3 py-1 text-sm font-medium text-foreground">
                {product.price}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{product.description}</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/85">
              {product.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
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
