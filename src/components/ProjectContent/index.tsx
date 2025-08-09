import { Project } from "@/payload-types";
import { FAQAccordion } from "./FAQ";

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-8">
                Project Overview
              </h2>

              {project.blocks && project.blocks.length > 0 && (
                <div className="space-y-8">
                  {project.blocks.map((block, index) => (
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

            <FAQAccordion faq={project.faq} />
          </div>
        </div>
      </section>
    </div>
  );
}
