import BlogsListing from "@/components/Blogs/Listing";
import { EditorContent } from "@/components/EditorContent";
import { getBlogs } from "@/lib/fetchMethods";
import { processEditorContent } from "@/lib/globalMethods";
import { getPayloadClient } from "@/lib/payload";
import Link from "next/link";
import { notFound } from "next/navigation";

const wpm = 250;

function getWordsCount(content: string) {
  if (!content) return 0;
  const text = content.replace(/<[^>]+>/g, "");
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

export const dynamic = "force-static";

async function getBlogBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blogs",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs?.[0] || null;
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blogs",
    limit: 1000,
    sort: "-createdAt",
    select: { slug: true },
  });
  return (result.docs || [])
    .filter((d) => d.slug)
    .map((d) => ({ blog_slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogs: string }>;
}) {
  const { blogs } = await params;
  const blog = await getBlogBySlug(blogs);
  return {
    title: blog?.title || "Blog",
    description: blog?.title ? `Read: ${blog.title}` : "Blog post",
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ blogs: string }>;
}) {
  const { blogs } = await params;
  const blog = await getBlogBySlug(blogs);
  const similarBlogs = await getBlogs(3);
  if (!blog) {
    notFound();
  }

  const processed = processEditorContent(blog.content || "");
  const minutes = Math.max(1, Math.ceil(getWordsCount(processed) / wpm));
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <article className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link
            href="/blogs"
            className="text-sm text-neutral-700 hover:underline"
          >
            ← Back to blogs
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl lg:text-5xl font-medium font-['DM_Sans'] leading-tight text-neutral-900">
            {blog.title}
          </h1>

          <div className="mt-4 flex gap-2">
            <div className="px-3 rounded-[20px] border border-neutral-900">
              <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                {blog.author || "Unknown"}
              </span>
            </div>
            {date ? (
              <div className="px-3 rounded-[20px] border border-neutral-900">
                <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                  {date}
                </span>
              </div>
            ) : null}
            <div className="px-3 rounded-[20px] border border-neutral-900">
              <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                {minutes} min read
              </span>
            </div>
          </div>
        </header>

        <EditorContent content={blog.content || ""} />
      </div>
      <div className="mt-4">
        <BlogsListing blogs={similarBlogs} internal={true} />
      </div>
    </article>
  );
}
