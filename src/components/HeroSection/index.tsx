"use client";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";

const Animated3d = dynamic(() => import("./Animated3d"), {
  loading: () => <div>Loading...</div>,
});

export function HeroSection() {
  return (
    <div className="min-h-screen relative">
      {/* Spline Background */}
      <Animated3d />

      {/* Content Overlay - pointer-events-none to allow Spline interaction */}
      <div className="relative z-10 min-h-screen pointer-events-auto">
        {/* Hero Section */}
        <main className="container mx-auto px-4 flex flex-col justify-center min-h-screen pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-medium text-blue-900 mb-8 leading-tight font-['DM_Sans'] pointer-events-none">
              Lets create, a better
              <br />
              startup Ecosystem.
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-800 font-medium max-w-3xl md:max-w-4xl mx-auto mb-12 leading-normal tracking-wider font-['DM_Sans'] capitalize pointer-events-none">
              &quot;Join Us In Building A Better And More Efficient Startup
              Ecosystem! By Fostering Collaboration, Providing Mentorship, And
              Offering Resources, We&apos;re Empowering Startups To Grow And
              Thrive. Together, We Can Create A Future Where Innovation Knows No
              Limits.&quot;
            </p>

            {/* Action Buttons - re-enable pointer events for buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 pointer-events-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-blue-900 text-blue-900 hover:bg-blue-900/10 font-bold uppercase tracking-wide font-['DM_Sans']"
              >
                Learn More
              </Button>
              <Button
                size="lg"
                className="bg-blue-900 text-white hover:bg-blue-800 font-bold uppercase tracking-wide font-['DM_Sans']"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Location Indicator */}
          <div className="absolute bottom-8 left-4 flex items-center gap-3 pointer-events-auto">
            <div className="w-0.5 h-11 bg-blue-900"></div>
            <div className="text-blue-900 text-base font-normal font-['DM_Sans'] leading-snug">
              Based in Bangalore,
              <br />
              India
            </div>
          </div>

          <div className="w-40 h-20 absolute bottom-0 right-4 bg-white pointer-events-auto"></div>
        </main>
      </div>
    </div>
  );
}
