import Script from "next/script";
import { HomeExperience } from "@/components/home-experience";
import { homeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <Script id="home-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }} />
      <HomeExperience />
    </>
  );
}
