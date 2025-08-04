"use client";

import Image from "next/image";
import { useState } from "react";

export function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      icon: "📊", // You can replace with proper icons
      title: "Simplicity",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue rhoncus enim, in pharetra lacus.",
    },
    {
      icon: "🎓",
      title: "Accountability",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      icon: "⭐",
      title: "High Loyalty",
      description:
        "Mauris a libero et diam sodales semper. Aenean elit leo, hendrerit nec dolor id, rutrum finibus velit.",
    },
    {
      icon: "🚀",
      title: "Innovation",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative py-3 md:py-0 overflow-hidden ">
      {/* Background Decorations */}

      <div className="my-12 md:my-24">
        <Image
          src="/images/staff-section-sub-bg.webp"
          alt="Carousel Background"
          width={1000}
          height={1000}
          className="w-full h-full absolute top-0 left-0 z-[1]"
        />
        <div className="z-[2] relative mx-auto px-4 h-96 my-12 md:h-[545px] flex flex-col justify-center bg-gray-800">
          {/* Desktop Layout - Show 3 items */}
          <Image
            src="/images/staff-section-main-bg.webp"
            alt="Carousel Background"
            width={1000}
            height={1000}
            className="w-full h-full absolute top-0 left-0 z-[3] object-none xl:object-cover"
          />
          <div className="hidden md:block z-[4]">
            <div className="flex justify-center items-center space-x-8 lg:space-x-16 mb-8">
              {/* Navigation Arrow Left */}
              <button
                onClick={prevSlide}
                className="text-white w-7 h-14 hover:text-gray-300 transition-colors"
                aria-label="Previous slide"
              >
                <Image
                  src="/images/left-arrow.svg"
                  alt="Chevron Left"
                  width={28}
                  height={28}
                  className="w-7 h-14"
                />
              </button>

              {/* Carousel Items */}
              <div className="flex space-x-8 lg:space-x-16">
                {[0, 1, 2].map((offset) => {
                  const index = (currentSlide + offset) % carouselData.length;
                  const item = carouselData[index];
                  return (
                    <div
                      key={`${currentSlide}-${offset}`}
                      className="flex flex-col items-center text-center max-w-xs"
                    >
                      {/* Icon */}
                      <div className="w-16 h-16 bg-white rounded mb-8 flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-normal font-['DM_Sans'] leading-9 text-white mb-4">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base font-normal font-['DM_Sans'] leading-relaxed text-white opacity-75 max-w-72">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={nextSlide}
                className="text-white hover:text-gray-300 w-7 h-14 transition-colors"
                aria-label="Next slide"
              >
                <Image
                  src="/images/right-arrow.svg"
                  alt="Chevron Right"
                  width={28}
                  height={28}
                  className="w-7 h-14"
                />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center space-x-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full border border-white transition-colors ${
                    index === currentSlide
                      ? "bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.10)]"
                      : "bg-white/0"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout - Show 1 item */}
          <div className="md:hidden z-[4]">
            <div className="flex justify-center items-center mb-8">
              {/* Navigation Arrow Left */}
              <button
                onClick={prevSlide}
                className=" text-white hover:text-gray-300 transition-colors absolute left-4 top-1/2 transform -translate-y-1/2 z-20"
                aria-label="Previous slide"
              >
                <Image
                  src="/images/left-arrow.svg"
                  alt="Chevron Left"
                  width={28}
                  height={28}
                  className="w-7 h-9"
                />
              </button>

              {/* Single Carousel Item */}
              <div className="flex flex-col items-center text-center mx-auto">
                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded mb-8 flex items-center justify-center text-2xl">
                  {carouselData[currentSlide].icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-normal font-['DM_Sans'] leading-loose text-white mb-4">
                  {carouselData[currentSlide].title}
                </h3>

                {/* Description */}
                <p className="text-base font-normal font-['DM_Sans'] leading-relaxed text-white opacity-75 max-w-72">
                  {carouselData[currentSlide].description}
                </p>
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={nextSlide}
                className=" text-white hover:text-gray-300 transition-colors absolute right-4 top-1/2 transform -translate-y-1/2 z-20"
                aria-label="Next slide"
              >
                <Image
                  src="/images/right-arrow.svg"
                  alt="Chevron Right"
                  width={28}
                  height={28}
                  className="w-7 h-9"
                />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center space-x-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full border border-white transition-colors ${
                    index === currentSlide
                      ? "bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.10)]"
                      : "bg-white/0"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
