"use client";
import { AnimationWrapper } from "../AnimationWrapper";
import { Button } from "../ui/button";
import Animated3d from "./Animated3d";

export function HeroSection() {
  return (
    <section
      className="min-h-[70vh] md:min-h-screen relative pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Spline Background */}
      <Animated3d />

      {/* Content Overlay - pointer-events-none to allow Spline interaction */}
      <div className="relative z-10 min-h-[70vh] md:min-h-screen pointer-events-auto">
        {/* Hero Section */}
        <main className="container mx-auto px-4 flex flex-col justify-center min-h-[70vh] md:min-h-screen pt-0 md:pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <AnimationWrapper delay={0.2} duration={0.8}>
              <h1
                id="hero-heading"
                className="text-4xl md:text-8xl font-medium mb-8 leading-tight tracking-tighter font-['DM_Sans'] pointer-events-none bg-gradient-to-r from-[#188181] via-[#3ac695] to-[#2EFFB5] bg-clip-text text-transparent"
              >
                Lets create, a better
                <br />
                startup Ecosystem.
              </h1>
            </AnimationWrapper>

            {/* Description */}
            <AnimationWrapper delay={0.4} duration={0.8}>
              <p className="text-sm md:text-xl text-cyan-700 font-medium max-w-3xl md:max-w-4xl mx-auto mb-12 leading-normal tracking-wider font-['DM_Sans'] capitalize pointer-events-none">
                &quot;Join Us In Building A Better And More Efficient Startup
                Ecosystem! By Fostering Collaboration, Providing Mentorship, And
                Offering Resources, We&apos;re Empowering Startups To Grow And
                Thrive. Together, We Can Create A Future Where Innovation Knows
                No Limits.&quot;
              </p>
            </AnimationWrapper>

            {/* Action Buttons - re-enable pointer events for buttons */}
            <AnimationWrapper delay={0.6} duration={0.8}>
              <div className="flex gap-4 justify-center mb-16 pointer-events-auto">
                <Button
                  variant="outline"
                  className="border-[#41DEB2] text-xs w-40 h-12 text-[#41DEB2] hover:bg-[#41DEB2]/10 font-bold uppercase tracking-wide font-['DM_Sans']"
                  aria-label="Learn more about iQue services"
                >
                  Learn More
                </Button>
                <Button
                  className="bg-[#41DEB2] text-xs w-40 h-12 text-white hover:bg-[#41DEB2]/80 font-bold uppercase tracking-wide font-['DM_Sans']"
                  aria-label="Get in touch with iQue team"
                >
                  Get In Touch
                </Button>
              </div>
            </AnimationWrapper>
          </div>

          {/* Location Indicator */}
          <div className="absolute bottom-8 left-4 flex items-center gap-3 pointer-events-auto">
            <div className="w-0.5 h-11 bg-[#188181]" aria-hidden="true"></div>
            <address className="text-black text-base font-normal font-['DM_Sans'] leading-snug not-italic">
              Based in Bangalore,
              <br />
              India
            </address>
          </div>

          <div
            className="w-40 h-20 absolute bottom-0 right-4 bg-white pointer-events-auto"
            aria-hidden="true"
          ></div>
        </main>
      </div>
    </section>
  );
}
