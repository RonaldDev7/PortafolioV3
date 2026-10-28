"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceItem {
  id: "fullstack" | "database" | "creative" | "crm";
  num: string;
  titleEs: string;
  titleEn: string;
  categoryEs: string;
  categoryEn: string;
  teaserEs: string;
  teaserEn: string;
  summaryEs: string;
  summaryEn: string;
  deliverablesEs: string[];
  deliverablesEn: string[];
  metricEs: string;
  metricEn: string;
  icon: (className?: string) => React.ReactNode;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fullstack",
    num: "01",
    titleEs: "Arquitectura Full-Stack & Cloud",
    titleEn: "Full-Stack Architecture & Cloud",
    categoryEs: "Next.js • Node.js • TypeScript • Cloud",
    categoryEn: "Next.js • Node.js • TypeScript • Cloud",
    teaserEs: "Plataformas web de alto rendimiento con arquitecturas modulares escalables.",
    teaserEn: "High-performance web platforms with scalable, modular architectures.",
    summaryEs:
      "Desarrollo integral de plataformas web escalables desde cero, estructuradas con Server Components, microservicios REST/GraphQL, arquitecturas limpias (DDD) y autenticación segura JWT/OAuth.",
    summaryEn:
      "End-to-end scalable web platforms built from scratch with Server Components, REST/GraphQL microservices, clean architectures (DDD), and enterprise JWT/OAuth authentication.",
    deliverablesEs: [
      "Clean Architecture & DDD",
      "Microservicios REST / GraphQL",
      "Optimización SSR & Edge Caching",
      "Autenticación Segura JWT / OAuth",
    ],
    deliverablesEn: [
      "Clean Architecture & DDD",
      "REST / GraphQL Microservices",
      "SSR & Edge Caching Optimization",
      "Secure JWT / OAuth Authentication",
    ],
    metricEs: "99.9% SLA • Microservicios Distribuidos",
    metricEn: "99.9% SLA • Distributed Microservices",
    icon: (className = "w-5 h-5") => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "database",
    num: "02",
    titleEs: "Ingeniería SQL & Bases de Datos",
    titleEn: "SQL & Database Engineering",
    categoryEs: "PostgreSQL • MySQL • Modelado Relacional",
    categoryEn: "PostgreSQL • MySQL • Relational Modeling",
    teaserEs: "Modelado relacional optimizado, índices B-Tree y transacciones ACID seguras.",
    teaserEn: "Optimized relational modeling, B-Tree indexes, and safe ACID transactions.",
    summaryEs:
      "Modelado de datos relacionales robustos con esquemas normalizados (3NF), diseño avanzado de índices B-Tree, transacciones ACID estrictas y optimización de latencia en consultas complejas.",
    summaryEn:
      "Robust relational data modeling with normalized schemas (3NF), advanced B-Tree indexing, strict ACID transactions, and query latency optimization for high-workload environments.",
    deliverablesEs: [
      "Esquemas Normalizados (3NF)",
      "Optimización Sub-20ms en Consultas",
      "Transacciones ACID & Locks Seguros",
      "Estrategias de Replicación & Backups",
    ],
    deliverablesEn: [
      "Normalized Schemas (3NF)",
      "Sub-20ms Query Optimization",
      "ACID Transactions & Safe Locks",
      "Replication Strategies & Backups",
    ],
    metricEs: "Sub-20ms Latency • Consultas Optimizadas",
    metricEn: "Sub-20ms Latency • Optimized Queries",
    icon: (className = "w-5 h-5") => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "creative",
    num: "03",
    titleEs: "Frontend Creativo & Shaders 3D",
    titleEn: "Creative Frontend & 3D Shaders",
    categoryEs: "WebGL • GSAP • Canvas 2D/3D • Microinteracciones",
    categoryEn: "WebGL • GSAP • Canvas 2D/3D • Micro-interactions",
    teaserEs: "Interfaces cinemáticas interactivas con renderizado GPU fluido a 60 FPS.",
    teaserEn: "Cinematic interactive interfaces with smooth 60 FPS GPU-accelerated rendering.",
    summaryEs:
      "Creación de interfaces inmersivas de alto impacto visual, coreografías cinemáticas de scroll con GSAP y renderizado acelerado por GPU a 60 FPS estables sin bloqueos del hilo principal.",
    summaryEn:
      "Immersive high-impact visual interfaces with scroll-driven GSAP choreography and GPU-accelerated WebGL rendering maintaining a rock-solid 60 FPS without main-thread blocking.",
    deliverablesEs: [
      "Experiencias 60 FPS Rock Solid",
      "Shaders GLSL & Física Interactiva",
      "Coreografías GSAP & ScrollTrigger",
      "Accesibilidad WCAG AA Integrada",
    ],
    deliverablesEn: [
      "Rock-solid 60 FPS Experiences",
      "GLSL Shaders & Interactive Physics",
      "GSAP & ScrollTrigger Choreography",
      "WCAG AA Accessible Implementation",
    ],
    metricEs: "60 FPS Estables • Cero Layout Thrashing",
    metricEn: "Rock Solid 60 FPS • Zero Layout Thrashing",
    icon: (className = "w-5 h-5") => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
  {
    id: "crm",
    num: "04",
    titleEs: "Sistemas CRM & Automatización",
    titleEn: "Custom CRM & Internal Tools",
    categoryEs: "Dashboards • Pipelines • Automatización • Analítica",
    categoryEn: "Dashboards • Pipelines • Automation • Analytics",
    teaserEs: "Software empresarial a medida con tableros reactivos y flujos de datos automatizados.",
    teaserEn: "Tailor-made enterprise software with reactive boards and automated workflows.",
    summaryEs:
      "Construcción de suites empresariales a medida: gestión automatizada de clientes, tableros Kanban reactivos, analítica comercial en tiempo real y exportación de métricas críticas.",
    summaryEn:
      "Custom enterprise software suites: automated client workflows, reactive Kanban boards, real-time sales telemetry, and automated CSV/PDF export pipelines.",
    deliverablesEs: [
      "Tableros Kanban con Drag & Drop",
      "Telemetría Comercial en Tiempo Real",
      "Filtros Dinámicos & Búsqueda Rápida",
      "Exportación Automatizada a CSV/PDF",
    ],
    deliverablesEn: [
      "Kanban Boards with Drag & Drop",
      "Real-time Sales Telemetry",
      "Dynamic Multi-field Search & Filters",
      "Automated CSV/PDF Export Engine",
    ],
    metricEs: "+10k Transacciones • Flujos Automatizados",
    metricEn: "+10k Transactions • Automated Workflows",
    icon: (className = "w-5 h-5") => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
];

