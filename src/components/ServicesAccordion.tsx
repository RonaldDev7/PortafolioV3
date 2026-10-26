"use client";

import React, { useState } from "react";

export function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      num: "01",
      title: "FULL-STACK ARCHITECTURE",
      summary:
        "Desarrollo integral de plataformas web escalables desde cero utilizando Next.js, Node.js y TypeScript.",
      deliverables:
        "Arquitectura limpia, Server Components, microservicios REST/GraphQL, autenticación segura y optimización SEO.",
    },
    {
      num: "02",
      title: "DATABASE & SQL ENGINEERING",
      summary:
        "Modelado de datos relacionales robustos con PostgreSQL/MySQL, diseño de índices y transacciones complejas.",
      deliverables:
        "Esquemas normalizados, optimización de latencia en consultas, integridad referencial y migraciones continuas.",
    },
    {
      num: "03",
      title: "CREATIVE ENGINEERING & SHADERS",
      summary:
        "Experiencias inmersivas de alto impacto visual, animaciones coreografiadas con GSAP y Shaders WebGL.",
      deliverables:
        "Microinteracciones a 60 FPS, Canvas 2D/3D reactivo, transiciones fluidas de scroll y compatibilidad móvil.",
    },
    {
      num: "04",
      title: "CUSTOM CRM & INTERNAL TOOLS",
      summary:
        "Construcción de paneles administrativos y sistemas CRM personalizados para optimizar procesos comerciales.",
      deliverables:
        "Gestión de leads, pipelines de ventas, analítica interactiva, dashboards en tiempo real y exportación de métricas.",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 bg-[#F5F3F2] text-[#09080A] select-none"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#530570] font-bold uppercase block mb-2">
            CAPACIDADES & SOLUCIONES
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight font-sans">
            THE SERVICES I PROVIDE
          </h2>
          <p className="text-xs md:text-sm text-[#09080A]/70 font-light max-w-lg mx-auto mt-3">
            Soluciones de ingeniería de software a medida, enfocadas en rendimiento, escalabilidad y distinción visual.
          </p>
        </div>

        {/* Expanding Pill Accordion Container */}
        <div className="space-y-4">
          {services.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.num}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`rounded-2xl transition-all duration-300 ease-out cursor-pointer p-6 md:p-8 ${
                  isOpen
                    ? "bg-[#09080A] text-[#F5F3F2] shadow-2xl border border-[#530570]/40"
                    : "bg-[#09080A]/5 text-[#09080A] hover:bg-[#09080A]/10 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`text-xs md:text-sm font-mono tracking-widest ${
                        isOpen ? "text-[#530570] font-bold" : "text-[#09080A]/50"
                      }`}
                    >
                      {item.num}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold tracking-tight uppercase font-sans">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-[#530570]" : "text-current"
                    }`}
                  >
                    +
                  </span>
                </div>

                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-[#F5F3F2]/10 space-y-4 animate-fadeIn">
                    <p className="text-xs md:text-sm text-[#9E9EA7] font-light leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <div className="text-[11px] font-mono text-[#F5F3F2]/70">
                        <span className="text-[#530570] font-bold">ENTREGABLES:</span>{" "}
                        {item.deliverables}
                      </div>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-[#530570] hover:text-[#F5F3F2] transition-colors"
                      >
                        <span>INICIAR PROYECTO</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
