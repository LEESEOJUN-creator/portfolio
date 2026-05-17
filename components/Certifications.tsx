"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/experience";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section className="py-20 px-5 sm:px-8">
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
            <div className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-xs text-orange-400 font-semibold tracking-[0.18em] uppercase">
              License
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Certifications
          </h2>
        </motion.div>

        {/* 자격증 카드: 모바일 1열 → sm 2열 → lg 3열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card p-6 flex items-start gap-4 min-h-[96px]"
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/20 flex items-center justify-center shrink-0">
                <Award size={22} className="text-orange-400" />
              </div>
              {/* 텍스트: min-w-0으로 overflow 방지 */}
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-semibold text-white leading-snug break-keep"
                  style={{ wordBreak: "keep-all" }}
                >
                  {cert.name}
                </p>
                <p
                  className="text-xs text-white/40 mt-1.5 leading-relaxed break-keep"
                  style={{ wordBreak: "keep-all" }}
                >
                  {cert.issuer}
                </p>
                <p className="text-xs text-orange-400/70 mt-1.5">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
