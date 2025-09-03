"use client";

import { Blog } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { AnimationWrapper } from "../AnimationWrapper";

// Article type definition
interface NewsArticle {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  isFeatured: boolean;
  slug: string;
}

interface LatestNewsSectionProps {
  blogs?: Blog[];
}

// Function to get fallback image based on index
function getFallbackImage(index: number): string {
  const fallbackImages = [
    "/blogs/up-up.webp",
    "/blogs/Possible.webp",
    "/blogs/motivation-ecosystem.webp",
  ];
  return fallbackImages[index % fallbackImages.length];
}

// Function to normalize blog image path
function normalizeImagePath(imagePath: string | null | undefined): string {
  if (!imagePath) return "";

  // If it already has /blogs/ prefix, return as is
  if (imagePath.startsWith("/blogs/")) {
    return imagePath;
  }

  // If it's missing the prefix, add it
  if (
    imagePath.includes(".webp") ||
    imagePath.includes(".png") ||
    imagePath.includes(".jpg")
  ) {
    return `/blogs/${imagePath}`;
  }

  return imagePath;
}

export function LatestNewsSection({ blogs }: LatestNewsSectionProps) {
  // Default fallback articles
  const defaultNewsArticles: NewsArticle[] = [
    {
      id: 1,
      title:
        "A Vision for a Better Startup Ecosystem: Insights from Shafi Shoukath, Founder and CEO of iQue Ventures",
      author: "Shafi Shoukath",
      date: "6 June",
      image: "/blogs/up-up.webp",
      isFeatured: true,
      slug: "a-vision-for-a-better-startup-ecosystem-insights-from-shafi-shoukath-founder-and-ceo-of-ique-ventures",
    },
    {
      id: 2,
      title: "iQue Ventures: Pioneering a Better Ecosystem for Entrepreneurs",
      author: "Shafi Shoukath",
      date: "6 June",
      image: "/blogs/possible.webp",
      isFeatured: false,
      slug: "ique-ventures-pioneering-a-better-ecosystem-for-entrepreneurs",
    },
    {
      id: 3,
      title:
        "The Startup Ecosystem in 2024: Trends, Challenges, and Opportunities",
      author: "Shafi Shoukath",
      date: "6 June",
      image: "/blogs/motivation-ecosystem.webp",
      isFeatured: false,
      slug: "the-startup-ecosystem-in-2024-trends-challenges-and-opportunities",
    },
  ];

  // Convert blogs to NewsArticle format or use defaults
  const newsArticles: NewsArticle[] =
    blogs && blogs.length > 0
      ? blogs
          .map((blog, index) => {
            return {
              id: parseInt(blog.id) || index + 1,
              title: blog.title || "Untitled",
              author: blog.author || "Unknown Author",
              date: blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })
                : "No date",
              image: `${process.env.NEXT_PUBLIC_BUNNY_CDN}${blog.blog_image}`,
              isFeatured: index === 0, // First blog is featured
              slug: blog.slug || "",
            };
          })
          .reverse()
      : defaultNewsArticles;

  // Tag component for author and date
  const Tag = ({ children }: { children: React.ReactNode }) => (
    <div className="px-3 rounded-[20px] border border-neutral-900">
      <span className="text-xs font-normal font-['Epilogue'] uppercase leading-[1.3] tracking-wide text-neutral-900">
        {children}
      </span>
    </div>
  );

  // Tags container component
  const TagsContainer = ({
    author,
    date,
  }: {
    author: string;
    date: string;
  }) => (
    <div className="flex gap-2 mb-4">
      <Tag>{author}</Tag>
      <Tag>{date}</Tag>
    </div>
  );

  // Article card component
  const ArticleCard = ({
    article,
    isFeatured = false,
  }: {
    article: NewsArticle;
    isFeatured?: boolean;
  }) => (
    <Link href={`/blogs/${article.slug}`} className="">
      <div
        className={`w-full overflow-hidden rounded-lg mb-4 ${
          isFeatured ? "h-72 lg:h-[502.61px]" : "h-72 lg:h-60"
        }`}
      >
        <Image
          src={article.image}
          alt={article.title}
          width={isFeatured ? 608 : 292}
          height={isFeatured ? 503 : 241}
          className={`object-cover ${
            isFeatured ? "w-[608px] h-[502.61px]" : "w-full h-full"
          }`}
        />
      </div>

      <TagsContainer author={article.author} date={article.date} />

      <h3 className="text-sm lg:text-2xl font-normal font-['Poppins'] leading-[1.3] text-neutral-900">
        {article.title}
      </h3>
    </Link>
  );

  return (
    <section className="py-16 lg:py-24 bg-neutral-100" id="blog">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-16">
          <AnimationWrapper delay={0.2}>
            <h2 className="text-3xl lg:text-5xl font-medium font-['DM_Sans'] uppercase leading-9 lg:leading-[53.89px] text-neutral-900 mb-4 lg:mb-0">
              Latest News
            </h2>
          </AnimationWrapper>

          {/* Blog Link */}
          <AnimationWrapper delay={0.3}>
            <Link
              href="/blogs"
              className="flex items-start md:items-center mt-4 md:mt-0 justify-start md:justify-center"
            >
              <p className="text-base font-normal font-['Epilogue'] uppercase leading-none tracking-tight text-neutral-900">
                Our blog
              </p>
              <Image
                src="/images/big-arrow.svg"
                alt="Arrow Right"
                width={14}
                height={14}
                className="ml-1 w-14"
              />
            </Link>
          </AnimationWrapper>
        </div>

        {/* News Grid */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-6">
          {/* Featured Article */}
          <AnimationWrapper delay={0.4}>
            <ArticleCard article={newsArticles[0]} isFeatured={true} />
          </AnimationWrapper>

          {/* Regular Articles */}
          {newsArticles.slice(1).map((article, index) => (
            <AnimationWrapper key={article.id} delay={0.5 + index * 0.1}>
              <ArticleCard article={article} />
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
