import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { ConversionLink } from "@/components/conversion-link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { productItems } from "@/data/products";
import { buildMetadata, siteConfig } from "@/lib/site";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? siteConfig.email ?? "hello@logbook.today";
const wechatId = process.env.NEXT_PUBLIC_WECHAT_ID ?? "logbook-today";

export const metadata = buildMetadata({
  title: `产品页 | ${siteConfig.shortName}`,
  description: "路格舶数字产品预售意向页：订阅避坑清单、Apple ID 与礼品卡指南、学生低成本 AI 工具组合方案。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="page-shell space-y-8 py-8 md:space-y-10 md:py-12">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel p-6 md:p-8">
          <span className="section-kicker">数字产品</span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            把最常踩的坑，
            <br />
            先整理成能直接用的清单。
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            当前不接自动支付，先收集购买意向和问题。你可以邮件联系，也可以订阅更新，
            等正式交付说明、售后边界和版本更新规则补齐后再上线。
          </p>
        </div>

        <div className="surface-muted p-6 md:p-8">
          <p className="section-kicker">联系与承接</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>
              邮箱：
              <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
            <p>微信占位：{wechatId}</p>
            <NewsletterSignup source="products_page" />
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {productItems.map((product) => {
          const mailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(`咨询 ${product.title}`)}`;

          return (
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
                <span className="rounded-[8px] border border-line bg-background/72 px-3 py-1 text-sm font-medium text-foreground">
                  {product.price}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{product.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/85">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <ConversionLink
                  href={mailHref}
                  className="btn-primary text-sm"
                  eventType="product_interest"
                  target={product.title}
                  metadata={{ price: product.price, channel: "email" }}
                >
                  咨询上线时间 <ArrowUpRight size={14} />
                </ConversionLink>
                <p className="text-xs leading-6 text-muted">
                  不承诺收益，不做违规账号、破解、黑卡和代付服务。
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
