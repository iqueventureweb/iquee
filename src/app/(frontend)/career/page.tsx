import { CareerHero } from "@/components/Career/CareerHero";
import { CareerListings } from "@/components/Career/CareerListings";
import { getCareers } from "@/lib/fetchMethods";
import { generateEnhancedMeta } from "@/utilities/seoUtils";
import type { Metadata } from "next";

export const metadata: Metadata = generateEnhancedMeta({
  title: "Career Opportunities at iQue",
  description:
    "Join our dynamic team and explore exciting career opportunities in technology, innovation, and entrepreneurship.",
  url: "/career",
  type: "website",
  section: "Career",
  tags: ["careers", "jobs", "employment", "work", "opportunities"],
});

export default async function CareerPage() {
  const careers = await getCareers();

  return (
    <div className="min-h-screen bg-white">
      <CareerHero />
      <CareerListings careers={careers} />
    </div>
  );
}
