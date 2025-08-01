import Link from "next/link";
import { Logo } from "./Logo/Logo";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-white/30">
      <nav className="max-w-screen-xl mx-auto h-20 relative">
        {/* Logo */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <Logo className="h-8" />
        </div>

        {/* Navigation Items */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center h-20 gap-8">
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

        {/* Let's work together button */}
        <Link
          href="#contact"
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
        >
          <div className="border-b-2 border-blue-900 overflow-hidden hover:border-blue-700 transition-colors">
            <div className="px-2 text-center text-blue-900 text-base font-medium font-['DM_Sans'] leading-none hover:text-blue-700 transition-colors">
              Let's work together
            </div>
          </div>
        </Link>
      </nav>
    </header>
  );
}
