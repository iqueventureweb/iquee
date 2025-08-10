"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimationWrapper } from "../AnimationWrapper";

export function FooterSection() {
  return (
    <footer className="bg-stone-950 px-6 sm:px-8 lg:px-16 py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16 lg:gap-20">
          {/* Left Section */}
          <div className="w-full lg:w-[560px] flex flex-col justify-start items-center lg:items-start gap-16 lg:gap-48">
            {/* Logo and Description */}
            <div className="self-stretch flex flex-col justify-start items-center lg:items-start gap-10">
              <AnimationWrapper delay={0.2}>
                <Image
                  src="/images/ique-footer-logo.svg"
                  alt="iQue Logo"
                  width={205}
                  height={100}
                  className="w-32 h-16 md:w-52 md:h-24 max-h-24"
                />
              </AnimationWrapper>
              <AnimationWrapper delay={0.3}>
                <div className="flex flex-col justify-start items-center lg:items-start gap-6 text-center lg:text-left">
                  <div className="w-full lg:w-96 justify-start text-gray-300 text-lg font-normal font-['Inter'] leading-relaxed">
                    Lets create ,<br />A better startup Ecosystem.
                  </div>
                  <div className="inline-flex justify-center lg:justify-start items-center gap-3 group cursor-pointer">
                    <div className="justify-start text-white text-sm font-semibold font-['Inter'] leading-none group-hover:text-gray-300 transition-colors">
                      More about us
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </AnimationWrapper>
            </div>

            {/* Social Links and Copyright */}
            <div className="self-stretch flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end gap-8 lg:gap-0 lg:w-[88%]">
              {/* Social Links */}
              <AnimationWrapper delay={0.4}>
                <div className="flex justify-center lg:justify-start items-end gap-3">
                  <div className="inline-flex flex-col justify-start items-start gap-3">
                    {/* X (Twitter) */}
                    <div className="w-12 h-12 p-px bg-white rounded-[24px] outline outline-1 outline-offset-[-1px] outline-white/50 inline-flex justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-black"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                    </div>
                    {/* Facebook */}
                    <div className="w-12 h-12 p-px bg-white rounded-[24px] outline outline-1 outline-offset-[-1px] outline-white/50 inline-flex justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-black"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col justify-start items-start gap-3">
                    {/* LinkedIn */}
                    <div className="w-12 h-12 bg-white rounded-[48px] inline-flex justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-black"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                    {/* Instagram */}
                    <div className="w-12 h-12 bg-white rounded-[48px] inline-flex justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-black"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimationWrapper>

              {/* Copyright */}
              <AnimationWrapper delay={0.5}>
                <div className="justify-center lg:justify-start text-center lg:text-left">
                  <span className="text-gray-400 text-sm font-normal font-['Inter'] leading-none">
                    © 2025 —{" "}
                  </span>
                  <span className="text-gray-400 text-sm font-bold font-['Inter'] leading-none">
                    IQue Ventures
                  </span>
                  <br />
                  <span className="text-gray-400 text-sm font-normal font-['Inter'] leading-none">
                    Copyright All Rights reserved
                  </span>
                </div>
              </AnimationWrapper>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[560px] self-stretch">
            {/* Navigation Links */}
            <AnimationWrapper delay={0.6}>
              <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start items-start gap-6 lg:gap-12 mb-12 lg:mb-16">
                <Link
                  href="#"
                  className="justify-start text-gray-400 text-base font-normal font-['Inter'] leading-snug hover:text-white transition-colors duration-200"
                >
                  About.
                </Link>
                <Link
                  href="#"
                  className="justify-start text-gray-400 text-base font-normal font-['Inter'] leading-snug hover:text-white transition-colors duration-200"
                >
                  Testimonials.
                </Link>
                <Link
                  href="#"
                  className="justify-start text-gray-400 text-base font-normal font-['Inter'] leading-snug hover:text-white transition-colors duration-200"
                >
                  Services.
                </Link>
                <Link
                  href="#"
                  className="justify-start text-gray-400 text-base font-normal font-['Inter'] leading-snug hover:text-white transition-colors duration-200"
                >
                  Contacts.
                </Link>
              </div>
            </AnimationWrapper>

            {/* Contact and Location Info */}
            <div className="flex flex-col justify-start items-center lg:items-start gap-16 lg:h-[83%] lg:justify-between">
              {/* Contact Us */}
              <AnimationWrapper delay={0.7}>
                <div className="flex flex-col justify-start items-center lg:items-start gap-6 text-center lg:text-left">
                  <div className="justify-start text-white text-2xl font-medium font-['Inter'] leading-snug">
                    Contact Us
                  </div>
                  <div className="flex flex-col justify-start items-center lg:items-start gap-3">
                    <div className="justify-start text-gray-300 text-sm font-normal font-['Inter'] leading-snug">
                      Phone: +91 - 9020103335
                    </div>
                    <div className="justify-start text-gray-300 text-sm font-normal font-['Inter'] leading-snug">
                      Email: info@ique.com
                    </div>
                  </div>
                </div>
              </AnimationWrapper>

              {/* Location */}
              <AnimationWrapper delay={0.8}>
                <div className="flex flex-col justify-start items-center lg:items-start gap-6 text-center lg:text-left lg:max-w-[500px]">
                  <div className="justify-start text-white text-2xl font-medium font-['Inter'] leading-snug">
                    Location
                  </div>
                  <div className="flex flex-col justify-start items-center lg:items-start gap-6">
                    <div className="justify-start text-gray-300 text-sm leading-relaxed max-w-[400px] lg:max-w-none">
                      <span className="font-bold text-white">
                        Registered Office{" "}
                      </span>
                      <br />
                      <span className="font-normal">
                        No. 39/2475-B1 Suite 670 LR Towers SIRRA 104 Slanatha
                        Rd., Palarivattom, Ernakulam, Kerala, PIN-682025
                      </span>
                    </div>
                    <div className="justify-start text-gray-300 text-sm leading-relaxed max-w-[400px] lg:max-w-none">
                      <span className="font-bold text-white">
                        Corporate Office
                      </span>
                      <br />
                      <span className="font-normal">
                        Door No. 82, Industrial Layout 5th Block, 3rd Cross Near
                        Jyothi Nivas College, Koramangala Bengaluru, Karnataka,
                        PIN-560095
                      </span>
                    </div>
                  </div>
                </div>
              </AnimationWrapper>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
