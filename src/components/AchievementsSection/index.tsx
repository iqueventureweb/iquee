"use client";

import { HomePage } from "@/payload-types";
import { useEffect, useRef, useState } from "react";
import {
  AnimationWrapper,
  StaggeredAnimationWrapper,
} from "../AnimationWrapper";

interface AchievementsSectionProps {
  data?: HomePage["achievement"];
}

// Simple counting component
function CountUpNumber({ end, delay = 0 }: { end: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(end.replace(/\D/g, ""));
    const suffix = end.replace(/\d/g, "");

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 2000, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Delay the animation start
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, delay]);

  const suffix = end.replace(/\d/g, "");

  return (
    <div
      ref={ref}
      className="text-5xl sm:text-6xl lg:text-7xl font-medium font-['DM_Sans'] text-white leading-tight"
    >
      {count}
      {suffix}
    </div>
  );
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
    <section
      id="achievements"
      className="relative bg-black min-h-[400px] md:min-h-[500px] lg:min-h-[590px] overflow-hidden"
      aria-labelledby="achievements-title"
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-neutral-900 opacity-90"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-32 items-start">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <AnimationWrapper delay={0.2} duration={0.4}>
              <h2
                id="achievements-title"
                className="text-4xl sm:text-5xl md:text-6xl font-medium font-['DM_Sans'] text-white leading-tight"
              >
                {data?.title || "Check recent achievements."}
              </h2>
            </AnimationWrapper>

            <AnimationWrapper delay={0.4} duration={0.4}>
              <p className="text-xl sm:text-2xl font-normal font-['DM_Sans'] text-white leading-9 max-w-md">
                {data?.description ||
                  "We provide the effective ideas that grow businesses of our clients."}
              </p>
            </AnimationWrapper>

            <AnimationWrapper delay={0.6} duration={0.4}>
              <button
                className="bg-white/95 hover:bg-white transition-colors duration-200 rounded px-8 py-4 group"
                aria-label="Request pricing information for our services"
              >
                <span className="text-black text-xs font-bold font-['DM_Sans'] uppercase tracking-wide">
                  Request Price
                </span>
              </button>
            </AnimationWrapper>
          </div>

          {/* Right Content - Statistics Grid */}
          <StaggeredAnimationWrapper
            staggerDelay={0.1}
            delay={0.4}
            duration={0.4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 lg:gap-y-12 gap-x-16 lg:gap-x-24 xl:gap-x-40"
            aria-label="Achievement statistics"
          >
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-4" role="listitem">
                <CountUpNumber
                  end={achievement.count || "0"}
                  delay={index * 200}
                />
                <p className="text-lg font-normal font-['DM_Sans'] text-white/70 leading-loose max-w-72">
                  {achievement.description}
                </p>
              </div>
            ))}
          </StaggeredAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
