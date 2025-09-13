import BlogsListing from "@/components/Blogs/Listing";
import { SEO_CONFIG } from "@/lib/constants";
import { getBlogs } from "@/lib/fetchMethods";
import { generateEnhancedMeta } from "@/utilities/seoUtils";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateEnhancedMeta({
    title: SEO_CONFIG.PAGES.BLOG.TITLE,
    description: SEO_CONFIG.PAGES.BLOG.DESCRIPTION,
    url: "/blogs",
    type: "website",
    section: "Blog",
    tags: SEO_CONFIG.KEYWORDS.BLOG,
  });
}

export default async function BlogsPage() {
  const blogs = await getBlogs(1000);
  return <BlogsListing blogs={blogs} />;
}
