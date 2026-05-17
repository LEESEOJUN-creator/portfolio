"use client";

import { motion } from "framer-motion";
import { activities } from "@/data/experience";
import { Users, Calendar } from "lucide-react";

export default function Activities() {
  return (
    <section id="activities" className="w-full py-14 flex flex-col items-center px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Activities</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {activities.map((act, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card px-8 py-8 flex flex-col items-center text-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Users size={18} className="text-violet-400" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-base font-bold text-white break-keep" style={{ wordBreak: "keep-all" }}>
                  {act.name}
                </p>
                <p className="text-sm text-white/55 break-keep" style={{ wordBreak: "keep-all" }}>
                  {act.description}
                </p>
                <span className="text-xs text-violet-300/70">{act.role}</span>
              </div>

              <div className="flex items-center gap-2 text-white/35">
                <Calendar size={13} className="shrink-0" />
                <span className="text-sm whitespace-nowrap">{act.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
