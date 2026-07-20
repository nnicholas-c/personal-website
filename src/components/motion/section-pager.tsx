"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { SECTIONS } from "@/data/sections";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";
import { useScrollTo } from "./use-scroll-to";

/**
 * Right-edge section navigator: a chevron pair plus one tick per section. The
 * active section's tick widens and its label surfaces on hover — the site's
 * primary "where am I / jump anywhere" affordance.
 */
export default function SectionPager() {
  const active = useActiveSection();
  const scrollTo = useScrollTo();

  const index = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === active)
  );
  const go = (dir: -1 | 1) => {
    const next = SECTIONS[index + dir];
    if (next) scrollTo(next.id);
  };

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-auto fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous section"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-cream/40 hover:text-cream disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronUp size={15} />
      </button>

      <ul className="flex flex-col items-end gap-3 py-1">
        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="group relative flex items-center">
              <span className="label pointer-events-none absolute right-6 whitespace-nowrap text-[0.6rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
              <button
                type="button"
                onClick={() => scrollTo(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "h-px transition-all duration-300",
                  isActive
                    ? "w-6 bg-cream"
                    : "w-3 bg-cream/30 group-hover:w-5 group-hover:bg-cream/60"
                )}
              />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => go(1)}
        disabled={index === SECTIONS.length - 1}
        aria-label="Next section"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-cream/40 hover:text-cream disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronDown size={15} />
      </button>
    </nav>
  );
}
