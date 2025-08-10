import { ProjectContent } from "@/components/ProjectContent";
import { ProjectHero } from "@/components/ProjectHero";
import {
  getProjectsByService,
  getServiceBySlug,
  getServices,
} from "@/lib/fetchMethods";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    projectSlug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, projectSlug } = await params;

  try {
    // Fetch service data by slug
    const service = await getServiceBySlug(slug);

    if (!service) {
      console.error("[ProjectPage] service not found for slug:", slug);
      notFound();
    }

    // Fetch projects for this service
    const projects = await getProjectsByService(service.id);

    // Find the specific project by slug
    const project = projects.find((p) => p.slug === projectSlug);
    if (!project) {
      console.error(
        "[ProjectPage] project not found for slug within service:",
        projectSlug,
        service.slug
      );
      notFound();
    }

    return (
      <div className="min-h-screen">
        {/* Project Hero */}
        <ProjectHero project={project} service={service} />

        {/* Project Content */}
        <ProjectContent project={project} />
      </div>
    );
  } catch (error) {
    console.error("[ProjectPage] Error:", error);
    notFound();
  }
}

// Generate static params for all project routes
export async function generateStaticParams() {
  try {
    const services = await getServices();
    const staticParams = [];

    if (!services || services.length === 0) {
      console.warn("[Project generateStaticParams] no services found");
      return [];
    }

    // For each service, get its projects and generate params
    for (const service of services) {
      try {
        const projects = await getProjectsByService(service.id);

        if (projects && projects.length > 0) {
          for (const project of projects) {
            if (project.slug) {
              staticParams.push({
                slug: service.slug,
                projectSlug: project.slug,
              });
            }
          }
        }
      } catch (error) {
        console.error(
          `Error fetching projects for service ${service.slug}:`,
          error
        );
      }
    }

    return staticParams;
  } catch (error) {
    console.error("Error generating static params for project pages:", error);
    return [];
  }
}
