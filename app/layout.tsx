import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteShell } from "@/components/site-shell";
import { getSearchEntries } from "@/lib/content";
import { buildMetadata, siteConfig } from "@/lib/site";
import { DM_Serif_Display, DM_Serif_Text, IBM_Plex_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-serif-display',
  style: ['normal', 'italic'],
});

const dmSerifText = DM_Serif_Text({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-serif-body',
  style: ['normal', 'italic'],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

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
    <html lang="zh-CN" className={cn(
      "font-sans",
      dmSerifDisplay.variable,
      dmSerifText.variable,
      ibmPlexMono.variable,
      inter.variable
    )}>
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
      </body>
    </html>
  );
}
