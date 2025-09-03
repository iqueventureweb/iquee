"use client";

import { WHATSAPP } from "@/lib/constants";
import { Service } from "@/payload-types";
import Image from "next/image";
import { AnimationWrapper } from "../AnimationWrapper";
import { WhatsAppCTAButton } from "../ui/WhatsAppCTAButton";

interface ServiceContentProps {
  service: Service;
}

export function ServiceContent({ service }: ServiceContentProps) {
  const blocks = service?.blocks ?? [];

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-br from-white via-blue-50/20 to-white"
      id="service-details"
      aria-labelledby="service-details-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <AnimationWrapper delay={0.2} duration={0.5}>
              <h2
                id="service-details-title"
                className="text-3xl lg:text-5xl font-medium font-['Epilogue'] text-neutral-900 mb-6"
              >
                Service Details
              </h2>
            </AnimationWrapper>
            <AnimationWrapper delay={0.3} duration={0.5}>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"
                aria-hidden="true"
              />
            </AnimationWrapper>
          </header>

          {blocks.length > 0 ? (
            <div
              className="space-y-16"
              role="region"
              aria-label="Service information blocks"
            >
              {blocks.map((block, index) => (
                <AnimationWrapper
                  key={block?.id || index}
                  delay={0.4 + index * 0.1}
                  duration={0.5}
                >
                  <article className="bg-white rounded-3xl p-8 lg:p-12 border border-neutral-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200/80">
                    <div
                      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Image Section */}
                      {block?.image_url && (
                        <div className="w-full lg:w-1/2 flex-shrink-0">
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_BUNNY_CDN +
                                block.image_url
                              }
                              alt={block?.title || "Service image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="w-full lg:w-1/2 space-y-6">
                        {block?.title && (
                          <h3 className="text-2xl lg:text-3xl font-medium font-['Epilogue'] text-neutral-900">
                            {block.title}
                          </h3>
                        )}

                        {block?.content && (
                          <div
                            className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: block.content || "",
                            }}
                            itemProp="description"
                          />
                        )}
                      </div>
                    </div>
                  </article>

                  {/* CTA Button after first block */}
                  {index === 0 && (
                    <AnimationWrapper delay={0.8} duration={0.6}>
                      <div className="text-center mt-12">
                        <WhatsAppCTAButton
                          message={WHATSAPP.messages.generalInquiry}
                          variant="primary"
                          size="lg"
                        />
                      </div>
                    </AnimationWrapper>
                  )}
                </AnimationWrapper>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg font-['DM_Sans']">
                Service details are being prepared. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
