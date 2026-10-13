"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const TAGS = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
  li: motion.li,
} as const;

/**
 * Scroll-triggered entrance: the block rises, sharpens and fades in the first
 * time it enters the viewport. `index` staggers siblings in a list so rows
 * cascade instead of popping in together. Reduced motion renders it static.
 */
export default function Reveal({
  children,
  index = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  index?: number;
  as?: "div" | "article" | "section" | "li";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = TAGS[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: Math.min(index, 6) * 0.08 }}
    >
      {children}
    </MotionTag>
  );
}
