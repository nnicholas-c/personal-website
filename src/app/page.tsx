"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA } from "@/data/media";
import { config } from "@/data/config";
import { SECTIONS } from "@/data/sections";
import projects from "@/data/projects";
import FluidCanvas from "@/components/chooser/FluidCanvas";
import ShatterName from "@/components/chooser/ShatterName";

// The hover peek shows the REAL contents of each world, pulled from the same
// data that renders them — project titles on the builder side, the section
// rail on the researcher side — so the door previews what the click delivers.
const BUILDER_PEEK = projects
  .map((p) => p.title)
  .filter((t) => t.length <= 22)
  .slice(0, 4);
const EDITORIAL_PEEK = SECTIONS.filter((s) => s.nav)
  .map((s) => s.label)
  .slice(0, 4);

const GENTLE = [0.33, 1, 0.68, 1] as const; // easeOutCubic — reveals
const BOUNCE = "cubic-bezier(0.175,0.885,0.32,1.275)"; // builder-side micro-motion
const COMMIT_MS = 900; // frame-to-full-bleed on click (expo.inOut, inline below)
const NAV_AT_MS = 650; // route change fires past the fast middle of the commit move
// The rest state deliberately favors the entrepreneur side: the default persona
// gets more of the liquid (57/43), a brighter identity word, a louder numeral.
const NEUTRAL_SEAM = 57;

// ONE spring, one clock: the same physics that drove the shoreline now drives
// how the inks gather — hover performs the click reversibly, click completes it.
const SPRING_PANEL = { type: "spring" as const, stiffness: 80, damping: 24, mass: 1 };

const introContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};
const introItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: GENTLE } },
};

type SideId = "left" | "right";
type Side = SideId | null;
type State = "active" | "receding" | "neutral";
type Flavor = "builder" | "editorial";

// Peek items ride the takeover's beat — a tight cascade, not a second event.
const peekContainer = {
  hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const peekItem = {
  hidden: { opacity: 0, y: 14, transition: { duration: 0.25, ease: GENTLE } },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: GENTLE } },
};

