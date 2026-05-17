"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Building2, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="w-full py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-7 py-6 flex gap-5"
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 size={20} className="text-violet-400" />
              </div>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                  <h3 className="text-base font-bold text-white">{exp.company}</h3>
                  <span className="text-xs text-white/35 whitespace-nowrap">{exp.period}</span>
                </div>
                <p className="text-sm text-violet-300 mb-4">{exp.role}</p>

                <ul className="flex flex-col gap-2.5">
                  {exp.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-[3px]" />
                      <span className="text-sm text-white/55 leading-[1.8] break-keep" style={{ wordBreak: "keep-all" }}>
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
    </section>
  );
}
