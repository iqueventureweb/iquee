"use client";

import { Project } from "@/payload-types";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimationWrapper } from "../AnimationWrapper";

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
    <section className="py-16 lg:py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <AnimationWrapper delay={0.2} duration={0.5}>
            <h2 className="text-5xl mb-4 font-medium font-['DM_Sans'] leading-tight text-neutral-900">
              Our Projects
            </h2>
          </AnimationWrapper>
          <AnimationWrapper delay={0.3} duration={0.5}>
            <p className="text-lg text-neutral-600 font-['DM_Sans'] max-w-2xl mx-auto">
              Explore our successful implementations and case studies that
              showcase our expertise
            </p>
          </AnimationWrapper>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              onClick={() => handleProjectClick(project.slug)}
              key={project.id + index}
              className="group cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <AnimationWrapper
                key={project.id + index}
                delay={0.4 + index * 0.1}
                duration={0.5}
                className="h-full flex flex-col"
              >
                {/* Project Image - Always show image area for consistency */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                  {project.image_url ? (
                    <>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BUNNY_CDN}${project.image_url}`}
                        alt={project.title || "Project image"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-neutral-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-2xl text-neutral-600">📁</span>
                        </div>
                        <p className="text-sm text-neutral-500 font-medium">
                          Project Image
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                      Project
                    </span>
                    <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                      Recent
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg md:text-xl font-['Poppins'] leading-snug text-neutral-900 group-hover:underline mb-3">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  {project.description && (
                    <div
                      className="text-sm text-neutral-600 line-clamp-3 mb-4 flex-grow"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  )}

                  {/* Project Content Preview */}
                  {project.blocks &&
                    project.blocks.length > 0 &&
                    !project.description && (
                      <div
                        className="text-sm text-neutral-600 line-clamp-2 mb-4 flex-grow"
                        dangerouslySetInnerHTML={{
                          __html:
                            project.blocks[0]?.content ||
                            project.blocks[0]?.title ||
                            "",
                        }}
                      />
                    )}

                  {/* Project Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-neutral-700">
                      <Calendar className="w-4 h-4" />
                      <span>Recent Project</span>
                    </div>
                    <div className="text-sm text-neutral-700 group-hover:underline">
                      View Project →
                    </div>
                  </div>
                </div>
              </AnimationWrapper>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <AnimationWrapper delay={0.4} duration={0.5}>
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
          </AnimationWrapper>
        )}
      </div>
    </section>
  );
}
