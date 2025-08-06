"use client";

import { Project, Service } from "@/payload-types";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectHeroProps {
  project: Project;
  service: Service;
}

export function ProjectHero({ project, service }: ProjectHeroProps) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
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
            <span className="text-sm font-medium">Back to {service.title}</span>
          </button>
        </div>

        <div className="">
          {/* Left Content */}
          <div>
            {/* Service Tag */}
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-sm font-medium text-white/90">
                {service.title}
              </span>
            </div>

            {/* Project Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Epilogue'] text-white leading-tight mb-6">
              {project.title}
            </h1>

            {/* Project Description */}
            {project.description && (
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed font-light font-['DM_Sans'] mb-8">
                {project.description}
              </p>
            )}

            {/* Project Meta */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/70">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Completed Project</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
