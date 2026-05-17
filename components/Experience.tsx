"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Building2, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
            <span className="text-xs text-emerald-400 font-medium tracking-widest uppercase">
              Career
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-5 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30 border-2 border-[#080812] -translate-x-1/2" />

                <div className="card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <Building2 size={16} className="text-violet-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-violet-300">{exp.role}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-white/40">{exp.period}</p>
                      <p className="text-xs text-white/30">{exp.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-white/70 mb-3">
                    {exp.description}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          className="text-emerald-400 shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-white/50">{detail}</span>
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
