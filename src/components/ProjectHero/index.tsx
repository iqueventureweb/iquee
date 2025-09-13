"use client";

import { Project, Service } from "@/payload-types";
import { ArrowLeft } from "lucide-react";
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
      className="relative min-h-[50vh] sm:min-h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden flex items-end pt-20 sm:pt-24 lg:pt-32"
      style={{ backgroundImage: "url(/images/resourse-bg.png)" }}
      aria-labelledby="project-title"
    >
      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-[100px] pb-8">
        {/* Navigation */}
        <AnimationWrapper delay={0.2} duration={0.6}>
          <nav
            className="mb-12"
            role="navigation"
            aria-label="Project navigation"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
              aria-label={`Go back to ${service.title} service`}
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                aria-hidden="true"
              />
              <span className="text-sm font-medium font-['DM_Sans']">
                Back to {service.title}
              </span>
            </button>
          </nav>
        </AnimationWrapper>

        {/* Main Content */}
        <div className="max-w-3xl">
          {/* Project Title */}
          <AnimationWrapper delay={0.4} duration={0.8}>
            <h1
              id="project-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal font-['Epilogue'] leading-tight mb-12 tracking-tighter bg-gradient-to-r from-[#46ecd5] to-[#2EFFB5] bg-clip-text text-transparent uppercase"
            >
              {project.title}
            </h1>
          </AnimationWrapper>

          {/* Project Description */}
          {project.description && (
            <AnimationWrapper delay={0.6} duration={0.8}>
              <p
                className="text-xl lg:text-2xl text-white/90 leading-relaxed font-['DM_Sans'] mb-12 max-w-4xl"
                role="contentinfo"
                aria-label="Project description"
              >
                {project.description}
              </p>
            </AnimationWrapper>
          )}
        </div>
      </div>
    </section>
  );
}
