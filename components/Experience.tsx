"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Building2, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
            <span className="text-xs text-emerald-400 font-semibold tracking-[0.18em] uppercase">
              Career
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* 타임라인 세로선 */}
          <div className="absolute left-5 sm:left-7 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/40 via-violet-500/20 to-transparent" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14 sm:pl-20"
              >
                {/* 타임라인 도트 */}
                <div className="absolute left-5 sm:left-7 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-violet-500 shadow-lg shadow-violet-500/30 border-2 border-[#080812] -translate-x-1/2" />

                {/* 카드 */}
                <div className="card p-6 sm:p-8">
                  {/* 상단: 회사 정보 + 기간 */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 size={18} className="text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-base sm:text-lg font-semibold text-white leading-snug break-keep"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {exp.company}
                        </h3>
                        <p className="text-sm text-violet-300 mt-1 break-keep">
                          {exp.role}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="text-xs text-white/40 whitespace-nowrap">{exp.period}</p>
                      <p className="text-xs text-white/30 mt-1">{exp.duration}</p>
                    </div>
                  </div>

                  {/* 업무 설명 */}
                  <p
                    className="text-sm sm:text-base font-medium text-white/65 mb-5 leading-[1.9] break-keep"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {exp.description}
                  </p>

                  {/* 상세 내용 목록 */}
                  <ul className="flex flex-col gap-3">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3 min-h-[28px]">
                        <CheckCircle2
                          size={15}
                          className="text-emerald-400 shrink-0 mt-[3px]"
                        />
                        <span
                          className="text-sm text-white/50 leading-[1.9] break-keep"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
