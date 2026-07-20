"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Mote = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  tw: number;
};

/**
 * A slow drift of warm dust motes rendered on a canvas — the hero's ambient
 * "living" layer. Depth is faked through size/speed, and a gentle pointer
 * parallax nudges the field. Skips entirely under reduced-motion.
 */
export default function HeroAtmosphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let motes: Mote[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const seed = () => {
      const count = Math.round(
        Math.min(90, Math.max(36, (width * height) / 22000))
      );
      motes = Array.from({ length: count }, () => {
        const r = Math.random() * 1.8 + 0.4;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          vy: -(r * 0.18 + 0.06),
          vx: (Math.random() - 0.5) * 0.2,
          a: Math.random() * 0.4 + 0.1,
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let raf = 0;
    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.y += m.vy;
        m.x += m.vx;
        m.tw += 0.02;
        if (m.y < -6) {
          m.y = height + 6;
          m.x = Math.random() * width;
        }
        if (m.x < -6) m.x = width + 6;
        if (m.x > width + 6) m.x = -6;
        const px = m.x + pointer.x * (m.r * 0.9);
        const py = m.y + pointer.y * (m.r * 0.9);
        const alpha = m.a * (0.6 + 0.4 * Math.sin(m.tw));
        ctx.beginPath();
        ctx.arc(px, py, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 223, 205, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 14;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 14;
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-screen",
        className
      )}
    />
  );
}