function Door({
  href,
  index,
  domain,
  title,
  peekLine,
  peekItems,
  align,
  flavor,
  state,
  committing,
  reduce,
  onFocusSide,
  onBlurSide,
  onCommit,
}: {
  href: string;
  index: string;
  domain: string;
  title: string;
  peekLine?: string;
  peekItems: string[];
  align: "left" | "right";
  flavor: Flavor;
  state: State;
  committing: Side;
  reduce: boolean;
  onFocusSide: () => void;
  onBlurSide: () => void;
  onCommit: (e: React.MouseEvent) => void;
}) {
  const right = align === "right";
  const builder = flavor === "builder";
  const active = state === "active";
  const receding = state === "receding";

  // The liquid does the showing; the door is a transparent half-frame zone
  // that carries the words and the intent.
  const textOpacity = committing ? 0 : reduce ? 1 : receding ? 0 : 1;

  return (
    <div
      className={cn(
        "absolute",
        right
          ? "max-md:inset-x-0 max-md:bottom-0 max-md:h-1/2 md:inset-y-0 md:right-0 md:w-1/2"
          : "max-md:inset-x-0 max-md:top-0 max-md:h-1/2 md:inset-y-0 md:left-0 md:w-1/2"
      )}
    >
      <Link
        href={href}
        data-side={align}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") onFocusSide();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") onBlurSide();
        }}
        onFocus={onFocusSide}
        onBlur={onBlurSide}
        onClick={(e) => {
          e.preventDefault();
          onCommit(e);
        }}
        aria-label={`Enter the ${domain} side`}
        className="group absolute inset-0 flex items-end focus:outline-none active:opacity-95"
      >
        {/* keyboard focus frame — a real element so it paints above the liquid */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 z-40 hidden border-2 border-cream/80 group-focus-visible:block"
        />

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: committing ? 0 : 1, y: 0 }}
          transition={
            committing
              ? { duration: 0.3, ease: GENTLE }
              : { duration: 1, delay: 0.8, ease: GENTLE }
          }
          className={`pointer-events-none absolute top-[13%] leading-none ${
            builder
              ? "font-display text-[22vw] text-[hsl(20_100%_70%_/_0.12)] md:text-[10vw]"
              : "font-serif text-[26vw] font-light text-cream/[0.07] md:text-[12vw]"
          } ${right ? "right-[12%]" : "left-[12%]"}`}
        >
          {index}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: GENTLE }}
          className={`relative z-10 w-full max-w-[85%] p-8 sm:p-10 md:w-[19rem] md:max-w-none lg:w-[21rem] lg:p-12 xl:w-[24rem] xl:p-14 ${
            right ? "md:ml-auto md:text-right" : ""
          }`}
        >
          {/* the words fade while their ink recedes; the liquid never clips them */}
          <motion.div
            animate={{ opacity: textOpacity }}
            transition={{
              duration: committing ? 0.3 : receding ? 0.25 : 0.5,
              ease: GENTLE,
              delay: committing || receding ? 0 : 0.15,
            }}
          >
            <p
              className={`label flex items-center gap-3 ${builder ? "text-[hsl(20_100%_70%)]" : "text-cream/70"} ${right ? "md:justify-end" : ""}`}
            >
              <span
                className={`hidden h-px w-8 md:inline-block ${builder ? "bg-[hsl(20_100%_70%_/_0.5)]" : "bg-cream/50"} ${right ? "order-2" : ""}`}
              />
              {domain}
            </p>
            <h2
              className={`mt-3 text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] ${
                builder
                  ? "font-display text-3xl leading-[1.02] tracking-tight lg:text-4xl xl:text-5xl"
                  : "font-serif text-4xl font-light leading-[0.95] lg:text-5xl xl:text-6xl"
              }`}
            >
              {title}
            </h2>

            {/* the peek — the destination's own texts stagger in, its entrance
                already beginning inside the door */}
            <div
              className="hidden overflow-hidden transition-all md:block"
              style={{
                maxHeight: active && !committing ? "14rem" : 0,
                opacity: active && !committing ? 1 : 0,
                transitionDuration: "600ms",
                transitionTimingFunction: builder ? BOUNCE : "cubic-bezier(0.33,1,0.68,1)",
              }}
            >
              <motion.div
                variants={peekContainer}
                initial="hidden"
                animate={active && !committing ? "show" : "hidden"}
                className={`mt-5 flex flex-col gap-2 ${right ? "items-end" : ""}`}
              >
                {peekLine && (
                  <motion.p
                    variants={peekItem}
                    className="mb-1 font-serif text-lg italic text-cream/85"
                  >
                    {peekLine}
                  </motion.p>
                )}
                {peekItems.map((item, i) => (
                  <motion.p
                    key={item}
                    variants={{
                      hidden: peekItem.hidden,
                      show: {
                        ...peekItem.show,
                        transition: {
                          duration: 0.5,
                          ease: builder ? [0.175, 0.885, 0.32, 1.275] : GENTLE,
                        },
                      },
                    }}
                    className={`flex items-baseline gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/85 ${right ? "flex-row-reverse" : ""}`}
                  >
                    <span
                      className={builder ? "text-[hsl(20_100%_70%)]" : "text-cream/45"}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.p>
                ))}
              </motion.div>
            </div>

            <span
              className={`label mt-6 inline-flex items-center gap-2 underline-offset-4 transition-colors group-focus-visible:underline ${builder ? "text-[hsl(20_100%_70%_/_0.9)] group-hover:text-[hsl(20_100%_70%)]" : "text-cream/80 group-hover:text-cream"} ${right ? "md:flex-row-reverse" : ""}`}
            >
              Step in
              <ArrowRight
                size={13}
                className={`transition-transform duration-500 ${right ? "group-hover:-translate-x-1 md:rotate-180" : "group-hover:translate-x-1"}`}
                style={{ transitionTimingFunction: builder ? BOUNCE : undefined }}
              />
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
}

