import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 bg-white/80">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              AI 出海生存指南
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              帮你少踩坑、少花冤枉钱，先把路走顺。
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            {siteConfig.footerDisclaimer}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <p>联系邮箱：{siteConfig.email}</p>
          <p>微信占位：{siteConfig.wechatPlaceholder}</p>
        </div>
      </div>
    </footer>
  );
}
