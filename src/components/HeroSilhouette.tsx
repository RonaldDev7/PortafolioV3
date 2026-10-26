"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP);

export function HeroSilhouette() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const textBgRef = useRef<HTMLDivElement>(null);
  const backlightRef = useRef<HTMLDivElement>(null);
  const orbitTrackRef = useRef<SVGPathElement>(null);
  const cometTrailRef = useRef<SVGPathElement>(null);
  const glintHeadRef = useRef<SVGGElement>(null);
  const microLightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // 1. Subtle breathing float on portrait (anchored at baseline)
      gsap.to(silhouetteRef.current, {
        scale: 1.018,
        transformOrigin: "bottom center",
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Atmospheric pulse on ambient background glow
      if (backlightRef.current) {
        gsap.to(backlightRef.current, {
          scale: 1.06,
          opacity: 0.85,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Continuous 360° Orbital Glint around Ronald's Glasses
      const track = orbitTrackRef.current;
      const comet = cometTrailRef.current;
      const head = glintHeadRef.current;

      if (track && comet && head) {
        const totalLength = track.getTotalLength();
        const cometLength = 110;
        comet.style.strokeDasharray = `${cometLength} ${totalLength - cometLength}`;

        const progressObj = { value: 0 };
        gsap.to(progressObj, {
          value: 1,
          duration: 5.6,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const p = progressObj.value;
            const currentDist = p * totalLength;
            comet.style.strokeDashoffset = `${-currentDist}`;
            const pt = track.getPointAtLength((currentDist + cometLength) % totalLength);
            head.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
          },
        });
      }

      // 4. Interactive Micro-Light & 3D tilt following the cursor
      const microLight = microLightRef.current;
      const silhouette = silhouetteRef.current;
      const textBg = textBgRef.current;

      const xToLight = gsap.quickTo(microLight, "x", { duration: 0.25, ease: "power2.out" });
      const yToLight = gsap.quickTo(microLight, "y", { duration: 0.25, ease: "power2.out" });
      const opToLight = gsap.quickTo(microLight, "opacity", { duration: 0.3, ease: "power2.out" });

      const xToSilhouette = gsap.quickTo(silhouette, "x", { duration: 0.8, ease: "power2.out" });
      const rotYSilhouette = gsap.quickTo(silhouette, "rotationY", { duration: 0.8, ease: "power2.out" });

      const xToText = gsap.quickTo(textBg, "x", { duration: 1.0, ease: "power2.out" });
      const yToText = gsap.quickTo(textBg, "y", { duration: 1.0, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        xToLight(localX);
        yToLight(localY);
        opToLight(1);

        const mouseNormX = (localX - rect.width / 2) / (rect.width / 2);
        const mouseNormY = (localY - rect.height / 2) / (rect.height / 2);

        xToSilhouette(mouseNormX * 10);
        rotYSilhouette(mouseNormX * 3.5);

        xToText(-mouseNormX * 18);
        yToText(-mouseNormY * 10);
      };

      const handleMouseLeave = () => {
        opToLight(0);
        xToSilhouette(0);
        rotYSilhouette(0);
        xToText(0);
        yToText(0);
      };

      const container = containerRef.current;
      container?.addEventListener("mousemove", handleMouseMove, { passive: true });
      container?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container?.removeEventListener("mousemove", handleMouseMove);
        container?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  const texts = {
    es: {
      line1: "EXPLORA MI",
      line2: "PORTAFOLIO",
      role: "Full-Stack Developer",
      availability: "DISPONIBLE • COLOMBIA / REMOTO",
      ctaProjects: "Ver Proyectos ↗",
      ctaAbout: "Sobre Mí",
      tag1: "NEXT.JS • TYPESCRIPT",
      tag2: "CREATIVE CODING • GSAP",
      tag3: "ARQUITECTURA • UI/UX",
    },
    en: {
      line1: "EXPLORE MY",
      line2: "PORTFOLIO",
      role: "Full-Stack Developer",
      availability: "AVAILABLE • COLOMBIA / REMOTE",
      ctaProjects: "View Projects ↗",
      ctaAbout: "About Me",
      tag1: "NEXT.JS • TYPESCRIPT",
      tag2: "CREATIVE CODING • GSAP",
      tag3: "ARCHITECTURE • UI/UX",
    },
  };

  const t = texts[lang];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[750px] flex flex-col justify-end items-center overflow-hidden select-none px-4 pb-0 cursor-default transform-gpu"
    >
      {/* 1. LAYER 1: Ambient Background Purple Glow (radiating from BEHIND the typography) */}
      <div
        ref={backlightRef}
        className="absolute w-[700px] sm:w-[850px] md:w-[1000px] h-[700px] sm:h-[850px] md:h-[1000px] rounded-full pointer-events-none top-[6%] sm:top-[8%] md:top-[9%] left-1/2 -translate-x-1/2 z-0 transform-gpu will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.50)_0%,rgba(139,30,214,0.30)_35%,rgba(83,5,112,0.12)_60%,transparent_75%)] blur-[85px] md:blur-[105px]" />
      </div>

      {/* 2. LAYER 2: Monumental Watermark Typography (BRIGHT & CRISP, positioned like the reference video) */}
      <div
        ref={textBgRef}
        className="absolute top-[8%] sm:top-[9%] md:top-[11%] lg:top-[12%] inset-x-0 flex flex-col items-center justify-center pointer-events-none z-[1] will-change-transform transform-gpu"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center justify-center text-center font-black uppercase tracking-[0.10em] md:tracking-[0.14em] leading-[0.86] text-transparent select-none drop-shadow-[0_0_35px_rgba(168,85,247,0.45)] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
          <span
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[150px] font-black transition-all duration-500 bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2]/95 to-[#E9D5FF]/75"
          >
            {t.line1}
          </span>
          <span
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[150px] font-black transition-all duration-500 bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2]/95 to-[#A855F7]/70 -mt-2 md:-mt-5"
          >
            {t.line2}
          </span>
        </div>
      </div>

      {/* 3. LAYER 3: Dark Chiaroscuro Portrait of Ronald (Anchored directly to bottom) */}
      <div
        ref={silhouetteRef}
        className="relative z-10 flex flex-col items-center justify-end will-change-transform transform-gpu mb-0"
        style={{ perspective: "1000px", transformOrigin: "bottom center" }}
      >
        <div className="relative w-[340px] sm:w-[480px] md:w-[620px] lg:w-[740px] xl:w-[820px] aspect-[1024/920] mb-0">
          {/* Authentic Studio Portrait — 100% OPAQUE, ZERO transparency in hair or shirt */}
          <Image
            src="/ronald-portrait.png"
            alt="Ronald — Full-Stack Developer"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 480px, (max-width: 1200px) 740px, 820px"
            className="object-cover object-bottom pointer-events-none z-[6]"
          />

          {/* Glasses Orbital Animation SVG Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[15]"
            viewBox="0 0 1024 920"
            aria-hidden="true"
          >
            <defs>
              {/* Soft purple glint bloom filter */}
              <filter id="glassesGlintFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Radial micro-glow gradient for the moving glint point */}
              <radialGradient id="glassesGlintGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#E9D5FF" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#8B1ED6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#530570" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Path Guide (invisible math track) */}
            <path
              ref={orbitTrackRef}
              d="M 457 345 Q 482 344, 507 343 L 650 338 C 658 338, 662 342, 658 352 L 646 395 C 640 408, 622 414, 585 412 C 545 410, 524 402, 516 388 C 508 370, 506 352, 507 343 Q 482 344, 457 345 C 455 358, 452 376, 446 395 C 440 410, 422 416, 380 417 C 345 418, 326 410, 322 396 L 312 352 C 309 342, 312 340, 322 340 L 457 345 Z"
              fill="none"
              stroke="transparent"
            />

            {/* Glowing Comet Trail sliding along glasses frame */}
            <path
              ref={cometTrailRef}
              d="M 457 345 Q 482 344, 507 343 L 650 338 C 658 338, 662 342, 658 352 L 646 395 C 640 408, 622 414, 585 412 C 545 410, 524 402, 516 388 C 508 370, 506 352, 507 343 Q 482 344, 457 345 C 455 358, 452 376, 446 395 C 440 410, 422 416, 380 417 C 345 418, 326 410, 322 396 L 312 352 C 309 342, 312 340, 322 340 L 457 345 Z"
              fill="none"
              stroke="#C084FC"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glassesGlintFilter)"
            />

            {/* Traveling Specular Glint Head */}
            <g ref={glintHeadRef} transform="translate(457, 345)">
              <circle cx="0" cy="0" r="26" fill="url(#glassesGlintGrad)" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      </div>

      {/* 4. LAYER 4: Lateral Izquierdo (Role Pill, Status & Sobre Mí Button) */}
      <div className="absolute left-6 lg:left-14 xl:left-20 bottom-8 lg:bottom-12 z-20 hidden md:flex flex-col items-start gap-3.5 max-w-[260px]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5F3F2]/15 bg-[#09080A]/70 backdrop-blur-md text-[11px] font-mono tracking-widest text-[#F5F3F2]/90 uppercase shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#8B1ED6] shadow-[0_0_8px_#8B1ED6] animate-pulse" />
          {t.role}
        </div>
        <div className="text-[10px] tracking-[0.14em] font-mono text-[#6E7179] uppercase">
          {t.availability}
        </div>
        <Link
          href="#about"
          className="px-6 py-2.5 rounded-full border border-[#F5F3F2]/20 bg-[#09080A]/60 backdrop-blur-sm text-[#F5F3F2] text-xs font-medium tracking-wider uppercase hover:border-[#8B1ED6] hover:bg-[#8B1ED6]/15 transition-all duration-300"
        >
          {t.ctaAbout}
        </Link>
      </div>

      {/* 5. LAYER 5: Lateral Derecho (Ver Proyectos Button & Technical Highlights) */}
      <div className="absolute right-6 lg:right-14 xl:right-20 bottom-8 lg:bottom-12 z-20 hidden md:flex flex-col items-end text-right gap-3.5 max-w-[260px]">
        <Link
          href="#projects"
          className="px-7 py-2.5 rounded-full bg-[#F5F3F2] text-[#09080A] text-xs font-semibold tracking-wider uppercase hover:bg-[#8B1ED6] hover:text-[#F5F3F2] transition-all duration-300 shadow-[0_4px_20px_rgba(245,243,242,0.22)]"
        >
          {t.ctaProjects}
        </Link>
        <div className="text-[11px] text-[#8C8C96] leading-relaxed tracking-[0.10em] font-mono uppercase space-y-0.5">
          <div>{t.tag1}</div>
          <div>{t.tag2}</div>
          <div>{t.tag3}</div>
        </div>
      </div>

      {/* Mobile Controls (Visible on small screens < md) */}
      <div className="md:hidden relative z-20 w-full flex flex-col items-center gap-3 pb-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F5F3F2]/15 bg-[#09080A]/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#F5F3F2]/90 uppercase">
          <span className="w-2 h-2 rounded-full bg-[#8B1ED6] shadow-[0_0_8px_#8B1ED6] animate-pulse" />
          {t.role}
        </div>
        <div className="text-[10px] tracking-[0.14em] font-mono text-[#6E7179] uppercase">
          {t.availability}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="#projects"
            className="px-5 py-2 rounded-full bg-[#F5F3F2] text-[#09080A] text-[11px] font-semibold tracking-wider uppercase"
          >
            {t.ctaProjects}
          </Link>
          <Link
            href="#about"
            className="px-5 py-2 rounded-full border border-[#F5F3F2]/20 bg-[#09080A]/50 text-[#F5F3F2] text-[11px] font-medium tracking-wider uppercase"
          >
            {t.ctaAbout}
          </Link>
        </div>
      </div>

      {/* Interactive Micro-Illumination following cursor */}
      <div
        ref={microLightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.30)_0%,rgba(83,5,112,0.10)_45%,transparent_70%)] blur-[12px] pointer-events-none mix-blend-screen opacity-0 z-[4] will-change-transform transform-gpu"
        aria-hidden="true"
      />
    </div>
  );
}
