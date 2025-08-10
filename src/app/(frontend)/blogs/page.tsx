import BlogsListing from "@/components/Blogs/Listing";
import { getBlogs } from "@/lib/fetchMethods";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Blogs",
    description: "Read our latest insights and stories",
  };
}

export default async function BlogsPage() {
  const blogs = await getBlogs(1000);
  return <BlogsListing blogs={blogs} />;
}
