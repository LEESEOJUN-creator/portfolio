"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Activities", href: "#activities" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080812]/80 backdrop-blur-2xl border-b border-violet-500/10 shadow-lg shadow-black/30"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 h-20 flex items-center justify-end gap-8">

        {/* 데스크톱 nav */}
        <ul className="hidden md:flex items-center gap-2 shrink-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white/90 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer min-h-[44px] whitespace-nowrap"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 모바일 버튼 */}
        <button
          className="md:hidden p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* 모바일 드롭다운 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[#080812]/95 backdrop-blur-2xl border-b border-violet-500/10 overflow-hidden"
          >
            <ul className="max-w-6xl mx-auto px-8 py-5 flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left px-5 py-4 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all min-h-[52px]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
