import Script from "next/script";
import { HomeExperience } from "@/components/home-experience";
import { getLatestArticles } from "@/lib/content";
import { homeJsonLd } from "@/lib/structured-data";

export default function Home() {
  const latestArticles = getLatestArticles(3);

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <HomeExperience latestArticles={latestArticles} />
    </>
  );
}
