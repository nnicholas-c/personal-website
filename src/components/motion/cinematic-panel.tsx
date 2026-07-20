"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MediaAsset } from "@/data/media";
import { cn } from "@/lib/utils";

interface CinematicPanelProps {
  media: MediaAsset;
  /** Optional portrait art for small screens. */
  mediaMobile?: MediaAsset;
  id?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  priority?: boolean;
  scrim?: "bottom" | "left" | "both";
  /** Show a small photographer credit in the corner. */
  credit?: boolean;
  /** Layer rendered above the scrim but beneath the text (e.g. atmosphere). */
  ambient?: ReactNode;
}

/**
 * A full-bleed photographic section: the image sits inside a subtle inset
 * frame, drifts with a slow Ken-Burns parallax as it passes through the
 * viewport, and carries legibility scrims. Overlay content is passed as
 * children and reveals independently.
 */
export default function CinematicPanel({
  media,
  mediaMobile,
  id,
  children,
  className,
  contentClassName,
  priority = false,
  scrim = "both",
  credit = true,
  ambient,
}: CinematicPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.06, 1.14]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative flex min-h-[100svh] w-full items-center overflow-hidden",
        className
      )}
    >
      <div className="cine-frame absolute inset-3 sm:inset-4 md:inset-5">
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y, scale }}
        >
          {/* Desktop / default art */}
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={priority}
            sizes="100vw"
            className={cn(
              "object-cover",
              mediaMobile && "hidden sm:block"
            )}
            style={{ objectPosition: media.focus }}
          />
          {/* Portrait art for small screens */}
          {mediaMobile && (
            <Image
              src={mediaMobile.src}
              alt={mediaMobile.alt}
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover sm:hidden"
              style={{ objectPosition: mediaMobile.focus }}
            />
          )}
        </motion.div>

        {(scrim === "bottom" || scrim === "both") && (
          <div className="scrim-bottom pointer-events-none absolute inset-0" />
        )}
        {(scrim === "left" || scrim === "both") && (
          <div className="scrim-left pointer-events-none absolute inset-0" />
        )}

        {ambient && (
          <div className="pointer-events-none absolute inset-0 z-[5]">
            {ambient}
          </div>
        )}

        {credit && (
          <a
            href={media.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label pointer-events-auto absolute bottom-4 right-4 z-20 text-[0.6rem] text-cream/35 transition-colors hover:text-cream/70"
          >
            ph. {media.credit}
          </a>
        )}

        <div
          className={cn(
            "absolute inset-0 z-10 flex flex-col justify-center px-6 py-24 sm:px-10 md:px-16 lg:px-24",
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
