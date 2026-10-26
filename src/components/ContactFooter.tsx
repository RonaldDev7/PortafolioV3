"use client";

import React, { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function ContactFooter() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  const links = [
    { label: "GITHUB", href: "https://github.com/RonaldDev7" },
    { label: "LINKEDIN", href: "#" },
    { label: "TWITTER / X", href: "#" },
    { label: "EMAIL", href: "mailto:ronaldalvarezjsjs@gmail.com" },
  ];

  return (
    <footer
      id="contact"
      className="py-28 px-6 md:px-12 bg-[#09080A] text-[#F5F3F2] relative overflow-hidden select-none border-t border-[#F5F3F2]/10"
    >
      {/* Background Bottom Atmosphere */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#530570]/25 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        <span className="text-[11px] font-mono tracking-[0.3em] text-[#530570] uppercase font-bold mb-4">
          CONTACTO & CONEXIÓN
        </span>

        {/* Monumental Title */}
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F5F3F2] to-[#6E7179] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] my-4">
          LET&apos;S TALK
        </h2>

        <p className="text-xs md:text-sm text-[#9E9EA7] font-light max-w-md mx-auto mb-10 leading-relaxed">
          ¿Tienes una idea, un proyecto empresarial o una plataforma en mente? Construyamos algo extraordinario juntos.
        </p>

        {/* Primary Action Button */}
        <a
          href="mailto:ronaldalvarezjsjs@gmail.com"
          className="px-8 py-3.5 rounded-full bg-[#F5F3F2] text-[#09080A] font-semibold text-xs md:text-sm tracking-widest uppercase hover:bg-[#530570] hover:text-[#F5F3F2] transition-all duration-300 shadow-xl mb-12 flex items-center gap-3"
        >
          <span>ronaldalvarezjsjs@gmail.com</span>
          <span className="text-sm">↗</span>
        </a>

        {/* Social Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono px-4 py-2 rounded-full border border-[#F5F3F2]/15 bg-[#F5F3F2]/5 text-[#F5F3F2]/70 hover:border-[#530570] hover:text-[#F5F3F2] hover:bg-[#530570]/15 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Bottom Credits & Legal */}
        <div className="w-full pt-8 border-t border-[#F5F3F2]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9E9EA7]/50 gap-4">
          <span>© {year} Ronald • All Rights Reserved</span>
          <span>Crafted with Next.js, TypeScript & Creative Engineering</span>
        </div>
      </div>
    </footer>
  );
}
