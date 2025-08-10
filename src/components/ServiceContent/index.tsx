"use client";

import { Service } from "@/payload-types";

interface ServiceContentProps {
  service: Service;
}

export function ServiceContent({ service }: ServiceContentProps) {
  const blocks = service?.blocks ?? [];

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-br from-white via-blue-50/20 to-white"
      id="service-details"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-medium font-['Epilogue'] text-neutral-900 mb-6">
              Service Details
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
          </div>

          {blocks.length > 0 && (
            <div className="space-y-12">
              {blocks.map((block, index) => (
                <div
                  key={block?.id || index}
                  className="bg-white rounded-3xl p-8 lg:p-12 border border-neutral-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200/80"
                >
                  {block?.title && (
                    <h3 className="text-2xl lg:text-3xl font-medium font-['Epilogue'] text-neutral-900 mb-6">
                      {block.title}
                    </h3>
                  )}

                  {block?.content && (
                    <div
                      className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: block.content || "" }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
