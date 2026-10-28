"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useLanguage } from "@/context/LanguageContext";

function subscribe() {
  return () => {};
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  color: string;
}

export function ContactFooter() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const email = "alvarezronalddev@gmail.com";

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback for older browsers or restricted permissions
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Interactive Background Particle Canvas System                              */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    if (!canvas || !footer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = footer.clientWidth);
    let height = (canvas.height = footer.clientHeight);

    const handleResize = () => {
      if (!canvas || !footer) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = footer.clientWidth;
      height = footer.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Track mouse position over the footer
    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: null, y: null };
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);

    // Create particles
    const particleCount = width < 768 ? 36 : 64;
    const colors = [
      "rgba(168, 85, 247,", // Fluorescent purple
      "rgba(139, 30, 214,", // Deep purple
      "rgba(216, 180, 254,", // Light violet
      "rgba(245, 243, 242,", // Soft pastel white
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius,
        baseRadius: radius,
        alpha: Math.random() * 0.55 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Render loop
    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around canvas boundaries
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse attraction / interaction
          if (mouseX !== null && mouseY !== null) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;

            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 0.45;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;

              // Draw interactive connection line from mouse to particle
              const mouseLineAlpha = (1 - dist / maxDist) * 0.35;
              ctx.beginPath();
              ctx.moveTo(mouseX, mouseY);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${mouseLineAlpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Draw inter-particle constellation connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxConnectionDist = 85;

          if (dist < maxConnectionDist) {
            const lineAlpha = (1 - dist / maxConnectionDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Pause when offscreen using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          render();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const socialLinks = [
    {
      label: "GITHUB",
      href: "https://github.com/RonaldDev7",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/ralvarez7/",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "INSTAGRAM",
      href: "https://www.instagram.com/ronalv_x/",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#09080A] text-[#F5F3F2] relative overflow-hidden select-none border-t border-white/10"
    >
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Atmospheric Radial Gradient Lighting */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] md:w-[850px] h-[350px] rounded-full bg-[#530570]/20 blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Availability Live Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 hover:border-[#A855F7]/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#F5F3F2]/80 uppercase">
            {isEs ? "DISPONIBLE PARA NUEVOS PROYECTOS" : "AVAILABLE FOR NEW PROJECTS"}
          </span>
        </div>

        {/* Eyebrow Label */}
        <span className="text-xs font-mono tracking-[0.35em] text-[#A855F7] uppercase font-bold mb-2">
          {isEs ? "05 // CONTACTO & CONEXIÓN" : "05 // CONTACT & GET IN TOUCH"}
        </span>

        {/* Monumental Bilingual Heading */}
        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] my-3 leading-none">
          {isEs ? "HABLEMOS" : "LET'S TALK"}
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#9E9EA7] font-light max-w-lg mx-auto mb-10 leading-relaxed">
          {isEs
            ? "¿Tienes una idea, un proyecto o una plataforma en mente? Construyamos software extraordinario juntos."
            : "Have an idea, project, or high-scale platform in mind? Let's build extraordinary software together."}
        </p>

        {/* Email Interactive Action Box (Mailto + Copy-to-Clipboard) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 w-full max-w-md">
          {/* Direct Email Link */}
          <a
            href={`mailto:${email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-[#F5F3F2] text-[#09080A] font-mono text-xs md:text-sm font-bold tracking-wider uppercase hover:bg-[#A855F7] hover:text-white transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-[#A855F7]/30 hover:scale-[1.02] cursor-pointer"
          >
            <span>{email}</span>
            <span className="text-sm font-sans">↗</span>
          </a>

          {/* Copy Button */}
          <button
            onClick={handleCopyEmail}
            type="button"
            aria-label={isEs ? "Copiar correo electrónico" : "Copy email address"}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border text-xs font-mono uppercase tracking-wider transition-all duration-300 backdrop-blur-md cursor-pointer ${
              copied
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                : "bg-white/[0.04] border-white/10 text-[#F5F3F2]/80 hover:border-[#A855F7] hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{isEs ? "¡Copiado!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-[#A855F7]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>{isEs ? "Copiar" : "Copy"}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links Pills (GitHub, LinkedIn, Instagram) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-[#F5F3F2]/80 hover:border-[#A855F7] hover:text-white hover:bg-[#530570]/30 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <span className="text-[#A855F7]">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9E9EA7]/70 gap-4">
          <span>
            © {year} Ronald • {isEs ? "Todos los derechos reservados" : "All Rights Reserved"}
          </span>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-[#F5F3F2]/60 hover:text-[#A855F7] transition-colors cursor-pointer group"
          >
            <span>{isEs ? "Volver arriba" : "Back to top"}</span>
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          </button>

          <span>
            {isEs
              ? "Ingeniería Creativa & Desarrollo Full-Stack"
              : "Creative Engineering & Full-Stack Development"}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default ContactFooter;
