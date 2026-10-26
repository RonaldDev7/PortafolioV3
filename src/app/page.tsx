"use client";

import React, { useState } from "react";
import { KineticIntro } from "@/components/KineticIntro";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {/* PoC A: Kinetic Intro Component */}
      <KineticIntro onComplete={() => setIntroFinished(true)} />

      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden bg-[#09080A]">
        {/* Background Ambient Glow */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#530570]/20 blur-[140px] pointer-events-none -top-20 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        <section
          id="hero"
          className={`relative z-10 max-w-4xl mx-auto space-y-6 pt-24 transition-opacity duration-1000 ${
            introFinished ? "opacity-100" : "opacity-90"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F5F3F2]/10 bg-[#F5F3F2]/5 text-[11px] font-mono tracking-widest text-[#F5F3F2]/80 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#530570] animate-pulse" />
            Full-Stack Developer
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#F5F3F2] uppercase font-sans">
            Ronald
          </h1>

          <p className="text-sm md:text-base text-[#9E9EA7] max-w-xl mx-auto leading-relaxed font-light">
            Construyendo experiencias digitales cinematográficas, arquitecturas escalables y productos de alto impacto visual y técnico.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-full bg-[#F5F3F2] text-[#09080A] text-xs font-semibold tracking-wider uppercase hover:bg-[#530570] hover:text-[#F5F3F2] transition-all duration-300 shadow-md"
            >
              Ver Proyectos ↗
            </a>
            <a
              href="#about"
              className="px-6 py-2.5 rounded-full border border-[#F5F3F2]/20 text-[#F5F3F2] text-xs font-medium tracking-wider uppercase hover:border-[#530570] hover:bg-[#530570]/10 transition-all duration-300"
            >
              Sobre Mí
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
