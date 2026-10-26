"use client";

import React from "react";

export function TimelineSection() {
  const milestones = [
    {
      year: "2024 — PRESENTE",
      title: "FULL STACK ARCHITECT",
      subtitle: "Enterprise Platforms & High Performance",
      description:
        "Diseño e implementación de sistemas empresariales integrales (CRM, microservicios, dashboards analíticos). Arquitectura de bases de datos relacionales SQL con consultas optimizadas y alta disponibilidad.",
      tags: ["Next.js", "TypeScript", "Node.js", "SQL", "Tailwind CSS"],
    },
    {
      year: "2023 — 2024",
      title: "CREATIVE TECHNOLOGIST",
      subtitle: "Interactive Frontend & Creative Coding",
      description:
        "Desarrollo de interfaces frontend avanzadas, pipelines de animación fluida con GSAP y Shaders WebGL para marcas y experiencias interactivas.",
      tags: ["React", "GSAP", "WebGL", "Canvas", "UI/UX Engineering"],
    },
    {
      year: "2022 — 2023",
      title: "SOFTWARE DEVELOPER",
      subtitle: "Foundations & Web Engineering",
      description:
        "Construcción de aplicaciones web completas, diseño de APIs RESTful, modelado de esquemas relacionales e integración de servicios externos.",
      tags: ["JavaScript", "Express", "PostgreSQL", "HTML5", "CSS3"],
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#09080A] text-[#F5F3F2] relative overflow-hidden select-none">
      {/* Background Kinetic Watermark Typography */}
      <div
        className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-5 overflow-hidden text-7xl md:text-9xl font-black uppercase font-sans tracking-tighter"
        aria-hidden="true"
      >
        <span className="translate-x-12">FULL STACK DEVELOPER</span>
        <span className="-translate-x-20">CREATIVE TECHNOLOGIST</span>
        <span className="translate-x-32">SQL ARCHITECTURE</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#530570] uppercase font-bold block mb-2">
            TRAYECTORIA & HISTORIA
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight font-sans">
            WHERE I&apos;VE BEEN
          </h2>
        </div>

        {/* Structured Grid Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="p-8 rounded-2xl bg-[#09080A]/90 border border-[#F5F3F2]/10 hover:border-[#530570]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#530570] font-bold uppercase block mb-3">
                  {m.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F5F3F2] mb-1 font-sans">
                  {m.title}
                </h3>
                <h4 className="text-xs text-[#9E9EA7]/70 uppercase tracking-wider mb-4 font-mono">
                  {m.subtitle}
                </h4>
                <p className="text-xs text-[#9E9EA7] font-light leading-relaxed mb-6">
                  {m.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5F3F2]/10 flex flex-wrap gap-1.5">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F3F2]/5 text-[#F5F3F2]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
