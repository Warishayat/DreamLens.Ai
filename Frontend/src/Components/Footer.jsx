import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-white/[0.05] pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black italic bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent tracking-tighter mb-6">
              DreamLens
            </h2>
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm font-medium">
              Giving pixels to your imagination. Create instant AI masterpieces
              and bring your stories to life with just a few words.
            </p>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-80">
              EXPLORE
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/image-story"
                  className="text-gray-500 hover:text-purple-400 transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  Image Story
                </Link>
              </li>
              <li>
                <Link
                  to="/video-story"
                  className="text-gray-500 hover:text-cyan-400 transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  Video Story
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-80">
              SUPPORT
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  Contact Us
                </Link>
              </li>
              <li className="text-gray-600 text-[11px] font-medium italic mt-2">
                warishayat666@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.03] flex flex-col items-center justify-center gap-4">
          <p className="text-gray-700 text-[9px] tracking-[0.4em] uppercase font-bold text-center">
            © 2026 DREAMLENS. ALL DREAMS RESERVED.
          </p>

          <div className="flex gap-4 items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-purple-500/30"></div>
            <div className="w-1 h-1 rounded-full bg-cyan-500/30"></div>
            <div className="w-1 h-1 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
