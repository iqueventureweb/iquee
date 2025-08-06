"use client";

import { Service } from "@/payload-types";
import { useRouter } from "next/navigation";

interface HomeServicesSectionProps {
  services?: Service[];
}

export function HomeServicesSection({ services }: HomeServicesSectionProps) {
  // Fallback data if CMS data is not available
  const router = useRouter();
  const defaultServices = [
    {
      id: "01",
      title: "Creating\nEntrepreneurs",
      slug: "creating-entrepreneurs",
      description: "Empowering individuals to become successful entrepreneurs",
      icon: "📊",
      image: "https://placehold.co/218x108",
    },
    {
      id: "02",
      title: "Supporting\nStartups",
      slug: "supporting-startups",
      description: "Providing comprehensive support for startup growth",
      icon: "🚀",
      image: "https://placehold.co/218x108",
    },
    {
      id: "03",
      title: "Creating and Connecting Investors",
      slug: "creating-and-connecting-investors",
      description: "Building bridges between startups and investors",
      icon: "💼",
      image: "https://placehold.co/218x108",
    },
    {
      id: "04",
      title: "Collaboration with Govt and Other Organisations",
      slug: "collaboration-with-govt-and-other-organisations",
      description: "Fostering partnerships for ecosystem development",
      icon: "🤝",
      image: "https://placehold.co/218x108",
    },
  ];

  const servicesData =
    // First priority: Services from Services collection
    services && services.length > 0
      ? services
          .map((service, index) => ({
            id: String(index + 1).padStart(2, "0"),
            title: service.title || "",
            slug: service.slug || "",
            description:
              service.blocks?.[0]?.content || service.blocks?.[0]?.title || "",
            icon: "🚀", // Default icon for services from collection
            image: "https://placehold.co/218x108", // Default image
          }))
          .reverse()
      : // Fallback: Default services
        defaultServices;

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 lg:pt-32 xl:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 md:gap-8">
            {/* Services Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium font-['Epilogue'] uppercase text-neutral-900 leading-none">
              Services
            </h2>

            {/* Subtitle with decorative border */}
            <div className="mr-20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4 relative">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal font-['Poppins'] leading-[1.3] text-neutral-900 ">
                  To solve complex <span className="sm:hidden">problems</span>
                </p>

                {/* Decorative border */}
                <div className="w-[177px] sm:w-[205px] md:w-60 lg:w-64 xl:w-[306px] absolute h-[65px] sm:h-7 md:h-8 lg:h-10 xl:h-12 rounded-full border border-neutral-900 opacity-70 transform -rotate-6 sm:-rotate-3 left-[81px]  md:left-[100px] lg:left-[122px] top-[-9px] sm:top-auto" />

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal font-['Poppins'] text-neutral-900 leading-relaxed">
                  <span className="hidden sm:inline">problems</span> and
                  cultivate
                </p>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal font-['Poppins'] text-neutral-900 leading-relaxed mt-1 sm:mt-2">
                business solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Services Cards */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={` w-[90%] sm:w-full max-w-xl lg:max-w-6xl cursor-pointer mx-auto ${
                index % 2 === 1 ? "mr-0" : "ml-0"
              }`}
              onClick={() => {
                router.push(`/services/${service.slug}`);
              }}
            >
              <div className="rounded-[40px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[120px] xl:rounded-[200px] border border-neutral-900 p-4 py-1 md:p-8 lg:p-12 xl:px-16 lg:py-3 min-h-16 sm:min-h-40 md:min-h-48 lg:min-h-56 flex  items-center justify-between gap-4 sm:gap-6 md:gap-8 relative tracking-tighter">
                {/* Content */}
                <div className="flex gap-1 sm:gap-4 md:gap-3 w-full">
                  {/* Number */}
                  <span className="text-[10.40px] sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium font-['Epilogue'] text-neutral-900 mt-3 sm:mt-4 md:mt-6 lg:mt-10 xl:mt-14 absolute left-4 lg:left-6 xl:left-10 top-[20%]">
                    {service.id}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-normal ml-4 sm:ml-14 font-['Epilogue'] text-neutral-900 leading-[1.1] sm:leading-tight md:leading-tight lg:leading-[60px] xl:leading-[90px] ">
                    {service.title}
                  </h3>
                </div>

                {/* Image */}
                <img
                  src={service.image}
                  alt={service.title.replace("\n", " ")}
                  className="w-16 h-8 sm:w-36 md:w-40 lg:w-48 xl:w-56 sm:h-18 md:h-20 lg:h-24 xl:h-28 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[70px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
