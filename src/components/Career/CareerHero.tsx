"use client";

import { AnimationWrapper } from "../AnimationWrapper";

export function CareerHero() {
  return (
    <section
      className="relative min-h-[50vh] sm:min-h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden flex items-end"
      style={{ backgroundImage: "url(/images/resourse-bg.png)" }}
      aria-labelledby="career-title"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimationWrapper delay={0.2} duration={0.6}>
          <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-r from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl" />
        </AnimationWrapper>
        <AnimationWrapper delay={0.4} duration={0.6}>
          <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-r from-indigo-100/40 to-blue-100/40 rounded-full blur-3xl" />
        </AnimationWrapper>
        <AnimationWrapper delay={0.6} duration={0.6}>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-full blur-2xl" />
        </AnimationWrapper>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-[100px] pb-8">
        {/* Main Content */}
        <div className="max-w-3xl">
          <AnimationWrapper delay={0.3} duration={0.6}>
            <h1
              id="career-title"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-['Epilogue'] leading-none mb-12 tracking-tighter bg-gradient-to-r from-[#46ecd5] to-[#2EFFB5] bg-clip-text text-transparent uppercase"
            >
              Career
            </h1>
          </AnimationWrapper>

          {/* Career Description */}
          <AnimationWrapper delay={0.6} duration={0.8}>
            <p
              className="text-xl lg:text-2xl text-white/90 leading-relaxed font-['DM_Sans'] mb-12 max-w-4xl"
              role="contentinfo"
              aria-label="Career description"
            >
              Join our dynamic team of innovators and problem-solvers.
              We&apos;re looking for passionate individuals who want to make a
              difference in the world of technology and entrepreneurship.
            </p>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
