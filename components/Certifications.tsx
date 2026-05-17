"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/experience";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-xs text-orange-400 font-medium tracking-widest uppercase">
              License
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/20 flex items-center justify-center shrink-0">
                <Award size={20} className="text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{cert.name}</p>
                <p className="text-xs text-white/40 mt-0.5">{cert.issuer}</p>
                <p className="text-xs text-orange-400/70 mt-1">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
