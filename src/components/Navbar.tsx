"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Nav references for active indicator geometry and mouse tracking
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [idleSpotlight, setIdleSpotlight] = useState({ x: -200, y: -200, opacity: 0 });
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  // Recalculate active indicator position
  const updateActivePosition = useCallback(() => {
    const activeEl = itemRefs.current[activeSection];
    if (activeEl && linksContainerRef.current && navContainerRef.current) {
      const containerRect = linksContainerRef.current.getBoundingClientRect();
      const navRect = navContainerRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();

      setActiveStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
      });

      setIdleSpotlight({
        x: elRect.left - navRect.left + elRect.width / 2,
        y: elRect.top - navRect.top + elRect.height / 2,
        opacity: 0.85,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updateActivePosition();
    window.addEventListener("resize", updateActivePosition);
    return () => window.removeEventListener("resize", updateActivePosition);
  }, [updateActivePosition, lang]);

  // Scrollspy & Smart Scroll (Hide down / Show up)
  useEffect(() => {
    const sectionIds = ["hero", "about", "projects", "services", "contact"];
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scrolled state
      setIsScrolled(currentScrollY > 30);

      // Smart hide on scroll down / show on scroll up
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = Math.max(0, currentScrollY);

      // Scrollspy calculation: find section closest to top offset
      const viewportTrigger = currentScrollY + window.innerHeight * 0.35;
      let currentActive = "hero";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportTrigger >= top && viewportTrigger < top + height) {
            currentActive = id;
            break;
          } else if (viewportTrigger >= top + height) {
            currentActive = id;
          }
        }
      }

      // Check if at the bottom of the page
      if (window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 50) {
        currentActive = "contact";
      }

      setActiveSection(currentActive);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initial check
    onScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move handler for spotlight border illumination
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navContainerRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const navLinks = [
    { id: "hero", label: lang === "es" ? "INICIO" : "HOME", href: "#hero" },
    { id: "about", label: lang === "es" ? "SOBRE MÍ" : "ABOUT", href: "#about" },
    { id: "projects", label: lang === "es" ? "PROYECTOS" : "PROJECTS", href: "#projects" },
    { id: "services", label: lang === "es" ? "SERVICIOS" : "SERVICES", href: "#services" },
    { id: "contact", label: lang === "es" ? "CONTACTO" : "CONTACT", href: "#contact" },
  ];

  // Dynamic spotlight center coordinates:
  // When hovered -> follows mouse
  // When idle -> illuminates the active section item!
  const spotlight = isHovered
    ? { x: mousePos.x, y: mousePos.y, opacity: 1 }
    : idleSpotlight;

  return (
    <header
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-20 md:-translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      {/* 
        Apple Glass Capsule Container 
        Outer wrapper: Handles dynamic spotlight border illumination following mouse OR active section
      */}
      <div
        ref={navContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative p-[1px] rounded-full transition-shadow duration-500 overflow-visible ${
          isScrolled
            ? "shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(139,30,214,0.15)]"
            : "shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* 
          Dynamic Spotlight Border Layer:
          Illuminates exactly where cursor hovers, OR slides along the border to highlight the active section!
        */}
        <div
          className="absolute -inset-[1px] rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(160px circle at ${spotlight.x}px ${spotlight.y}px, rgba(168,85,247,0.85) 0%, rgba(245,243,242,0.45) 35%, rgba(139,30,214,0.18) 60%, transparent 80%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient default border (subtle off-white/violet resting stroke) */}
        <div
          className="absolute -inset-[1px] rounded-full pointer-events-none border border-[#F5F3F2]/10"
          aria-hidden="true"
        />

        {/* 
          Inner Glass Surface (Frosted Glassmorphism)
          Tactile Apple-style glass blur, dark chiaroscuro background, inner top reflection
        */}
        <div className="relative rounded-full bg-[#09080A]/80 backdrop-blur-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          {/* Subtle cursor/active-following micro-glow inside the glass */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(130px circle at ${spotlight.x}px ${spotlight.y}px, rgba(139,30,214,0.18), transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* 1. Brand Logo / Identity */}
          <Link
            href="#hero"
            className="group relative z-10 flex items-center gap-2.5 text-[13px] tracking-[0.22em] font-bold text-[#F5F3F2] uppercase select-none transition-transform duration-200 active:scale-95"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B1ED6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B1ED6] shadow-[0_0_10px_#8B1ED6]" />
            </span>
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#F5F3F2] to-[#E9D5FF] bg-clip-text text-transparent group-hover:text-white transition-all">
              RONALD
            </span>
          </Link>

          {/* 2. Desktop Navigation Links (Centered Island with Sliding Active Capsule) */}
          <nav
            ref={linksContainerRef}
            className="hidden md:flex items-center gap-1 lg:gap-1.5 relative z-10 p-0.5"
          >
            {/* Sliding Active Pill Highlight (Moves smoothly when scrolling to a new section!) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-4px)] rounded-full bg-white/[0.08] border border-[#8B1ED6]/40 shadow-[0_0_16px_rgba(139,30,214,0.35)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${activeStyle.left}px`,
                width: `${activeStyle.width}px`,
                opacity: activeStyle.opacity,
              }}
              aria-hidden="true"
            >
              {/* Luminous micro-indicator bar on the bottom edge */}
              <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-3/5 h-[2px] rounded-full bg-gradient-to-r from-[#8B1ED6] via-[#C084FC] to-[#8B1ED6] shadow-[0_0_10px_#8B1ED6]" />
            </div>

            {navLinks.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  className={`group relative px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 rounded-full select-none ${
                    isActive
                      ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      : "text-[#9E9EA7] hover:text-[#F5F3F2] hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Controls: i18n Switcher + "Hablemos" CTA */}
          <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Pill (Connected to LanguageContext) */}
            <button
              onClick={toggleLang}
              type="button"
              aria-label="Toggle language"
              className="text-[10px] tracking-widest font-mono px-2.5 py-1 rounded-full border border-[#F5F3F2]/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#8B1ED6]/50 text-[#F5F3F2]/80 hover:text-[#F5F3F2] transition-all duration-200 active:scale-95 flex items-center shadow-sm"
            >
              <span
                className={
                  lang === "es"
                    ? "font-bold text-[#F5F3F2] text-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "text-[#6E7179]"
                }
              >
                ES
              </span>
              <span className="mx-1 text-[#6E7179]/40">/</span>
              <span
                className={
                  lang === "en"
                    ? "font-bold text-[#F5F3F2] text-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "text-[#6E7179]"
                }
              >
                EN
              </span>
            </button>

            {/* Action CTA Button ("Hablemos ↗") */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[#F5F3F2] text-[#09080A] hover:bg-gradient-to-r hover:from-[#FFFFFF] hover:to-[#E9D5FF] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 active:scale-95"
            >
              <span>{lang === "es" ? "Hablemos" : "Let's Talk"}</span>
              <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-[#F5F3F2]/15 bg-white/[0.04] text-[#F5F3F2] hover:bg-white/[0.08] transition-all active:scale-90"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 
        Mobile Expandable Drawer (Apple Glass Floating Sheet)
      */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-[1px] rounded-2xl bg-gradient-to-b from-[#F5F3F2]/15 to-[#8B1ED6]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="rounded-2xl bg-[#09080A]/90 p-4 flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-between ${
                    isActive
                      ? "text-white bg-[#8B1ED6]/20 border border-[#8B1ED6]/40 shadow-[0_0_12px_rgba(139,30,214,0.3)]"
                      : "text-[#9E9EA7] hover:text-[#F5F3F2] hover:bg-white/[0.06]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-xs ${isActive ? "text-[#C084FC]" : "text-[#8B1ED6] opacity-60"}`}>
                    ↗
                  </span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex justify-center">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-xl bg-[#F5F3F2] text-[#09080A] text-xs font-bold tracking-wider uppercase hover:bg-white shadow-sm"
              >
                {lang === "es" ? "Hablemos ↗" : "Let's Talk ↗"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
