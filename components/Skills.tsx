"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

const STYLES: Record<string, { gradient: string; border: string; badge: string; dot: string }> = {
  Backend:    { gradient: "from-violet-500/10 to-transparent", border: "border-violet-500/15", badge: "bg-violet-500/10 text-violet-200 border-violet-500/18", dot: "bg-violet-400" },
  Database:   { gradient: "from-cyan-500/10 to-transparent",   border: "border-cyan-500/15",   badge: "bg-cyan-500/10 text-cyan-200 border-cyan-500/18",     dot: "bg-cyan-400"   },
  Infra:      { gradient: "from-emerald-500/10 to-transparent",border: "border-emerald-500/15",badge: "bg-emerald-500/10 text-emerald-200 border-emerald-500/18", dot: "bg-emerald-400" },
  Monitoring: { gradient: "from-orange-500/10 to-transparent", border: "border-orange-500/15", badge: "bg-orange-500/10 text-orange-200 border-orange-500/18", dot: "bg-orange-400" },
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-xs text-cyan-400 font-semibold tracking-[0.2em] uppercase">Tech Stack</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => {
            const s = STYLES[cat.category] ?? { gradient: "from-white/5 to-transparent", border: "border-white/10", badge: "bg-white/8 text-white/60 border-white/10", dot: "bg-white/40" };
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-2xl border p-7 bg-gradient-to-b ${s.gradient} ${s.border} flex flex-col gap-6`}
              >
                {/* 카테고리 헤더 */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={cat.category}>{cat.icon}</span>
                  <h3 className="text-base font-semibold text-white/80">{cat.category}</h3>
                </div>

                {/* 스킬 목록 */}
                <ul className="flex flex-col gap-3">
                  {cat.skills.map((skill) => (
                    <li key={skill}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.15 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${s.badge} min-h-[48px]`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                        <span className="break-keep leading-snug">{skill}</span>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
