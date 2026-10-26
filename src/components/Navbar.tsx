"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== prevScrolled) {
        prevScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = {
    es: [
      { label: "INICIO", href: "#hero" },
      { label: "SOBRE MÍ", href: "#about" },
      { label: "PROYECTOS", href: "#projects" },
      { label: "SERVICIOS", href: "#services" },
      { label: "CONTACTO", href: "#contact" },
    ],
    en: [
      { label: "HOME", href: "#hero" },
      { label: "ABOUT", href: "#about" },
      { label: "PROJECTS", href: "#projects" },
      { label: "SERVICES", href: "#services" },
      { label: "CONTACT", href: "#contact" },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out px-6 md:px-12 py-5 flex items-center justify-between ${
        scrolled
          ? "bg-[#09080A]/80 backdrop-blur-md border-b border-[#F5F3F2]/10 py-4 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Brand Logo / Identity */}
      <Link
        href="#hero"
        className="group flex items-center gap-2 text-sm tracking-[0.25em] font-bold text-[#F5F3F2] uppercase hover:text-[#530570] transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-[#530570] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#530570]" />
        <span>RONALD</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] text-[#F5F3F2]/70 uppercase">
        {navLinks[lang].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-[#F5F3F2] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#530570] hover:after:w-full after:transition-all after:duration-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right Controls: i18n + CTA */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <button
          onClick={toggleLang}
          type="button"
          aria-label="Toggle language"
          className="text-[11px] tracking-widest font-mono border border-[#F5F3F2]/20 hover:border-[#530570] px-2.5 py-1 rounded text-[#F5F3F2]/80 hover:text-[#F5F3F2] hover:bg-[#530570]/10 transition-all cursor-pointer"
        >
          <span className={lang === "es" ? "font-bold text-[#F5F3F2]" : "text-[#F5F3F2]/40"}>
            ES
          </span>
          <span className="mx-1 text-[#F5F3F2]/30">/</span>
          <span className={lang === "en" ? "font-bold text-[#F5F3F2]" : "text-[#F5F3F2]/40"}>
            EN
          </span>
        </button>

        {/* Action Button */}
        <Link
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[#F5F3F2] text-[#09080A] hover:bg-[#530570] hover:text-[#F5F3F2] transition-all duration-300 shadow-sm"
        >
          <span>{lang === "es" ? "Hablemos" : "Let's Talk"}</span>
          <span className="text-xs">↗</span>
        </Link>
      </div>
    </header>
  );
}
