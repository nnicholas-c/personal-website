"use client";

// A supernova page transition. On `shatter:go` the current screen bursts into a
// grid of fragments that fly outward (real pixels, from a canvas snapshot),
// leaving the void; navigation happens under the cover so the click never
// freezes on the destination; on arrival the darkness shatters away, revealing
// the new page.
//
// Lives in the root layout, so its state survives the route change.

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const COLS = 12;
const ROWS = 7;
const EXPLODE_MS = 820;
const REFORM_MS = 760;
const NAV_AT_MS = 220; // navigate once the burst has begun to cover the screen

type Mode = "idle" | "explode" | "reform";

// deterministic 0..1 so each fragment flies its own way, stably
function rnd(n: number) {
  const x = Math.sin(n * 12.9898 + 4.1) * 43758.5453;
  return x - Math.floor(x);
}

type Tile = {
  key: string;
  col: number;
  row: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number; // radial stagger (0 center → later at edges)
};

export default function ShatterTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  const [mode, setMode] = useState<Mode>("idle");
  const [snap, setSnap] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const onGo = (e: Event) => {
      const detail = (e as CustomEvent<{ href?: string; snapshot?: string | null }>)
        .detail;
      if (!detail?.href || pending.current) return;
      pending.current = detail.href;

      const begin = (snapshot: string | null) => {
        setSnap(snapshot);
        setMode("explode");
        clearTimers();
        timers.current.push(
          setTimeout(() => {
            if (pending.current) router.push(pending.current);
          }, reduce ? 140 : NAV_AT_MS)
        );
      };

      // Decode the snapshot BEFORE the burst, so the fragments paint real pixels
      // instead of flashing their fallback color while a big data URL decodes.
      if (detail.snapshot && !reduce) {
        const img = new Image();
        img.onload = () => begin(detail.snapshot ?? null);
        img.onerror = () => begin(null);
        img.src = detail.snapshot;
        // safety net: never wait more than a frame or two on decode
        timers.current.push(setTimeout(() => begin(detail.snapshot ?? null), 90));
      } else {
        begin(detail.snapshot ?? null);
      }
    };
    window.addEventListener("shatter:go", onGo as EventListener);
    return () => {
      window.removeEventListener("shatter:go", onGo as EventListener);
      clearTimers();
    };
  }, [router, reduce]);

  // when the destination route actually mounts, shatter the darkness away
  useEffect(() => {
    if (pending.current && pathname === pending.current) {
      pending.current = null;
      setMode("reform");
      clearTimers();
      timers.current.push(
        setTimeout(() => {
          setMode("idle");
          setSnap(null);
        }, reduce ? 260 : REFORM_MS + 120)
      );
    }
  }, [pathname, reduce]);

  const tiles = useMemo<Tile[]>(() => {
    const out: Tile[] = [];
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const maxD = Math.hypot(cx, cy);
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const ox = col - cx;
        const oy = row - cy;
        const d = Math.hypot(ox, oy) / maxD; // 0 center → 1 edge
        const seed = row * COLS + col;
        const mag = 55 + d * 120 + rnd(seed) * 45; // fling past the edge
        out.push({
          key: `${col}-${row}`,
          col,
          row,
          dx: (ox / (cx || 1)) * mag + (rnd(seed + 7) - 0.5) * 34,
          dy: (oy / (cy || 1)) * mag + (rnd(seed + 3) - 0.5) * 34,
          rot: (rnd(seed + 11) - 0.5) * 130,
          delay: d * 0.16, // center detonates first, like a shockwave
        });
      }
    }
    return out;
  }, []);

  if (mode === "idle") return null;

  const exploding = mode === "explode";

  // reduced motion: a plain quick crossfade — no flying fragments
  if (reduce) {
    return (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] bg-ink"
        initial={{ opacity: exploding ? 0 : 1 }}
        animate={{ opacity: exploding ? 1 : 0 }}
        transition={{ duration: 0.26, ease: "easeInOut" }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* the void behind the fragments */}
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ opacity: exploding ? 0 : 1 }}
        animate={{ opacity: exploding ? 1 : 0 }}
        transition={{
          duration: exploding ? 0.42 : 0.55,
          ease: "easeInOut",
          delay: exploding ? 0.12 : 0.14,
        }}
      />

      {tiles.map((t) => {
        // both phases DISPERSE outward: explode blows the old screen apart,
        // reform blows the darkness apart to reveal the destination beneath.
        const away = {
          x: `${t.dx}%`,
          y: `${t.dy}%`,
          scale: 0.35,
          rotate: t.rot,
          opacity: 0,
        };
        const home = { x: "0%", y: "0%", scale: 1, rotate: 0, opacity: 1 };
        return (
          <motion.div
            key={`${mode}-${t.key}`}
            className="absolute overflow-hidden will-change-transform"
            style={{
              left: `${(t.col / COLS) * 100}%`,
              top: `${(t.row / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              backgroundColor: "#0A0A0C",
              backgroundImage: exploding && snap ? `url(${snap})` : undefined,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(t.col / (COLS - 1)) * 100}% ${(t.row / (ROWS - 1)) * 100}%`,
              // reform fragments read as cracked dark glass
              boxShadow: exploding
                ? undefined
                : "inset 0 0 0 1px rgba(232,224,212,0.07)",
            }}
            initial={home}
            animate={away}
            transition={{
              duration: (exploding ? EXPLODE_MS : REFORM_MS) / 1000,
              ease: [0.3, 0, 0.25, 1],
              delay: t.delay,
            }}
          />
        );
      })}
    </div>
  );
}
