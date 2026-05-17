"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs text-violet-400 font-medium tracking-widest uppercase">
              Get in touch
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden border border-violet-500/15 p-8 md:p-12"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(139,92,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(6,182,212,0.06) 0%, transparent 60%), rgba(255,255,255,0.02)",
          }}
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              함께 이야기해요
            </h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              새로운 기회나 협업에 관심이 있으시면 편하게 연락 주세요.
              백엔드 개발, 인프라 구성, 프로젝트 참여 등 무엇이든 환영합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:a31237988a@gmail.com"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-medium text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/20 w-fit"
              >
                <Mail size={16} />
                a31237988a@gmail.com
                <ExternalLink size={13} className="opacity-60" />
              </a>

              <a
                href="https://github.com/LEESEOJUN-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200 w-fit"
              >
                <GitBranch size={16} />
                LEESEOJUN-creator
                <ExternalLink size={13} className="opacity-40" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-white/20">
          © 2025 OOO. Built with Next.js & Tailwind CSS.
        </p>
        <p className="text-xs text-white/15">Deployed on Vercel</p>
      </div>
    </section>
  );
}
