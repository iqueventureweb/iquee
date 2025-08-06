"use client";

import { Project } from "@/payload-types";
import { ArrowUpRight, Calendar, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectsGridProps {
  projects: Project[];
  serviceSlug: string;
}

export function ProjectsGrid({ projects, serviceSlug }: ProjectsGridProps) {
  const router = useRouter();

  const handleProjectClick = (projectSlug: string) => {
    router.push(`/services/${serviceSlug}/project/${projectSlug}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-medium font-['Epilogue'] text-neutral-900 mb-6">
            Our Projects
          </h2>
          <p className="text-lg text-neutral-600 font-['DM_Sans'] max-w-2xl mx-auto">
            Explore our successful implementations and case studies that
            showcase our expertise
          </p>
          <div className="w-24 h-1 bg-neutral-900 mx-auto mt-6" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.slug)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                {/* Placeholder for now - you can add project image here */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white opacity-50">
                    {project.title?.charAt(0) || "P"}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 lg:p-8">
                {/* Project Title */}
                <h3 className="text-xl lg:text-2xl font-semibold font-['Epilogue'] text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                {project.description && (
                  <p className="text-neutral-600 font-['DM_Sans'] mb-4 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {/* Project Content Preview */}
                {project.blocks && project.blocks.length > 0 && (
                  <p className="text-sm text-neutral-500 font-['DM_Sans'] mb-6 line-clamp-2">
                    {project.blocks[0]?.content ||
                      project.blocks[0]?.title ||
                      ""}
                  </p>
                )}

                {/* Project Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    <span>Recent Project</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-blue-600 font-medium">
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-neutral-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-2">
              No Projects Yet
            </h3>
            <p className="text-neutral-600">
              Projects for this service are coming soon. Check back later!
            </p>
          </div>
        )}

        {/* View All Projects Button */}
        {projects.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-neutral-900 text-white rounded-full font-semibold font-['DM_Sans'] hover:bg-neutral-800 transition-colors">
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
