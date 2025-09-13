import { CommentForm } from "@/components/Blogs/CommentForm";
import BlogsListing from "@/components/Blogs/Listing";
import { EditorContent } from "@/components/EditorContent";
import { SEO_CONFIG } from "@/lib/constants";
import { getBlogs } from "@/lib/fetchMethods";
import { processEditorContent } from "@/lib/globalMethods";
import { getPayloadClient } from "@/lib/payload";
import {
  generateBreadcrumbs,
  generateEnhancedMeta,
  generateStructuredData,
} from "@/utilities/seoUtils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const wpm = 250;

function getWordsCount(content: string) {
  if (!content) return 0;
  const text = content.replace(/<[^>]+>/g, "");
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

export const dynamic = "force-static";
export const revalidate = 3600;

async function getBlogBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blogs",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const blogs = await payload.find({
    collection: "blogs",
    limit: 1000,
  });

  return blogs.docs.map((d) => ({ blogs: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogs: string }>;
}): Promise<Metadata> {
  const { blogs } = await params;
  const blog = await getBlogBySlug(blogs);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return generateEnhancedMeta({
    title: blog.title,
    description: blog.content
      ? blog.content.substring(0, 160) + "..."
      : `Read: ${blog.title}`,
    url: `/blogs/${blog.slug}`,
    type: "article",
    publishedTime: blog.createdAt,
    modifiedTime: blog.updatedAt,
    author: blog.author || "iQue Team",
    section: "Blog",
    tags: SEO_CONFIG.KEYWORDS.BLOG,
  });
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

  // Generate structured data
  const articleData = generateStructuredData({
    type: "article",
    data: {
      title: blog.title,
      description: blog.content
        ? blog.content.substring(0, 160) + "..."
        : `Read: ${blog.title}`,
      author: blog.author || "iQue Team",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      slug: blog.slug,
    },
  });

  const breadcrumbData = generateBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ]);

  return (
    <article
      className="py-12 lg:py-20 lg:pt-40 bg-white"
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      <div className="container px-4 max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/blogs"
            className="text-sm text-neutral-700 hover:underline"
          >
            ← Back to blogs
          </Link>
        </nav>

        <header className="mb-8">
          <h1
            className="text-3xl lg:text-5xl font-medium font-['DM_Sans'] leading-tight text-neutral-900"
            itemProp="headline"
          >
            {blog.title}
          </h1>

          <div className="mt-4 flex gap-2">
            <span className="text-sm text-neutral-600" itemProp="author">
              {blog.author || "iQue Team"}
            </span>
            <span className="text-sm text-neutral-400">•</span>
            <time
              className="text-sm text-neutral-600"
              dateTime={blog.createdAt}
              itemProp="datePublished"
            >
              {date}
            </time>
            <span className="text-sm text-neutral-400">•</span>
            <span className="text-sm text-neutral-600">{minutes} min read</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none" itemProp="articleBody">
          <EditorContent content={processed} />
        </div>

        {/* Similar Articles */}
        {similarBlogs.length > 0 && (
          <section className="mt-16 pt-8 border-t border-neutral-200">
            <h2 className="text-2xl font-bold font-['Epilogue'] text-neutral-900 mb-6">
              Related Articles
            </h2>
            <BlogsListing blogs={similarBlogs} internal />
          </section>
        )}

        {/* Comment Form */}
        <section className="mt-16 pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-bold font-['Epilogue'] text-neutral-900 mb-6">
            Leave a Comment
          </h2>
          <CommentForm blogId={blog.id} />
        </section>
      </div>
    </article>
  );
}
