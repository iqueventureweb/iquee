export function Navbar() {
  return (
    <header className="w-full h-20 flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl px-4 md:px-8 flex justify-between items-center">
        {/* Logo section */}
        <div className="flex justify-start items-center gap-6 lg:gap-10">
          <div className="flex justify-start items-center">
            <div className="flex justify-start items-center gap-2.5">
              <img
                className="w-20 h-11 relative"
                src="/ique-logo.svg"
                alt="Logo"
              />
            </div>
          </div>

          {/* Navigation - hidden on mobile */}
          <nav className="hidden lg:flex justify-start items-center gap-8">
            <div className="flex flex-col justify-start items-center">
              <div className="flex justify-center items-center gap-2 overflow-hidden">
                <span className="text-neutral-300 text-base font-normal font-['Poppins'] leading-normal">
                  Services
                </span>
                <div className="w-5 h-5 relative overflow-hidden">
                  <div className="w-2.5 h-[5px] left-[5px] top-[7.50px] absolute border border-neutral-300" />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 overflow-hidden">
              <span className="text-neutral-300 text-base font-normal font-['Poppins'] leading-normal">
                About
              </span>
            </div>

            <div className="flex flex-col justify-start items-center">
              <div className="flex justify-center items-center gap-2 overflow-hidden">
                <span className="text-neutral-300 text-base font-normal font-['Poppins'] leading-normal">
                  Resources
                </span>
                <div className="w-5 h-5 relative overflow-hidden">
                  <div className="w-2.5 h-[5px] left-[5px] top-[7.50px] absolute border border-neutral-300" />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 overflow-hidden">
              <span className="text-neutral-300 text-base font-normal font-['Poppins'] leading-normal">
                Careers
              </span>
            </div>

            <div className="flex justify-center items-center gap-2 overflow-hidden">
              <span className="text-neutral-300 text-base font-normal font-['Poppins'] leading-normal">
                Blog
              </span>
            </div>
          </nav>
        </div>

        {/* Get Started button */}
        <div className="flex justify-start items-center gap-3">
          <button className="px-4 sm:px-6 md:px-8 py-2.5 bg-gradient-to-b from-slate-800/0 to-cyan-300/50 rounded-[50px] shadow-[0px_0px_0px_3px_rgba(28,255,255,0.17),0px_1px_2px_0px_rgba(29,255,255,0.55)] border border-white flex justify-center items-center overflow-hidden hover:from-slate-700/10 hover:to-cyan-300/60 transition-all duration-200">
            <div className="w-4 h-4 relative overflow-hidden mr-2">
              <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute border border-white" />
            </div>
            <span className="text-white text-sm font-normal font-['Poppins'] leading-tight tracking-wide">
              Get Started
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
