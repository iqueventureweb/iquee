"use client";

import Image from "next/image";

export function LatestNewsSection() {
  const newsArticles = [
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
          {/* Featured Article - Desktop */}
          <div className="">
            <div className="w-full h-72 lg:h-[502.61px] overflow-hidden rounded-lg mb-4">
              <Image
                src={newsArticles[0].image}
                alt={newsArticles[0].title}
                width={608}
                height={503}
                className="w-[608px] h-[502.61px] object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <div className="px-3 py-1 rounded-[20px] border border-neutral-900">
                <span className="text-xs font-normal font-['Epilogue'] uppercase leading-[1.3] tracking-wide text-neutral-900">
                  {newsArticles[0].author}
                </span>
              </div>
              <div className="px-3 py-1 rounded-[20px] border border-neutral-900">
                <span className="text-xs font-normal font-['Epilogue'] uppercase leading-[1.3] tracking-wide text-neutral-900">
                  {newsArticles[0].date}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm lg:text-2xl font-normal font-['Poppins'] leading-[1.3] text-neutral-900">
              {newsArticles[0].title}
            </h3>
          </div>

          {/* Regular Articles */}
          {newsArticles.slice(1).map((article) => (
            <div key={article.id} className="">
              <div className="w-full h-72 lg:h-60 overflow-hidden rounded-lg mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={292}
                  height={241}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-4">
                <div className="px-3 py-1 rounded-[20px] border border-neutral-900">
                  <p className="text-xs font-normal font-['Epilogue'] uppercase leading-[1.3] tracking-wide text-neutral-900">
                    {article.author}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-[20px] border border-neutral-900">
                  <p className="text-xs font-normal font-['Epilogue'] uppercase leading-[1.3] tracking-wide text-neutral-900">
                    {article.date}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm lg:text-2xl font-normal font-['Poppins'] leading-[1.3] text-neutral-900">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
