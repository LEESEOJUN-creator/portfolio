"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs text-violet-400 font-semibold tracking-[0.18em] uppercase">
              Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Projects
          </h2>
          <p
            className="text-white/40 text-sm sm:text-base leading-[1.9] max-w-lg break-keep"
            style={{ wordBreak: "keep-all" }}
          >
            직접 설계하고 구현한 프로젝트입니다.
            카드를 클릭하면 문제 해결 과정과 회고를 확인할 수 있습니다.
          </p>
        </motion.div>

        {/* 그리드: 모바일 1열 → 데스크톱 2열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
