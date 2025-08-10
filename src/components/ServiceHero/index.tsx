"use client";

import { Service } from "@/payload-types";
import Link from "next/link";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section
      className="relative min-h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden pt-20"
      style={{ backgroundImage: "url(/images/resourse-bg.png)" }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-r from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-r from-indigo-100/40 to-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium font-['Epilogue'] text-white leading-none mb-12 tracking-tighter">
            {service.title}
          </h1>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="#service-details"
              className="px-12 py-6 border-2 border-white text-white rounded-full font-bold font-['DM_Sans'] text-lg hover:bg-white hover:text-black transition-all duration-300 hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
