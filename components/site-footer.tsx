import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background-soft/45">
      <div className="page-shell space-y-8 py-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.26em] text-muted [font-family:var(--font-mono),monospace]">
              路格舶 / 航海日志
            </p>
            <h2 className="max-w-3xl text-[clamp(1.8rem,3vw,3rem)] font-serif leading-tight tracking-[-0.03em] text-foreground">
              让 AI 出海的信息先有顺序，再有密度。
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-muted">
              {siteConfig.footerDisclaimer}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                航路
              </p>
              <div className="grid gap-2 text-sm text-muted">
                {siteConfig.navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted [font-family:var(--font-mono),monospace]">
                联系
              </p>
              <div className="space-y-2 text-sm leading-7 text-muted">
                <p>邮箱：{siteConfig.email}</p>
                <p>微信：{siteConfig.wechatPlaceholder}</p>
                <p>品牌语：{siteConfig.motto}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
