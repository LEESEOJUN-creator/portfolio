"use client";

import { motion } from "framer-motion";
import { GitBranch, Mail, Phone, BookOpen, ChevronDown } from "lucide-react";

const LINKS = [
  {
    icon: GitBranch,
    label: "GitHub",
    href: "https://github.com/LEESEOJUN-creator",
    external: true,
    color: "text-violet-400",
  },
  {
    icon: BookOpen,
    label: "Velog",
    href: "https://velog.io/@seojun7988/posts",
    external: true,
    color: "text-cyan-400",
  },
  {
    icon: Mail,
    label: "seojun7988@naver.com",
    href: "mailto:seojun7988@naver.com",
    external: false,
    color: "text-cyan-400",
  },
  {
    icon: Phone,
    label: "010-4391-7988",
    href: "tel:01043917988",
    external: false,
    color: "text-cyan-400",
  },
];

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[560px] h-[560px] bg-violet-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[480px] h-[480px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center gap-10 pt-32 pb-24">

        {/* 이름 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-5"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white">
            이서준
          </h1>
          <p className="gradient-text text-xl sm:text-2xl font-semibold leading-snug">
            백엔드와 인프라를 함께 고민하는 개발자
          </p>
        </motion.div>

        {/* 소개 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/50 text-sm sm:text-base leading-[2] break-keep max-w-md"
          style={{ wordBreak: "keep-all" }}
        >
          동국대학교 정보통신공학과 재학 중입니다.<br />
          Spring Boot 백엔드 개발과 Kubernetes 기반 인프라를 함께 학습하며,<br />
          안정적인 서버 환경을 고민하는 개발자를 목표로 합니다.
        </motion.p>

        {/* 링크 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {LINKS.map(({ icon: Icon, label, href, external, color }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white/4 border border-white/8 text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all duration-200 whitespace-nowrap min-h-[56px]"
            >
              <Icon size={17} className={`shrink-0 ${color}`} />
              {label}
            </a>
          ))}
        </motion.div>

        {/* 프로젝트 보기 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer group mt-4"
        >
          <span className="text-sm font-medium tracking-wide">프로젝트 보기</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
