"use client";

import { ElementType, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>#*+";

interface DecodeTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between each character locking into place */
  step?: number;
  /** delay before the effect starts once in view, in ms */
  delay?: number;
}

/**
 * Reveals a short label by scrambling through random glyphs and locking each
 * character left-to-right — the letterboxed "decode" reveal used for the
 * monospace section labels. Runs once when it scrolls into view and falls back
 * to the plain string when reduced motion is requested.
 */
export default function DecodeText({
  text,
  as,
  className,
  step = 55,
  delay = 0,
}: DecodeTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    let raf = 0;
    let last = 0;
    const startTimeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (now - last >= step) {
          last = now;
          frame += 1;
          const locked = frame;
          setDisplay(
            text
              .split("")
              .map((ch, i) => {
                if (ch === " ") return " ";
                if (i < locked) return ch;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join("")
          );
          if (locked >= text.length) return;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);
      cancelAnimationFrame(raf);
    };
  }, [started, text, step, delay]);

  return (
    <Tag ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
