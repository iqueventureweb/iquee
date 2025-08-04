"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Staff member type definition
interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export function StaffSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const staffMembers: StaffMember[] = [
    {
      id: 1,
      name: "Shafi Shoukath",
      role: "CEO",
      image: "https://placehold.co/300x400",
      quote: "We are strong team who brings innovative ideas into production.",
    },
    {
      id: 2,
      name: "Varsha Sivanarayanan",
      role: "CFO",
      image: "https://placehold.co/300x400",
      quote:
        "Innovation and teamwork drive our success in building exceptional solutions.",
    },
    {
      id: 3,
      name: "Thomas Johnson",
      role: "Developer, Co-founder",
      image: "https://placehold.co/350x467",
      quote: "We are strong team who brings innovative ideas into production.",
    },
    {
      id: 4,
      name: "Sarah Mitchell",
      role: "CTO",
      image: "https://placehold.co/300x400",
      quote:
        "Technology and vision combine to create transformative experiences for our clients.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % staffMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + staffMembers.length) % staffMembers.length
    );
  };

  const currentMember = staffMembers[currentSlide];
  const nextMember = staffMembers[(currentSlide + 1) % staffMembers.length];

  // Staff member card component
  const StaffMemberCard = ({
    member,
    className = "",
  }: {
    member: StaffMember;
    className?: string;
  }) => (
    <div className={`flex-shrink-0 z-[5] ${className}`}>
      <div className="w-64 sm:w-72 lg:w-64 xl:w-72">
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={400}
          className="w-full h-80 sm:h-96 lg:h-80 xl:h-96 object-cover rounded-lg"
        />
        <div className="text-center mt-4">
          <h4 className="text-base lg:text-lg font-normal font-['DM_Sans'] leading-normal text-white">
            {member.name}
          </h4>
          <p className="text-sm lg:text-base font-normal font-['DM_Sans'] leading-tight text-neutral-500">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );

  // Navigation button component
  const NavigationButton = ({
    onClick,
    direction,
    className,
  }: {
    onClick: () => void;
    direction: "prev" | "next";
    className: string;
  }) => (
    <button
      onClick={onClick}
      className={`absolute z-[10] top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-3xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.03),0px_1px_1px_0px_rgba(0,0,0,0.03),0px_5px_10px_0px_rgba(0,0,0,0.05)] flex items-center justify-center hover:shadow-md transition-shadow ${className}`}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} staff member`}
    >
      {direction === "prev" ? (
        <ArrowLeft className="w-5 h-5 text-neutral-600" />
      ) : (
        <ArrowRight className="w-5 h-5 text-neutral-600" />
      )}
    </button>
  );

  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Single Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:justify-between">
          {/* Quote Section */}
          <div className="w-full lg:max-w-xl">
            <div className="flex gap-4 lg:gap-6 items-start">
              {/* Quote Icon */}
              <div className="w-14 h-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-[30px] mb-4 lg:mb-6 flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0">
                <span className="h-[23px] md:h-[33px] text-5xl md:text-6xl xl:text-7xl font-serif text-black leading-none">
                  {"”"}
                </span>
              </div>

              <div className="items-start md:items-center">
                {/* Quote Text */}
                <h3 className="text-2xl text-start sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-medium font-['DM_Sans'] leading-[1.1] xl:leading-[55.98px] text-white mb-6 lg:mb-8">
                  {currentMember.quote}
                </h3>

                {/* Divider */}
                <div className="w-20 h-px bg-white mb-3 sm:mx-0"></div>

                {/* Author Info */}
                <div>
                  <h3 className="text-lg font-medium font-['DM_Sans'] leading-relaxed text-white">
                    {currentMember.name}
                  </h3>
                  <p className="text-base font-normal font-['DM_Sans'] leading-snug text-neutral-500">
                    {currentMember.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Carousel */}
          <div className="relative w-full lg:w-auto">
            {/* Team Members Display */}
            <div className="flex justify-center mx-auto relative w-fit space-x-4 lg:space-x-8 overflow-visible z-[1]">
              {/* First member - always visible */}
              <StaffMemberCard member={currentMember} />

              {/* Second member - hidden on mobile, visible on md+ */}
              <StaffMemberCard
                member={nextMember}
                className="hidden md:block"
              />

              {/* Navigation Buttons */}
              <NavigationButton
                onClick={prevSlide}
                direction="prev"
                className="left-[-39px] sm:left-[-55px]"
              />
              <NavigationButton
                onClick={nextSlide}
                direction="next"
                className="right-[-25px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
