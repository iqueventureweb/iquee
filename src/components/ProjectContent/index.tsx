"use client";

import { Project } from "@/payload-types";
import { AnimationWrapper } from "../AnimationWrapper";
import { FAQAccordion } from "./FAQ";

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const blocks = project?.blocks ?? [];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/20 to-white">
      <section 
        className="py-16 lg:py-24" 
        id="project-overview"
        aria-labelledby="project-overview-title"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-16">
              <AnimationWrapper delay={0.2} duration={0.6}>
                <h2 
                  id="project-overview-title"
                  className="text-3xl lg:text-4xl font-medium font-['Epilogue'] text-neutral-900 mb-8"
                >
                  Project Overview
                </h2>
              </AnimationWrapper>
            </header>

            {blocks && blocks.length > 0 && (
              <div 
                className="space-y-8"
                role="region"
                aria-labelledby="project-overview-title"
              >
                {blocks.map((block, index) => (
                  <AnimationWrapper
                    key={index}
                    delay={0.4 + index * 0.1}
                    duration={0.6}
                  >
                    <article 
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                      role="article"
                      aria-labelledby={block.title ? `block-title-${index}` : undefined}
                    >
                      {block.title && (
                        <h3 
                          id={`block-title-${index}`}
                          className="text-xl lg:text-2xl font-semibold font-['Epilogue'] text-neutral-900 mb-4"
                        >
                          {block.title}
                        </h3>
                      )}
                      {block.content && (
                        <div
                          className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                          role="contentinfo"
                          aria-label={block.title ? `Content for ${block.title}` : "Project content"}
                        />
                      )}
                    </article>
                  </AnimationWrapper>
                ))}
              </div>
            )}

            <AnimationWrapper delay={0.8} duration={0.6}>
              <div role="region" aria-labelledby="faq-section-title">
                <h3 
                  id="faq-section-title"
                  className="sr-only"
                >
                  Frequently Asked Questions
                </h3>
                <FAQAccordion faq={project.faq} />
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