export function ServicesAccordion() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  // State to track which card is currently expanded (or null if none)
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="w-full py-20 md:py-28 px-6 md:px-12 bg-[#F5F3F2] text-[#09080A] relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle grid background texture for tactile editorial feel */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#09080A_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient soft glow on top-right */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#530570]/10 border border-[#530570]/20 text-[#530570] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span>{isEs ? "04 // ESPECIALIZACIÓN & SERVICIOS" : "04 // SERVICES & SPECIALIZATION"}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#09080A] uppercase">
                {isEs ? "SERVICIOS DE INGENIERÍA" : "ENGINEERING SERVICES"}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#09080A]/70 max-w-2xl font-normal leading-relaxed">
                {isEs
                  ? "Arquitectura full-stack moderna, diseño de bases de datos de alta concurrencia e interfaces creativas con rendimiento estricto a 60 FPS."
                  : "Modern full-stack architecture, high-concurrency database design, and creative interfaces crafted with strict 60 FPS performance."}
              </p>
            </div>

            <div className="text-xs font-mono text-[#09080A]/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#530570]" />
              <span>
                {isEs
                  ? "Haz click en cualquier tarjeta para ver detalles"
                  : "Click any card to expand details"}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-start">
          {SERVICES_DATA.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleService(service.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                className={`group relative rounded-2xl bg-white p-6 sm:p-7 border-2 transition-all duration-300 ease-out transform-gpu cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] ${
                  isOpen
                    ? "border-[#A855F7] shadow-[0_0_26px_rgba(168,85,247,0.36),0_10px_24px_rgba(0,0,0,0.05)] scale-[1.01]"
                    : "border-[#09080A]/10 hover:border-[#A855F7] hover:scale-[1.02] hover:shadow-[0_0_26px_rgba(168,85,247,0.42),0_12px_26px_rgba(0,0,0,0.06)] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Top Card Bar: Number Badge + Tech Stack Pills + Animated Expand Button */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#530570] text-white"
                          : "bg-[#530570]/10 text-[#530570] group-hover:bg-[#A855F7] group-hover:text-white"
                      }`}
                    >
                      {service.num}
                    </div>

                    <div className="text-xs font-mono font-medium text-[#09080A]/60 group-hover:text-[#530570] transition-colors truncate max-w-[200px] sm:max-w-[260px]">
                      {isEs ? service.categoryEs : service.categoryEn}
                    </div>
                  </div>

                  {/* Expand Chevron Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isOpen
                        ? "bg-[#530570] text-white border-[#530570] rotate-180 shadow-sm"
                        : "bg-[#09080A]/[0.03] text-[#09080A]/60 border-[#09080A]/10 group-hover:border-[#A855F7] group-hover:text-[#530570]"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Card Title & Icon */}
                <div className="flex items-start justify-between gap-3 mt-4 mb-2">
                  <h3
                    className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-200 ${
                      isOpen
                        ? "text-[#530570]"
                        : "text-[#09080A] group-hover:text-[#530570]"
                    }`}
                  >
                    {isEs ? service.titleEs : service.titleEn}
                  </h3>

                  <div className="p-2 rounded-lg bg-[#530570]/5 text-[#530570] group-hover:text-[#A855F7] transition-colors shrink-0">
                    {service.icon("w-5 h-5")}
                  </div>
                </div>

                {/* Short Compact Teaser */}
                <p className="text-xs sm:text-sm text-[#09080A]/70 leading-relaxed font-normal">
                  {isEs ? service.teaserEs : service.teaserEn}
                </p>

                {/* Click Status Prompt Hint */}
                <div className="mt-4 pt-3 border-t border-[#09080A]/5 flex items-center justify-between text-[11px] font-mono">
                  <span
                    className={`font-semibold flex items-center gap-1 transition-colors ${
                      isOpen ? "text-[#530570]" : "text-[#A855F7]"
                    }`}
                  >
                    {isOpen
                      ? isEs
                        ? "Cerrar detalles ▲"
                        : "Close details ▲"
                      : isEs
                      ? "Ver detalles y entregables ▼"
                      : "View details & deliverables ▼"}
                  </span>
                  <span className="text-[#09080A]/40 text-[10px]">
                    {isOpen ? (isEs ? "Abierto" : "Expanded") : (isEs ? "Compacto" : "Collapsed")}
                  </span>
                </div>

                {/* Smooth Expandable Drawer via CSS Grid rows */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-5 mt-3 border-t border-[#09080A]/10 flex flex-col gap-4">
                      {/* Detailed Summary */}
                      <p className="text-sm text-[#09080A]/85 leading-relaxed font-normal">
                        {isEs ? service.summaryEs : service.summaryEn}
                      </p>

                      {/* Deliverables Tags */}
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#530570] font-bold block mb-2">
                          {isEs ? "Capacidades & Entregables:" : "Capabilities & Deliverables:"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(isEs ? service.deliverablesEs : service.deliverablesEn).map((item) => (
                            <span
                              key={item}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#09080A]/[0.04] text-[#09080A]/90 border border-[#09080A]/10 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Metric Badge */}
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 text-xs font-mono text-[#530570]">
                        <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse shrink-0" />
                        <span className="font-semibold">{isEs ? service.metricEs : service.metricEn}</span>
                      </div>

                      {/* Action CTA Button */}
                      <div className="pt-1">
                        <a
                          href={`mailto:ronaldalvarezjsjs@gmail.com?subject=${encodeURIComponent(
                            `Propuesta de Proyecto - ${isEs ? service.titleEs : service.titleEn}`
                          )}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-[#530570] hover:bg-[#8B1ED6] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#530570]/20 hover:shadow-lg hover:shadow-[#8B1ED6]/30 hover:scale-[1.01] cursor-pointer"
                        >
                          <span>
                            {isEs ? "Cotizar o iniciar proyecto" : "Request a quote / start project"}
                          </span>
                          <span className="text-sm font-bold">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesAccordion;
