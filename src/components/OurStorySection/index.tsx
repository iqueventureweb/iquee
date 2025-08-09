import { HomePage } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface OurStorySectionProps {
  data?: HomePage["our_story"];
}

export function OurStorySection({ data }: OurStorySectionProps) {
  return (
    <section id="about" className="py-9 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto">
            {/* Top Section */}
            <div className="grid grid-cols-12 gap-8 mb-16">
              {/* Left Content */}
              <div className="col-span-6">
                <div className="space-y-6">
                  <span className="text-neutral-500 text-sm font-medium font-['DM_Sans'] uppercase leading-none tracking-wide">
                    Our Story
                  </span>
                  <h2 className="text-6xl font-medium font-['DM_Sans'] leading-[61.99px] text-black">
                    {data?.title || "Better way to create"}
                  </h2>
                </div>
              </div>

              {/* Right Content */}
              <div className="col-span-6 flex justify-end items-start pt-8">
                <div className="flex items-center space-x-4">
                  {/* Decorative element */}
                  <Image
                    src="/images/dot-vertical-grid.svg"
                    alt="Dot Vertical Grid"
                    width={100}
                    height={100}
                    className="w-24 h-56 absolute top-0 right-32 md:right-64"
                  />

                  {/* Learn more link */}
                  <div className="flex items-center space-x-2 border-b-2 border-black pb-2 z-10">
                    <span className="text-black text-base font-medium font-['DM_Sans'] leading-none">
                      Learn more about us
                    </span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-16">
              <p className="text-xl font-light font-['DM_Sans'] leading-[1.2] text-black max-w-5xl mx-auto">
                {data?.description ||
                  "IQue Ventures is dedicated to building a dynamic and sustainable startup ecosystem that fosters innovation, entrepreneurship, and growth. We focus on empowering entrepreneurs, supporting startups, cultivating investors, and bridging the gap between startups and government or private organizations. By creating impactful projects and programs, we enable startups to drive positive change and create solutions that benefit society."}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-8 justify-between relative">
              {/* Left Image */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <Image
                    src="/our-story.png"
                    alt="Our Story"
                    width={630}
                    height={354}
                    className="w-auto h-auto rounded-lg"
                  />
                  {/* Decorative element */}
                </div>
              </div>

              {/* Right Content */}
              <div className="col-span-6 space-y-7 max-w-[400px] md:max-w-[35%]">
                {/* Our Mission */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium font-['DM_Sans'] leading-normal text-black">
                    {data?.contents?.[0]?.title || "Our Mission"}
                  </h3>
                  <p className="text-lg font-normal font-['DM_Sans'] leading-[1.2] text-neutral-500">
                    {data?.contents?.[0]?.description ||
                      "we to connect the dots between aspiring founders, innovative startups, and resourceful investors, while also facilitating collaboration with key stakeholders like governments and corporations. Through a holistic approach, we develop tailored programs and initiatives that support each stage of the entrepreneurial journey, from idea inception to market success."}
                  </p>
                </div>

                {/* Our Vision */}
                <div className="space-y-2 md:space-y-4">
                  <h3 className="text-xl font-medium font-['DM_Sans'] leading-normal text-black">
                    {data?.contents?.[1]?.title || "Our Vision"}
                  </h3>
                  <p className="text-lg font-normal font-['DM_Sans'] leading-[1.2] text-neutral-500">
                    {data?.contents?.[1]?.description ||
                      "At IQue Ventures, we believe in the power of community and collaboration. We are committed to creating a seamless ecosystem where entrepreneurs and startups can thrive, investors can discover opportunities, and organizations can leverage the potential of innovative solutions."}
                  </p>
                </div>
              </div>
              <Image
                src="/images/wave-decoration.svg"
                alt="Wave Dec"
                width={100}
                height={100}
                className="w-40 h-auto absolute -bottom-6 -left-8"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6 md:space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <span className="text-neutral-500 text-sm font-medium font-['DM_Sans'] uppercase leading-none tracking-wide">
              Our Story
            </span>
            <h2 className="text-3xl font-medium font-['DM_Sans'] leading-loose text-black">
              {data?.title || "Better way to create."}
            </h2>
          </div>

          {/* Description */}
          <p className="text-xl font-light font-['DM_Sans'] leading-normal text-black">
            {data?.description ||
              "IQue Ventures is dedicated to building a dynamic and sustainable startup ecosystem that fosters innovation, entrepreneurship, and growth. We focus on empowering entrepreneurs, supporting startups, cultivating investors, and bridging the gap between startups and government or private organizations. By creating impactful projects and programs, we enable startups to drive positive change and create solutions that benefit society."}
          </p>

          {/* Learn more link */}
          <div className="flex items-center space-x-2 border-b-2 border-black pb-2 w-fit">
            <span className="text-black text-base font-medium font-['DM_Sans'] leading-none">
              Learn more about us
            </span>
            <ArrowRight className="w-4 h-4 text-black" />
          </div>

          {/* Image */}
          <div className="!mt-8">
            <Image
              src="/our-story.png"
              alt="Our Story"
              width={350}
              height={196}
              className="w-80 h-48 rounded-lg"
            />
          </div>

          {/* Mission and Vision */}
          <div className="space-y-12">
            {/* Our Mission */}
            <div className="space-y-4 mt-12">
              <h3 className="text-xl font-medium font-['DM_Sans'] leading-normal text-black">
                {data?.contents?.[0]?.title || "Our Mission"}
              </h3>
              <p className="text-lg font-normal font-['DM_Sans'] leading-loose text-neutral-500">
                {data?.contents?.[0]?.description ||
                  "We to connect the dots between aspiring founders, innovative startups, and resourceful investors, while also facilitating collaboration with key stakeholders like governments and corporations. Through a holistic approach, we develop tailored programs and initiatives that support each stage of the entrepreneurial journey, from idea inception to market success."}
              </p>
            </div>

            {/* Our Vision */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium font-['DM_Sans'] leading-normal text-black">
                {data?.contents?.[1]?.title || "Our Vision"}
              </h3>
              <p className="text-lg font-normal font-['DM_Sans'] leading-loose text-neutral-500">
                {data?.contents?.[1]?.description ||
                  "At IQue Ventures, we believe in the power of community and collaboration. We are committed to creating a seamless ecosystem where entrepreneurs and startups can thrive, investors can discover opportunities, and organizations can leverage the potential of innovative solutions."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
