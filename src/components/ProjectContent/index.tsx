"use client";

import { WHATSAPP } from "@/lib/constants";
import { Project } from "@/payload-types";
import Image from "next/image";
import { AnimationWrapper } from "../AnimationWrapper";
import { WhatsAppCTAButton } from "../ui/WhatsAppCTAButton";
import { FAQAccordion } from "./FAQ";
import { ProjectTestimonials } from "./Testimonials";

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const blocks = project?.blocks ?? [];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimationWrapper delay={0.1} duration={0.8}>
              <span className="text-neutral-500 text-xl md:text-3xl font-medium font-['DM_Sans'] uppercase tracking-wide mb-4 block">
                Project Overview
              </span>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Project Content Blocks */}
      {blocks && blocks.length > 0 && (
        <section className="pb-5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-12 lg:space-y-16">
                {blocks.map((block, index) => (
                  <AnimationWrapper
                    key={block?.id || index}
                    delay={0.4 + index * 0.1}
                    duration={0.8}
                  >
                    <div className="group">
                      {block?.image_url ? (
                        // Layout with image - seamless card design
                        <div
                          className={`flex flex-col lg:flex-row overflow-hidden rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 ${
                            index % 2 === 0 ? "" : "lg:flex-row-reverse"
                          }`}
                        >
                          {/* Image Section */}
                          <div className="lg:w-1/2">
                            <div
                              className={`relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] overflow-hidden ${
                                // Simplified and correct border radius logic
                                index % 2 === 0
                                  ? "rounded-t-2xl lg:rounded-l-3xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-b-none" // Left side - only left corners rounded
                                  : "rounded-t-2xl lg:rounded-r-3xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-b-3xl" // Right side - only right corners rounded
                              }`}
                            >
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_BUNNY_CDN +
                                  block.image_url
                                }
                                alt={block?.title || "Project image"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={index === 0}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                            </div>
                          </div>

                          {/* Content Section */}
                          <div
                            className={`lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white ${
                              // Simplified and correct border radius for content section
                              index % 2 === 0
                                ? "rounded-b-2xl lg:rounded-r-3xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-b-3xl" // Right side - only right corners rounded
                                : "rounded-b-2xl lg:rounded-l-3xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-b-none" // Left side - only left corners rounded
                            }`}
                          >
                            <div className="space-y-4 sm:space-y-6">
                              {block.title && (
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-['DM_Sans'] leading-tight text-black">
                                  {block.title}
                                </h2>
                              )}
                              {block.content && (
                                <div
                                  className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700 leading-relaxed"
                                  dangerouslySetInnerHTML={{
                                    __html: block.content,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Layout without image - centered content with full border radius
                        <div className="max-w-4xl mx-auto">
                          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 sm:p-8 lg:p-12">
                            <div className="space-y-4 sm:space-y-6 text-center">
                              {block.title && (
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-['DM_Sans'] leading-tight text-black">
                                  {block.title}
                                </h2>
                              )}
                              {block.content && (
                                <div
                                  className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700 leading-relaxed mx-auto"
                                  dangerouslySetInnerHTML={{
                                    __html: block.content,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA Button after first block */}
                    {index === 0 && (
                      <AnimationWrapper delay={0.8} duration={0.6}>
                        <div className="text-center mt-8">
                          <WhatsAppCTAButton
                            message={WHATSAPP.messages.projectInquiry}
                            variant="primary"
                            size="lg"
                          />
                        </div>
                      </AnimationWrapper>
                    )}
                  </AnimationWrapper>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <ProjectTestimonials testimonials={project.testimonials} />

      {/* FAQ Section */}
      {project.faq && project.faq.length > 0 && (
        <section id="project-faq" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimationWrapper delay={0.8} duration={0.6}>
                <div role="region" aria-labelledby="faq-section-title">
                  <h3 id="faq-section-title" className="sr-only">
                    Frequently Asked Questions
                  </h3>
                  <FAQAccordion faq={project.faq} />
                </div>
              </AnimationWrapper>
            </div>
          </div>
        </section>
      )}

      {/* CTA Button after FAQ */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 to-cyan-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimationWrapper delay={1.0} duration={0.6}>
              <h3 className="text-2xl lg:text-3xl font-bold font-['Epilogue'] text-neutral-900 mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-neutral-600 font-['DM_Sans'] text-lg mb-8 max-w-2xl mx-auto">
                Have questions about this project or want to discuss your next
                venture? Let&apos;s connect on WhatsApp and explore the
                possibilities together.
              </p>
              <WhatsAppCTAButton
                message={WHATSAPP.messages.projectInquiry}
                variant="primary"
                size="lg"
              />
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
