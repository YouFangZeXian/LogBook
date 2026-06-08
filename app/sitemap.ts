import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/content";
import { categories, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/start",
    "/category",
    "/tools",
    "/resources",
    "/routes",
    "/discoveries",
    "/contribute",
    "/crew",
    "/products",
    "/about",
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${siteConfig.url}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...articleRoutes];
}
