"use client";

import { HomePage } from "@/payload-types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CarouselSectionProps {
  data?: HomePage["featured_services"];
}

export function CarouselSection({ data }: CarouselSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use data from props if available, otherwise fallback to hardcoded data
  const carouselData =
    data && data.length > 0
      ? data.map((item, index) => {
          // Define fallback images based on index
          const fallbackImages = [
            "/carousal/simplicity.svg",
            "/carousal/accountability.svg",
            "/carousal/high-loyalty.svg",
            "/carousal/accountability.svg", // Innovation uses accountability icon
          ];

          return {
            icon:
              item.image_url || fallbackImages[index % fallbackImages.length],
            title: item.title || "Default Title",
            description: item.description || "Default description",
          };
        })
      : [
          {
            icon: "/carousal/simplicity.svg",
            title: "Simplicity",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue rhoncus enim, in pharetra lacus.",
          },
          {
            icon: "/carousal/accountability.svg",
            title: "Accountability",
            description:
              "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
          },
          {
            icon: "/carousal/high-loyalty.svg",
            title: "High Loyalty",
            description:
              "Mauris a libero et diam sodales semper. Aenean elit leo, hendrerit nec dolor id, rutrum finibus velit.",
          },
          {
            icon: "/carousal/accountability.svg",
            title: "Innovation",
            description:
              "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
          },
        ];

  // Create extended array for infinite loop (duplicate items)
  const extendedData = [...carouselData, ...carouselData, ...carouselData];

  // Start auto-advance carousel
  const startAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        // Instead of jumping to 0, let it continue and handle seamless transition
        return nextSlide;
      });
    }, 3000);
  };

  // Stop auto-advance carousel
  const stopAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handle seamless loop transition
  useEffect(() => {
    // When we reach the end of the second set of data, seamlessly reset to the beginning of the first set
    if (currentSlide >= carouselData.length * 2) {
      const timer = setTimeout(() => {
        setCurrentSlide(carouselData.length);
      }, 500); // Wait for transition to complete
      return () => clearTimeout(timer);
    }
  }, [currentSlide, carouselData.length]);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentSlide((prev) => {
      const nextSlide = prev + 1;
      // When we reach the end, seamlessly continue from the beginning
      if (nextSlide >= extendedData.length) {
        return 0;
      }
      return nextSlide;
    });

    stopAutoAdvance();
    startAutoAdvance();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentSlide((prev) => {
      const prevSlide = prev - 1;
      // When we go back from the beginning, go to the end
      if (prevSlide < 0) {
        return extendedData.length - 1;
      }
      return prevSlide;
    });

    stopAutoAdvance();
    startAutoAdvance();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide % carouselData.length) return;
    setIsTransitioning(true);
    setCurrentSlide(carouselData.length + index);
    stopAutoAdvance();
    startAutoAdvance();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section
      id="about"
      className="relative py-3 md:py-0 overflow-hidden"
      aria-labelledby="carousel-title"
    >
      {/* Background Decorations */}
      <div className="my-12 md:my-24">
        <Image
          src="/images/staff-section-sub-bg.webp"
          alt="Carousel background pattern"
          width={1000}
          height={1000}
          className="w-full h-full absolute top-0 left-0 z-[1]"
          aria-hidden="true"
        />
        <div className="z-[2] relative mx-auto px-4 h-96 my-12 md:h-[545px] flex flex-col justify-center bg-gray-800">
          {/* Desktop Layout - Show 3 items */}
          <Image
            src="/images/staff-section-main-bg.webp"
            alt="Carousel main background"
            width={1000}
            height={1000}
            className="w-full h-full absolute top-0 left-0 z-[3] object-none xl:object-cover"
            aria-hidden="true"
          />
          <div className="hidden md:block z-[4]">
            <div className="flex justify-center items-center space-x-8 lg:space-x-16 mb-8">
              {/* Navigation Arrow Left */}
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="text-white w-7 h-14 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
                aria-controls="carousel-content"
              >
                <Image
                  src="/images/left-arrow.svg"
                  alt="Previous slide arrow"
                  width={28}
                  height={28}
                  className="w-7 h-14"
                  aria-hidden="true"
                />
              </button>

              {/* Carousel Container with Sliding Effect */}
              <div className="overflow-hidden w-[800px] lg:w-[1000px]">
                <div
                  className={`flex transition-transform duration-500 ease-in-out ${
                    currentSlide >= carouselData.length * 2
                      ? "transition-none"
                      : ""
                  }`}
                  style={{
                    transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                  }}
                  role="list"
                  aria-label="Carousel content"
                  id="carousel-content"
                >
                  {extendedData.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex-shrink-0 w-1/3 px-4 lg:px-8"
                    >
                      <article
                        className="flex flex-col items-center text-center max-w-xs mx-auto"
                        role="listitem"
                      >
                        {/* Icon */}
                        <div
                          className="w-16 h-16 rounded mb-8 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Image
                            src={item.icon}
                            alt={`${item.title} icon`}
                            width={64}
                            height={64}
                            className="w-16 h-16"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-normal font-['DM_Sans'] leading-9 text-white mb-4">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base font-normal font-['DM_Sans'] leading-relaxed text-white opacity-75 max-w-72">
                          {item.description}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="text-white hover:text-gray-300 w-7 h-14 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
                aria-controls="carousel-content"
              >
                <Image
                  src="/images/right-arrow.svg"
                  alt="Next slide arrow"
                  width={28}
                  height={28}
                  className="w-7 h-14"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Dots Navigation */}
            <div
              className="flex justify-center space-x-3"
              role="tablist"
              aria-label="Carousel navigation dots"
            >
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 rounded-full border border-white transition-all duration-300 ${
                    index === currentSlide % carouselData.length
                      ? "bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.10)] scale-125"
                      : "bg-white/0 hover:bg-white/20"
                  } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === currentSlide % carouselData.length}
                  role="tab"
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout - Show 1 item */}
          <div className="md:hidden z-[4] relative">
            <div className="flex justify-center items-center mb-8 relative">
              {/* Navigation Arrow Left */}
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="text-white hover:text-gray-300 transition-colors absolute left-4 top-1/2 transform -translate-y-1/2 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
                aria-controls="mobile-carousel"
              >
                <Image
                  src="/images/left-arrow.svg"
                  alt="Previous slide arrow"
                  width={28}
                  height={28}
                  className="w-7 h-9"
                  aria-hidden="true"
                />
              </button>

              {/* Mobile Carousel Container with Sliding Effect */}
              <div className="overflow-hidden w-full max-w-sm mx-auto">
                <div
                  className={`flex transition-transform duration-500 ease-in-out ${
                    currentSlide >= carouselData.length * 2
                      ? "transition-none"
                      : ""
                  }`}
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                  id="mobile-carousel"
                >
                  {extendedData.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex-shrink-0 w-full px-5"
                    >
                      <article
                        className="flex flex-col items-center text-center"
                        role="listitem"
                      >
                        {/* Icon */}
                        <div
                          className="w-16 h-16 rounded mb-8 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Image
                            src={item.icon}
                            alt={`${item.title} icon`}
                            width={64}
                            height={64}
                            className="w-16 h-16"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-normal font-['DM_Sans'] leading-loose text-white mb-4">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base font-normal font-['DM_Sans'] leading-relaxed text-white opacity-75 max-w-72">
                          {item.description}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="text-white hover:text-gray-300 transition-colors absolute right-4 top-1/2 transform -translate-y-1/2 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
                aria-controls="mobile-carousel"
              >
                <Image
                  src="/images/right-arrow.svg"
                  alt="Next slide arrow"
                  width={28}
                  height={28}
                  className="w-7 h-9"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Dots Navigation */}
            <div
              className="flex justify-center space-x-3 relative z-50"
              role="tablist"
              aria-label="Carousel navigation dots"
            >
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full border border-white transition-all duration-300 cursor-pointer ${
                    index === currentSlide % carouselData.length
                      ? "bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.10)] scale-125"
                      : "bg-white/0 hover:bg-white/20"
                  } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === currentSlide % carouselData.length}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
