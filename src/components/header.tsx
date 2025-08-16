"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
      role="banner"
    >
      <nav
        className="max-w-screen-xl mx-auto h-20 relative flex items-center justify-between pl-3 xl:justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" aria-label="iQue Homepage">
          <Image
            src="/ique-logo.webp"
            alt="iQue Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop Navigation Items - Hidden on mobile */}
        <div className="hidden md:flex items-center h-20 gap-8" role="menubar">
          {/* Home - Active */}
          <Link
            href="/#home"
            className="flex items-center justify-center px-2"
            role="menuitem"
            aria-current="page"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              Home
            </div>
          </Link>

          {/* Services */}
          <Link
            href="/#services"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
            role="menuitem"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              Services
            </div>
          </Link>

          {/* About */}
          <Link
            href="/#about"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
            role="menuitem"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              About
            </div>
          </Link>

          {/* Contact */}
          <Link
            href="/#contact"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
            role="menuitem"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              Contact
            </div>
          </Link>

          {/* Blog */}
          <Link
            href="/#blog"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
            role="menuitem"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              Blog
            </div>
          </Link>

          {/* Career */}
          <Link
            href="/#career"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
            role="menuitem"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              Career
            </div>
          </Link>

          {/* Team */}
          <Link
            href="/#team"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
            role="menuitem"
          >
            <div className="text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-snug">
              Team
            </div>
          </Link>
        </div>

        {/* Desktop "Let's work together" button - Hidden on mobile */}
        <Link href="/#contact" className="hidden xl:block">
          <div className="border-b-2 border-cyan-700 overflow-hidden hover:border-blue-700 transition-colors">
            <div className="px-2 text-center text-cyan-700 text-base font-medium font-['DM_Sans'] leading-none hover:text-blue-700 transition-colors">
              Let&apos;s work together
            </div>
          </div>
        </Link>

        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-cyan-700"
                aria-label="Open mobile menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px]"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <nav
                className="flex flex-col gap-6 mt-8"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {/* Mobile Navigation Links */}
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  Home
                </Link>

                <Link
                  href="/#services"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  Services
                </Link>

                <Link
                  href="/#about"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  About
                </Link>

                <Link
                  href="/#contact"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  Contact
                </Link>

                <Link
                  href="/#blog"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  Blog
                </Link>

                <Link
                  href="/#career"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  Career
                </Link>

                <Link
                  href="/#team"
                  onClick={handleLinkClick}
                  className="text-cyan-700 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                  role="menuitem"
                >
                  Team
                </Link>

                {/* Mobile "Let's work together" button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/#contact"
                    onClick={handleLinkClick}
                    className="block"
                  >
                    <div className="border-2 border-blue-900 rounded-lg p-3 text-center hover:bg-blue-900 hover:text-white transition-colors">
                      <div className="text-cyan-700 text-base font-medium font-['DM_Sans'] hover:text-white transition-colors">
                        Let&apos;s work together
                      </div>
                    </div>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
