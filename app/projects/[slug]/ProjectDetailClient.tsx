"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  GitBranch,
  ChevronRight,
  Lightbulb,
  Wrench,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import type { Project } from "@/data/projects";

const tagColors: Record<string, string> = {
  개인프로젝트: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  팀프로젝트: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  Infra: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  Backend: "bg-orange-500/15 text-orange-300 border-orange-500/25",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen py-24 px-6">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Back */}
        <motion.div {...fadeUp} transition={{ duration: 0.4 }} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            돌아가기
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.tag.map((t) => (
              <span
                key={t}
                className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${tagColors[t] ?? "bg-white/10 text-white/60 border-white/10"}`}
              >
                {t}
              </span>
            ))}
            <span
              className={`px-2.5 py-1 text-xs rounded-full font-medium border ${
                project.status === "완료"
                  ? "bg-green-500/15 text-green-400 border-green-500/25"
                  : "bg-yellow-500/15 text-yellow-400 border-yellow-500/25"
              }`}
            >
              {project.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {project.title}
          </h1>
          <p className="text-sm text-white/35">{project.period}</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Description */}
          <motion.section
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card p-6"
          >
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
              프로젝트 설명
            </h2>
            <p className="text-white/75 leading-relaxed">{project.description}</p>
          </motion.section>

          {/* Role */}
          {project.role && (
            <motion.section
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="card p-6"
            >
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                담당 역할
              </h2>
              <p className="text-white/70 leading-relaxed">{project.role}</p>
            </motion.section>
          )}

          {/* Tech Stack */}
          <motion.section
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
              기술 스택
            </h2>
            <div className="flex flex-col gap-3">
              {project.techStack.map((tech) => (
                <div key={tech.name}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-1 text-xs rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono font-medium">
                      {tech.name}
                    </span>
                  </div>
                  {tech.reason && (
                    <p className="text-sm text-white/40 ml-1 flex items-start gap-1.5">
                      <ChevronRight size={13} className="shrink-0 mt-0.5 text-violet-500/50" />
                      {tech.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Issues */}
          <motion.section
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="card p-6"
          >
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-5">
              문제 해결 경험
            </h2>
            <div className="flex flex-col gap-6">
              {project.issues.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-4 border-l border-violet-500/20"
                >
                  <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-violet-500/50" />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-red-400 font-medium">Issue</span>
                        <p className="text-sm text-white/70 mt-0.5">{item.issue}</p>
                      </div>
                    </div>
                    {item.analysis && (
                      <div className="flex items-start gap-2">
                        <Lightbulb size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs text-yellow-400 font-medium">분석</span>
                          <p className="text-sm text-white/60 mt-0.5">{item.analysis}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <Wrench size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-cyan-400 font-medium">해결</span>
                        <p className="text-sm text-white/70 mt-0.5">{item.solution}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-emerald-400 font-medium">결과</span>
                        <p className="text-sm text-white/70 mt-0.5">{item.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Retrospective */}
          <motion.section
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card p-6"
          >
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
              회고
            </h2>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-violet-500/5 border border-violet-500/15 p-4">
                <p className="text-xs font-semibold text-violet-400 mb-1.5">
                  ✦ 성장한 점
                </p>
                <p className="text-sm text-white/65 leading-relaxed">
                  {project.retrospective.growth}
                </p>
              </div>
              <div className="rounded-xl bg-orange-500/5 border border-orange-500/15 p-4">
                <p className="text-xs font-semibold text-orange-400 mb-1.5">
                  △ 아쉬운 점
                </p>
                <p className="text-sm text-white/65 leading-relaxed">
                  {project.retrospective.regret}
                </p>
              </div>
              <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/15 p-4">
                <p className="text-xs font-semibold text-cyan-400 mb-1.5">
                  → 향후 방향
                </p>
                <p className="text-sm text-white/65 leading-relaxed">
                  {project.retrospective.future}
                </p>
              </div>
            </div>
          </motion.section>

          {/* GitHub */}
          {project.github && (
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex justify-end"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200"
              >
                <GitBranch size={16} />
                GitHub에서 보기
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
