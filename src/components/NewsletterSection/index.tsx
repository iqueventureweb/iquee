"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <section className="h-96 relative overflow-hidden my-16 lg:my-28">
      <Image
        src="https://static.vecteezy.com/system/resources/previews/005/644/120/non_2x/abstract-background-of-red-and-dark-color-of-modern-design-vector.jpg"
        alt="Newsletter Background"
        width={1440}
        height={384}
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-90"></div>
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <div className="w-full max-w-[660px] text-center">
          {/* Title */}
          <h2 className="text-2xl lg:text-4xl font-medium font-['DM_Sans'] leading-[1.3] lg:leading-[48px] text-white mb-8 lg:mb-12">
            Stay informed with our newsletter.
          </h2>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-3 ">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 sm:h-14 px-6 rounded border-2 border-white/20 bg-transparent text-white placeholder-white/70 text-base font-normal font-['DM_Sans'] focus:outline-none focus:border-white/40"
                required
              />

              {/* Subscribe Button */}
              <button
                type="submit"
                className="w-full md:w-48 h-12 sm:h-14 bg-white/95 rounded text-black text-xs font-bold font-['DM_Sans'] uppercase leading-tight tracking-wide hover:bg-white transition-colors"
              >
                Subscribe Now
              </button>
            </div>

            {/* Terms and Privacy */}
            <div className="flex items-start lg:items-center justify-center gap-1 lg:gap-2 text-sm font-normal font-['DM_Sans'] leading-tight text-white/70">
              <div className="flex text-sm items-center gap-1 flex-wrap justify-start md:justify-center">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>By sending the form you agree to the</span>
                <Link
                  href="#"
                  className="underline hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
                <span>and</span>
                <Link
                  href="#"
                  className="underline hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
