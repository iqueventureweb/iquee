"use client";

import { Project, Service } from "@/payload-types";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimationWrapper } from "../AnimationWrapper";

interface ProjectHeroProps {
  project: Project;
  service: Service;
}

export function ProjectHero({ project, service }: ProjectHeroProps) {
  const router = useRouter();

  return (
    <section
      className="relative min-h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden "
      style={{ backgroundImage: "url(/images/resourse-bg.png)" }}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Navigation */}
        <AnimationWrapper delay={0.2} duration={0.6}>
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium font-['DM_Sans']">
                Back to {service.title}
              </span>
            </button>
          </div>
        </AnimationWrapper>

        {/* Main Content */}
        <div className="max-w-5xl">
          {/* Project Title */}
          <AnimationWrapper delay={0.4} duration={0.8}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium font-['Epilogue'] text-white leading-none mb-12 tracking-tighter">
              {project.title}
            </h1>
          </AnimationWrapper>

          {/* Project Description */}
          {project.description && (
            <AnimationWrapper delay={0.6} duration={0.8}>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-['DM_Sans'] mb-12 max-w-4xl">
                {project.description}
              </p>
            </AnimationWrapper>
          )}

          {/* Project Meta */}
          <AnimationWrapper delay={0.8} duration={0.6}>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-['DM_Sans']">
                  Completed Project
                </span>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
