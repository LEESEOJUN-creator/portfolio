"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/experience";
import { Award, Calendar } from "lucide-react";

export default function Certifications() {
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
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Certifications</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-7 py-6 flex items-center gap-5"
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                <Award size={20} className="text-orange-400" />
              </div>

              {/* 이름 + 발급처 */}
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-white break-keep" style={{ wordBreak: "keep-all" }}>
                  {cert.name}
                </p>
                <p className="text-sm text-white/40 mt-1">{cert.issuer}</p>
              </div>

              {/* 날짜 */}
              <div className="shrink-0 flex items-center gap-2 text-white/35">
                <Calendar size={13} className="shrink-0" />
                <span className="text-sm whitespace-nowrap">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
