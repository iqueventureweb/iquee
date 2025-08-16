"use client";

import { HomePage } from "@/payload-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimationWrapper } from "../AnimationWrapper";

// Staff member type definition
interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  social_links?: {
    twitter?: string | null;
    facebook?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
  };
}

interface StaffSectionProps {
  data?: HomePage["staff"];
}

export function StaffSection({ data }: StaffSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback data if CMS data is not available
  const defaultStaffMembers: StaffMember[] = [
    {
      id: 1,
      name: "Shafi Shoukath",
      role: "CEO",
      image: "/staff/shaffi.webp",
      quote: "We are strong team who brings innovative ideas into production.",
      social_links: {
        twitter: "https://twitter.com/shafishoukath",
        facebook: "https://facebook.com/shafishoukath",
        linkedin: "https://linkedin.com/in/shafishoukath",
        instagram: "https://instagram.com/shafishoukath",
      },
    },
    {
      id: 2,
      name: "Varsha Sivanarayanan",
      role: "CFO",
      image: "/staff/varsha.webp",
      quote:
        "Innovation and teamwork drive our success in building exceptional solutions.",
      social_links: {
        twitter: "https://twitter.com/varshasivan",
        facebook: "https://facebook.com/varshasivan",
        linkedin: "https://linkedin.com/in/varshasivan",
        instagram: "https://instagram.com/varshasivan",
      },
    },
    {
      id: 3,
      name: "Indu",
      role: "Developer, Co-founder",
      image: "/staff/indu.webp",
      quote: "We are strong team who brings innovative ideas into production.",
      social_links: {
        twitter: "https://twitter.com/thomasjohnson",
        facebook: "https://facebook.com/thomasjohnson",
        linkedin: "https://linkedin.com/in/thomasjohnson",
        instagram: "https://instagram.com/thomasjohnson",
      },
    },
    {
      id: 4,
      name: "Arun",
      role: "CTO",
      image: "/staff/arun-new.webp",
      quote:
        "Technology and vision combine to create transformative experiences for our clients.",
      social_links: {
        twitter: "https://twitter.com/sarahmitchell",
        facebook: "https://facebook.com/sarahmitchell",
        linkedin: "https://linkedin.com/in/sarahmitchell",
        instagram: "https://instagram.com/sarahmitchell",
      },
    },
  ];

  // Update the data mapping to handle null values
  const staffMembers =
    data && data.length > 0
      ? data.map((staff, index) => ({
          id: index + 1,
          name: staff.name || "",
          role: staff.role || "",
          image: staff.image_url || "https://placehold.co/300x400",
          quote: staff.quote || "",
          social_links: staff.social_links || {},
        }))
      : defaultStaffMembers;

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

  // Social Media Icons Component
  const SocialMediaIcons = ({
    socialLinks,
  }: {
    socialLinks?: StaffMember["social_links"] | null;
  }) => {
    if (!socialLinks) return null;

    return (
      <div className="flex gap-3 mt-4 justify-center">
        {/* Twitter/X */}
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 p-px bg-transparent border border-white/30 rounded-full inline-flex justify-center items-center hover:border-white/60 transition-colors cursor-pointer"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </a>
        )}

        {/* Facebook */}
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 p-px bg-transparent border border-white/30 rounded-full inline-flex justify-center items-center hover:border-white/60 transition-colors cursor-pointer"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
          </a>
        )}

        {/* LinkedIn */}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-transparent border border-white/30 rounded-full inline-flex justify-center items-center hover:border-white/60 transition-colors cursor-pointer"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </a>
        )}

        {/* Instagram */}
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-transparent border border-white/30 rounded-full inline-flex justify-center items-center hover:border-white/60 transition-colors cursor-pointer"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
          </a>
        )}
      </div>
    );
  };

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
          width={400}
          height={600}
          quality={95}
          priority
          className="w-full h-80 sm:h-96 lg:h-80 xl:h-96 object-cover rounded-lg"
        />
        <div className="text-center mt-4">
          <h4 className="text-base lg:text-lg font-normal font-['DM_Sans'] leading-normal text-white">
            {member.name}
          </h4>
          <p className="text-sm lg:text-base font-normal font-['DM_Sans'] leading-tight text-neutral-500">
            {member.role}
          </p>
          {/* Social Media Icons */}
          <SocialMediaIcons socialLinks={member.social_links} />
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
    <section id="team" className="bg-black py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Single Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:justify-between">
          {/* Quote Section */}
          <div className="w-full lg:max-w-xl">
            <AnimationWrapper delay={0.2}>
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
            </AnimationWrapper>
          </div>

          {/* Team Carousel */}
          <div className="relative w-full lg:w-auto">
            <AnimationWrapper delay={0.4}>
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
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
