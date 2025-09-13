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
                              // Correct border radius logic
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
                              alt={block?.title || "Service image"}
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
                            // Correct border radius for content section
                            index % 2 === 0
                              ? "rounded-b-2xl lg:rounded-r-3xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-b-3xl" // Right side - only right corners rounded
                              : "rounded-b-2xl lg:rounded-l-3xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-b-none" // Left side - only left corners rounded
                          }`}
                        >
                          <div className="space-y-4 sm:space-y-6">
                            {block?.title && (
                              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-['Epilogue'] text-neutral-900">
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
                      </div>
                    ) : (
                      // Layout without image - centered content with full border radius
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 sm:p-8 lg:p-12">
                          <div className="space-y-4 sm:space-y-6 text-center">
                            {block?.title && (
                              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-['Epilogue'] text-neutral-900">
                                {block.title}
                              </h3>
                            )}

                            {block?.content && (
                              <div
                                className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700 leading-relaxed mx-auto"
                                dangerouslySetInnerHTML={{
                                  __html: block.content || "",
                                }}
                                itemProp="description"
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
