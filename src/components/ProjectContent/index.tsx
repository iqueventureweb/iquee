"use client";

import { processContentBlocks } from "@/lib/globalMethods";
import { Project } from "@/payload-types";
import { CheckCircle, Code, Lightbulb, Target } from "lucide-react";
import { useMemo } from "react";

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const processedBlocks = useMemo(() => {
    return processContentBlocks(project?.blocks);
  }, [project]);
  return (
    <div className="bg-white">
      {/* Main Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Project Overview */}
            <div className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-8">
                Project Overview
              </h2>

              {/* Project Blocks Content */}
              {processedBlocks.length > 0 && (
                <div className="space-y-8">
                  {processedBlocks.map((block, index) => (
                    <div key={index} className="bg-neutral-50 rounded-2xl p-8">
                      {block.title && (
                        <h3 className="text-xl lg:text-2xl font-semibold font-['Epilogue'] text-neutral-900 mb-4">
                          {block.title}
                        </h3>
                      )}
                      {block.content && (
                        <div
                          className="prose prose-lg prose-neutral max-w-none font-['DM_Sans']"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="mb-16">
              <h3 className="text-2xl lg:text-3xl font-semibold font-['Epilogue'] text-neutral-900 mb-8">
                Key Features & Solutions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Strategic Planning
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      Comprehensive analysis and strategic approach to meet
                      business objectives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Code className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Technical Excellence
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      Implementation using cutting-edge technologies and best
                      practices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Innovation Focus
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      Creative solutions that push boundaries and deliver
                      exceptional results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Quality Assurance
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      Rigorous testing and quality checks to ensure optimal
                      performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            {project.faq && project.faq.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl lg:text-3xl font-semibold font-['Epilogue'] text-neutral-900 mb-8">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {project.faq.map((faqItem, index) => (
                    <div
                      key={index}
                      className="border border-neutral-200 rounded-xl p-6"
                    >
                      <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                        {faqItem.question}
                      </h4>
                      {faqItem.answer && (
                        <p className="text-neutral-600 font-['DM_Sans']">
                          {faqItem.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
