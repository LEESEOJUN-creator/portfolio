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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {/* 카드: 충분한 padding, 최소 높이, flex column */}
        <div className="card h-full flex flex-col gap-5 p-6 sm:p-7 group cursor-pointer min-h-[220px]">
          {/* 상단: 태그 + 상태 */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            {/* 태그들 – 겹치지 않게 flex-wrap */}
            <div className="flex flex-wrap gap-1.5">
              {project.tag.map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium whitespace-nowrap ${tagColors[t] ?? "bg-white/10 text-white/60 border-white/10"}`}
                >
                  {t}
                </span>
              ))}
            </div>
            {/* 상태 뱃지 */}
            <span
              className={`shrink-0 px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
                project.status === "완료"
                  ? "bg-green-500/15 text-green-400 border border-green-500/25"
                  : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* 제목 + 기간 */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* break-keep: 한글 단어 단위 줄바꿈 */}
              <h3
                className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug break-keep"
                style={{ wordBreak: "keep-all" }}
              >
                {project.title}
              </h3>
              <p className="text-xs text-white/35 mt-1.5">{project.period}</p>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-white/20 group-hover:text-violet-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5"
            />
          </div>

          {/* 설명: flex-1로 남은 공간 차지, 3줄 말줄임 */}
          <p
            className="text-sm text-white/50 leading-[1.9] break-keep line-clamp-3 flex-1"
            style={{ wordBreak: "keep-all" }}
          >
            {project.shortDescription}
          </p>

          {/* 기술 스택: flex-wrap으로 넘치지 않게 */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/6">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/40 font-mono whitespace-nowrap"
              >
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/30 font-mono">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
