"use client";

// The name as a swarm of letters. `show` true → the letters converge into the
// word; false → they break apart and scatter out. Each letter's scatter vector
// is seeded (deterministic, SSR-safe) so a given instance always shatters the
// same way, and different instances (center / each side) shatter differently.

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GENTLE = [0.33, 1, 0.68, 1] as const;

// deterministic 0..1 from a number — no Math.random (stable across SSR/renders)
function rnd(n: number) {
  const x = Math.sin(n * 127.1 + 0.5) * 43758.5453;
  return x - Math.floor(x);
}

export default function ShatterName({
  text,
  show,
  reduce,
  seed = 0,
  className,
}: {
  text: string;
  show: boolean;
  reduce: boolean;
  /** varies the scatter pattern between instances */
  seed?: number;
  className?: string;
}) {
  const chars = text.split("");

  const container = {
    // letters gather one after another; break apart from the far end back
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
    hidden: { transition: { staggerChildren: 0.035, staggerDirection: -1 as const } },
  };

  return (
    <motion.span
      aria-hidden="true"
      variants={container}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      className={cn("inline-flex whitespace-nowrap", className)}
    >
      {chars.map((ch, i) => {
        const angle = rnd(seed * 31.7 + i * 2.3) * Math.PI * 2;
        const dist = reduce ? 0 : 80 + rnd(seed * 7.9 + i * 3.1) * 120;
        // Always specify every animated key (zeroed under reduce), so if
        // useReducedMotion flips after the first render the letters still
        // resolve to a clean position instead of stranding a scatter transform.
        const scattered = {
          opacity: 0,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          rotate: reduce ? 0 : (rnd(seed * 5.5 + i) - 0.5) * 100,
          filter: reduce ? "blur(0px)" : "blur(7px)",
        };
        const formed = { opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" };
        return (
          <motion.span
            key={i}
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
            variants={{
              hidden: { ...scattered, transition: { duration: 0.6, ease: GENTLE } },
              show: { ...formed, transition: { duration: 1.0, ease: GENTLE } },
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
