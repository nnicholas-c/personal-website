"use client";

// A supernova page transition. On `shatter:go` the current screen bursts into a
// grid of fragments that fly outward (real pixels, from a canvas snapshot);
// navigation happens under the cover; the darkness then HOLDS until the
// destination actually paints (its `page:ready` event) and only then shatters
// away to reveal it — so the reveal never lands on a half-loaded page.
//
// Lives in the root layout, so its state survives the route change.

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const COLS = 10;
const ROWS = 6;
const EXPLODE_MS = 1150; // slower, more deliberate burst
const REFORM_MS = 1050;
const NAV_AT_MS = 240; // navigate once the burst has begun to cover the screen
const COVER_MAX_MS = 6000; // failsafe: never hold the void longer than this
const BURST_EASE = [0.16, 1, 0.3, 1] as const; // ease-OUT: fragments move on frame 1

type Mode = "idle" | "explode" | "cover" | "reform";

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
  delay: number;
};

export default function ShatterTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  const [mode, setMode] = useState<Mode>("idle");
  const [snap, setSnap] = useState<string | null>(null);
  const modeRef = useRef<Mode>("idle");
  const pending = useRef<string | null>(null);
  const routeArrived = useRef(false);
  const pageReady = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const setM = (m: Mode) => {
    modeRef.current = m;
    setMode(m);
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const push = (fn: () => void, ms: number) =>
    timers.current.push(setTimeout(fn, ms));

  const toReform = () => {
    if (modeRef.current === "reform" || modeRef.current === "idle") return;
    clearTimers();
    setM("reform");
    push(() => {
      setM("idle");
      setSnap(null);
      pending.current = null;
      routeArrived.current = false;
      pageReady.current = false;
    }, (reduce ? 300 : REFORM_MS) + 120);
  };

  // reveal only once the route has committed AND the page has painted
  const maybeReform = () => {
    if (modeRef.current !== "cover") return;
    if (routeArrived.current && pageReady.current) toReform();
  };

  const toCover = () => {
    if (modeRef.current !== "explode") return;
    setM("cover");
    push(toReform, reduce ? 400 : COVER_MAX_MS); // failsafe
    maybeReform();
  };

  useEffect(() => {
    const onReady = () => {
      pageReady.current = true;
      maybeReform();
    };
    window.addEventListener("page:ready", onReady);
    return () => window.removeEventListener("page:ready", onReady);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onGo = (e: Event) => {
      const detail = (e as CustomEvent<{ href?: string; snapshot?: string | null }>)
        .detail;
      if (!detail?.href || pending.current) return;
      pending.current = detail.href;
      routeArrived.current = false;
      pageReady.current = false;

      // begin() runs once per go, whichever wins the decode race
      let begun = false;
      let img: HTMLImageElement | null = null;
      const begin = (snapshot: string | null) => {
        if (begun) return;
        begun = true;
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
        setSnap(snapshot);
        setM("explode");
        clearTimers();
        push(() => {
          if (pending.current) router.push(pending.current);
        }, reduce ? 140 : NAV_AT_MS);
        push(toCover, reduce ? 200 : EXPLODE_MS); // hold the void after the burst
      };

      if (detail.snapshot && !reduce) {
        img = new Image();
        img.onload = () => begin(detail.snapshot ?? null);
        img.onerror = () => begin(null);
        img.src = detail.snapshot;
        push(() => begin(detail.snapshot ?? null), 90); // decode safety net
      } else {
        begin(detail.snapshot ?? null);
      }
    };
    window.addEventListener("shatter:go", onGo as EventListener);
    return () => {
      window.removeEventListener("shatter:go", onGo as EventListener);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, reduce]);

  // the destination route has mounted
  useEffect(() => {
    if (pending.current && pathname === pending.current) {
      routeArrived.current = true;
      maybeReform();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // While the void holds (waiting for the destination to paint), it becomes a
  // slow, luminous nebula with drifting embers — so the wait reads as
  // "travelling through space", never a dead black screen, however long the
  // page takes.
  const clouds = useMemo(
    () => [
      { x: 34, y: 40, size: 70, hue: "120,150,210", peak: 0.5, dx: 10, dy: -6, dur: 9 },
      { x: 66, y: 58, size: 62, hue: "200,150,120", peak: 0.4, dx: -8, dy: 7, dur: 11 },
      { x: 52, y: 30, size: 54, hue: "150,160,230", peak: 0.42, dx: 5, dy: 9, dur: 10 },
    ],
    []
  );
  const embers = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        key: i,
        x: rnd(i * 3.1) * 100,
        y: rnd(i * 7.7 + 1) * 100,
        size: 2.5 + rnd(i * 5.5) * 7,
        dur: 2.8 + rnd(i * 2.2) * 3.2,
        delay: rnd(i * 9.1) * 2.4,
        rise: 40 + rnd(i * 4.4) * 110,
        drift: (rnd(i * 6.6) - 0.5) * 90,
        peak: 0.6 + rnd(i * 1.7) * 0.4,
        coral: rnd(i * 2.9) > 0.66,
      })),
    []
  );

  const tiles = useMemo<Tile[]>(() => {
    const out: Tile[] = [];
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const maxD = Math.hypot(cx, cy);
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const ox = col - cx;
        const oy = row - cy;
        const d = Math.hypot(ox, oy) / maxD;
        const seed = row * COLS + col;
        const mag = 55 + d * 120 + rnd(seed) * 45;
        out.push({
          key: `${col}-${row}`,
          col,
          row,
          dx: (ox / (cx || 1)) * mag + (rnd(seed + 7) - 0.5) * 34,
          dy: (oy / (cy || 1)) * mag + (rnd(seed + 3) - 0.5) * 34,
          rot: (rnd(seed + 11) - 0.5) * 130,
          delay: d * 0.2, // slower, wider shockwave
        });
      }
    }
    return out;
  }, []);

  if (mode === "idle") return null;

  // reduced motion: a plain crossfade, still held until the page is ready
  if (reduce) {
    return (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] bg-ink"
        initial={{ opacity: mode === "explode" ? 0 : 1 }}
        animate={{ opacity: mode === "reform" ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    );
  }

  const exploding = mode === "explode";
  const showTiles = mode === "explode" || mode === "reform";
  // the nebula lives behind the fragments through the burst and the hold, so the
  // explosion reveals a glowing field — never pure black
  const showField = mode === "explode" || mode === "cover";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* the void: fades in during the burst, holds through the wait, fades out
          as the darkness shatters away */}
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ opacity: exploding ? 0 : 1 }}
        animate={{ opacity: mode === "reform" ? 0 : 1 }}
        transition={{
          duration: exploding ? 0.5 : mode === "reform" ? 0.7 : 0.2,
          ease: "easeInOut",
          delay: exploding ? 0.14 : mode === "reform" ? 0.18 : 0,
        }}
      />

      {/* drifting luminous nebula clouds — visible from the first frame of the
          burst, so the void is never flat black */}
      {showField &&
        clouds.map((c, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: `${c.size}vmax`,
              height: `${c.size}vmax`,
              background: `radial-gradient(closest-side, rgba(${c.hue},${c.peak}) 0%, rgba(${c.hue},${c.peak * 0.4}) 38%, transparent 70%)`,
              filter: "blur(10px)",
            }}
            initial={{ opacity: c.peak, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: [c.peak, 1, 0.75, 1],
              scale: [1, 1.08, 0.97, 1.08],
              x: [0, c.dx, 0],
              y: [0, c.dy, 0],
            }}
            transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* glowing sparks drifting through it */}
      {showField &&
        embers.map((p) => (
          <motion.span
            key={p.key}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.coral
                ? "hsl(20 100% 70%)"
                : "rgb(232 224 212)",
              boxShadow: p.coral
                ? "0 0 6px hsl(20 100% 70% / 0.6)"
                : "0 0 5px rgba(232,224,212,0.5)",
            }}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0, p.peak, p.peak, 0],
              y: [0, -p.rise],
              x: [0, p.drift],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {showTiles &&
        tiles.map((t) => {
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
                boxShadow: exploding
                  ? undefined
                  : "inset 0 0 0 1px rgba(232,224,212,0.07)",
              }}
              initial={home}
              animate={away}
              transition={{
                duration: (exploding ? EXPLODE_MS : REFORM_MS) / 1000,
                ease: BURST_EASE,
                delay: t.delay,
              }}
            />
          );
        })}
    </div>
  );
}
