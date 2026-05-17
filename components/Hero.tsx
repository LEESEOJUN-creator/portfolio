"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GitBranch, Mail, ArrowDown } from "lucide-react";

const TYPING_TEXTS = [
  "Backend Developer",
  "Infrastructure Enthusiast",
  "Kubernetes Explorer",
  "Spring Boot Engineer",
];

function useTypingAnimation(texts: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = texts[textIdx];

    if (!deleting && charIdx < current.length) {
      timerRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      timerRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timerRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

export default function Hero() {
  const typed = useTypingAnimation(TYPING_TEXTS);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className="text-white">OOO</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl font-medium mb-6 h-9 flex items-center justify-center"
        >
          <span className="gradient-text">{typed}</span>
          <span className="ml-0.5 w-0.5 h-6 bg-violet-400 animate-blink inline-block" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Java/Spring 기반 백엔드 개발을 중심으로, Kubernetes CI/CD와 모니터링까지
          연결해 서비스가 실제 환경에서 안정적으로 운영되는 흐름을 이해하려는
          백엔드 개발자입니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://github.com/LEESEOJUN-creator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200"
          >
            <GitBranch size={16} />
            GitHub
          </a>
          <a
            href="mailto:a31237988a@gmail.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-medium text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/20"
          >
            <Mail size={16} />
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
