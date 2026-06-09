import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="page-shell grid gap-8 py-10 sm:grid-cols-3">
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
    </footer>
  );
}
