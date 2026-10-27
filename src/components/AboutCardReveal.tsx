"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AboutCardReveal() {
  const { lang } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const wordLeftRef = useRef<HTMLSpanElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const splitWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  // Counter refs for KPI numbers
  const stat1NumRef = useRef<HTMLSpanElement>(null);
  const stat2NumRef = useRef<HTMLSpanElement>(null);
  const stat3NumRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardRef.current || !contentRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet Animation (min-width: 768px)
      mm.add("(min-width: 768px)", () => {
        const targetWidth = Math.min(window.innerWidth * 0.92, 1180);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // 1. Initial State
        gsap.set(cardRef.current, {
          width: 380,
          height: 480,
          borderRadius: 36,
          backgroundColor: "rgba(12, 10, 16, 0.88)",
          borderColor: "rgba(245, 243, 242, 0.18)",
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.85)",
        });

        gsap.set(splitWrapperRef.current, {
          opacity: 1,
          pointerEvents: "none",
        });

        gsap.set(wordLeftRef.current, {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(wordRightRef.current, {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(contentRef.current, {
          opacity: 0,
          scale: 0.96,
          pointerEvents: "none",
        });

        // Initial KPI numbers at 0+
        if (stat1NumRef.current) stat1NumRef.current.textContent = "0+";
        if (stat2NumRef.current) stat2NumRef.current.textContent = "0+";
        if (stat3NumRef.current) stat3NumRef.current.textContent = "0+";

        const statsProxy = { p1: 0, p2: 0, p3: 0 };

        // 2. Timeline Step A: Words split outward across the Starry Night background
        tl.to(
          wordLeftRef.current,
          {
            x: -window.innerWidth * 0.32,
            opacity: 0.25,
            filter: "blur(4px)",
            ease: "power2.inOut",
            duration: 0.5,
          },
          0
        )
          .to(
            wordRightRef.current,
            {
              x: window.innerWidth * 0.32,
              opacity: 0.25,
              filter: "blur(4px)",
              ease: "power2.inOut",
              duration: 0.5,
            },
            0
          )
          // 3. Timeline Step B: Card expands to monumental frame
          .to(
            cardRef.current,
            {
              width: targetWidth,
              height: 680,
              borderRadius: 32,
              backgroundColor: "rgba(10, 8, 14, 0.95)",
              borderColor: "rgba(168, 85, 247, 0.35)",
              boxShadow:
                "0 0 100px rgba(83, 5, 112, 0.5), 0 40px 80px -15px rgba(0, 0, 0, 0.95)",
              ease: "power2.inOut",
              duration: 0.6,
            },
            0.1
          )
          // Fade split words completely as card reaches full width
          .to(
            splitWrapperRef.current,
            {
              opacity: 0,
              ease: "power1.out",
              duration: 0.25,
            },
            0.45
          )
          // 4. Timeline Step C: Content reveals inside
          .to(
            contentRef.current,
            {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              ease: "power2.out",
              duration: 0.45,
            },
            0.45
          )
          // 5. Timeline Step D: KPI numbers count up dynamically from 0 to target
          .to(
            statsProxy,
            {
              p1: 15,
              p2: 3,
              p3: 12,
              duration: 0.55,
              ease: "power2.out",
              onUpdate: () => {
                if (stat1NumRef.current)
                  stat1NumRef.current.textContent = `${Math.round(statsProxy.p1)}+`;
                if (stat2NumRef.current)
                  stat2NumRef.current.textContent = `${Math.round(statsProxy.p2)}+`;
                if (stat3NumRef.current)
                  stat3NumRef.current.textContent = `${Math.round(statsProxy.p3)}+`;
              },
            },
            0.45
          );

        // Continuous subtle levitation & breathing for the abstract mind visual
        if (visualWrapperRef.current) {
          gsap.to(visualWrapperRef.current, {
            y: -10,
            duration: 3.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      // Mobile Animation (max-width: 767px)
      mm.add("(max-width: 767px)", () => {
        const mobileTargetWidth = window.innerWidth * 0.94;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        gsap.set(cardRef.current, {
          width: 290,
          height: 380,
          borderRadius: 28,
          backgroundColor: "rgba(12, 10, 16, 0.9)",
        });

        gsap.set(splitWrapperRef.current, {
          opacity: 1,
          pointerEvents: "none",
        });

        gsap.set(wordLeftRef.current, { x: 0, opacity: 1 });
        gsap.set(wordRightRef.current, { x: 0, opacity: 1 });

        gsap.set(contentRef.current, {
          opacity: 0,
          pointerEvents: "none",
        });

        if (stat1NumRef.current) stat1NumRef.current.textContent = "0+";
        if (stat2NumRef.current) stat2NumRef.current.textContent = "0+";
        if (stat3NumRef.current) stat3NumRef.current.textContent = "0+";

        const mobileStatsProxy = { p1: 0, p2: 0, p3: 0 };

        tl.to(
          wordLeftRef.current,
          {
            x: -window.innerWidth * 0.35,
            opacity: 0.2,
            duration: 0.45,
            ease: "power2.inOut",
          },
          0
        )
          .to(
            wordRightRef.current,
            {
              x: window.innerWidth * 0.35,
              opacity: 0.2,
              duration: 0.45,
              ease: "power2.inOut",
            },
            0
          )
          .to(
            cardRef.current,
            {
              width: mobileTargetWidth,
              height: 720,
              borderRadius: 24,
              backgroundColor: "rgba(10, 8, 14, 0.97)",
              borderColor: "rgba(168, 85, 247, 0.35)",
              duration: 0.55,
              ease: "power2.inOut",
            },
            0.1
          )
          .to(
            splitWrapperRef.current,
            {
              opacity: 0,
              duration: 0.25,
            },
            0.4
          )
          .to(
            contentRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.4,
            },
            0.45
          )
          .to(
            mobileStatsProxy,
            {
              p1: 15,
              p2: 3,
              p3: 12,
              duration: 0.5,
              ease: "power2.out",
              onUpdate: () => {
                if (stat1NumRef.current)
                  stat1NumRef.current.textContent = `${Math.round(mobileStatsProxy.p1)}+`;
                if (stat2NumRef.current)
                  stat2NumRef.current.textContent = `${Math.round(mobileStatsProxy.p2)}+`;
                if (stat3NumRef.current)
                  stat3NumRef.current.textContent = `${Math.round(mobileStatsProxy.p3)}+`;
              },
            },
            0.45
          );

        if (visualWrapperRef.current) {
          gsap.to(visualWrapperRef.current, {
            y: -6,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Subtle interactive 3D mouse parallax on the visual card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageFrameRef.current) return;
    const rect = imageFrameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(imageFrameRef.current, {
      rotationY: (x / rect.width) * 10,
      rotationX: -(y / rect.height) * 10,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!imageFrameRef.current) return;
    gsap.to(imageFrameRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const copy = {
    es: {
      split1: "SOBRE",
      split2: "MÍ",
      badge: "INGENIERÍA & DESARROLLO WEB",
      title: "Transformando ideas en experiencias digitales rápidas, escalables y con carácter",
      p1: "Soy estudiante de Ingeniería de Sistemas en la Universidad de la Costa (CUC) y desarrollador full stack junior.",
      p2: "Me apasiona crear aplicaciones web modernas utilizando React, TypeScript y tecnologías del ecosistema JavaScript. Cada proyecto es una oportunidad para construir algo que funcione bien y se vea mejor.",
      p3: "Actualmente busco oportunidades para continuar creciendo profesionalmente y aportar valor en equipos que estén construyendo productos con impacto real.",
      stat1Val: "15+",
      stat1Lbl: "Proyectos Realizados",
      stat2Val: "3+",
      stat2Lbl: "Años de Experiencia",
      stat3Val: "12+",
      stat3Lbl: "Tecnologías & Herramientas",
      btnContact: "Contactar",
      btnProjects: "Ver Proyectos",
    },
    en: {
      split1: "ABOUT",
      split2: "ME",
      badge: "ENGINEERING & WEB CRAFT",
      title: "Turning ideas into fast, scalable, and distinctive digital experiences",
      p1: "I am a Systems Engineering student at Universidad de la Costa (CUC) and a junior full-stack developer.",
      p2: "I am passionate about creating modern web applications using React, TypeScript, and the JavaScript ecosystem. Every project is an opportunity to build something that runs seamlessly and looks stunning.",
      p3: "I am currently seeking opportunities to continue growing professionally and deliver real value in high-impact teams.",
      stat1Val: "15+",
      stat1Lbl: "Completed Projects",
      stat2Val: "3+",
      stat2Lbl: "Years Experience",
      stat3Val: "12+",
      stat3Lbl: "Modern Stack Techs",
      btnContact: "Get in Touch",
      btnProjects: "View Projects",
    },
  }[lang];

  const techBadges = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Node.js",
    "SQL",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#09080A] text-[#F5F3F2] select-none"
    >
      {/* 1. Full Starry Night Purple Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/about-bg-starry.jpg"
          alt="Starry Night Purple Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Soft edge gradients to blend into adjacent sections */}
        <div className="absolute inset-0 bg-[#09080A]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09080A] via-transparent to-[#09080A] opacity-80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#09080A]/20 to-[#09080A]/85" />
      </div>

      {/* 2. Kinetic Split Typography Layer (Rendered OUTSIDE card so words slide into background without being clipped) */}
      <div
        ref={splitWrapperRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-center">
          <span
            ref={wordLeftRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {copy.split1}
          </span>
          <span
            ref={wordRightRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#A855F7] drop-shadow-[0_4px_30px_rgba(83,5,112,0.9)]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {copy.split2}
          </span>
        </div>
      </div>

      {/* 3. Central Expanding Card Canvas */}
      <div
        ref={cardContainerRef}
        className="relative z-10 flex items-center justify-center w-full px-3 md:px-4"
      >
        <div
          ref={cardRef}
          className="relative overflow-hidden border border-[#F5F3F2]/15 bg-[#0E0D12]/92 backdrop-blur-2xl transition-colors duration-300 flex flex-col items-center justify-center p-5 md:p-8 lg:p-10 shadow-2xl"
          style={{ willChange: "width, height, border-radius, box-shadow" }}
        >
          {/* Subtle Card Ambient Rim Lights */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#530570]/35 blur-[90px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#8B1ED6]/25 blur-[90px] pointer-events-none"
            aria-hidden="true"
          />

          {/* 4. Revealed Internal Content: Editorial Bio, Stats & Abstract Mind/Code Visual */}
          <div
            ref={contentRef}
            className="relative z-10 w-full h-full flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-8 items-center justify-between overflow-y-auto md:overflow-hidden py-1"
            style={{ willChange: "opacity, transform" }}
          >
            {/* Left Column: Bio, Philosophy & Metrics (7 cols on desktop) */}
            <div className="md:col-span-7 flex flex-col items-start text-left space-y-3 md:space-y-4">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#A855F7]/30 bg-[#530570]/25 text-[#A855F7] text-[10px] md:text-[11px] font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                {copy.badge}
              </div>

              {/* Headline */}
              <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
                {copy.title}
              </h2>

              {/* Bio Narrative */}
              <div className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm text-[#D1D1D6] font-light leading-relaxed max-w-xl">
                <p>{copy.p1}</p>
                <p>{copy.p2}</p>
                <p className="text-[#9E9EA7]">{copy.p3}</p>
              </div>

              {/* Key Metrics Grid with dynamic counting effect */}
              <div className="grid grid-cols-3 gap-2 md:gap-3.5 w-full pt-0.5">
                <div className="p-2 md:p-3 rounded-2xl bg-[#F5F3F2]/5 border border-[#F5F3F2]/10 backdrop-blur-sm">
                  <div className="text-lg md:text-2xl font-black text-white font-mono tracking-tight">
                    <span ref={stat1NumRef}>{copy.stat1Val}</span>
                  </div>
                  <div className="text-[9px] md:text-xs text-[#9E9EA7] mt-0.5 leading-tight font-sans">
                    {copy.stat1Lbl}
                  </div>
                </div>

                <div className="p-2 md:p-3 rounded-2xl bg-[#F5F3F2]/5 border border-[#A855F7]/30 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <div className="text-lg md:text-2xl font-black text-[#A855F7] font-mono tracking-tight">
                    <span ref={stat2NumRef}>{copy.stat2Val}</span>
                  </div>
                  <div className="text-[9px] md:text-xs text-[#9E9EA7] mt-0.5 leading-tight font-sans">
                    {copy.stat2Lbl}
                  </div>
                </div>

                <div className="p-2 md:p-3 rounded-2xl bg-[#F5F3F2]/5 border border-[#F5F3F2]/10 backdrop-blur-sm">
                  <div className="text-lg md:text-2xl font-black text-white font-mono tracking-tight">
                    <span ref={stat3NumRef}>{copy.stat3Val}</span>
                  </div>
                  <div className="text-[9px] md:text-xs text-[#9E9EA7] mt-0.5 leading-tight font-sans">
                    {copy.stat3Lbl}
                  </div>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 pt-0.5">
                {techBadges.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] md:text-xs font-mono px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-[#F5F3F2]/15 bg-[#F5F3F2]/5 text-[#F5F3F2]/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 md:gap-3 pt-1">
                <a
                  href="#contact"
                  className="px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-[#530570] to-[#8B1ED6] hover:from-[#6B0A8F] hover:to-[#A855F7] text-white text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center gap-2"
                >
                  <span>{copy.btnContact}</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
                <a
                  href="#projects"
                  className="px-4 md:px-5 py-2 rounded-full border border-[#F5F3F2]/20 hover:border-[#F5F3F2]/50 hover:bg-[#F5F3F2]/5 text-[#F5F3F2] text-xs md:text-sm font-medium tracking-wide transition-colors"
                >
                  {copy.btnProjects}
                </a>
              </div>
            </div>

            {/* Right Column: Abstract 3D Mind & Code Render with Seamless Glass Integration (5 cols on desktop) */}
            <div
              className="md:col-span-5 relative w-full h-[240px] md:h-[480px] flex items-center justify-center cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Diffuse purple ambient back-glow */}
              <div
                className="absolute w-72 md:w-[380px] h-72 md:h-[380px] rounded-full bg-gradient-to-tr from-[#530570]/60 via-[#8B1ED6]/30 to-[#A855F7]/20 blur-[80px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Container */}
              <div
                ref={visualWrapperRef}
                className="relative z-10 flex items-center justify-center w-full h-full"
                style={{ perspective: 1000 }}
              >
                {/* Seamless Glass Container with 3D Parallax */}
                <div
                  ref={imageFrameRef}
                  className="relative w-[220px] md:w-[340px] lg:w-[370px] h-[220px] md:h-[400px] lg:h-[420px] rounded-3xl overflow-hidden select-none transition-shadow duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src="/about-mind-code.jpg"
                    alt="Abstract 3D Art: Developer Mind, Code Synapses and Architectural Thought"
                    fill
                    sizes="(max-width: 768px) 220px, 370px"
                    className="object-cover object-center scale-105"
                    priority
                  />

                  {/* Seamless Vignette Overlays: Blends the pure-black edges into the card seamlessly */}
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0E0D12] opacity-85 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D12] via-transparent to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D12]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Delicate rim light border */}
                  <div className="absolute inset-0 rounded-3xl border border-[#A855F7]/30 pointer-events-none shadow-inner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