export default function Chooser() {
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;
  const [side, setSide] = useState<Side>(null);
  const [committing, setCommitting] = useState<Side>(null);
  const [showHint, setShowHint] = useState(false);
  const [fadeAll, setFadeAll] = useState(false); // reduced-motion commit = plain crossfade

  const hasHovered = useRef(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Whether the open side was triggered from a center identity word: the words
  // stay interactive only then — otherwise the faded identity must be inert.
  const openedByWord = useRef(false);
  const [wordFocused, setWordFocused] = useState(false);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The gather is a pointer-and-desktop flourish: below md taps commit directly.
  const foldEnabled = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      foldEnabled.current = mq.matches;
      if (!mq.matches) setSide(null);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Commit is instant when it happens — both worlds are already warm.
  useEffect(() => {
    router.prefetch("/playful");
    router.prefetch("/editorial");
  }, [router]);

  // The hint exists only for visitors who hesitate; never for those who've explored.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasHovered.current) setShowHint(true);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  // Esc releases the gathered ink (focus/hover parity).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        setSide(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      // if some other navigation unmounted us first, the pending commit push
      // must not fire afterwards and hijack it
      if (navTimer.current) clearTimeout(navTimer.current);
    };
  }, []);

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

  // ——— The liquid ———
  // One value: how much of the frame the builder's ink owns. The same spring
  // that once moved a seam now gathers and releases the inks.
  const seamTarget = useMotionValue(50);
  const seamSpring = useSpring(seamTarget, SPRING_PANEL);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return; // reduced motion: still marble, crossfade commit
    seamTarget.set(
      committing === "left"
        ? 100
        : committing === "right"
          ? 0
          : side === "left"
            ? 85
            : side === "right"
              ? 15
              : NEUTRAL_SEAM
    );
  }, [side, committing, reduce, seamTarget]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || side || committing) return; // hold the tilt while gathered
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Enter fast, leave forgiving: gathering starts the instant the cursor
  // arrives; releasing back to the marbled rest waits a beat.
  const focusSide = (s: SideId, viaWord = false) => {
    hasHovered.current = true;
    setShowHint(false);
    if (committing || !foldEnabled.current) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    openedByWord.current = viaWord;
    setSide(s);
    mx.set(0);
    my.set(0);
  };
  const blurSide = () => {
    if (committing) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setSide(null), 180);
  };

  // Hover gathers the ink reversibly; the click completes it: the chosen ink
  // floods the frame, the letterbox dissolves, and the route changes mid-move.
  const commit = (s: SideId, href: string, at?: { x: number; y: number }) => {
    if (committing) return;
    hasHovered.current = true;
    setShowHint(false);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (at && !reduce) {
      window.dispatchEvent(
        new CustomEvent("chooser:stir", { detail: { ...at, s: 1.3 } })
      );
    }
    if (reduce) {
      setCommitting(s);
      setFadeAll(true);
      navTimer.current = setTimeout(() => router.push(href), 320);
      return;
    }
    setSide(s);
    setCommitting(s);
    navTimer.current = setTimeout(() => router.push(href), NAV_AT_MS);
  };

  const stateOf = (mine: SideId): State =>
    side === null ? "neutral" : side === mine ? "active" : "receding";

  // At rest the entrepreneur word leads: near-full cream vs the researcher's 60%.
  const role = (mine: Side) =>
    side === mine
      ? "text-cream"
      : side === null
        ? mine === "left"
          ? "text-cream/95"
          : "text-cream/60"
        : "text-cream/25";

  const onOver = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const zone = (e.target as HTMLElement).closest?.("[data-side]") as HTMLElement | null;
    const z = zone?.dataset.side as SideId | undefined;
    // React's synthetic pointerenter can drop events on fast sweeps; pointerover
    // bubbles natively and self-heals the state (idempotent when already set).
    if (z && z !== side) focusSide(z);
  };

  return (
    <motion.main
      onMouseMove={onMove}
      onPointerOver={onOver}
      animate={{ opacity: fadeAll ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-[100svh] w-full overflow-hidden bg-ink font-serif text-cream"
    >
      <div
        ref={frameRef}
        className={cn(
          "cine-frame absolute inset-3 sm:inset-4 md:inset-5 [perspective:2200px]",
          committing && !reduce && "!inset-0"
        )}
        style={{
          transitionProperty: "top, right, bottom, left",
          transitionDuration: `${COMMIT_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.87,0,0.13,1)",
        }}
      >
        {/* Scene — gentle settle on load, landing at exactly 1:1 for sharpness */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.05, ease: GENTLE }}
          style={{
            rotateX: reduce ? 0 : rotX,
            rotateY: reduce ? 0 : rotY,
            // NB: no preserve-3d — with it, the coplanar canvas/door siblings
            // hit-test by 3D depth sort and Chrome breaks the tie randomly,
            // making the door links intermittently unhittable.
          }}
          className="absolute inset-0"
        >
          {/* CSS fallback split — visible only if WebGL is unavailable */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${MEDIA.city.src})`,
              backgroundSize: "cover",
              backgroundPosition: MEDIA.city.focus,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-[43%] max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:h-[43%] max-md:w-full"
            style={{
              backgroundImage: `url(${MEDIA.bridge.src})`,
              backgroundSize: "cover",
              backgroundPosition: MEDIA.bridge.focus,
            }}
          />

          {/* The two worlds as inks in one liquid */}
          <FluidCanvas
            imgA={MEDIA.city.src}
            imgB={MEDIA.bridge.src}
            focusA={{ x: 0.5, y: 0.55 }}
            focusB={{ x: 0.5, y: 0.55 }}
            bias={seamSpring}
            horizontal={foldEnabled}
            reduce={reduce}
          />

          <div className="scrim-bottom pointer-events-none absolute inset-0 opacity-80" />

          <Door
            href="/playful"
            index="01"
            domain="Entrepreneurship"
            title="The builder."
            peekItems={BUILDER_PEEK}
            align="left"
            flavor="builder"
            state={stateOf("left")}
            committing={committing}
            reduce={reduce}
            onFocusSide={() => focusSide("left")}
            onBlurSide={blurSide}
            onCommit={(e) => commit("left", "/playful", { x: e.clientX, y: e.clientY })}
          />
          <Door
            href="/editorial"
            index="02"
            domain="Research"
            title="The researcher."
            peekLine="Machine learning & quantitative research."
            peekItems={EDITORIAL_PEEK}
            align="right"
            flavor="editorial"
            state={stateOf("right")}
            committing={committing}
            reduce={reduce}
            onFocusSide={() => focusSide("right")}
            onBlurSide={blurSide}
            onCommit={(e) => commit("right", "/editorial", { x: e.clientX, y: e.clientY })}
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
          animate={{ opacity: committing ? 0 : 1 }}
          transition={
            committing
              ? { duration: 0.3 }
              : { delay: 0.9, duration: 1, ease: GENTLE }
          }
          className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-7 py-6 sm:px-10"
        >
          <p className="label text-cream/70">{config.author}</p>
        </motion.div>

        {/* The name re-forms in the CENTER of whichever side gathers (md+): the
            letters that shattered from the center converge here, in that side's
            own voice. */}
        <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-center px-10 pb-[20vh]">
            <ShatterName
              text={`${config.author}.`}
              show={side === "left" && !committing}
              reduce={reduce}
              seed={11}
              className="font-display text-5xl tracking-tight text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] lg:text-6xl xl:text-7xl"
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-center px-10 pb-[20vh]">
            <ShatterName
              text={`${config.author}.`}
              show={side === "right" && !committing}
              reduce={reduce}
              seed={22}
              className="font-serif text-5xl font-light italic text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] lg:text-6xl xl:text-7xl"
            />
          </div>
        </div>

        {/* Centered identity — DISSOLVES while an ink is gathered (the name
            re-forms inside the gathered side). Kept half-visible when a WORD
            holds keyboard focus. */}
        <motion.div
          animate={{
            opacity: committing ? 0 : side ? (wordFocused ? 0.55 : 0) : 1,
            filter:
              reduce || wordFocused
                ? "blur(0px)"
                : side || committing
                  ? "blur(12px)"
                  : "blur(0px)",
          }}
          transition={{
            duration: side || committing ? 0.5 : 0.9,
            ease: GENTLE,
            delay: side || committing ? 0 : 0.1,
          }}
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
            <h1 className="sr-only">{config.author}</h1>
            {/* the name at center — its letters shatter apart when an ink
                gathers, and re-form in the center of that side */}
            <div className="mt-3 flex justify-center">
              <ShatterName
                text={`${config.author}.`}
                show={!side && !committing}
                reduce={reduce}
                seed={0}
                className="font-serif text-4xl font-light leading-[0.95] tracking-tight text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl"
              />
            </div>
            {/* Each word is set in its side's own voice — the fork previewed in type */}
            <motion.div
              variants={introItem}
              className={`mt-5 flex items-baseline justify-center gap-4 ${
                committing || (side && !openedByWord.current)
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
            >
              <Link
                href="/playful"
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") focusSide("left", true);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") blurSide();
                }}
                onFocus={() => {
                  setWordFocused(true);
                  focusSide("left", true);
                }}
                onBlur={() => {
                  setWordFocused(false);
                  blurSide();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  commit("left", "/playful", { x: e.clientX, y: e.clientY });
                }}
                className={`font-display text-lg tracking-tight transition-colors duration-500 hover:text-[hsl(20_100%_70%)] sm:text-2xl ${role("left")}`}
              >
                Entrepreneur
              </Link>
              <span className="font-serif text-xl not-italic text-cream/30 sm:text-3xl">
                /
              </span>
              <Link
                href="/editorial"
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") focusSide("right", true);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") blurSide();
                }}
                onFocus={() => {
                  setWordFocused(true);
                  focusSide("right", true);
                }}
                onBlur={() => {
                  setWordFocused(false);
                  blurSide();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  commit("right", "/editorial", { x: e.clientX, y: e.clientY });
                }}
                className={`font-serif text-xl italic transition-colors duration-500 hover:text-cream sm:text-3xl ${role("right")}`}
              >
                Researcher
              </Link>
            </motion.div>
            {/* Appears only after 4s of hesitation; suppressed once a door is touched */}
            <motion.p
              animate={{ opacity: showHint ? 1 : 0 }}
              transition={{ duration: 0.5, ease: GENTLE }}
              className="mt-5 hidden font-serif text-base italic text-cream/60 sm:block sm:text-lg"
            >
              Take a look at either side.
            </motion.p>
            {/* Mobile escape hatch — the rail lives in the identity block below md */}
            <motion.div
              variants={introItem}
              className={`mt-6 flex items-center justify-center gap-5 md:hidden ${committing ? "pointer-events-none" : "pointer-events-auto"}`}
            >
              <Link href="/research" className="label text-cream/60">
                Research
              </Link>
              <span className="text-cream/30">·</span>
              <Link href="/blogs" className="label text-cream/60">
                Writing
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Rails */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: committing ? 0 : 1 }}
          transition={
            committing
              ? { duration: 0.3 }
              : { delay: 0.95, duration: 0.95, ease: GENTLE }
          }
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden items-center justify-center gap-5 px-6 py-6 md:flex"
        >
          <Link
            href="/research"
            className={`label text-cream/60 transition-colors hover:text-cream ${committing ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            Research
          </Link>
          <span className="text-cream/30">·</span>
          <Link
            href="/blogs"
            className={`label text-cream/60 transition-colors hover:text-cream ${committing ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            Writing
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}
