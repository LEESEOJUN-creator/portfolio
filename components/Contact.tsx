"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs text-violet-400 font-semibold tracking-[0.18em] uppercase">
              Get in touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Contact
          </h2>
        </motion.div>

        {/* 컨택 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl border border-violet-500/15 p-8 sm:p-12 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(139,92,246,0.07) 0%, transparent 55%), radial-gradient(ellipse at bottom right, rgba(6,182,212,0.05) 0%, transparent 55%), rgba(255,255,255,0.02)",
          }}
        >
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl">
            <h3
              className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug break-keep"
              style={{ wordBreak: "keep-all" }}
            >
              함께 이야기해요
            </h3>
            <p
              className="text-white/50 text-sm sm:text-base mb-10 leading-[1.95] break-keep max-w-lg"
              style={{ wordBreak: "keep-all" }}
            >
              새로운 기회나 협업에 관심이 있으시면 편하게 연락 주세요.
              백엔드 개발, 인프라 구성, 프로젝트 참여 등 무엇이든 환영합니다.
            </p>

            {/* 버튼들: flex-wrap으로 좁은 화면에서 줄바꿈 */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:a31237988a@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-medium text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/20 min-h-[52px] break-all"
              >
                <Mail size={16} className="shrink-0" />
                <span>a31237988a@gmail.com</span>
                <ExternalLink size={12} className="opacity-60 shrink-0" />
              </a>

              <a
                href="https://github.com/LEESEOJUN-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200 min-h-[52px] whitespace-nowrap"
              >
                <GitBranch size={16} className="shrink-0" />
                LEESEOJUN-creator
                <ExternalLink size={12} className="opacity-40 shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 푸터 */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/20 text-center sm:text-left">
          © 2025 이서준. Built with Next.js & Tailwind CSS.
        </p>
        <p className="text-xs text-white/15">Deployed on Vercel</p>
      </div>
    </section>
  );
}
