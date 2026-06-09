import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background-soft/55">
      <div className="page-shell py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="section-kicker">路格舶 / 航海日志</p>
            <h2 className="max-w-3xl text-[clamp(1.8rem,3vw,3.1rem)] font-serif leading-[1.06] tracking-[-0.04em] text-foreground">
              先把主航道讲明白，后面的工具、支付和日志才不会挤成一团。
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-muted">
              {siteConfig.footerDisclaimer}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="surface-panel p-5">
              <p className="section-kicker">航路</p>
              <div className="mt-4 grid gap-2 text-sm text-muted">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between border-b border-line/80 py-2.5 transition-colors last:border-b-0 hover:text-foreground"
                  >
                    {item.label}
                    <span className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-mono),monospace]">
                      go
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface-muted p-5">
              <p className="section-kicker">联系</p>
              <div className="mt-4 space-y-2 text-sm leading-7 text-muted">
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
