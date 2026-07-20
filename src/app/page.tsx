"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MEDIA } from "@/data/media";
import { config } from "@/data/config";

const GENTLE = [0.33, 1, 0.68, 1] as const; // easeOutCubic — reveals
const FOLD = [0.65, 0, 0.35, 1] as const; // easeInOutCubic — the expand/fold

const introContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } },
};
const introItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: GENTLE } },
};

type Side = "left" | "right" | null;
type State = "active" | "receding" | "neutral";

function Door({
  href,
  index,
  domain,
  title,
  blurb,
  preview,
  align,
  state,
  reduce,
  onFocusSide,
  onBlurSide,
  imageSrc,
  imageFocus,
}: {
  href: string;
  index: string;
  domain: string;
  title: string;
  blurb: string;
  preview: string[];
  align: "left" | "right";
  state: State;
  reduce: boolean;
  onFocusSide: () => void;
  onBlurSide: () => void;
  imageSrc: string;
  imageFocus: string;
}) {
  const right = align === "right";
  const active = state === "active";
  const receding = state === "receding";

  const basis = active ? "80%" : receding ? "20%" : "50%";
  const rotateY = reduce ? 0 : receding ? (right ? 20 : -20) : 0;
  const panelScale = receding ? 0.94 : 1;
  const imgScale = reduce ? 1 : active ? 1.1 : receding ? 1 : 1.03;

  return (
    <motion.div
      initial={{ flexBasis: "50%" }}
      animate={{ flexBasis: reduce ? "50%" : basis, rotateY, scale: panelScale }}
      transition={{ duration: 1, ease: FOLD }}
      style={{
        flexGrow: 0,
        flexShrink: 0,
        transformStyle: "preserve-3d",
        transformOrigin: right ? "right center" : "left center",
      }}
      className="relative min-h-0 min-w-0 overflow-hidden"
    >
      <Link
        href={href}
        onMouseEnter={onFocusSide}
        onMouseLeave={onBlurSide}
        aria-label={`Enter the ${domain} side`}
        className="group absolute inset-0 flex items-end overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: imgScale, filter: receding ? "blur(3px)" : "blur(0px)" }}
          transition={{ duration: 1.2, ease: GENTLE }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 70vw, 100vw"
            className="object-cover opacity-90"
            style={{ objectPosition: imageFocus }}
          />
        </motion.div>

        <div className="scrim-bottom pointer-events-none absolute inset-0 opacity-80" />
        {/* the world you didn't pick darkens as it folds away */}
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-ink transition-opacity duration-700"
          style={{ opacity: receding ? 0.55 : 0 }}
        />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: GENTLE }}
          className={`pointer-events-none absolute top-[13%] font-serif text-[26vw] font-light leading-none text-cream/[0.07] md:text-[12vw] ${right ? "right-[6%]" : "left-[6%]"}`}
        >
          {index}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.35, ease: GENTLE }}
          className={`relative z-10 w-full max-w-[85%] p-8 sm:p-10 lg:p-16 md:max-w-[46%] ${right ? "md:ml-auto md:text-right" : ""}`}
        >
          <p
            className={`label flex items-center gap-3 text-cream/70 ${right ? "md:justify-end" : ""}`}
          >
            <span
              className={`hidden h-px w-8 bg-cream/50 md:inline-block ${right ? "order-2" : ""}`}
            />
            {domain}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light leading-[0.95] text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p
            className={`mt-4 hidden font-serif text-lg italic leading-relaxed text-cream/75 sm:block ${right ? "md:ml-auto" : ""}`}
          >
            {blurb}
          </p>

          {/* preview of what's inside — unfolds when this side takes over */}
          <div
            className="hidden overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.33,1,0.68,1)] md:block"
            style={{
              maxHeight: active ? "10rem" : 0,
              opacity: active ? 1 : 0,
            }}
          >
            <div className={`mt-5 flex flex-col gap-2 ${right ? "items-end" : ""}`}>
              {preview.map((item) => (
                <p
                  key={item}
                  className={`flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/80 ${right ? "flex-row-reverse" : ""}`}
                >
                  <span className="h-1 w-1 rounded-full bg-cream/70" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <span
            className={`label mt-6 inline-flex items-center gap-2 text-cream/80 transition-colors group-hover:text-cream ${right ? "md:flex-row-reverse" : ""}`}
          >
            Step in
            <ArrowRight
              size={13}
              className={`transition-transform ${right ? "group-hover:-translate-x-1 md:rotate-180" : "group-hover:translate-x-1"}`}
            />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Chooser() {
  const reduce = useReducedMotion();
  const [side, setSide] = useState<Side>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 60,
    damping: 20,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 60,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || side) return; // hold still while a side is expanded
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const stateOf = (mine: Exclude<Side, null>): State =>
    side === null ? "neutral" : side === mine ? "active" : "receding";

  const role = (mine: Side) =>
    side === mine
      ? "text-cream"
      : side === null
        ? "text-cream/60"
        : "text-cream/25";

  return (
    <main
      onMouseMove={onMove}
      className="relative h-[100svh] w-full overflow-hidden bg-ink font-serif text-cream"
    >
      <div className="cine-frame absolute inset-3 sm:inset-4 md:inset-5 [perspective:2200px]">
        {/* Scene — slow gentle settle on load */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 1.1 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.02 }}
          transition={{ duration: 2.2, delay: 0.1, ease: GENTLE }}
          style={{
            rotateX: reduce ? 0 : rotX,
            rotateY: reduce ? 0 : rotY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 flex flex-col md:flex-row"
        >
          <Door
            href="/playful"
            index="01"
            domain="Entrepreneurship"
            title="The builder."
            blurb="Where I build — the startups, products, and tools I've shipped."
            preview={[
              "An interactive, 3D build",
              "Projects, skills & demos",
              "Playful and animated",
            ]}
            align="left"
            state={stateOf("left")}
            reduce={reduce ?? false}
            onFocusSide={() => setSide("left")}
            onBlurSide={() => setSide(null)}
            imageSrc={MEDIA.city.src}
            imageFocus={MEDIA.city.focus}
          />
          <Door
            href="/editorial"
            index="02"
            domain="Research"
            title="The researcher."
            blurb="Where I do research — machine learning, the papers, and the science behind them."
            preview={[
              "A calm, cinematic read",
              "Publications & selected work",
              "Writing & essays",
            ]}
            align="right"
            state={stateOf("right")}
            reduce={reduce ?? false}
            onFocusSide={() => setSide("right")}
            onBlurSide={() => setSide(null)}
            imageSrc={MEDIA.bridge.src}
            imageFocus={MEDIA.bridge.focus}
          />
        </motion.div>

        <div className="grain" aria-hidden="true" />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-[38%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.1) 70%, transparent 100%)",
          }}
        />

        {/* Corner labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1.2, ease: GENTLE }}
          className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-7 py-6 sm:px-10"
        >
          <p className="label text-cream/70">{config.author}</p>
          <p className="label hidden text-cream/50 sm:block">
            San Francisco · Portfolio
          </p>
        </motion.div>

        {/* Centered identity — fades back while a side is expanded */}
        <motion.div
          animate={{ opacity: side ? 0 : 1 }}
          transition={{ duration: 0.5, ease: GENTLE }}
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-start px-6 pt-[6vh] text-center md:justify-center md:pt-0"
        >
          <motion.div
            variants={introContainer}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-[240%] w-[180%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(10,10,12,0.7) 0%, rgba(10,10,12,0.32) 48%, transparent 76%)",
              }}
            />
            <motion.p variants={introItem} className="label text-cream/70">
              Hello — I&apos;m
            </motion.p>
            <motion.h1
              variants={introItem}
              className="mt-3 font-serif text-4xl font-light leading-[0.95] tracking-tight text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl"
            >
              {config.author}.
            </motion.h1>
            <motion.div
              variants={introItem}
              className="pointer-events-auto mt-5 flex items-center justify-center gap-4 font-serif text-xl italic sm:text-3xl"
            >
              <Link
                href="/playful"
                onMouseEnter={() => setSide("left")}
                onMouseLeave={() => setSide(null)}
                className={`transition-colors duration-500 hover:text-cream ${role("left")}`}
              >
                Entrepreneur
              </Link>
              <span className="not-italic text-cream/30">/</span>
              <Link
                href="/editorial"
                onMouseEnter={() => setSide("right")}
                onMouseLeave={() => setSide(null)}
                className={`transition-colors duration-500 hover:text-cream ${role("right")}`}
              >
                Researcher
              </Link>
            </motion.div>
            <motion.p
              variants={introItem}
              className="mt-5 hidden font-serif text-base italic text-cream/60 sm:block sm:text-lg"
            >
              Take a look at either side.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Rails */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 1.2, ease: GENTLE }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden items-center justify-center gap-5 px-6 py-6 md:flex"
        >
          <Link
            href="/research"
            className="label pointer-events-auto text-cream/60 transition-colors hover:text-cream"
          >
            Research
          </Link>
          <span className="text-cream/30">·</span>
          <Link
            href="/blogs"
            className="label pointer-events-auto text-cream/60 transition-colors hover:text-cream"
          >
            Writing
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
