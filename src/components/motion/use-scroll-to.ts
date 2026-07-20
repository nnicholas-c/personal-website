"use client";

import { useCallback } from "react";
import { useLenis } from "@/lib/lenis";

/**
 * Returns a smooth `scrollTo(id)` that routes through Lenis when available and
 * falls back to native scrolling otherwise.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );
}
