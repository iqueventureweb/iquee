"use client";

import { HomePage } from "@/payload-types";

interface AchievementsSectionProps {
  data?: HomePage["achievement"];
}

export function AchievementsSection({ data }: AchievementsSectionProps) {
  // Fallback data if CMS data is not available
  const defaultAchievements = [
    {
      count: "25+",
      description: "Startup support programmes",
    },
    {
      count: "12+",
      description: "Projects to create and connect investors",
    },
    {
      count: "20+",
      description:
        "Projects with state and central governments to create a better infrastructure",
    },
    {
      count: "10+",
      description: "Entrepreneur's Projects",
    },
  ];

  const achievements =
    data?.contents && data.contents.length > 0
      ? data.contents
      : defaultAchievements;

  return (
    <section className="relative bg-black min-h-[400px] md:min-h-[500px] lg:min-h-[590px] overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-neutral-900 opacity-90" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-32 items-start">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium font-['DM_Sans'] text-white leading-tight">
              {data?.title || "Check recent achievements."}
            </h2>

            <p className="text-xl sm:text-2xl font-normal font-['DM_Sans'] text-white leading-9 max-w-md">
              {data?.description ||
                "We provide the effective ideas that grow businesses of our clients."}
            </p>

            <button className="bg-white/95 hover:bg-white transition-colors duration-200 rounded px-8 py-4 group">
              <span className="text-black text-xs font-bold font-['DM_Sans'] uppercase tracking-wide">
                Request Price
              </span>
            </button>
          </div>

          {/* Right Content - Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 lg:gap-y-12 gap-x-16 lg:gap-x-24 xl:gap-x-40">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-4">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-medium font-['DM_Sans'] text-white leading-tight">
                  {achievement.count}
                </div>
                <p className="text-lg font-normal font-['DM_Sans'] text-white/70 leading-loose max-w-72">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
