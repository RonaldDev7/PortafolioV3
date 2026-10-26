"use client";

import React, { useState, useRef } from "react";
import { STUDY_CASES } from "@/data/projects";

export function HexagonalDrum() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAngleRef = useRef(0);

  const numItems = STUDY_CASES.length;
  const angleStep = 360 / numItems;
  const radius = 340; // 3D cylinder radius in pixels

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentAngleRef.current = rotationAngle;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const newAngle = currentAngleRef.current + deltaX * 0.45;
    setRotationAngle(newAngle);

    // Compute closest active item index
    const normalizedAngle = ((-newAngle % 360) + 360) % 360;
    const closestIdx = Math.round(normalizedAngle / angleStep) % numItems;
    setActiveIndex(closestIdx);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer release errors
    }
  };

  const rotateTo = (index: number) => {
    const targetAngle = -index * angleStep;
    setRotationAngle(targetAngle);
    setActiveIndex(index);
  };

  return (
    <section className="py-28 px-6 bg-[#09080A] text-[#F5F3F2] overflow-hidden select-none relative flex flex-col items-center">
      {/* Background Central Violet Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#530570]/20 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl text-center mb-16 relative z-10">
        <span className="text-[11px] font-mono tracking-[0.3em] text-[#530570] uppercase font-bold block mb-2">
          CASOS DE ESTUDIO 3D
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight font-sans">
          WORKS &apos;26
        </h2>
        <p className="text-xs md:text-sm text-[#9E9EA7] font-light max-w-md mx-auto mt-3">
          Prisma poligonal interactivo. Arrastra horizontalmente para rotar el tambor de proyectos.
        </p>
      </div>

      {/* 3D Drum Stage */}
      <div
        className="relative w-full max-w-4xl h-[400px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative w-[280px] md:w-[340px] h-[220px] md:h-[260px] transition-transform duration-150 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationAngle}deg)`,
          }}
        >
          {STUDY_CASES.map((item, idx) => {
            const angle = idx * angleStep;
            const isCurrent = idx === activeIndex;

            return (
              <div
                key={item.id}
                onClick={() => rotateTo(idx)}
                className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                  isCurrent
                    ? "bg-[#09080A] border-[#530570] shadow-[0_0_30px_rgba(83,5,112,0.4)]"
                    : "bg-[#09080A]/80 border-[#F5F3F2]/10 opacity-60 hover:opacity-90"
                }`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#9E9EA7] uppercase mb-2">
                    <span>0{idx + 1}</span>
                    <span className="text-[#530570] font-bold">{item.category}</span>
                  </div>
                  <h4 className="text-base md:text-lg font-bold tracking-tight text-[#F5F3F2] font-sans">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#9E9EA7] font-light mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F5F3F2]/10 text-[10px] font-mono">
                  <span className="text-[#F5F3F2]/60">Detalles técnicos</span>
                  <span className="text-[#530570]">↗</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drum Navigation Indicators */}
      <div className="flex items-center gap-2 mt-8 z-10">
        {STUDY_CASES.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => rotateTo(idx)}
            aria-label={`Ver caso ${item.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-8 bg-[#530570]"
                : "w-2 bg-[#F5F3F2]/20 hover:bg-[#F5F3F2]/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
