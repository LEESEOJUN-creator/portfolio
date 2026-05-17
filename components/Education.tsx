"use client";

import { motion } from "framer-motion";
import { educations } from "@/data/experience";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="w-full py-28 flex flex-col items-center px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Education</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {educations.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-6 py-5 flex flex-col items-center text-center gap-3"
            >
              {/* 아이콘 */}
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <GraduationCap size={18} className="text-cyan-400" />
              </div>

              {/* 내용 */}
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-sm font-bold text-white">{edu.school}</h3>
                <span className="text-xs text-white/35">{edu.period}</span>
                <div className="flex flex-wrap justify-center gap-2">
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
