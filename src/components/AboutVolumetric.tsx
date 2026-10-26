"use client";

import React from "react";

export function AboutVolumetric() {
  return (
    <section
      id="about"
      className="py-28 px-6 md:px-12 bg-[#09080A] text-[#F5F3F2] relative overflow-hidden select-none"
    >
      {/* Volumetric Overhead Cone Spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] md:w-[600px] h-[550px] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, rgba(245, 243, 242, 0.28) 0deg, rgba(83, 5, 112, 0.35) 45deg, transparent 75deg, transparent 285deg, rgba(83, 5, 112, 0.35) 315deg, rgba(245, 243, 242, 0.28) 360deg)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Floating Levitating Avatar / Silhouette under the beam */}
        <div className="relative my-8 group">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#F5F3F2]/30 bg-gradient-to-b from-[#F5F3F2]/20 to-[#530570]/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(245,243,242,0.35),0_0_80px_rgba(83,5,112,0.45)] animate-bounce duration-1000">
            {/* Minimalist suspended geometric figure */}
            <div className="w-12 h-16 rounded-t-full bg-gradient-to-b from-[#FFFFFF] to-[#9E9EA7] shadow-[0_0_15px_#FFFFFF] flex flex-col items-center pt-2">
              <div className="w-4 h-4 rounded-full bg-[#09080A] mb-1" />
              <div className="w-8 h-8 rounded-b-md bg-[#09080A]/40" />
            </div>
          </div>
          <div className="w-32 h-4 rounded-full bg-[#530570]/40 blur-md mx-auto mt-4" />
        </div>

        {/* Cinematic Manifesto Typography */}
        <span className="text-[11px] font-mono tracking-[0.3em] text-[#530570] uppercase font-bold mb-4">
          FILOSOFÍA & ENFOQUE TÉCNICO
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight font-sans max-w-3xl leading-tight">
          Turning visionary ideas into fast, distinctive digital experiences
        </h2>

        <p className="text-sm md:text-base text-[#9E9EA7] font-light max-w-2xl mt-6 leading-relaxed">
          Especializado en la intersección entre ingeniería de software robusta y diseño visual inmersivo. Desarrollo arquitecturas backend confiables con Node.js y SQL, combinadas con interfaces frontend hiperreactivas y cinematográficas.
        </p>

        {/* Discipline / Craft Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {[
            "Full-Stack Architecture",
            "TypeScript & React Ecosystem",
            "Relational SQL Databases",
            "Creative WebGL & GSAP Animation",
            "Scalable REST & Cloud APIs",
          ].map((craft) => (
            <span
              key={craft}
              className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-[#F5F3F2]/15 bg-[#F5F3F2]/5 text-[#F5F3F2]/80 hover:border-[#530570] hover:text-[#F5F3F2] transition-colors"
            >
              {craft}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
