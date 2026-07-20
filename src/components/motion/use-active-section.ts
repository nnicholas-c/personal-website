"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/sections";

/**
 * Tracks which section id is currently centered in the viewport, using a single
 * IntersectionObserver over the on-page section ids.
 */
export function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0]?.id ?? "");

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return active;
}
