"use client";

export function HomeServicesSection() {
  const services = [
    {
      id: "01",
      title: "Creating\nEntrepreneurs",
      image: "https://placehold.co/218x108",
    },
    {
      id: "02",
      title: "Supporting\nStartups",
      image: "https://placehold.co/218x108",
    },
    {
      id: "03",
      title: "Creating and Connecting Investors",
      image: "https://placehold.co/218x108",
    },
    {
      id: "04",
      title: "Collaboration with Govt and Other Organisations",
      image: "https://placehold.co/218x108",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
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
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal font-['Poppins'] text-neutral-900 leading-relaxed">
                  To solve complex
                </p>

                {/* Decorative border */}
                <div className="w-32 sm:w-40 md:w-48 lg:w-64 xl:w-[306px] absolute h-6 sm:h-7 md:h-8 lg:h-10 xl:h-12 rounded-full border border-neutral-900 opacity-70 transform -rotate-3 hidden sm:block left-[120px] sm:left-auto top-8 sm:top-auto" />

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal font-['Poppins'] text-neutral-900 leading-relaxed">
                  problems and cultivate
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
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`w-full max-w-6xl mx-auto ${
                index % 2 === 1 ? "md:mr-0" : "md:ml-0"
              }`}
            >
              <div className="rounded-[40px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[120px] xl:rounded-[200px] border border-neutral-900 p-4 sm:p-6 md:p-8 lg:p-12 xl:px-16 lg:py-3 min-h-32 sm:min-h-40 md:min-h-48 lg:min-h-56 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                {/* Content */}
                <div className="flex-1 flex items-start gap-3 sm:gap-4 md:gap-3 w-full">
                  {/* Number */}
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium font-['Epilogue'] text-neutral-900 mt-2 sm:mt-4 md:mt-6 lg:mt-10 xl:mt-14 flex-shrink-0">
                    {service.id}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal font-['Epilogue'] text-neutral-900 leading-tight sm:leading-tight md:leading-tight lg:leading-[60px] xl:leading-[90px] whitespace-pre-line flex-1">
                    {service.title}
                  </h3>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
                  <img
                    src={service.image}
                    alt={service.title.replace("\n", " ")}
                    className="w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56 h-16 sm:h-18 md:h-20 lg:h-24 xl:h-28 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[70px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
