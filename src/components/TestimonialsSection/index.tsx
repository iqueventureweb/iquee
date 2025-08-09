"use client";

import { HomePage } from "@/payload-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TestimonialsSectionProps {
  data?: HomePage["testimonials"];
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section id="testimonials" className="py-[70px] lg:py-28">
      <div className="mx-[29px] py-12 md:py-20 md:mx-[75px] px-4 bg-zinc-100">
        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-6xl font-medium font-['DM_Sans'] leading-[61.99px] text-black tracking-tight">
                iQue is trusted by
              </h2>
              <div className="relative inline-block">
                <h2 className="text-6xl font-medium font-['DM_Sans'] leading-[61.99px] text-black tracking-tight">
                  10,000+customers.
                </h2>
                {/* Decorative underline */}
                <Image
                  src="/images/curly-icon.svg"
                  alt="Underline"
                  width={100}
                  height={100}
                  className="absolute -bottom-8 -left-3 w-56"
                />
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-transparent p-8 relative">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-white rounded-[30px] absolute -left-4 top-4 flex items-center justify-center">
                <span className="text-7xl font-serif text-black leading-none h-[33px]">
                  {"”"}
                </span>
              </div>

              {/* Quote Text */}
              <div className="ml-[50px] mb-4">
                <p className="text-2xl font-normal h-[129px] overflow-y-auto font-['DM_Sans'] leading-9 text-black">
                  {currentTestimonial.quote}
                </p>
              </div>

              {/* Divider */}
              <div className="ml-[50px] w-20 h-px bg-black mb-4"></div>

              <div className="flex items-center justify-between">
                {/* Author Info */}
                <div className="ml-[50px] flex items-center">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    width={44}
                    height={44}
                    className="rounded-3xl mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-normal font-['DM_Sans'] leading-relaxed text-black">
                      {currentTestimonial.author}
                    </h4>
                    <p className="text-base font-normal font-['DM_Sans'] leading-snug text-neutral-500">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
                {/* Navigation Arrows */}
                <div className="flex justify-center space-x-4 items-center h-full">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden max-w-sm sm:max-w-xl mx-auto">
          <div className="text-center mb-8 relative">
            {/* Title */}
            <h2 className="text-3xl font-medium font-['DM_Sans'] text-black leading-[1.3] tracking-tight">
              iQue is trusted <br /> by 10,000+customers.
            </h2>
            {/* <Image
              src="/images/curly-icon.svg"
              alt="Underline"
              width={100}
              height={100}
              className="absolute bottom-0 left-[78px] w-[105px]"
            /> */}
          </div>

          {/* Testimonial Card */}
          <div className="bg-transparent p-4 sm:p-6 relative min-h-[300px] md:min-h-[400px]">
            {/* Quote Icon */}
            <div className="w-8 h-8 bg-white rounded-2xl absolute -left-2 top-4 flex items-center justify-center">
              <span className="text-4xl h-[15px] font-serif text-black leading-none">
                {"”"}
              </span>
            </div>

            {/* Quote Text */}
            <div className="ml-5 mb-8">
              <p className="text-lg font-normal font-['DM_Sans'] leading-relaxed text-black h-[150px] overflow-y-auto">
                {currentTestimonial.quote}
              </p>
            </div>

            {/* Divider */}
            <div className="ml-5 w-20 h-px bg-black mb-6"></div>

            {/* Author Info */}
            <div className="ml-5 flex items-center">
              <Image
                src={currentTestimonial.avatar}
                alt={currentTestimonial.author}
                width={44}
                height={44}
                className="rounded-3xl mr-4"
              />
              <div>
                <h4 className="text-lg font-medium truncate max-w-32 font-['DM_Sans'] leading-relaxed text-black">
                  {currentTestimonial.author}
                </h4>
                <p className="text-base font-normal font-['DM_Sans'] leading-snug text-neutral-500">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end ml-auto space-x-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
