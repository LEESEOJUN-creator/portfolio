"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/experience";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-xs text-orange-400 font-semibold tracking-[0.2em] uppercase">License</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card p-7 flex items-start gap-5 min-h-[110px]"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-orange-500/18 to-yellow-500/18 border border-orange-500/18 flex items-center justify-center shrink-0 p-3">
                <Award size={24} className="text-orange-400" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col gap-1.5">
                <p
                  className="text-base font-semibold text-white leading-snug break-keep"
                  style={{ wordBreak: "keep-all" }}
                >
                  {cert.name}
                </p>
                <p
                  className="text-xs text-white/38 leading-relaxed break-keep"
                  style={{ wordBreak: "keep-all" }}
                >
                  {cert.issuer}
                </p>
                <p className="text-xs text-orange-400/65">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
