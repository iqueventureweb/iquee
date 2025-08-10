"use client";

import Image from "next/image";
import { AnimationWrapper } from "../AnimationWrapper";

export function TrustSection() {
  const logos = [
    {
      src: "/company/emt.svg",
      alt: "Company 1",
      width: 75,
      height: 27,
    },
    {
      src: "/company/icg.svg",
      alt: "Company 2",
      width: 75,
      height: 27,
    },
    {
      src: "/company/sibe.svg",
      alt: "Company 3",
      width: 75,
      height: 31,
    },
    {
      src: "/company/ader.svg",
      alt: "Company 4",
      width: 75,
      height: 34,
    },
    {
      src: "/company/ceosquare.svg",
      alt: "Company 5",
      width: 75,
      height: 22,
    },
    {
      src: "/company/tenclubs.svg",
      alt: "Company 6",
      width: 75,
      height: 25,
    },
  ];

  return (
    <section className="pt-16 pb-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <AnimationWrapper delay={0.2} duration={0.4}>
            <h2 className="text-lg font-medium font-['DM_Sans'] leading-snug text-black">
              Trusted by Leading Companies
            </h2>
          </AnimationWrapper>
        </div>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex justify-center items-center gap-8 lg:gap-12 xl:gap-16">
          {logos.map((logo, index) => (
            <AnimationWrapper
              key={index}
              delay={0.4 + index * 0.1}
              duration={0.4}
            >
              <div className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </AnimationWrapper>
          ))}
        </div>

        {/* Mobile Layout - Grid layout for smaller screens */}
        <div className="md:hidden grid grid-cols-2 gap-8 max-w-sm mx-auto">
          {logos.slice(0, 4).map((logo, index) => (
            <AnimationWrapper
              key={index}
              delay={0.4 + index * 0.1}
              duration={0.4}
            >
              <div className="flex justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="opacity-70"
                />
              </div>
            </AnimationWrapper>
          ))}
          {/* Center the last logo if it's a 5th item */}
          {logos.length > 4 && (
            <AnimationWrapper delay={0.8} duration={0.4}>
              <div className="col-span-2 flex justify-center">
                <Image
                  src={logos[4].src}
                  alt={logos[4].alt}
                  width={logos[4].width}
                  height={logos[4].height}
                  className="opacity-70"
                />
              </div>
            </AnimationWrapper>
          )}
        </div>
      </div>
    </section>
  );
}
