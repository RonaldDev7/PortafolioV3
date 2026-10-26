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

      // Master Timeline: Lento, pausado, con física de ensamblado 3D real
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

      const dot = dotRef.current;
      const glow = glowRef.current;
      const nameLetters = nameLettersRef.current
        ? gsap.utils.toArray<HTMLElement>(nameLettersRef.current.children)
        : [];
      const portLetters = portfolioLettersRef.current
        ? gsap.utils.toArray<HTMLElement>(portfolioLettersRef.current.children)
        : [];
      const starfield = starfieldCanvasRef.current;

      // 1. Initial State: Letras colapsadas en el centro 3D detrás del punto de luz
      gsap.set(dot, { scale: 0, opacity: 0 });
      gsap.set(glow, { scale: 0.5, opacity: 0 });

      gsap.set(nameLetters, {
        opacity: 0,
        scale: 0.1,
        y: 60,
        z: -150,
        rotationX: -45,
        rotationY: () => (Math.random() - 0.5) * 60,
        filter: "blur(14px)",
        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      gsap.set(portLetters, {
        opacity: 0,
        scale: 0.1,
        y: 60,
        z: -150,
        rotationX: -45,
        rotationY: () => (Math.random() - 0.5) * 60,
        filter: "blur(14px)",
        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      gsap.set(starfield, { opacity: 0 });

      // 2. Coreografía:
      tl
        // Fase 1: Punto de luz central con iluminación envolvente
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
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1.0"
        )
        // Pulso brillante que anticipa el nacimiento de las letras
        .to(dot, {
          scale: 2.4,
          filter: "drop-shadow(0 0 30px #FFFFFF)",
          duration: 0.8,
          ease: "sine.inOut",
        })
        .to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        })
        .to(
          glow,
          {
            scale: 2.2,
            opacity: 0.35,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        )

        // Fase 2: Las letras de "RONALD" se ensamblan una a una desde el centro (física 3D controlada)
        .to(
          nameLetters,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            filter: "blur(0px)",
            stagger: 0.22, // Lento y pausado
            duration: 1.1,
            ease: "back.out(1.8)",
          },
          "-=0.2"
        )

        // Sostener el nombre "RONALD" para apreciarlo
        .to({}, { duration: 1.6 })

        // Fase 3: Las letras de "RONALD" se desvanecen y disuelven en orden
        .to(nameLetters, {
          opacity: 0,
          y: -40,
          z: 80,
          scale: 0.85,
          rotationX: 30,
          filter: "blur(12px)",
          stagger: 0.1, // Borrado secuencial suave
          duration: 0.9,
          ease: "power2.inOut",
        })

        // Fase 4: Se arma la palabra "PORTFOLIO" letra por letra con la misma elegancia
        .to(
          portLetters,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            filter: "blur(0px)",
            stagger: 0.16, // Ensamblado rítmico pausado
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )

        // Fase 5: Revelación del campo de estrellas de fondo
        .to(
          starfield,
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.9"
        )

        // Mantener "PORTFOLIO" antes de la transición suave a la página
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
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Atmospheric Central Violet / White Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#530570]/30 to-[#F5F3F2]/10 blur-[140px] pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Center Singular Light Dot */}
      <div
        ref={dotRef}
        className="w-4 h-4 rounded-full bg-[#FFFFFF] shadow-[0_0_30px_10px_#FFFFFF,0_0_60px_20px_#530570] absolute z-20 opacity-0"
      />

      {/* 1. Assembling Name: RONALD (oculto por defecto con opacity-0 para evitar flash inicial) */}
      <div
        ref={nameLettersRef}
        className="flex items-center justify-center gap-2 md:gap-4 text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] z-10"
        style={{ perspective: "1200px" }}
      >
        {nameChars.map((char, index) => (
          <span
            key={`char-ronald-${char}-${index}`}
            className="inline-block transform-gpu opacity-0"
          >
            {char}
          </span>
        ))}
      </div>

      {/* 2. Target Word: PORTFOLIO (oculto por defecto con opacity-0) */}
      <div
        ref={portfolioLettersRef}
        className="absolute flex items-center justify-center gap-1.5 md:gap-3 text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_15px_32px_rgba(0,0,0,0.95)] z-10"
        style={{ perspective: "1200px" }}
      >
        {portChars.map((char, index) => (
          <span
            key={`char-portfolio-${char}-${index}`}
            className="inline-block transform-gpu opacity-0"
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
