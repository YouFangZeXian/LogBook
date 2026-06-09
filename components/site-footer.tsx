import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="page-shell py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Brand + disclaimer */}
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-foreground">路格舶</p>
            <p className="mt-2 text-xs leading-6 text-muted">{siteConfig.footerDisclaimer}</p>
          </div>

          {/* Nav links — inline row, wraps on small screens */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="text-sm leading-6 text-muted">
            <p>邮箱：{siteConfig.email}</p>
            <p className="mt-0.5">{siteConfig.motto}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
