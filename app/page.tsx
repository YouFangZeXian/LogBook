import Script from "next/script";

import { HomeExperience } from "@/components/home-experience";
import { getAllCategoryStats, getFeaturedArticles, getLatestArticles } from "@/lib/content";
import { homeJsonLd } from "@/lib/structured-data";
import { resourceItems } from "@/data/resources";

export default function Home() {
  const latestArticles = getLatestArticles(6);
  const featuredArticles = getFeaturedArticles(3);
  const categoryStats = getAllCategoryStats();

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <HomeExperience
        latestArticles={latestArticles}
        featuredArticles={featuredArticles}
        categories={categoryStats}
        resources={resourceItems}
      />
    </>
  );
}
