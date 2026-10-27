"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function TimelineSection() {
  const { lang } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentStepRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef<number>(0);

  const copy = {
    es: {
      category: "TRAYECTORIA & HISTORIA",
      introBadge: "TRAYECTORIA • 2022 — 2024",
      introTitlePart1: "DÓNDE HE",
      introTitlePart2: "ESTADO",
      introSubtitle:
        "Un recorrido por los roles, desafíos técnicos y tecnologías que han forjado mi experiencia como desarrollador.",
      scrollPrompt: "Desliza para explorar la trayectoria",
      roleLabel: "ROL",
      slides: [
        {
          year: "2024 — PRESENTE",
          roleType: "ARQUITECTURA & DESARROLLO EMPRESARIAL",
          title: "FULL STACK ARCHITECT",
          subtitle: "Plataformas Empresariales y Alto Rendimiento",
          description:
            "Diseño e implementación de sistemas empresariales integrales (CRM, microservicios, dashboards analíticos). Arquitectura de bases de datos relacionales SQL con consultas optimizadas y alta disponibilidad.",
          milestones: [
            {
              label: "01 / ENTREGA",
              desc: "Arquitectura de sistemas de alta concurrencia y pipelines de CI/CD.",
            },
            {
              label: "02 / BASE DE DATOS",
              desc: "Modelado relacional SQL, índices y reducción de latencia en consultas.",
            },
            {
              label: "03 / FULL STACK",
              desc: "Frontend Next.js reactivo con microservicios en Node.js y TypeScript.",
            },
          ],
          tags: ["Next.js", "TypeScript", "Node.js", "SQL", "Tailwind CSS"],
        },
        {
          year: "2023 — 2024",
          roleType: "FRONTEND AVANZADO & MOTION",
          title: "TECNÓLOGO CREATIVO",
          subtitle: "Frontend Interactivo y Código Creativo",
          description:
            "Desarrollo de interfaces frontend avanzadas, pipelines de animación fluida con GSAP y Shaders WebGL para marcas y experiencias interactivas inmersivas.",
          milestones: [
            {
              label: "01 / ANIMACIÓN",
              desc: "Coreografía matemática de microinteracciones a 60 FPS con GSAP.",
            },
            {
              label: "02 / SHADERS Y WEBGL",
              desc: "Efectos visuales con Three.js, shaders GLSL y deformación física.",
            },
            {
              label: "03 / SISTEMA DE DISEÑO",
              desc: "Sistemas de diseño escalables y accesibilidad certificada WCAG AA.",
            },
          ],
          tags: ["React", "GSAP", "WebGL", "Canvas", "UI/UX Engineering"],
        },
        {
          year: "2022 — 2023",
          roleType: "FUNDAMENTOS & INGENIERÍA WEB",
          title: "DESARROLLADOR DE SOFTWARE",
          subtitle: "Fundamentos e Ingeniería Web",
          description:
            "Construcción de aplicaciones web completas, diseño de APIs RESTful, modelado de esquemas relacionales e integración de servicios externos de alta disponibilidad.",
          milestones: [
            {
              label: "01 / NÚCLEO WEB",
              desc: "Dominio profundo de JavaScript moderno, TypeScript y clean architecture.",
            },
            {
              label: "02 / APIS REST",
              desc: "Diseño e integración de APIs RESTful seguras con autenticación JWT.",
            },
            {
              label: "03 / BASES DE DATOS",
              desc: "Modelado estructurado en PostgreSQL y consumo eficiente de datos.",
            },
          ],
          tags: ["JavaScript", "Express", "PostgreSQL", "HTML5", "CSS3"],
        },
      ],
    },
    en: {
      category: "CAREER & FOUNDATIONS",
      introBadge: "TIMELINE • 2022 — 2024",
      introTitlePart1: "WHERE I'VE",
      introTitlePart2: "BEEN",
      introSubtitle:
        "A chronological journey across the roles, architectural challenges, and engineering craft that define my career.",
      scrollPrompt: "Scroll to explore timeline",
      roleLabel: "ROLE",
      slides: [
        {
          year: "2024 — PRESENT",
          roleType: "ARCHITECTURE & ENTERPRISE ENGINEERING",
          title: "FULL STACK ARCHITECT",
          subtitle: "Enterprise Platforms & High Performance",
          description:
            "Architecting and delivering comprehensive enterprise platforms (CRM, microservices, analytics dashboards). Relational SQL database architecture with high availability and optimized latency.",
          milestones: [
            {
              label: "01 / DELIVERY",
              desc: "High-concurrency system architecture and robust CI/CD pipelines.",
            },
            {
              label: "02 / DATABASE",
              desc: "Advanced relational SQL modeling, indexing, and query optimization.",
            },
            {
              label: "03 / FULL STACK",
              desc: "Next.js reactive frontends paired with Node.js and TypeScript services.",
            },
          ],
          tags: ["Next.js", "TypeScript", "Node.js", "SQL", "Tailwind CSS"],
        },
        {
          year: "2023 — 2024",
          roleType: "ADVANCED FRONTEND & MOTION",
          title: "CREATIVE TECHNOLOGIST",
          subtitle: "Interactive Frontend & Creative Coding",
          description:
            "Building high-performance interactive interfaces, fluid motion pipelines using GSAP and WebGL shaders for expressive, memorable digital experiences.",
          milestones: [
            {
              label: "01 / ANIMATION",
              desc: "Mathematical choreography of 60 FPS micro-interactions with GSAP.",
            },
            {
              label: "02 / SHADERS & WEBGL",
              desc: "Three.js visual distortion, GLSL shaders, and interactive physics.",
            },
            {
              label: "03 / DESIGN SYSTEM",
              desc: "Modular design tokens, component architecture, and WCAG AA standards.",
            },
          ],
          tags: ["React", "GSAP", "WebGL", "Canvas", "UI/UX Engineering"],
        },
        {
          year: "2022 — 2023",
          roleType: "FOUNDATIONS & WEB ENGINEERING",
          title: "SOFTWARE DEVELOPER",
          subtitle: "Foundations & Web Engineering",
          description:
            "Building end-to-end web applications, designing RESTful API endpoints, relational database modeling, and integrating third-party services.",
          milestones: [
            {
              label: "01 / WEB CORE",
              desc: "Solid mastery of modern JavaScript, TypeScript, and clean code practices.",
            },
            {
              label: "02 / REST APIS",
              desc: "Secure RESTful API architectures with token-based JWT authentication.",
            },
            {
              label: "03 / DATABASES",
              desc: "PostgreSQL schema normalization and efficient query handling.",
            },
          ],
          tags: ["JavaScript", "Express", "PostgreSQL", "HTML5", "CSS3"],
        },
      ],
    },
  }[lang];

  // Fluid Purple Waves Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // 4 layered organic purple waves with varied harmonics & luminous accents
    const waves = [
      {
        baseY: 0.72,
        amplitude: 58,
        frequency: 0.0016,
        speed: 0.012,
        phase: 0,
        gradient: ["rgba(45, 0, 75, 0.65)", "rgba(10, 5, 18, 0.95)"],
        stroke: "rgba(139, 30, 214, 0.45)",
        lineWidth: 1.5,
      },
      {
        baseY: 0.60,
        amplitude: 68,
        frequency: 0.0022,
        speed: 0.016,
        phase: 2.1,
        gradient: ["rgba(83, 5, 112, 0.5)", "rgba(20, 3, 35, 0.9)"],
        stroke: "rgba(168, 85, 247, 0.6)",
        lineWidth: 2,
      },
      {
        baseY: 0.50,
        amplitude: 48,
        frequency: 0.003,
        speed: 0.022,
        phase: 4.2,
        gradient: ["rgba(139, 30, 214, 0.35)", "rgba(35, 0, 55, 0.75)"],
        stroke: "rgba(192, 132, 252, 0.75)",
        lineWidth: 2,
      },
      {
        baseY: 0.40,
        amplitude: 36,
        frequency: 0.0038,
        speed: 0.026,
        phase: 1.4,
        gradient: ["rgba(168, 85, 247, 0.22)", "rgba(50, 0, 80, 0.5)"],
        stroke: "rgba(233, 213, 255, 0.85)",
        lineWidth: 1.5,
      },
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      t += 1;
      const scrollOffset = scrollProgressRef.current * 700; // Waves react fluidly to horizontal scroll!

      waves.forEach((wave) => {
        ctx.beginPath();
        const startY = height * wave.baseY;
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 6) {
          const angle1 = (x + scrollOffset) * wave.frequency + t * wave.speed + wave.phase;
          const angle2 = (x * 0.5 + scrollOffset * 0.7) * wave.frequency * 1.6 + t * wave.speed * 0.8;
          const y = startY + Math.sin(angle1) * wave.amplitude + Math.cos(angle2) * (wave.amplitude * 0.35);

          if (x === 0) {
            ctx.lineTo(0, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Wave Fill Gradient
        const grad = ctx.createLinearGradient(0, startY - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.gradient[0]);
        grad.addColorStop(1, wave.gradient[1]);
        ctx.fillStyle = grad;
        ctx.fill();

        // Glowing Crest Stroke
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const angle1 = (x + scrollOffset) * wave.frequency + t * wave.speed + wave.phase;
          const angle2 = (x * 0.5 + scrollOffset * 0.7) * wave.frequency * 1.6 + t * wave.speed * 0.8;
          const y = startY + Math.sin(angle1) * wave.amplitude + Math.cos(angle2) * (wave.amplitude * 0.35);

          if (x === 0) {
            ctx.moveTo(0, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = wave.stroke;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowColor = wave.stroke;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const totalSlides = copy.slides.length + 1; // 1 Intro + 3 Roles = 4 slides
      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 768px)
      mm.add("(min-width: 768px)", () => {
        const horizontalDistance = window.innerWidth * (totalSlides - 1);
        const exitBuffer = window.innerHeight * 0.75;
        const totalDistance = horizontalDistance + exitBuffer;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalDistance}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              const horizontalProgress = Math.min(
                1,
                (self.progress * totalDistance) / horizontalDistance
              );
              scrollProgressRef.current = horizontalProgress;

              const currentStep = Math.min(
                Math.floor(horizontalProgress * totalSlides) + 1,
                totalSlides
              );
              if (currentStepRef.current) {
                currentStepRef.current.textContent = `0${currentStep} / 0${totalSlides}`;
              }
            },
          },
        });

        // 1. Desplazamiento horizontal continuo
        tl.to(trackRef.current, {
          xPercent: -100 * ((totalSlides - 1) / totalSlides),
          ease: "none",
          duration: horizontalDistance / 1000,
        });

        // 2. Buffer cinemático de salida: atenúa la última tarjeta y prepara suavemente la siguiente sección
        tl.to(".timeline-last-card", {
          opacity: 0.15,
          scale: 0.94,
          y: -30,
          ease: "power2.inOut",
          duration: exitBuffer / 1000,
        });
        tl.to(
          ".timeline-exit-fog",
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: exitBuffer / 1000,
          },
          "<"
        );
      });

      // Mobile (max-width: 767px)
      mm.add("(max-width: 767px)", () => {
        const horizontalDistance = window.innerWidth * (totalSlides - 1) * 1.15;
        const exitBuffer = window.innerHeight * 0.6;
        const totalDistance = horizontalDistance + exitBuffer;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalDistance}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              const horizontalProgress = Math.min(
                1,
                (self.progress * totalDistance) / horizontalDistance
              );
              scrollProgressRef.current = horizontalProgress;

              const currentStep = Math.min(
                Math.floor(horizontalProgress * totalSlides) + 1,
                totalSlides
              );
              if (currentStepRef.current) {
                currentStepRef.current.textContent = `0${currentStep} / 0${totalSlides}`;
              }
            },
          },
        });

        tl.to(trackRef.current, {
          xPercent: -100 * ((totalSlides - 1) / totalSlides),
          ease: "none",
          duration: horizontalDistance / 1000,
        });

        tl.to(".timeline-last-card", {
          opacity: 0.15,
          scale: 0.94,
          y: -20,
          ease: "power2.inOut",
          duration: exitBuffer / 1000,
        });
        tl.to(
          ".timeline-exit-fog",
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: exitBuffer / 1000,
          },
          "<"
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#09080A] text-[#F5F3F2] select-none"
    >
      {/* 1. Fluid Undulating Purple Waves Canvas & Volumetric Ambient Atmospheric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Animated Waves Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Deep Volumetric Purple Glows */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#530570]/30 blur-[150px] pointer-events-none -top-20 left-1/4 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full bg-[#8B1ED6]/20 blur-[170px] pointer-events-none -bottom-24 right-1/4 animate-pulse"
          style={{ animationDuration: "10s" }}
        />

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09080A] via-transparent to-[#09080A]/60" />
      </div>

      {/* 2. Top HUD Navigation (Minimalist: Category & Step Counter) */}
      <div className="absolute top-0 left-0 w-full z-30 px-5 md:px-14 pt-6 md:pt-10 pb-4 flex items-center justify-between bg-gradient-to-b from-[#09080A]/90 via-[#09080A]/60 to-transparent pointer-events-none">
        {/* Left Category Indicator */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
          <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#A855F7] uppercase font-bold">
            {copy.category}
          </span>
        </div>

        {/* Right Step Counter */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <span
            ref={currentStepRef}
            className="text-xs md:text-sm font-mono tracking-widest text-[#F5F3F2]/80 font-bold bg-[#F5F3F2]/5 px-3 py-1 rounded-full border border-[#F5F3F2]/10 backdrop-blur-md"
          >
            01 / 04
          </span>
        </div>
      </div>

      {/* 3. Horizontal Continuous Track (4 slides: 1 Intro + 3 Roles) */}
      <div
        ref={trackRef}
        className="flex flex-row h-full w-[400vw] will-change-transform z-10 relative"
      >
        {/* SLIDE 0: Monumental Title Intro Card */}
        <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-6 md:px-20 pt-16 md:pt-0 overflow-hidden">
          <div className="max-w-4xl w-full z-10 flex flex-col items-start text-left space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#A855F7]/30 bg-[#530570]/20 text-[#A855F7] text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              {copy.introBadge}
            </div>

            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
              {copy.introTitlePart1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E2E8F0] to-[#A855F7]">
                {copy.introTitlePart2}
              </span>
            </h2>

            <p className="text-sm md:text-lg text-[#9E9EA7] font-light max-w-2xl leading-relaxed">
              {copy.introSubtitle}
            </p>

            {/* Scroll indicator prompt */}
            <div className="pt-4 md:pt-6 flex items-center gap-3 text-xs font-mono text-[#A855F7] uppercase tracking-widest animate-pulse">
              <span>{copy.scrollPrompt}</span>
              <svg
                className="w-4 h-4 translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* SLIDES 1, 2, 3: Full-Screen Role Cards */}
        {copy.slides.map((slide, index) => {
          const isLast = index === copy.slides.length - 1;
          return (
            <div
              key={slide.year}
              className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-4 sm:px-8 md:px-16 lg:px-24 pt-20 pb-8 md:py-0 overflow-hidden"
            >
              {/* Glass Slide Frame */}
              <div
                className={`relative z-10 w-full max-w-5xl p-5 sm:p-7 md:p-12 lg:p-14 rounded-2xl md:rounded-3xl border border-[#F5F3F2]/15 bg-[#0E0D12]/75 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(83,5,112,0.25)] flex flex-col justify-between space-y-4 md:space-y-7 ${
                  isLast ? "timeline-last-card" : ""
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-3 border-b border-[#F5F3F2]/10 pb-3 md:pb-5">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-[11px] md:text-sm font-mono font-bold text-[#A855F7] px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-[#530570]/20 border border-[#A855F7]/30">
                      {slide.year}
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-[#9E9EA7] tracking-wider uppercase">
                      {slide.roleType}
                    </span>
                  </div>
                  <div className="text-[11px] md:text-xs font-mono text-[#F5F3F2]/40 tracking-widest uppercase">
                    {copy.roleLabel} 0{index + 1}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                    {slide.title}
                  </h3>
                  <h4 className="text-[11px] md:text-sm font-mono text-[#A855F7] uppercase tracking-wider">
                    {slide.subtitle}
                  </h4>
                  <p className="text-xs md:text-base text-[#D1D1D6] font-light leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-none">
                    {slide.description}
                  </p>
                </div>

                {/* Milestones Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 pt-1">
                  {slide.milestones.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 sm:p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-[#F5F3F2]/5 border border-[#F5F3F2]/10 backdrop-blur-sm flex flex-col justify-between"
                    >
                      <span className="text-[10px] md:text-xs font-mono text-[#A855F7] font-bold tracking-wider uppercase mb-1">
                        {m.label}
                      </span>
                      <p className="text-[11px] md:text-xs text-[#9E9EA7] leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Badges Footer */}
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 pt-2 border-t border-[#F5F3F2]/10">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-xs font-mono px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-[#F5F3F2]/15 bg-[#F5F3F2]/5 text-[#F5F3F2]/80 hover:border-[#A855F7]/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Smooth Exit Transition Fog Buffer */}
      <div
        className="timeline-exit-fog absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[#09080A]/60 to-[#09080A] pointer-events-none opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
    </section>
  );
}
