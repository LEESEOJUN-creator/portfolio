"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

const categoryGradients: Record<string, string> = {
  Backend: "from-violet-500/20 to-violet-500/5",
  Database: "from-cyan-500/20 to-cyan-500/5",
  Infra: "from-emerald-500/20 to-emerald-500/5",
  Monitoring: "from-orange-500/20 to-orange-500/5",
};

const categoryBorders: Record<string, string> = {
  Backend: "border-violet-500/20",
  Database: "border-cyan-500/20",
  Infra: "border-emerald-500/20",
  Monitoring: "border-orange-500/20",
};

const skillBadgeColors: Record<string, string> = {
  Backend: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  Database: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  Infra: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  Monitoring: "bg-orange-500/10 text-orange-300 border-orange-500/20",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-xs text-cyan-400 font-medium tracking-widest uppercase">
              Tech
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border p-5 bg-gradient-to-b ${categoryGradients[cat.category] ?? "from-white/5 to-transparent"} ${categoryBorders[cat.category] ?? "border-white/10"}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-sm font-semibold text-white/80">
                  {cat.category}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium ${skillBadgeColors[cat.category] ?? "bg-white/5 text-white/50 border-white/10"}`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
