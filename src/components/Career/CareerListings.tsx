"use client";

import { Career } from "@/payload-types";
import { AnimationWrapper } from "../AnimationWrapper";
import { WhatsAppCTAButton } from "../ui/WhatsAppCTAButton";
import { CareerCard } from "./CareerCard";

interface CareerListingsProps {
  careers: Career[];
}

export function CareerListings({ careers }: CareerListingsProps) {
  const activeCareers = careers.filter((career) => career.status === "active");

  if (activeCareers.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper delay={0.2} duration={0.6}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-6">
                Currently Open Positions
              </h2>
              <p className="text-lg font-['DM_Sans'] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                We don&apos;t have any open positions at the moment, but
                we&apos;re always looking for talented individuals. Feel free to
                send us your resume for future opportunities.
              </p>
              <div className="mt-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl">
                  <svg
                    className="w-8 h-8 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <AnimationWrapper delay={0.2} duration={0.6}>
          <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-4">
              Currently Open Positions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto mb-8 rounded-full" />
            <p className="text-lg font-['DM_Sans'] text-neutral-600 max-w-2xl mx-auto">
              Join our team and be part of something extraordinary
            </p>
          </header>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {activeCareers.map((career, index) => (
            <AnimationWrapper
              key={career.id}
              delay={0.4 + index * 0.1}
              duration={0.6}
            >
              <CareerCard career={career} />
            </AnimationWrapper>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <AnimationWrapper delay={0.8} duration={0.6}>
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <p className="text-lg font-['DM_Sans'] text-neutral-600 mb-6">
                Don&apos;t see a position that fits? We&apos;re always
                interested in hearing from talented individuals.
              </p>
              <WhatsAppCTAButton
                message="Hello! I'm interested in career opportunities at iQue. I don't see a specific position that fits my profile, but I'd love to discuss potential opportunities."
                variant="primary"
                size="lg"
                text="Send General Application"
              />
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
