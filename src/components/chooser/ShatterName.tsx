"use client";

// The name as a swarm of letters. `show` true → the letters converge into the
// word; false → they break apart and scatter out. Each letter's scatter vector
// is seeded (deterministic) so a given instance always shatters the same way.
//
// The animated (motion) version is client-only: on the server and the first
// client render we emit a plain, transform-free version so hydration matches
// exactly (framer's random initial transforms otherwise mismatch SSR↔CSR).

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GENTLE = [0.33, 1, 0.68, 1] as const;

// deterministic 0..1 from a number — no Math.random
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const letterEls = (animated: boolean) =>
    chars.map((ch, i) => {
      const content = ch === " " ? " " : ch;
      if (!animated) {
        return (
          <span key={i} className="inline-block">
            {content}
          </span>
        );
      }
      const angle = rnd(seed * 31.7 + i * 2.3) * Math.PI * 2;
      const dist = reduce ? 0 : 80 + rnd(seed * 7.9 + i * 3.1) * 120;
      // every animated key is always specified (zeroed under reduce), so a late
      // useReducedMotion flip can't strand a scatter transform on a letter
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
          {content}
        </motion.span>
      );
    });

  // SSR + first client render: deterministic, transform-free, so hydration
  // matches. Visible only when the name is currently shown.
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        style={{ opacity: show ? 1 : 0 }}
        className={cn("inline-flex whitespace-nowrap", className)}
      >
        {letterEls(false)}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      variants={{
        show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
        hidden: {
          transition: { staggerChildren: 0.035, staggerDirection: -1 as const },
        },
      }}
      // initial={false}: start at the current state (no re-scatter flash on the
      // mount swap); the reform animates on subsequent `show` changes.
      initial={false}
      animate={show ? "show" : "hidden"}
      className={cn("inline-flex whitespace-nowrap", className)}
    >
      {letterEls(true)}
    </motion.span>
  );
}
