"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

const tagColors: Record<string, string> = {
  개인프로젝트: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  팀프로젝트: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  Infra: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  Backend: "bg-orange-500/15 text-orange-300 border-orange-500/25",
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="card p-6 h-full flex flex-col gap-4 cursor-pointer group">
          {/* Tags & Status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tag.map((t) => (
                <span
                  key={t}
                  className={`px-2 py-0.5 text-xs rounded-md border font-medium ${tagColors[t] ?? "bg-white/10 text-white/60 border-white/10"}`}
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              className={`shrink-0 px-2.5 py-0.5 text-xs rounded-full font-medium ${
                project.status === "완료"
                  ? "bg-green-500/15 text-green-400 border border-green-500/25"
                  : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Title & Period */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors leading-tight">
                {project.title}
              </h3>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-white/20 group-hover:text-violet-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="text-xs text-white/30 mt-1">{project.period}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed flex-1">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40 font-mono"
              >
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/30 font-mono">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
