"use client";

import { Project } from "@/payload-types";
import { Star } from "lucide-react";
import { useState } from "react";
import { AnimationWrapper } from "../AnimationWrapper";

interface ProjectTestimonialsProps {
  testimonials: Project["testimonials"];
}

export function ProjectTestimonials({
  testimonials,
}: ProjectTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="project-testimonials"
      aria-labelledby="project-testimonials-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimationWrapper delay={0.2} duration={0.6}>
            <header className="text-center mb-16">
              <h2
                id="project-testimonials-title"
                className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-4"
              >
                Testimonials
              </h2>
              <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
            </header>
          </AnimationWrapper>

          <AnimationWrapper delay={0.4} duration={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordLimit = 25;
  const words = testimonial.quote.split(" ");
  const isLongQuote = words.length > wordLimit;

  // On mobile, always show full text; on desktop, use word limit with read more
  const displayText =
    isLongQuote && typeof window !== "undefined" && window.innerWidth >= 768
      ? isExpanded
        ? testimonial.quote
        : words.slice(0, wordLimit).join(" ") + "..."
      : testimonial.quote;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimationWrapper delay={0.6 + index * 0.1} duration={0.5}>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col">
        {/* Background gradient effect */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-sky-100/30 to-transparent blur-2xl" />

        <div className="relative p-6 md:p-8 flex flex-col h-full">
          {/* Testimonial Text with inline Read More button (desktop only) */}
          <blockquote className="mb-6 flex-grow">
            <p className="text-neutral-700 font-['DM_Sans'] leading-relaxed text-base">
              {displayText}
              {/* Show Read More button only on desktop for long quotes */}
              {isLongQuote && (
                <span className="hidden md:inline">
                  <button
                    onClick={toggleExpanded}
                    className="text-cyan-700 hover:text-sky-800 font-['DM_Sans'] text-sm font-medium underline underline-offset-2 hover:no-underline transition-all duration-200 rounded ml-1"
                  >
                    {isExpanded ? " Read Less" : " Read More"}
                  </button>
                </span>
              )}
            </p>
          </blockquote>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-sky-200 to-transparent mb-6" />

          {/* Author Info */}
          <div className="mb-4">
            <p className="text-neutral-900 font-semibold font-['Epilogue'] text-lg not-italic block mb-1">
              {testimonial.author}
            </p>
            <p className="text-base font-normal font-['DM_Sans'] leading-snug text-neutral-500">
              {testimonial.role}
            </p>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center mt-auto">
            {[...Array(5)].map((_, starIndex) => (
              <Star
                key={starIndex}
                className="w-4 h-4 text-amber-400 fill-current"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
