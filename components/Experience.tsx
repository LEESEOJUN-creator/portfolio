"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Building2, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="w-full py-36 flex flex-col items-center px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Experience</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-8 py-8 flex flex-col items-center text-center gap-5"
            >
              <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Building2 size={18} className="text-violet-400" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <h3 className="text-base font-bold text-white">{exp.company}</h3>
                <p className="text-sm text-violet-300">{exp.role}</p>
                <span className="text-xs text-white/35">{exp.period}</span>
              </div>

              <ul className="flex flex-col gap-3 w-full max-w-md">
                {exp.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-3 text-left">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-[3px]" />
                    <span className="text-sm text-white/60 leading-[1.85] break-keep" style={{ wordBreak: "keep-all" }}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
