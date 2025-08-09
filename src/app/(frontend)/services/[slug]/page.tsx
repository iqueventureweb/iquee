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
  console.log("[ServicePage] incoming params:", { slug });

  // Test environment variables
  console.log("[ServicePage] DATABASE_URI exists:", !!process.env.DATABASE_URI);
  console.log(
    "[ServicePage] PAYLOAD_SECRET exists:",
    !!process.env.PAYLOAD_SECRET
  );

  try {
    // Fetch service data by slug
    const service = await getServiceBySlug(slug);
    console.log("[ServicePage] getServiceBySlug result:", service);

    if (!service) {
      console.error("[ServicePage] service not found for slug:", slug);

      // Try to get all services to see what's available
      const allServices = await getServices();
      console.log(
        "[ServicePage] all available services:",
        allServices?.map((s) => ({ id: s.id, slug: s.slug, title: s.title }))
      );

      notFound();
    }

    // Fetch projects for this service
    const projects = await getProjectsByService(service.id);
    console.log("[ServicePage] fetched:", {
      service: { id: service.id, title: service.title, slug: service.slug },
      projectsCount: projects.length,
    });

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
    console.log("[Service generateStaticParams] all services:", services);

    if (!services || services.length === 0) {
      console.warn("[Service generateStaticParams] no services found");
      return [];
    }

    const params = services.map((service) => ({
      slug: service.slug,
    }));

    console.log(
      `[Service generateStaticParams] generated ${params.length} params:`,
      params.map((p) => p.slug)
    );

    return params;
  } catch (error) {
    console.error("Error generating static params for services:", error);
    return [];
  }
}
