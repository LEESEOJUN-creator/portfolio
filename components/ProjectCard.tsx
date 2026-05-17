"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = { project: Project; index: number };

const TAG_COLORS: Record<string, string> = {
  개인프로젝트: "text-violet-300 bg-violet-500/12 border-violet-500/20",
  팀프로젝트:   "text-cyan-300 bg-cyan-500/12 border-cyan-500/20",
  Infra:        "text-emerald-300 bg-emerald-500/12 border-emerald-500/20",
  Backend:      "text-orange-300 bg-orange-500/12 border-orange-500/20",
};

const THUMBNAILS: Record<string, { from: string; via: string; to: string; icon: string }> = {
  "dgu-cap":             { from: "from-blue-900/70",   via: "via-indigo-900/50",  to: "to-slate-900/70", icon: "🛡️" },
  "k8s-cicd":            { from: "from-violet-900/70", via: "via-indigo-900/50",  to: "to-slate-900/70", icon: "⚙️" },
  "k8s-monitoring":      { from: "from-cyan-900/70",   via: "via-teal-900/50",   to: "to-slate-900/70", icon: "📊" },
  "graduation-checker":  { from: "from-orange-900/70", via: "via-amber-900/50",  to: "to-slate-900/70", icon: "🎓" },
  "hidden-growth":       { from: "from-rose-900/70",   via: "via-pink-900/50",   to: "to-slate-900/70", icon: "🌱" },
  "spring-security-auth":{ from: "from-emerald-900/70",via: "via-green-900/50",  to: "to-slate-900/70", icon: "🔐" },
};

export default function ProjectCard({ project, index }: Props) {
  const thumb = THUMBNAILS[project.slug] ?? { from: "from-violet-900/70", via: "via-slate-900/50", to: "to-slate-900/70", icon: "📁" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="card h-full flex flex-col group cursor-pointer overflow-hidden">

          {/* 썸네일 */}
          <div className={`relative w-full h-52 sm:h-56 bg-gradient-to-br ${thumb.from} ${thumb.via} ${thumb.to} flex items-center justify-center shrink-0 overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080812]/80 to-transparent" />
            <span className="relative text-6xl select-none opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300">{thumb.icon}</span>
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
              <ArrowUpRight size={16} className="text-white/80" />
            </div>
          </div>

          {/* 본문 — 가운데 정렬 */}
          <div className="flex flex-col items-center text-center gap-5 p-8 sm:p-9 flex-1">

            {/* 태그 + 상태 */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full">
              {project.tag.map((t) => (
                <span key={t} className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap ${TAG_COLORS[t] ?? "text-white/50 bg-white/5 border-white/10"}`}>
                  {t}
                </span>
              ))}
              <span className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap ${project.status === "완료" ? "text-green-400 bg-green-500/12 border-green-500/20" : "text-yellow-400 bg-yellow-500/12 border-yellow-500/20"}`}>
                {project.status}
              </span>
            </div>

            {/* 제목 */}
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors leading-snug break-keep w-full" style={{ wordBreak: "keep-all" }}>
              {project.title}
            </h3>

            {/* 설명 */}
            <p className="text-sm sm:text-base text-white/50 leading-[1.95] break-keep line-clamp-3 flex-1 w-full" style={{ wordBreak: "keep-all" }}>
              {project.shortDescription}
            </p>

            {/* 기술 스택 */}
            <div className="flex flex-wrap justify-center gap-2 pt-5 border-t border-white/6 w-full">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech.name} className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-white/40 font-mono whitespace-nowrap">
                  {tech.name}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-white/30 font-mono">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
