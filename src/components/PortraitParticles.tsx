"use client";

import React, { useRef, useEffect, useState } from "react";

interface Particle {
  originX: number;
  originY: number;
  originZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  g: number;
  b: number;
}

export function PortraitParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let animId: number;
    let isCancelled = false;

    async function loadAndInit() {
      try {
        const res = await fetch("/portrait-particles.json");
        if (!res.ok) return;
        const rawData: [number, number, number, number, number, number][] =
          await res.json();
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Initialize particles
        const particles: Particle[] = rawData.map((d) => ({
          originX: d[0],
          originY: d[1],
          originZ: d[2],
          currentX: d[0] + (Math.random() - 0.5) * 1.5,
          currentY: d[1] + (Math.random() - 0.5) * 1.5,
          currentZ: d[2] + (Math.random() - 0.5) * 1.5,
          vx: 0,
          vy: 0,
          vz: 0,
          r: Math.round(d[3] * 255),
          g: Math.round(d[4] * 255),
          b: Math.round(d[5] * 255),
        }));

        setLoaded(true);

        let mouseX = 0;
        let mouseY = 0;
        let targetRotX = 0;
        let targetRotY = 0;
        let curRotX = 0;
        let curRotY = 0;

        const onMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          mouseX = x * 2;
          mouseY = y * 2;
          targetRotY = mouseX * 0.35; // Yaw
          targetRotX = -mouseY * 0.25; // Pitch
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });

        const resize = () => {
          if (!canvas) return;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = canvas.parentElement?.clientWidth || 400;
          const height = canvas.parentElement?.clientHeight || 550;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);

        const render = () => {
          if (isCancelled || !canvas || !ctx) return;

          const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
          const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
          const cx = w / 2;
          const cy = h / 2 - 20;
          const scale = Math.min(w, h) * 0.42;

          ctx.clearRect(0, 0, w, h);

          // Smooth camera rotation
          curRotX += (targetRotX - curRotX) * 0.05;
          curRotY += (targetRotY - curRotY) * 0.05;

          const cosX = Math.cos(curRotX);
          const sinX = Math.sin(curRotX);
          const cosY = Math.cos(curRotY);
          const sinY = Math.sin(curRotY);

          const len = particles.length;
          for (let i = 0; i < len; i++) {
            const p = particles[i];

            // Spring force towards origin
            const fx = (p.originX - p.currentX) * 0.08;
            const fy = (p.originY - p.currentY) * 0.08;
            const fz = (p.originZ - p.currentZ) * 0.08;

            p.vx = (p.vx + fx) * 0.88;
            p.vy = (p.vy + fy) * 0.88;
            p.vz = (p.vz + fz) * 0.88;

            p.currentX += p.vx;
            p.currentY += p.vy;
            p.currentZ += p.vz;

            // 3D Rotation on Y and X
            const x1 = p.currentX * cosY + p.currentZ * sinY;
            const z1 = -p.currentX * sinY + p.currentZ * cosY;

            const y1 = p.currentY * cosX - z1 * sinX;
            const z2 = p.currentY * sinX + z1 * cosX;

            // Perspective Projection (Focal length = 2.5)
            const fov = 2.4;
            const dist = fov / (fov + z2);

            const px = cx + x1 * scale * dist;
            const py = cy - y1 * scale * dist;

            if (px >= 0 && px <= w && py >= 0 && py <= h) {
              const alpha = Math.max(0.2, Math.min(0.95, dist * 0.85));
              // Tint highlights slightly towards violet/white
              const pr = Math.min(255, p.r + 20);
              const pg = Math.min(255, p.g + 10);
              const pb = Math.min(255, p.b + 45);

              ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${alpha})`;
              const size = Math.max(1, dist * 1.55);
              ctx.fillRect(px, py, size, size);
            }
          }

          animId = requestAnimationFrame(render);
        };

        render();

        return () => {
          isCancelled = true;
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("resize", resize);
          if (animId) cancelAnimationFrame(animId);
        };
      } catch (err) {
        console.error("Failed to initialize portrait particles:", err);
      }
    }

    loadAndInit();

    return () => {
      isCancelled = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] h-[480px] md:h-[560px] mx-auto flex items-center justify-center select-none"
      aria-label="Nube de partículas 3D del retrato de Ronald"
    >
      {/* Ambient Backlight Glow */}
      <div
        className="absolute w-72 h-72 rounded-full bg-[#530570]/30 blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
