"use client";

import Image from "next/image";
import { AnimationWrapper } from "../AnimationWrapper";

export function TrustSection() {
  const logos = [
    {
      src: "/company/emt.svg",
      alt: "EMT - Trusted partner company logo",
      width: 75,
      height: 27,
      company: "EMT",
    },
    {
      src: "/company/icg.svg",
      alt: "ICG - Trusted partner company logo",
      width: 75,
      height: 27,
      company: "ICG",
    },
    {
      src: "/company/sibe.svg",
      alt: "SIBE - Trusted partner company logo",
      width: 75,
      height: 31,
      company: "SIBE",
    },
    {
      src: "/company/ader.svg",
      alt: "ADER - Trusted partner company logo",
      width: 75,
      height: 34,
      company: "ADER",
    },
    {
      src: "/company/ceosquare.svg",
      alt: "CEO Square - Trusted partner company logo",
      width: 75,
      height: 22,
      company: "CEO Square",
    },
    {
      src: "/company/tenclubs.svg",
      alt: "Ten Clubs - Trusted partner company logo",
      width: 75,
      height: 25,
      company: "Ten Clubs",
    },
  ];

  return (
    <section className="pt-16 pb-8 md:py-16 bg-white" aria-labelledby="trust-title">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <header className="text-center mb-12">
          <AnimationWrapper delay={0.2} duration={0.4}>
            <h2 
              id="trust-title"
              className="text-lg font-medium font-['DM_Sans'] leading-snug text-black"
            >
              Trusted by Leading Companies
            </h2>
          </AnimationWrapper>
        </header>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex justify-center items-center gap-8 lg:gap-12 xl:gap-16" role="list" aria-label="Trusted company logos">
          {logos.map((logo, index) => (
            <AnimationWrapper
              key={index}
              delay={0.4 + index * 0.1}
              duration={0.4}
            >
              <div className="flex-shrink-0" role="listitem">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            </AnimationWrapper>
          ))}
        </div>

        {/* Mobile Layout - Grid layout for smaller screens */}
        <div className="md:hidden max-w-sm mx-auto">
          {/* First row: 2 logos */}
          <div className="flex justify-center gap-8 mb-8" role="list" aria-label="Trusted company logos row 1">
            {logos.slice(0, 2).map((logo, index) => (
              <AnimationWrapper
                key={index}
                delay={0.4 + index * 0.1}
                duration={0.4}
              >
                <div role="listitem">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="opacity-70"
                    loading="lazy"
                  />
                </div>
              </AnimationWrapper>
            ))}
          </div>

          {/* Second row: 2 logos */}
          <div className="flex justify-center gap-8 mb-8" role="list" aria-label="Trusted company logos row 2">
            {logos.slice(2, 4).map((logo, index) => (
              <AnimationWrapper
                key={index + 2}
                delay={0.6 + index * 0.1}
                duration={0.4}
              >
                <div role="listitem">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="opacity-70"
                    loading="lazy"
                  />
                </div>
              </AnimationWrapper>
            ))}
          </div>

          {/* Third row: 1 centered logo (if exists) */}
          {logos.length > 4 && (
            <div className="flex justify-center" role="list" aria-label="Trusted company logos row 3">
              <AnimationWrapper delay={0.8} duration={0.4}>
                <div role="listitem">
                  <Image
                    src={logos[4].src}
                    alt={logos[4].alt}
                    width={logos[4].width}
                    height={logos[4].height}
                    className="opacity-70"
                    loading="lazy"
                  />
                </div>
              </AnimationWrapper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
