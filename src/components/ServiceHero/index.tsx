"use client";

import { Service } from "@/payload-types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Navigation */}
        <div className="mb-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Service Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-['Epilogue'] text-white leading-none mb-8">
            {service.title}
          </h1>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold font-['DM_Sans'] hover:bg-white/90 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold font-['DM_Sans'] hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs font-medium uppercase tracking-wider">
              Scroll Down
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
