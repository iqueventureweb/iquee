import { Blog, HomePage, Project, Service } from "@/payload-types";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "./payload";

export const getHomePage = unstable_cache(
  async (): Promise<HomePage | null> => {
    try {
      const payload = await getPayloadClient();

      const homePage = await payload.find({
        collection: "home-page",
        limit: 1,
        sort: "-createdAt",
      });

      return homePage.docs.length > 0 ? homePage.docs[0] : null;
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      return null;
    }
  },
  ["homepage"],
  {
    tags: ["homepage"],
    revalidate: 3600, // Cache for 1 hour
  }
);

export const getServices = async (): Promise<Service[]> => {
  try {
    const payload = await getPayloadClient();

    const services = await payload.find({
      collection: "services",
      sort: "-createdAt",
    });

    return services.docs;
  } catch (error) {
    console.error("Error fetching services data:", error);
    return [];
  }
};

export const getBlogs = unstable_cache(
  async (limit: number = 3): Promise<Blog[]> => {
    try {
      const payload = await getPayloadClient();

      const blogs = await payload.find({
        collection: "blogs",
        limit,
        sort: "-createdAt",
      });

      return blogs.docs;
    } catch (error) {
      console.error("Error fetching blogs data:", error);
      return [];
    }
  },
  ["blogs"],
  {
    tags: ["blogs"],
    revalidate: 3600, // Cache for 1 hour
  }
);

// Get individual service by slug (non-cached version for testing)
export const getServiceBySlug = async (
  slug: string
): Promise<Service | null> => {
  try {
    // Check for required environment variables
    if (!process.env.DATABASE_URI) {
      console.error("[getServiceBySlug] DATABASE_URI not set");
      return null;
    }

    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "services",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error("[getServiceBySlug] Error:", error);
    return null;
  }
};

// Get projects by service ID (using the "projects" collection which is Products)
export const getProjectsByService = unstable_cache(
  async (serviceId: string): Promise<Project[]> => {
    try {
      const payload = await getPayloadClient();

      const result = await payload.find({
        collection: "projects",
        where: {
          services: {
            in: [serviceId],
          },
        },
        sort: "-createdAt",
      });

      return result.docs;
    } catch (error) {
      console.error("Error fetching projects by service:", error);
      return [];
    }
  },
  ["projects-by-service"],
  { tags: ["projects", "services"], revalidate: 3600 }
);

export async function getCareers() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "careers",
    where: { status: { equals: "active" } },
    sort: "-createdAt",
  });
  return result.docs || [];
}

export async function getCareerBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "careers",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs?.[0] || null;
}
