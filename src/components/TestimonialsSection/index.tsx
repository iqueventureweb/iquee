"use client";

import { HomePage } from "@/payload-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimationWrapper } from "../AnimationWrapper";

interface TestimonialsSectionProps {
  data?: HomePage["testimonials"];
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback data if CMS data is not available
  const defaultTestimonials = [
    {
      id: 1,
      quote:
        "IQue Ventures' comprehensive support has been a cornerstone of our success. From ideation workshops to securing funding, their team has been with us every step of the way. Their commitment to fostering collaboration with key stakeholders has significantly accelerated our growth and market presence.",
      author: "Rinosh Goerge",
      role: "Volunteer",
      avatar: "https://placehold.co/44x44",
    },
    {
      id: 2,
      quote:
        "This template is so beautiful and has such wonderful new options. It is updated often which gives me even more quality. The support is one of the absolute best I've ever had the pleasure of interacting with. Quick, courteous, and extremely helpful!",
      author: "Adam Peterson",
      role: "Business Owner",
      avatar: "https://placehold.co/44x44",
    },
    {
      id: 3,
      quote:
        "Working with iQue has transformed our startup journey. Their mentorship and strategic guidance helped us navigate complex challenges and achieve milestones we never thought possible.",
      author: "Sarah Johnson",
      role: "CEO & Founder",
      avatar: "https://placehold.co/44x44",
    },
    {
      id: 4,
      quote:
        "The collaborative ecosystem that iQue has built is unmatched. Through their network, we connected with investors and partners that accelerated our growth exponentially.",
      author: "Michael Chen",
      role: "Tech Entrepreneur",
      avatar: "https://placehold.co/44x44",
    },
  ];

  const testimonials =
    data && data.length > 0
      ? data.map((testimonial, index) => ({
          id: index + 1,
          quote: testimonial.quote || "",
          author: testimonial.author || "",
          role: testimonial.role || "",
          avatar: testimonial.avatar || "https://placehold.co/44x44",
        }))
      : defaultTestimonials;

