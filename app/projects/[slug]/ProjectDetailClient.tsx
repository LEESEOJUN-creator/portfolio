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
  Sparkles,
} from "lucide-react";
import type { Project } from "@/data/projects";

const TAG_COLORS: Record<string, string> = {
  개인프로젝트: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  팀프로젝트: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  Infra: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  Backend: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  Frontend: "bg-pink-500/15 text-pink-300 border-pink-500/25",
};

/* 공통 페이드업 애니메이션 */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* 섹션 제목 */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold text-white/40 uppercase tracking-[0.16em] mb-5">
      {children}
    </h2>
  );
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen py-28 flex flex-col items-center px-5 sm:px-8">
      {/* 배경 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* 뒤로가기 */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors group mb-10"
          >
            <ArrowLeft
              size={15}
              className="shrink-0 group-hover:-translate-x-1 transition-transform"
            />
            메인으로 돌아가기
          </Link>
        </FadeUp>

        {/* 헤더 */}
        <FadeUp delay={0.05} className="mb-10">
          {/* 태그 + 상태 */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {project.tag.map((t) => (
              <span
                key={t}
                className={`px-3 py-1.5 text-xs rounded-lg border font-medium whitespace-nowrap ${TAG_COLORS[t] ?? "bg-white/10 text-white/60 border-white/10"}`}
              >
                {t}
              </span>
            ))}
            <span
              className={`px-3 py-1.5 text-xs rounded-full font-medium border whitespace-nowrap ${
                project.status === "완료"
                  ? "bg-green-500/15 text-green-400 border-green-500/25"
                  : "bg-yellow-500/15 text-yellow-400 border-yellow-500/25"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* 제목: break-keep으로 단어 단위 줄바꿈 */}
          <h1
            className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3 break-keep"
            style={{ wordBreak: "keep-all" }}
          >
            {project.title}
          </h1>
          <p className="text-sm text-white/35">{project.period}</p>
        </FadeUp>

        {/* 카드 컨테이너 */}
        <div className="flex flex-col gap-5">
          {/* 프로젝트 설명 */}
          <FadeUp delay={0.1}>
            <div className="card p-7">
              <SectionLabel>프로젝트 설명</SectionLabel>
              <p
                className="text-white/70 text-sm sm:text-base leading-[1.95] break-keep"
                style={{ wordBreak: "keep-all" }}
              >
                {project.description}
              </p>
            </div>
          </FadeUp>

          {/* 담당 역할 */}
          {project.role && (
            <FadeUp delay={0.15}>
              <div className="card p-7">
                <SectionLabel>담당 역할</SectionLabel>
                <p
                  className="text-white/65 text-sm sm:text-base leading-[1.95] break-keep"
                  style={{ wordBreak: "keep-all" }}
                >
                  {project.role}
                </p>
              </div>
            </FadeUp>
          )}

          {/* 기술 스택 */}
          <FadeUp delay={0.2}>
            <div className="card p-7">
              <SectionLabel>기술 스택</SectionLabel>
              <ul className="flex flex-col gap-4">
                {project.techStack.map((tech) => (
                  <li key={tech.name}>
                    {/* 기술 이름 뱃지 */}
                    <span className="inline-flex items-center px-3 py-1.5 text-xs rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono font-medium whitespace-nowrap mb-2">
                      {tech.name}
                    </span>
                    {/* 선택 이유: 있을 때만 */}
                    {tech.reason && (
                      <p
                        className="flex items-start gap-2 text-sm text-white/45 leading-[1.9] break-keep"
                        style={{ wordBreak: "keep-all" }}
                      >
                        <ChevronRight
                          size={13}
                          className="shrink-0 mt-[3px] text-violet-500/50"
                        />
                        {tech.reason}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* 문제 해결 경험 */}
          <FadeUp delay={0.25}>
            <div className="card p-7">
              <SectionLabel>문제 해결 경험</SectionLabel>
              <div className="flex flex-col gap-8">
                {project.issues.map((item, i) => (
                  <div key={i} className="relative">
                    {/* 왼쪽 보더 라인 */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/40 to-transparent rounded-full" />
                    <div className="pl-5 flex flex-col gap-4">
                      {/* Issue */}
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                          <AlertCircle size={12} className="text-red-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                            Issue
                          </span>
                          <p
                            className="text-sm text-white/70 leading-[1.9] break-keep"
                            style={{ wordBreak: "keep-all" }}
                          >
                            {item.issue}
                          </p>
                        </div>
                      </div>

                      {/* 분석 */}
                      {item.analysis && (
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                            <Lightbulb size={12} className="text-yellow-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block mb-1">
                              분석
                            </span>
                            <p
                              className="text-sm text-white/55 leading-[1.9] break-keep"
                              style={{ wordBreak: "keep-all" }}
                            >
                              {item.analysis}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 해결 */}
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Wrench size={12} className="text-cyan-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                            해결
                          </span>
                          <p
                            className="text-sm text-white/70 leading-[1.9] break-keep"
                            style={{ wordBreak: "keep-all" }}
                          >
                            {item.solution}
                          </p>
                        </div>
                      </div>

                      {/* 결과 */}
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <TrendingUp size={12} className="text-emerald-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                            결과
                          </span>
                          <p
                            className="text-sm text-white/70 leading-[1.9] break-keep"
                            style={{ wordBreak: "keep-all" }}
                          >
                            {item.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 이슈 구분선 */}
                    {i < project.issues.length - 1 && (
                      <div className="mt-6 border-t border-white/5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* 회고 */}
          <FadeUp delay={0.3}>
            <div className="card p-7">
              <SectionLabel>회고</SectionLabel>
              <div className="flex flex-col gap-4">
                {/* 성장한 점 */}
                <div className="rounded-xl bg-violet-500/6 border border-violet-500/15 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={13} className="text-violet-400 shrink-0" />
                    <span className="text-xs font-bold text-violet-400 tracking-wide">
                      성장한 점
                    </span>
                  </div>
                  <p
                    className="text-sm text-white/60 leading-[1.95] break-keep"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {project.retrospective.growth}
                  </p>
                </div>

                {/* 아쉬운 점 */}
                <div className="rounded-xl bg-orange-500/6 border border-orange-500/15 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-orange-400 text-sm leading-none">△</span>
                    <span className="text-xs font-bold text-orange-400 tracking-wide">
                      아쉬운 점
                    </span>
                  </div>
                  <p
                    className="text-sm text-white/60 leading-[1.95] break-keep"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {project.retrospective.regret}
                  </p>
                </div>

                {/* 향후 방향 */}
                <div className="rounded-xl bg-cyan-500/6 border border-cyan-500/15 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-cyan-400 text-sm leading-none">→</span>
                    <span className="text-xs font-bold text-cyan-400 tracking-wide">
                      향후 방향
                    </span>
                  </div>
                  <p
                    className="text-sm text-white/60 leading-[1.95] break-keep"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {project.retrospective.future}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* GitHub 링크 */}
          {project.github && (
            <FadeUp delay={0.35} className="flex justify-end">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/65 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200 min-h-[48px]"
              >
                <GitBranch size={15} className="shrink-0" />
                GitHub에서 보기
              </a>
            </FadeUp>
          )}
        </div>
      </div>
    </div>
  );
}
