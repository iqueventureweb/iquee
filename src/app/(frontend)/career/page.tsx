import { CareerHero } from "@/components/Career/CareerHero";
import { CareerListings } from "@/components/Career/CareerListings";
import { SEO_CONFIG } from "@/lib/constants";
import { getCareers } from "@/lib/fetchMethods";
import { generateEnhancedMeta } from "@/utilities/seoUtils";
import type { Metadata } from "next";

export const metadata: Metadata = generateEnhancedMeta({
  title: SEO_CONFIG.PAGES.CAREER.TITLE,
  description: SEO_CONFIG.PAGES.CAREER.DESCRIPTION,
  url: "/career",
  type: "website",
  section: "Career",
  tags: SEO_CONFIG.KEYWORDS.CAREER,
});

export default async function CareerPage() {
  const careers = await getCareers();

  return (
    <div className="min-h-screen">
      <CareerHero />
      <CareerListings careers={careers} />
    </div>
  );
}
