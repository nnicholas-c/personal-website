"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

/**
 * A vertical rule beside a list that draws itself as the reader scrolls
 * through it, so the timeline "fills in" with the page. Each child row gets a
 * node on the rule (see `TimelineNode`).
 */
export default function ScrollTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div ref={ref} className="relative pl-7 sm:pl-9">
      <span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-0 w-[2px] bg-cream/[0.12] sm:left-[9px]"
      />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-0 w-[2px] origin-top bg-cream/70 sm:left-[9px]"
        style={{ scaleY: reduce ? 1 : progress }}
      />
      {children}
    </div>
  );
}

/** The dot that pops onto the rule when its row scrolls into view. */
export function TimelineNode() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="absolute -left-7 top-[2.35rem] block h-3 w-3 rounded-full border border-cream/70 bg-ink sm:-left-8"
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
    />
  );
}
