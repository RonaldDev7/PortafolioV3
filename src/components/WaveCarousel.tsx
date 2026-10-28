"use client";

import React, { useState, useRef, useMemo } from "react";
import FlexCarousel, { FlexCarouselEngine } from "./FlexCarousel";
import { MAIN_PROJECTS, ProjectItem } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

export function WaveCarousel() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<FlexCarouselEngine | null>(null);

  const isEs = lang === "es";

  // Build carousel items with exact format required by FlexCarousel
  const carouselItems = useMemo(() => {
    return MAIN_PROJECTS.map((proj) => ({
      src: proj.image || "/projects/focus-web.png",
      alt: isEs ? proj.title : (proj.titleEn || proj.title),
      title: isEs ? proj.title : (proj.titleEn || proj.title),
      subtitle: `${proj.year || "2024"} • ${isEs ? proj.category : (proj.categoryEn || proj.category)}`,
    }));
  }, [isEs]);

  const currentProject: ProjectItem = MAIN_PROJECTS[activeIndex] || MAIN_PROJECTS[0];

  const handleSelectTab = (idx: number) => {
    setActiveIndex(idx);
    carouselRef.current?.goTo(idx);
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 md:px-12 bg-[#09080A] text-[#F5F3F2] relative overflow-hidden select-none transition-colors duration-500"
    >
      {/* Background Volumetric Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#530570]/20 blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-[#8B1ED6]/10 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#530570]/20 border border-[#A855F7]/30 text-[#A855F7] text-[11px] font-mono tracking-widest uppercase mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              {isEs ? "PROYECTOS DESTACADOS // 2023 — 2025" : "FEATURED PROJECTS // 2023 — 2025"}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3F2]">
              {isEs ? "PROYECTOS & ARQUITECTURA" : "ENGINEERING & ARCHITECTURE"}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-md font-light leading-relaxed">
            {isEs
              ? "Galería 3D interactiva con física WebGL de distorsión líquida. Arrastra, haz scroll o selecciona cualquier proyecto para inspeccionar arquitectura y enlaces."
              : "Interactive 3D WebGL liquid lens gallery. Drag, scroll or select projects to inspect architectural details and code."}
          </p>
        </div>

        {/* Project Quick-Switch Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {MAIN_PROJECTS.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectTab(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? "bg-[#530570]/40 border-[#A855F7] text-[#F5F3F2] shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                    : "bg-white/[0.03] border-white/10 text-[#9E9EA7] hover:text-[#F5F3F2] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className={isActive ? "text-[#A855F7] font-bold" : "text-[#9E9EA7]/60"}>
                  0{idx + 1}
                </span>
                <span>{isEs ? proj.title : (proj.titleEn || proj.title)}</span>
                {proj.year && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                    {proj.year}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3D WebGL Liquid Flex Carousel Container */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent p-2 sm:p-4 border border-white/10 backdrop-blur-sm shadow-2xl">
          {/* Navigation Arrows */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label={isEs ? "Proyecto anterior" : "Previous project"}
              className="w-9 h-9 rounded-full bg-[#121115]/80 hover:bg-[#530570] border border-white/10 hover:border-[#A855F7]/60 text-[#F5F3F2] flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md group"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label={isEs ? "Siguiente proyecto" : "Next project"}
              className="w-9 h-9 rounded-full bg-[#121115]/80 hover:bg-[#530570] border border-white/10 hover:border-[#A855F7]/60 text-[#F5F3F2] flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md group"
            >
              <svg
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* User Requested FlexCarousel Block */}
          <div className="w-full h-[520px] sm:h-[620px] md:h-[680px] relative">
            <FlexCarousel
              ref={carouselRef}
              items={carouselItems}
              preset="liquid"
              intro="rise"
              cardHeight={0.68}
              gap={16}
              squeeze={0.15}
              focusOnClick
              captions
              fit="natural"
              radius={0}
              lensWidth={0.74}
              lensHeight={1.18}
              tilt={62}
              roundness={1}
              bend={0.34}
              reach={0.38}
              curl="twist"
              dispersion={0.45}
              liquid={0}
              followCursor={false}
              autoplay={false}
              interval={4}
              captureWheel
              onChange={(index: number) => setActiveIndex(index)}
            />
          </div>
        </div>

        {/* Detailed Active Project Showcase Card */}
        <div className="mt-8 rounded-2xl bg-[#121115]/90 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300">
          {/* Subtle Ambient Edge Glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/50 to-transparent" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#530570]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
            {/* Left Column: Project Meta & Description */}
            <div className="flex-1 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-[#A855F7] tracking-wider uppercase bg-[#530570]/25 px-2.5 py-1 rounded-md border border-[#A855F7]/30">
                  {currentProject.year || "2024"}
                </span>
                <span className="text-xs font-mono text-[#9E9EA7] tracking-widest uppercase">
                  {isEs ? currentProject.category : (currentProject.categoryEn || currentProject.category)}
                </span>
                {currentProject.stats && (
                  <span className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {currentProject.stats}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F3F2] mb-3">
                {isEs ? currentProject.title : (currentProject.titleEn || currentProject.title)}
              </h3>

              <p className="text-sm sm:text-base text-[#9E9EA7] font-light leading-relaxed mb-6">
                {isEs
                  ? currentProject.description
                  : (currentProject.descriptionEn || currentProject.description)}
              </p>

              {/* Technologies Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#1A1822] text-[#F5F3F2] border border-white/10 hover:border-[#A855F7]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Action Buttons */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-start gap-3 flex-shrink-0 pt-2">
              {currentProject.demoUrl && currentProject.demoUrl !== "#" && (
                <a
                  href={currentProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#530570] hover:bg-[#8B1ED6] text-white text-xs font-mono font-semibold transition-all duration-200 shadow-lg shadow-[#530570]/30 hover:shadow-[#8B1ED6]/40 hover:scale-[1.02] cursor-pointer"
                >
                  <span>{isEs ? "Ver demo" : "Live Demo"}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}

              {currentProject.repoUrl && currentProject.repoUrl !== "#" && (
                <a
                  href={currentProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/30 text-[#F5F3F2] text-xs font-mono font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>{isEs ? "Repositorio" : "Repository"}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </a>
              )}

              {currentProject.codeUrl && currentProject.codeUrl !== "#" && (
                <a
                  href={currentProject.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/30 text-[#F5F3F2] text-xs font-mono font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>{isEs ? "Código" : "Source Code"}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WaveCarousel;
