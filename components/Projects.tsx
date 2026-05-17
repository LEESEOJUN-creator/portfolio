"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="w-full py-36">
      {/* 패딩은 안쪽 컨테이너에서만 */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs text-violet-400 font-semibold tracking-[0.25em] uppercase mb-5">Work</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Projects</h2>
          <p className="text-white/40 text-base leading-[1.9] max-w-sm mx-auto break-keep" style={{ wordBreak: "keep-all" }}>
            직접 설계하고 구현한 프로젝트입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
