"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs text-violet-400 font-medium tracking-widest uppercase">
              Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Projects
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-xl">
            직접 설계하고 구현한 프로젝트들입니다. 각 카드를 클릭하면 상세 내용을 확인할 수 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