  // Create extended array for infinite loop (duplicate items)
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Start auto-advance carousel
  const startAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        // When we reach the end of the extended data, seamlessly continue from the beginning
        if (nextSlide >= extendedTestimonials.length) {
          return 0;
        }
        return nextSlide;
      });
    }, 4000); // 4 seconds for testimonials
  };

  // Stop auto-advance carousel
  const stopAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentSlide((prev) => {
      const nextSlide = prev + 1;
      // When we reach the end, seamlessly continue from the beginning
      if (nextSlide >= extendedTestimonials.length) {
        return 0;
      }
      return nextSlide;
    });

    stopAutoAdvance();
    startAutoAdvance();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentSlide((prev) => {
      const prevSlide = prev - 1;
      // When we go back from the beginning, go to the end
      if (prevSlide < 0) {
        return extendedTestimonials.length - 1;
      }
      return prevSlide;
    });

    stopAutoAdvance();
    startAutoAdvance();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide % testimonials.length) return;
    setIsTransitioning(true);
    setCurrentSlide(testimonials.length + index);
    stopAutoAdvance();
    startAutoAdvance();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section
      id="testimonials"
      className="py-[70px] lg:py-28"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-[29px] py-12 md:py-20 md:mx-[75px] px-4 bg-zinc-100">
        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <header className="text-center mb-12">
            {/* Title */}
            <div className="space-y-2">
              <AnimationWrapper delay={0.2} duration={0.4}>
                <h2
                  id="testimonials-title"
                  className="text-6xl font-medium font-['DM_Sans'] leading-[61.99px] text-black tracking-tight"
                >
                  iQue is trusted by
                </h2>
              </AnimationWrapper>
              <AnimationWrapper delay={0.4} duration={0.4}>
                <div className="relative inline-block">
                  <h2 className="text-6xl font-medium font-['DM_Sans'] leading-[61.99px] text-black tracking-tight">
                    10,000+customers.
                  </h2>
                  {/* Decorative underline */}
                  <Image
                    src="/images/curly-icon.svg"
                    alt="Decorative underline decoration"
                    width={100}
                    height={100}
                    className="absolute -bottom-8 -left-3 w-56"
                    aria-hidden="true"
                  />
                </div>
              </AnimationWrapper>
            </div>
          </header>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <AnimationWrapper delay={0.6} duration={0.4}>
              <blockquote className="bg-transparent p-8 relative">
                {/* Quote Icon */}
                <div
                  className="w-16 h-16 bg-white rounded-[30px] absolute -left-4 top-4 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-7xl font-serif text-black leading-none h-[33px]">
                    {"”"}
                  </span>
                </div>

                {/* Sliding Content Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                    role="list"
                    aria-label="Testimonials carousel"
                    id="testimonials-carousel"
                  >
                    {extendedTestimonials.map((testimonial, index) => (
                      <div
                        key={`${testimonial.author}-${index}`}
                        className="flex-shrink-0 w-full"
                      >
                        {/* Quote Text */}
                        <div className="ml-[50px] mb-4">
                          <p className="text-2xl font-normal h-[129px] overflow-y-auto font-['DM_Sans'] leading-9 text-black scrollbar-hide">
                            {testimonial.quote}
                          </p>
                        </div>

                        {/* Divider */}
                        <div
                          className="ml-[50px] w-20 h-px bg-black mb-4"
                          aria-hidden="true"
                        ></div>

                        {/* Author Info */}
                        <footer className="ml-[50px] flex items-center">
                          <div>
                            <cite className="text-lg font-normal font-['DM_Sans'] leading-relaxed text-black not-italic">
                              {testimonial.author}
                            </cite>
                            <p className="text-base font-normal font-['DM_Sans'] leading-snug text-neutral-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </footer>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows - Fixed */}
                <div
                  className="absolute bottom-0 right-0 flex space-x-4"
                  role="navigation"
                  aria-label="Testimonial navigation"
                >
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous testimonial"
                    aria-controls="testimonials-carousel"
                  >
                    <ArrowLeft
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next testimonial"
                    aria-controls="testimonials-carousel"
                  >
                    <ArrowRight
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </blockquote>
            </AnimationWrapper>

            {/* Dots Navigation - Fixed */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 rounded-full border border-black transition-all duration-300 ${
                    index === currentSlide % testimonials.length
                      ? "bg-black scale-125"
                      : "bg-transparent hover:bg-black/20"
                  } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={index === currentSlide % testimonials.length}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden max-w-sm sm:max-w-xl mx-auto">
          <header className="text-center mb-8 relative">
            {/* Title */}
            <AnimationWrapper delay={0.2} duration={0.4}>
              <h2 className="text-3xl font-medium font-['DM_Sans'] text-black leading-[1.3] tracking-tight">
                iQue is trusted <br /> by 10,000+customers.
              </h2>
            </AnimationWrapper>
          </header>

          {/* Testimonial Card */}
          <AnimationWrapper delay={0.4} duration={0.4}>
            <blockquote className="bg-transparent p-4 sm:p-6 relative min-h-[300px] md:min-h-[400px]">
              {/* Quote Icon */}
              <div
                className="w-8 h-8 bg-white rounded-2xl absolute -left-2 top-4 flex items-center justify-center z-20"
                aria-hidden="true"
              >
                <span className="text-4xl h-[15px] font-serif text-black leading-none">
                  {"”"}
                </span>
              </div>

              {/* Sliding Content Container - Completely restructured */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                    id="mobile-testimonials-carousel"
                  >
                    {extendedTestimonials.map((testimonial, index) => (
                      <div
                        key={`${testimonial.author}-${index}`}
                        className="flex-shrink-0 w-full"
                      >
                        {/* Quote Text */}
                        <div className="ml-5 mb-8">
                          <p className="text-lg font-normal font-['DM_Sans'] leading-relaxed text-black h-[150px] overflow-y-auto scrollbar-hide">
                            {testimonial.quote}
                          </p>
                        </div>

                        {/* Divider */}
                        <div
                          className="ml-5 w-20 h-px bg-black mb-6"
                          aria-hidden="true"
                        ></div>

                        {/* Author Info */}
                        <footer className="ml-5 flex items-center">
                          <div>
                            <cite className="text-lg font-medium truncate max-w-32 font-['DM_Sans'] leading-relaxed text-black not-italic">
                              {testimonial.author}
                            </cite>
                            <p className="text-base font-normal font-['DM_Sans'] leading-snug text-neutral-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </footer>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Fixed */}
              <div
                className="absolute bottom-0 right-0 flex space-x-4 z-20"
                role="navigation"
                aria-label="Testimonial navigation"
              >
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous testimonial"
                  aria-controls="mobile-testimonials-carousel"
                >
                  <ArrowLeft
                    className="w-6 h-6 text-black"
                    aria-hidden="true"
                  />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next testimonial"
                  aria-controls="mobile-testimonials-carousel"
                >
                  <ArrowRight
                    className="w-6 h-6 text-black"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </blockquote>
          </AnimationWrapper>

          {/* Dots Navigation - Fixed */}
          <div className="flex justify-center space-x-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full border border-black transition-all duration-300 cursor-pointer ${
                  index === currentSlide % testimonials.length
                    ? "bg-black scale-125"
                    : "bg-transparent hover:bg-black/20"
                } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentSlide % testimonials.length}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
