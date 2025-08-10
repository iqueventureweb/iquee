import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ServiceContent } from "@/components/ServiceContent";
import { ServiceHero } from "@/components/ServiceHero";
import {
  getProjectsByService,
  getServiceBySlug,
  getServices,
} from "@/lib/fetchMethods";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  try {
    // Fetch service data by slug
    const service = await getServiceBySlug(slug);

    if (!service) {
      notFound();
    }

    // Fetch projects for this service
    const projects = await getProjectsByService(service.id);

    return (
      <div className="min-h-screen">
        {/* Hero Section with Header */}
        <ServiceHero service={service} />

        {/* Service Content */}
        <ServiceContent service={service} />

        {/* Projects Grid */}
        {projects.length > 0 && (
          <ProjectsGrid projects={projects} serviceSlug={service.slug} />
        )}
      </div>
    );
  } catch (error) {
    console.error("[ServicePage] Error:", error);
    notFound();
  }
}

// Generate static params for all services
export async function generateStaticParams() {
  try {
    const services = await getServices();

    if (!services || services.length === 0) {
      console.warn("[Service generateStaticParams] no services found");
      return [];
    }

    const params = services.map((service) => ({
      slug: service.slug,
    }));

    return params;
  } catch (error) {
    console.error("Error generating static params for services:", error);
    return [];
  }
}
