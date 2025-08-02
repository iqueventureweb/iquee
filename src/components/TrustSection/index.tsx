import Image from "next/image";

export function TrustSection() {
  const logos = [
    {
      src: "https://placehold.co/75x27",
      alt: "Company 1",
      width: 75,
      height: 27,
    },
    {
      src: "https://placehold.co/75x27",
      alt: "Company 2",
      width: 75,
      height: 27,
    },
    {
      src: "https://placehold.co/75x31",
      alt: "Company 3",
      width: 75,
      height: 31,
    },
    {
      src: "https://placehold.co/75x34",
      alt: "Company 4",
      width: 75,
      height: 34,
    },
    {
      src: "https://placehold.co/75x22",
      alt: "Company 5",
      width: 75,
      height: 22,
    },
    {
      src: "https://placehold.co/75x25",
      alt: "Company 6",
      width: 75,
      height: 25,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-lg font-medium font-['DM_Sans'] leading-snug text-black">
            Trusted by Leading Companies
          </h2>
        </div>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex justify-center items-center gap-8 lg:gap-12 xl:gap-16">
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        {/* Mobile Layout - Grid layout for smaller screens */}
        <div className="md:hidden grid grid-cols-2 gap-8 max-w-sm mx-auto">
          {logos.slice(0, 4).map((logo, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="opacity-70"
              />
            </div>
          ))}
          {/* Center the last logo if it's a 5th item */}
          {logos.length > 4 && (
            <div className="col-span-2 flex justify-center">
              <Image
                src={logos[4].src}
                alt={logos[4].alt}
                width={logos[4].width}
                height={logos[4].height}
                className="opacity-70"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
