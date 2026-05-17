"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
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
      {/* 높이 h-20으로 넉넉하게, 수평 패딩도 충분히 */}
      <nav className="max-w-6xl mx-auto px-8 sm:px-12 h-20 flex items-center justify-between gap-6">

        {/* 로고 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-500/25">
            이
          </div>
          <span className="text-base font-semibold text-white/70 group-hover:text-white transition-colors hidden sm:block tracking-wide">
            이서준
          </span>
        </button>

        {/* 데스크톱 nav */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="px-5 py-3 text-sm font-medium text-white/50 hover:text-white/90 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer min-h-[48px] tracking-wide"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="ml-4">
            <a
              href="https://github.com/LEESEOJUN-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 min-h-[48px] tracking-wide"
            >
              GitHub
            </a>
          </li>
        </ul>

        {/* 모바일 버튼 */}
        <button
          className="md:hidden p-3 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5 min-h-[48px] min-w-[48px] flex items-center justify-center"
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
              <li className="pt-2">
                <a
                  href="https://github.com/LEESEOJUN-creator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 min-h-[52px]"
                >
                  GitHub 바로가기
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
