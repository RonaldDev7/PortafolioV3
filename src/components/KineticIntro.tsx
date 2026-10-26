"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface KineticIntroProps {
  onComplete?: () => void;
}

export function KineticIntro({ onComplete }: KineticIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const nameLettersRef = useRef<HTMLDivElement>(null);
  const portfolioLettersRef = useRef<HTMLDivElement>(null);
  const starfieldCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isFinished, setIsFinished] = useState(false);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setIsFinished(true);
        onComplete?.();
        return;
      }

      // Starfield initialization
      const canvas = starfieldCanvasRef.current;
      let animId: number;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const resize = () => {
          if (!canvas) return;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const stars: { x: number; y: number; z: number; o: number }[] = [];
        const numStars = 280;
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: (Math.random() - 0.5) * window.innerWidth * 2,
            y: (Math.random() - 0.5) * window.innerHeight * 2,
            z: Math.random() * window.innerWidth,
            o: Math.random() * 0.8 + 0.2,
          });
        }

        const speed = 0.45;

        const renderStarfield = () => {
          if (!ctx || !canvas) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const cx = canvas.width / 2;
          const cy = canvas.height / 2;

          for (let i = 0; i < numStars; i++) {
            const s = stars[i];
            s.z -= speed;
            if (s.z <= 0) {
              s.z = canvas.width;
              s.x = (Math.random() - 0.5) * canvas.width * 2;
              s.y = (Math.random() - 0.5) * canvas.height * 2;
            }

            const k = 260 / s.z;
            const px = s.x * k + cx;
            const py = s.y * k + cy;

            if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
              const size = (1 - s.z / canvas.width) * 2.2;
              ctx.beginPath();
              ctx.arc(px, py, Math.max(0.5, size), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(245, 243, 242, ${s.o})`;
              ctx.fill();
            }
          }
          animId = requestAnimationFrame(renderStarfield);
        };

        renderStarfield();
      }

      // Master Timeline: Lento, cinematográfico y controlado
      const tl = gsap.timeline({
        onComplete: () => {
          // Desvanecimiento suave final
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              setIsFinished(true);
              onComplete?.();
              if (animId) cancelAnimationFrame(animId);
            },
          });
        },
      });

      const dot = dotRef.current;
      const glow = glowRef.current;
      const nameLetters = nameLettersRef.current
        ? gsap.utils.toArray<HTMLElement>(nameLettersRef.current.children)
        : [];
      const portLetters = portfolioLettersRef.current
        ? gsap.utils.toArray<HTMLElement>(portfolioLettersRef.current.children)
        : [];
      const starfield = starfieldCanvasRef.current;

      // 1. Initial State: Todo oculto en oscuridad pura
      gsap.set(dot, { scale: 0, opacity: 0 });
      gsap.set(glow, { scale: 0.6, opacity: 0 });
      gsap.set(nameLetters, {
        opacity: 0,
        y: 40,
        scale: 0.8,
        filter: "blur(12px)",
        transformPerspective: 1000,
      });
      gsap.set(portLetters, {
        opacity: 0,
        y: 45,
        scale: 0.85,
        filter: "blur(14px)",
        transformPerspective: 1000,
      });
      gsap.set(starfield, { opacity: 0 });

      // 2. Coreografía Lenta y Controlada:
      tl
        // Fase A: Silencio y respiración del punto con iluminación (0.0s - 2.0s)
        .to(dot, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        })
        .to(
          glow,
          {
            scale: 1.2,
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          "-=1.0"
        )
        // Pulsación sutil y brillante antes de expandirse
        .to(dot, {
          scale: 2.2,
          filter: "drop-shadow(0 0 25px #FFFFFF)",
          duration: 0.8,
          ease: "sine.inOut",
        })
        .to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        })
        .to(
          glow,
          {
            scale: 2.0,
            opacity: 0.4,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )

        // Fase B: Armado elegante y pausado de "RONALD" letra por letra (2.2s - 4.2s)
        .to(
          nameLetters,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.15, // Aparición pausada y controlada
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.2"
        )

        // Retención contemplativa para leer el nombre
        .to({}, { duration: 1.4 })

        // Fase C: Desvanecimiento / borrado suave de "RONALD" (5.6s - 6.6s)
        .to(nameLetters, {
          opacity: 0,
          y: -35,
          scale: 0.9,
          filter: "blur(10px)",
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.inOut",
        })

        // Fase D: Armado majestuoso de "PORTFOLIO" letra por letra (6.4s - 8.2s)
        .to(
          portLetters,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.12,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.3"
        )

        // Fase E: Revelación de las estrellas cósmicas en el fondo
        .to(
          starfield,
          {
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          "-=0.8"
        )

        // Sostener la palabra PORTFOLIO para contemplación
        .to({}, { duration: 1.5 });
    },
    { scope: containerRef }
  );

  if (isFinished) return null;

  const nameChars = "RONALD".split("");
  const portChars = "PORTFOLIO".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09080A] overflow-hidden select-none pointer-events-auto"
      aria-label="Preloader cinematográfico de Ronald"
    >
      {/* Starfield Background Canvas */}
      <canvas
        ref={starfieldCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Atmospheric Central Violet / White Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#530570]/30 to-[#F5F3F2]/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Center Singular Light Dot */}
      <div
        ref={dotRef}
        className="w-4 h-4 rounded-full bg-[#FFFFFF] shadow-[0_0_30px_10px_#FFFFFF,0_0_60px_20px_#530570] absolute z-20"
      />

      {/* 1. Assembling Name: RONALD */}
      <div
        ref={nameLettersRef}
        className="flex items-center justify-center gap-2 md:gap-4 text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] z-10"
      >
        {nameChars.map((char, index) => (
          <span
            key={`char-ronald-${char}-${index}`}
            className="inline-block transform-gpu"
          >
            {char}
          </span>
        ))}
      </div>

      {/* 2. Target Word: PORTFOLIO */}
      <div
        ref={portfolioLettersRef}
        className="absolute flex items-center justify-center gap-1.5 md:gap-3 text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_15px_32px_rgba(0,0,0,0.95)] z-10"
      >
        {portChars.map((char, index) => (
          <span
            key={`char-portfolio-${char}-${index}`}
            className="inline-block transform-gpu"
          >
            {char}
          </span>
        ))}
      </div>

      {/* Subtle Bottom Credit Badge */}
      <div className="absolute bottom-8 text-[10px] font-mono tracking-[0.3em] text-[#9E9EA7]/50 uppercase">
        Ronald • Full-Stack Developer
      </div>
    </div>
  );
}
