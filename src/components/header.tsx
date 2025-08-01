"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo/Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="max-w-screen-xl mx-auto h-20 relative flex items-center justify-around xl:justify-between">
        {/* Logo */}
        <div className="">
          <Logo className="h-8" />
        </div>

        {/* Desktop Navigation Items - Hidden on mobile */}
        <div className="hidden md:flex items-center h-20 gap-8">
          {/* Home - Active */}
          <Link href="#home" className="flex items-center justify-center px-2">
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              Home
            </div>
          </Link>

          {/* Services */}
          <Link
            href="#services"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              Services
            </div>
          </Link>

          {/* About */}
          <Link
            href="#about"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              About
            </div>
          </Link>

          {/* Contact */}
          <Link
            href="#contact"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              Contact
            </div>
          </Link>

          {/* Blog */}
          <Link
            href="#blog"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              Blog
            </div>
          </Link>

          {/* Career */}
          <Link
            href="#career"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              Career
            </div>
          </Link>

          {/* Team */}
          <Link
            href="#team"
            className="flex items-center justify-center px-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-snug">
              Team
            </div>
          </Link>
        </div>

        {/* Desktop "Let's work together" button - Hidden on mobile */}
        <Link href="#contact" className="hidden xl:block">
          <div className="border-b-2 border-blue-900 overflow-hidden hover:border-blue-700 transition-colors">
            <div className="px-2 text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-none hover:text-blue-700 transition-colors">
              Let&apos;s work together
            </div>
          </div>
        </Link>

        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-blue-900">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {/* Mobile Navigation Links */}
                <Link
                  href="#home"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="#services"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  Services
                </Link>

                <Link
                  href="#about"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  About
                </Link>

                <Link
                  href="#contact"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  Contact
                </Link>

                <Link
                  href="#blog"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  Blog
                </Link>

                <Link
                  href="#career"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  Career
                </Link>

                <Link
                  href="#team"
                  className="text-blue-900 text-lg font-medium font-['DM_Sans'] hover:text-blue-700 transition-colors"
                >
                  Team
                </Link>

                {/* Mobile "Let's work together" button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link href="#contact" className="block">
                    <div className="border-2 border-blue-900 rounded-lg p-3 text-center hover:bg-blue-900 hover:text-white transition-colors">
                      <div className="text-blue-900 text-base font-medium font-['DM_Sans'] hover:text-white transition-colors">
                        Let's work together
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
