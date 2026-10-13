"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps a phrase and draws a hand-lettered SVG stroke under it, the classic
 * line-drawing effect (stroke-dashoffset animated from full length to zero).
 */
export default function DrawUnderline({
  children,
  delay = 0.6,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible"
      >
        <motion.path
          d="M4 13 C 60 4, 120 4, 170 10 S 260 17, 296 7"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 0.6 : 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}
