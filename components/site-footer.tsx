import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      {/* CTA */}
      <div className="page-shell py-14 md:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="heading-section">准备好启航了吗？</h2>
          <p className="body-text mt-4">
            出海从来不是囤积工具，而是先知道该往哪边走。每篇指南、每个工具对比、每条支付提醒，都是写给正在出发的你。
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/start" className="btn-primary">
              开始登船 <ArrowUpRight size={16} />
            </Link>
            <Link href="/category" className="btn-secondary">
              浏览航路
            </Link>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="page-shell border-t border-border py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-foreground">路格舶</p>
            <p className="mt-3 text-sm leading-6 text-muted">{siteConfig.footerDisclaimer}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">航路</p>
            <div className="mt-3 space-y-2 text-sm text-muted">
              {siteConfig.navigation.map((item) => (
                <Link key={item.href} href={item.href} className="block transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">联系</p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>邮箱：{siteConfig.email}</p>
              <p>{siteConfig.motto}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
