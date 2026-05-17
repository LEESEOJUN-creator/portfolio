"use client";

import { motion } from "framer-motion";
import { educations } from "@/data/experience";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="w-full py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Education</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {educations.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-7 py-6 flex items-center gap-5"
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <GraduationCap size={22} className="text-cyan-400" />
              </div>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{edu.school}</h3>
                  <span className="text-xs text-white/35 whitespace-nowrap">{edu.period}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.departments.map((dept) => (
                    <span key={dept} className="px-3 py-1 text-xs font-medium rounded-md bg-cyan-500/12 text-cyan-300 border border-cyan-500/20 whitespace-nowrap">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
