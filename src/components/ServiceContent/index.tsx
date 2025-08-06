"use client";

import { processContentBlocks } from "@/lib/globalMethods";
import { Service } from "@/payload-types";
import { useMemo } from "react";

interface ServiceContentProps {
  service: Service;
}

export function ServiceContent({ service }: ServiceContentProps) {
  const processedBlocks = useMemo(() => {
    return processContentBlocks(service?.blocks);
  }, [service]);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-medium font-['Epilogue'] text-neutral-900 mb-6">
              Service Details
            </h2>
            <div className="w-24 h-1 bg-neutral-900 mx-auto" />
          </div>

          {/* Service Blocks */}
          {processedBlocks.length > 0 && (
            <div className="space-y-12">
              {processedBlocks.map((block, index) => (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-3xl p-8 lg:p-12"
                >
                  {/* Block Title */}
                  {block.title && (
                    <h3 className="text-2xl lg:text-3xl font-medium font-['Epilogue'] text-neutral-900 mb-6">
                      {block.title}
                    </h3>
                  )}

                  {/* Block Content - Render as processed HTML */}
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

          {/* Additional Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h4 className="text-xl font-semibold font-['Epilogue'] text-neutral-900 mb-4">
                Key Features
              </h4>
              <ul className="space-y-3 text-neutral-700 font-['DM_Sans']">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Comprehensive solution design
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Expert consultation and guidance
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Ongoing support and maintenance
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Scalable and future-ready approach
                </li>
              </ul>
            </div>

            {/* Process */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
              <h4 className="text-xl font-semibold font-['Epilogue'] text-neutral-900 mb-4">
                Our Process
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-1">
                      Discovery
                    </h5>
                    <p className="text-sm text-neutral-600">
                      Understanding your needs and goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-1">
                      Strategy
                    </h5>
                    <p className="text-sm text-neutral-600">
                      Developing tailored solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-1">
                      Implementation
                    </h5>
                    <p className="text-sm text-neutral-600">
                      Executing with precision and care
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-1">
                      Support
                    </h5>
                    <p className="text-sm text-neutral-600">
                      Ongoing optimization and growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
