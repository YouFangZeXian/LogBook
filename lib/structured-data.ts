import { absoluteUrl, siteConfig } from "@/lib/site";

type ArticleStructuredData = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
};

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "zh-CN",
      },
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
    ],
  };
}

export function articleJsonLd(article: ArticleStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    articleSection: "订阅、支付与工具指南",
    keywords: article.tags.join(", "),
    inLanguage: "zh-CN",
  };
}
