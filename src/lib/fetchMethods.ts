import { Blog, HomePage, Service } from "@/payload-types";
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

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
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
  },
  ["services"],
  {
    tags: ["services"],
    revalidate: 3600, // Cache for 1 hour
  }
);

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
