"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-36 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 — 가운데 정렬 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs text-violet-400 font-semibold tracking-[0.25em] uppercase mb-5">
            Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Projects
          </h2>
          <p className="text-white/40 text-base leading-[1.9] max-w-md mx-auto break-keep" style={{ wordBreak: "keep-all" }}>
            직접 설계하고 구현한 프로젝트입니다.
            카드를 클릭하면 상세 내용을 확인할 수 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
