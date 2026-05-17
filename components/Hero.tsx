"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowDown, GitBranch } from "lucide-react";

const TYPING_TEXTS = [
  "Backend Developer",
  "Infrastructure Enthusiast",
  "Kubernetes Explorer",
  "Spring Boot Engineer",
];

function useTypingAnimation(texts: string[], speed = 75, pause = 2000) {
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

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

export default function Hero() {
  const typed = useTypingAnimation(TYPING_TEXTS);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 overflow-hidden">
      {/* 배경 오브 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-[480px] h-[480px] bg-violet-600/7 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-3xl" />
      </div>

      {/* 격자 패턴 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 콘텐츠: 최대 너비 제한 + 충분한 상하 패딩 */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center pt-24 pb-16">
        {/* 뱃지 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shrink-0" />
            기회를 찾고 있습니다
          </span>
        </motion.div>

        {/* 이름 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-5 break-keep"
        >
          이서준
        </motion.h1>

        {/* 타이핑 직함 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="text-xl sm:text-2xl font-medium mb-8 flex items-center justify-center gap-1 min-h-[36px]"
        >
          <span className="gradient-text">{typed}</span>
          <span
            className="w-0.5 h-6 bg-violet-400 inline-block"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </motion.div>

        {/* 소개 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="text-base sm:text-lg text-white/50 leading-[1.95] max-w-xl mx-auto mb-12 break-keep word-break-keep"
          style={{ wordBreak: "keep-all" }}
        >
          Java/Spring 기반 백엔드 개발을 중심으로, Kubernetes CI/CD와 모니터링까지
          연결해 서비스가 실제 환경에서 안정적으로 운영되는 흐름을 이해하려는
          백엔드 개발자입니다.
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://github.com/LEESEOJUN-creator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/5 border border-white/12 text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 hover:border-white/22 transition-all duration-200 min-h-[48px] whitespace-nowrap"
          >
            <GitBranch size={16} className="shrink-0" />
            GitHub
          </a>
          <a
            href="mailto:a31237988a@gmail.com"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-medium text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/20 min-h-[48px] whitespace-nowrap"
          >
            <Mail size={16} className="shrink-0" />
            이메일 보내기
          </a>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
