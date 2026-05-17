"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Building2, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
            <span className="text-xs text-emerald-400 font-semibold tracking-[0.2em] uppercase">Career</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* 타임라인 세로선 */}
          <div className="absolute left-5 sm:left-7 top-6 bottom-6 w-px bg-gradient-to-b from-emerald-500/40 via-violet-500/20 to-transparent" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 sm:pl-24"
              >
                {/* 타임라인 도트 */}
                <div className="absolute left-5 sm:left-7 top-7 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-violet-500 shadow-lg shadow-violet-500/30 border-2 border-[#080812] -translate-x-1/2" />

                <div className="card p-7 sm:p-9 flex flex-col gap-6">
                  {/* 상단: 회사 + 기간 */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/18 flex items-center justify-center shrink-0">
                        <Building2 size={20} className="text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-lg sm:text-xl font-bold text-white leading-snug break-keep"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {exp.company}
                        </h3>
                        <p className="text-sm text-violet-300 mt-1.5 break-keep">{exp.role}</p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col gap-1 sm:text-right">
                      <span className="text-xs text-white/35 whitespace-nowrap">{exp.period}</span>
                      <span className="text-xs text-white/25">{exp.duration}</span>
                    </div>
                  </div>

                  {/* 업무 요약 */}
                  <p
                    className="text-sm sm:text-base text-white/60 leading-[1.95] break-keep font-medium"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {exp.description}
                  </p>

                  {/* 상세 목록 */}
                  <ul className="flex flex-col gap-3.5">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3 min-h-[28px]">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-[3px]" />
                        <span
                          className="text-sm text-white/45 leading-[1.95] break-keep"
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
