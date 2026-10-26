"use client";

import React, { useRef, useState, useEffect } from "react";
import { MAIN_PROJECTS } from "@/data/projects";

export function WaveCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      lastScroll = currentScroll;

      // Map scroll speed to wave skew angle (max 12deg)
      const clamped = Math.max(-14, Math.min(14, delta * 0.45));
      setScrollVelocity(clamped);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrollVelocity(0);
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 px-6 md:px-12 bg-[#F5F3F2] text-[#09080A] overflow-hidden select-none transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#530570] font-bold uppercase block mb-2">
            PROYECTOS DESTACADOS
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight font-sans">
            FEATURED WORKS
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#09080A]/70 max-w-md font-light">
          Galería interactiva con física de inercia y curvatura adaptativa. Desliza o haz scroll para explorar.
        </p>
      </div>

      {/* Horizontal Scroll Gallery Container */}
      <div className="flex gap-8 overflow-x-auto pb-8 pt-4 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory">
        {MAIN_PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[320px] md:w-[440px] snap-center rounded-2xl bg-[#09080A] text-[#F5F3F2] p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out border border-[#09080A]/10 hover:border-[#530570]/50"
            style={{
              transform: `perspective(1000px) skewY(${scrollVelocity * (idx % 2 === 0 ? 0.8 : -0.8)}deg) scale(${
                scrollVelocity !== 0 ? 0.98 : 1
              })`,
              transformOrigin: "center center",
            }}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9E9EA7]/70 uppercase mb-4">
                <span>0{idx + 1} / 0{MAIN_PROJECTS.length}</span>
                <span className="text-[#530570] font-bold">{project.category}</span>
              </div>

              {/* Project Card Visual Preview Box */}
              <div
                className={`w-full h-44 rounded-xl bg-gradient-to-br ${project.gradient} mb-6 flex items-center justify-center p-4 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-[#530570]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-lg md:text-xl font-bold tracking-tight text-[#F5F3F2]/90 text-center font-sans">
                  {project.title}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F5F3F2] mb-3 font-sans">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-[#9E9EA7] font-light leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#F5F3F2]/10 text-[#F5F3F2]/80 border border-[#F5F3F2]/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F5F3F2]/10 text-xs">
                <span className="text-[10px] font-mono text-[#9E9EA7]/70">
                  {project.stats}
                </span>
                <span className="font-semibold text-[#F5F3F2] hover:text-[#530570] transition-colors flex items-center gap-1">
                  Explorar ↗
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
