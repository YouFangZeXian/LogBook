import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteShell } from "@/components/site-shell";
import { getSearchEntries } from "@/lib/content";
import { buildMetadata, siteConfig } from "@/lib/site";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }),
  icons: {
    icon: [
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/logo-mark.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-64.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchEntries = getSearchEntries();

  return (
    <html lang="zh-CN" className={cn("font-sans", geist.variable)}>
      <head>
        <Script
          id="logbook-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var key = 'logbook.theme';
                  var stored = window.localStorage.getItem(key);
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (systemDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (error) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <TooltipProvider>
          <SiteShell searchEntries={searchEntries}>{children}</SiteShell>
        </TooltipProvider>
        {/* Scroll reveal observer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var observer = new IntersectionObserver(function(entries){
                  entries.forEach(function(entry){
                    if(entry.isIntersecting){
                      entry.target.classList.add('is-visible');
                    }
                  });
                },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
                document.querySelectorAll('.animate-on-scroll,.stagger').forEach(function(el){
                  observer.observe(el);
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
