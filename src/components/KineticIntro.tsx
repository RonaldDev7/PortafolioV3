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

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setIsFinished(true);
        onComplete?.();
        return;
      }

      // Starfield Canvas setup
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

        const speed = 0.4;

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

      const dot = dotRef.current;
      const glow = glowRef.current;
      const nameLetters = nameLettersRef.current
        ? (Array.from(nameLettersRef.current.children) as HTMLElement[])
        : [];
      const portLetters = portfolioLettersRef.current
        ? (Array.from(portfolioLettersRef.current.children) as HTMLElement[])
        : [];
      const starfield = starfieldCanvasRef.current;

      // 1. ESTADO INICIAL OBLIGATORIO:
      // Ocultar e inicializar posiciones para que no haya solapamiento
      gsap.set(dot, {
        opacity: 1,
        scale: 1,
        y: -window.innerHeight * 0.65,
        visibility: "visible",
      });
      gsap.set(glow, { opacity: 0, scale: 0.3, visibility: "visible" });
      gsap.set(starfield, { opacity: 0 });

      // "RONALD": Ubicado en los laterales de la pantalla (fuera de vista)
      nameLetters.forEach((el, idx) => {
        const fromLeft = idx < 3;
        gsap.set(el, {
          opacity: 0,
          x: fromLeft ? -window.innerWidth * 0.7 : window.innerWidth * 0.7,
          y: 0,
          scale: 0.8,
          filter: "blur(18px)",
          visibility: "visible",
        });
      });

      // "PORTFOLIO": Ubicado en los laterales (fuera de vista)
      portLetters.forEach((el, idx) => {
        const fromLeft = idx < 5;
        gsap.set(el, {
          opacity: 0,
          x: fromLeft ? -window.innerWidth * 0.7 : window.innerWidth * 0.7,
          y: 0,
          scale: 0.8,
          filter: "blur(18px)",
          visibility: "visible",
        });
      });

      // 2. TIMELINE MASTER CONTROLADO
      const tl = gsap.timeline({
        onComplete: () => {
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

      // PASO 1: EL PUNTO CAE DESDE ARRIBA HASTA EL CENTRO CON REBOTE SUTIL
      tl.to(dot, {
        y: 0,
        duration: 1.5,
        ease: "bounce.out",
      })
      // Encendido del resplandor al tocar el centro
      .to(
        glow,
        {
          opacity: 0.9,
          scale: 1.25,
          duration: 1.0,
          ease: "power2.out",
        },
        "-=0.7"
      )
      // El punto destella intensamente y se absorbe
      .to(dot, {
        scale: 2.2,
        filter: "drop-shadow(0 0 25px #FFFFFF)",
        duration: 0.6,
        ease: "sine.inOut",
      })
      .to(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })

      // PASO 2: LAS LETRAS DE "RONALD" ENTRAN DESDE LOS LATERALES Y SE ARMAN
      .to(
        nameLetters,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: {
            each: 0.12,
            from: "edges", // Entran de afuera hacia el centro
          },
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.2"
      )

      // Pausa contemplativa para apreciar "RONALD"
      .to({}, { duration: 1.6 })

      // PASO 3: "RONALD" SE DISPERSA Y SALE HACIA LOS MISMOS LATERALES
      .to(nameLetters, {
        opacity: 0,
        x: (idx) => (idx < 3 ? -window.innerWidth * 0.7 : window.innerWidth * 0.7),
        filter: "blur(16px)",
        stagger: {
          each: 0.08,
          from: "center", // Se abren hacia afuera
        },
        duration: 0.9,
        ease: "power3.in",
      })

      // PASO 4: SALEN LAS LETRAS DE "PORTFOLIO" DESDE LOS LATERALES
      .to(
        portLetters,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: {
            each: 0.1,
            from: "edges",
          },
          duration: 1.3,
          ease: "power3.out",
        },
        "-=0.1"
      )

      // El campo de estrellas emerge suavemente en el fondo
      .to(
        starfield,
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        "-=0.8"
      )

      // Sostener "PORTFOLIO" antes de la transición fluida al Hero
      .to({}, { duration: 1.8 });
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
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
      />

      {/* Atmospheric Central Violet / White Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#530570]/30 to-[#F5F3F2]/10 blur-[140px] pointer-events-none invisible"
        aria-hidden="true"
      />

      {/* Center Singular Light Dot */}
      <div
        ref={dotRef}
        className="w-4 h-4 rounded-full bg-[#FFFFFF] shadow-[0_0_30px_10px_#FFFFFF,0_0_60px_20px_#530570] absolute z-20 invisible"
      />

      {/* 1. Word: RONALD (oculto estrictamente hasta que GSAP lo anime desde los laterales) */}
      <div
        ref={nameLettersRef}
        className="flex items-center justify-center gap-2 md:gap-4 text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] z-10"
      >
        {nameChars.map((char, index) => (
          <span
            key={`char-ronald-${char}-${index}`}
            className="inline-block transform-gpu invisible"
          >
            {char}
          </span>
        ))}
      </div>

      {/* 2. Word: PORTFOLIO (oculto estrictamente hasta que GSAP lo anime desde los laterales) */}
      <div
        ref={portfolioLettersRef}
        className="absolute flex items-center justify-center gap-1.5 md:gap-3 text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_15px_32px_rgba(0,0,0,0.95)] z-10"
      >
        {portChars.map((char, index) => (
          <span
            key={`char-portfolio-${char}-${index}`}
            className="inline-block transform-gpu invisible"
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
