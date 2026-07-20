"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, label, summary";

/**
 * A minimal trailing ring that lags slightly behind the pointer and expands
 * over interactive elements. Renders only for fine-pointer, motion-OK devices;
 * the native cursor stays visible so nothing is lost if this is skipped.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-cream/50 mix-blend-difference transition-[width,height,opacity,background-color] duration-300 ease-out"
      style={{
        width: hovering ? 46 : 22,
        height: hovering ? 46 : 22,
        opacity: visible ? 1 : 0,
        backgroundColor: hovering ? "rgb(var(--cream) / 0.08)" : "transparent",
      }}
    />
  );
}
