"use client";

import { Blog } from "@/payload-types";
import Image from "next/image";

// Article type definition
interface NewsArticle {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

interface LatestNewsSectionProps {
  blogs?: Blog[];
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
      image: "https://placehold.co/608x503",
      isFeatured: true,
    },
    {
      id: 2,
      title: "iQue Ventures: Pioneering a Better Ecosystem for Entrepreneurs",
      author: "Shafi Shoukath",
      date: "6 June",
      image: "https://placehold.co/292x241",
      isFeatured: false,
    },
    {
      id: 3,
      title:
        "The Startup Ecosystem in 2024: Trends, Challenges, and Opportunities",
      author: "Shafi Shoukath",
      date: "6 June",
      image: "https://placehold.co/292x241",
      isFeatured: false,
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
              image: "https://placehold.co/608x503", // Default image for now
              isFeatured: index === 0, // First blog is featured
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
    <div className="">
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
    </div>
  );

  return (
    <section className="py-16 lg:py-24 bg-neutral-100">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-medium font-['DM_Sans'] uppercase leading-9 lg:leading-[53.89px] text-neutral-900 mb-4 lg:mb-0">
            Latest News
          </h2>

          {/* Blog Link */}
          <div className="flex items-start md:items-center mt-4 md:mt-0 justify-start md:justify-center">
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
          </div>
        </div>

        {/* News Grid */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-6">
          {/* Featured Article */}
          <ArticleCard article={newsArticles[0]} isFeatured={true} />

          {/* Regular Articles */}
          {newsArticles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
