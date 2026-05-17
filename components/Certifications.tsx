"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/experience";
import { Award, Calendar } from "lucide-react";

export default function Certifications() {
  return (
    <section className="w-full py-14 flex flex-col items-center px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Certifications</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-8 py-8 flex flex-col items-center text-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                <Award size={18} className="text-orange-400" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-base font-bold text-white break-keep" style={{ wordBreak: "keep-all" }}>
                  {cert.name}
                </p>
                <p className="text-sm text-white/40">{cert.issuer}</p>
              </div>

              <div className="flex items-center gap-2 text-white/35">
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
