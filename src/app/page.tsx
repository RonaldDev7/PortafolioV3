"use client";

import React, { useState } from "react";
import { KineticIntro } from "@/components/KineticIntro";
import { HeroSilhouette } from "@/components/HeroSilhouette";
import { AboutCardReveal } from "@/components/AboutCardReveal";
import { TimelineSection } from "@/components/TimelineSection";
import { WaveCarousel } from "@/components/WaveCarousel";
import { HexagonalDrum } from "@/components/HexagonalDrum";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { ContactFooter } from "@/components/ContactFooter";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {/* Cinematic Intro Preloader */}
      <KineticIntro onComplete={() => setIntroFinished(true)} />

      <main className="flex-1 flex flex-col items-center min-h-screen w-full relative overflow-hidden bg-[#09080A]">
        {/* Background Ambient Glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#530570]/20 blur-[150px] pointer-events-none -top-24 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        {/* 1. Hero Section with Cinematic Shaded Silhouette & Monumental Background Typography */}
        <section
          id="hero"
          className={`w-full relative z-10 transition-all duration-1000 ${
            introFinished
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          }`}
        >
          <HeroSilhouette />
        </section>

        {/* 2. Sobre Mí & Filosofía Cinematográfica con Haz Volumétrico */}
        <div className="w-full">
          <AboutCardReveal />
        </div>

        {/* 3. Timeline Histórico con Tipografía Kinética */}
        <div className="w-full">
          <TimelineSection />
        </div>

        {/* 4. Galería Wave Shader con Física y Deformación */}
        <div className="w-full">
          <WaveCarousel />
        </div>

        {/* 5. Prisma 3D Hexagonal con Casos de Estudio */}
        <div className="w-full">
          <HexagonalDrum />
        </div>

        {/* 6. Servicios e Ingeniería con Acordeón Satinado */}
        <div className="w-full">
          <ServicesAccordion />
        </div>

        {/* 7. Footer Monumental y Contacto */}
        <div className="w-full">
          <ContactFooter />
        </div>
      </main>
    </>
  );
}
