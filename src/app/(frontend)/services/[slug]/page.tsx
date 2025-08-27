import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ServiceContent } from "@/components/ServiceContent";
import { ServiceHero } from "@/components/ServiceHero";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { WHATSAPP } from "@/lib/constants";
import {
  getProjectsByService,
  getServiceBySlug,
  getServices,
} from "@/lib/fetchMethods";
import {
  generateBreadcrumbs,
  generateEnhancedMeta,
  generateStructuredData,
} from "@/utilities/seoUtils";
import type { Metadata } from "next";
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

    // Generate structured data
    const serviceData = generateStructuredData({
      type: "service",
      data: {
        title: service.title,
        description: service.blocks?.[0]?.content || service.title,
        category: "Business Service",
      },
    });

    const breadcrumbData = generateBreadcrumbs([
      { name: "Home", url: "/" },
      { name: "Services", url: "/#services" },
      { name: service.title, url: `/services/${service.slug}` },
    ]);

    return (
      <div className="min-h-screen">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />

        {/* Hero Section with Header */}
        <ServiceHero service={service} />

        {/* Service Content */}
        <ServiceContent service={service} />

        {/* Projects Grid */}
        {projects.length > 0 && (
          <ProjectsGrid projects={projects} serviceSlug={service.slug} />
        )}

        {/* CTA Button after Projects Grid */}
        {projects.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl lg:text-3xl font-bold font-['Epilogue'] text-neutral-900 mb-6">
                  Ready to Get Started?
                </h3>
                <p className="text-neutral-600 font-['DM_Sans'] text-lg mb-8 max-w-2xl mx-auto">
                  Have questions about this service or want to discuss your next
                  venture? Let&apos;s connect on WhatsApp and explore the
                  possibilities together.
                </p>
                <WhatsAppCTAButton
                  message={WHATSAPP.messages.generalInquiry}
                  variant="primary"
                  size="lg"
                />
              </div>
            </div>
          </section>
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

// Generate metadata for each service
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const service = await getServiceBySlug(slug);

    if (!service) {
      return {
        title: "Service Not Found",
        description: "The requested service could not be found.",
      };
    }

    return generateEnhancedMeta({
      title: service.title,
      description:
        service.blocks?.[0]?.content ||
        `Learn more about ${service.title} services at iQue.`,
      url: `/services/${service.slug}`,
      type: "service",
      section: "Services",
      tags: [
        "startup services",
        "business services",
        service.title.toLowerCase(),
      ],
    });
  } catch (error) {
    return {
      title: "Service",
      description: "Service information",
    };
  }
}
