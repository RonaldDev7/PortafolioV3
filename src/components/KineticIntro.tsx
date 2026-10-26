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
  const nameLettersRef = useRef<HTMLDivElement>(null);
  const portfolioTextRef = useRef<HTMLHeadingElement>(null);
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

      // Check if already viewed in this browser session
      const hasViewed = sessionStorage.getItem("intro_viewed");
      if (hasViewed) {
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

        // Generate stars
        const stars: { x: number; y: number; z: number; o: number }[] = [];
        const numStars = 250;
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: (Math.random() - 0.5) * window.innerWidth * 2,
            y: (Math.random() - 0.5) * window.innerHeight * 2,
            z: Math.random() * window.innerWidth,
            o: Math.random() * 0.8 + 0.2,
          });
        }

        const speed = 0.5;

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

            const k = 250 / s.z;
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

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("intro_viewed", "true");
          // Fade out intro layer
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsFinished(true);
              onComplete?.();
              if (animId) cancelAnimationFrame(animId);
            },
          });
        },
      });

      // Elements
      const dot = dotRef.current;
      const letters = nameLettersRef.current
        ? gsap.utils.toArray<HTMLElement>(nameLettersRef.current.children)
        : [];
      const portfolio = portfolioTextRef.current;
      const starfield = starfieldCanvasRef.current;

      // 1. Initial State
      gsap.set(dot, { scale: 0, opacity: 0 });
      gsap.set(letters, {
        opacity: 0,
        scale: 0.2,
        y: () => (Math.random() - 0.5) * 200,
        x: () => (Math.random() - 0.5) * 300,
        rotationZ: () => (Math.random() - 0.5) * 120,
        transformPerspective: 1000,
      });
      gsap.set(portfolio, { opacity: 0, scale: 0.85, y: 30 });
      gsap.set(starfield, { opacity: 0 });

      // 2. Timeline Coreography
      tl
        // Step 1: Center dot pulse & flash (0.0s - 0.8s)
        .to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        })
        .to(dot, {
          scale: 1.8,
          duration: 0.3,
          ease: "power1.inOut",
        })
        .to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        })

        // Step 2: Kinetic Letters burst and assemble into 'RONALD' (0.9s - 2.0s)
        .to(
          letters,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotationZ: 0,
            stagger: {
              each: 0.05,
              from: "center",
            },
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.1"
        )

        // Hold 'RONALD' momentarily
        .to({}, { duration: 0.4 })

        // Step 3: Morph / Collapse into 'PORTFOLIO' (2.4s - 3.2s)
        .to(letters, {
          scaleY: 0,
          opacity: 0,
          y: -20,
          stagger: 0.03,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          portfolio,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.15"
        )

        // Step 4: Starfield explosion reveal (3.0s - 4.2s)
        .to(
          starfield,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )

        // Hold scene before smooth reveal transition
        .to({}, { duration: 0.8 });
    },
    { scope: containerRef }
  );

  if (isFinished) return null;

  const nameChars = "RONALD".split("");

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

      {/* Atmospheric Central Glow */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full bg-[#530570]/25 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Center Singular Light Dot */}
      <div
        ref={dotRef}
        className="w-3.5 h-3.5 rounded-full bg-[#F5F3F2] shadow-[0_0_24px_6px_#FFFFFF,0_0_40px_14px_#530570] absolute"
      />

      {/* Kinetic Assembling Letters: RONALD */}
      <div
        ref={nameLettersRef}
        className="flex items-center justify-center gap-1.5 md:gap-3 text-5xl md:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-10"
      >
        {nameChars.map((char, index) => (
          <span
            key={`char-${char}-${index}`}
            className="inline-block transform-gpu"
          >
            {char}
          </span>
        ))}
      </div>

      {/* Morphed Target: PORTFOLIO */}
      <h1
        ref={portfolioTextRef}
        className="absolute text-5xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] z-10"
      >
        PORTFOLIO
      </h1>

      {/* Subtle Bottom Credit Badge */}
      <div className="absolute bottom-8 text-[10px] font-mono tracking-[0.25em] text-[#9E9EA7]/50 uppercase">
        Ronald • Full-Stack Developer
      </div>
    </div>
  );
}
