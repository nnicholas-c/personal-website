"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const fmt = new Intl.NumberFormat("en-US");

/** Counts from 0 to `value` once it scrolls into view (eased, ~1.6s). */
export default function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {/* screen readers get the final figure, not every intermediate tick */}
      <span aria-hidden>
        {fmt.format(n)}
        {suffix}
      </span>
      <span className="sr-only">
        {fmt.format(value)}
        {suffix}
      </span>
    </span>
  );
}
