import { ApplicationForm } from "@/components/Career/ApplicationForm";
import { getCareerBySlug } from "@/lib/fetchMethods";
import { generateEnhancedMeta } from "@/utilities/seoUtils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ApplicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ApplicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);

  if (!career) {
    return {
      title: "Position Not Found",
      description: "The requested position could not be found.",
    };
  }

  return generateEnhancedMeta({
    title: `Apply for ${career.title} Position`,
    description: `Apply for the ${career.title} position at iQue. Join our dynamic team and grow your career with us.`,
    url: `/career/apply/${career.slug}`,
    type: "website",
    section: "Career",
    tags: ["careers", "jobs", "application", career.title.toLowerCase()],
  });
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);

  if (!career || career.status !== "active") {
    notFound();
  }

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-neutral-50 to-white">
      <ApplicationForm career={career} />
    </div>
  );
}
