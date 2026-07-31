"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA } from "@/data/media";
import { config } from "@/data/config";
import { SECTIONS } from "@/data/sections";
import projects from "@/data/projects";

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
const COMMIT = [0.87, 0, 0.13, 1] as const; // expo.inOut — frame-to-full-bleed on click
const COMMIT_MS = 900;
const NAV_AT_MS = 650; // route change fires past the fast middle of the commit move
// The rest state deliberately favors the entrepreneur side: the default persona
// gets more shoreline (57/43), a brighter identity word, and a louder numeral.
const NEUTRAL_SEAM = 57;

// ONE spring, one clock, for everything hover-driven — including the shoreline
// itself. It responds the instant the cursor moves, settles softly, and
// retargets mid-flight when the cursor sweeps between sides. The whole
// takeover moves as one. (Builder bounce lives only in peek/arrow micro-motion.)
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
  id,
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
  imageSrc,
  imageFocus,
  imgX,
  panelRef,
  className,
}: {
  id: SideId;
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
  onCommit: () => void;
  imageSrc: string;
  imageFocus: string;
  imgX: MotionValue<number>;
  panelRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}) {
  const right = align === "right";
  const builder = flavor === "builder";
  const active = state === "active";
  const receding = state === "receding";
  const chosen = committing === id;
  const dismissed = committing !== null && committing !== id;

  const imgScale = reduce ? 1 : chosen ? 1.04 : active ? 1.06 : 1.03;
  // Depth is sold by dimming, never blur.
  const dim = reduce ? 0 : dismissed ? 0.75 : receding ? 0.55 : 0;
  // The sliver can't hold the text column — fade it fully, fast out, eased back.
  const textOpacity = committing ? 0 : reduce ? 1 : receding ? 0 : 1;

  const visualTransition = committing
    ? { duration: COMMIT_MS / 1000, ease: COMMIT }
    : SPRING_PANEL;

  return (
    // Both doors are full-frame layers; the wave clip on the top layer decides
    // who owns how much of the frame. Text never moves, never reflows — only
    // the shoreline travels.
    <div ref={panelRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <Link
        href={href}
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
          onCommit();
        }}
        aria-label={`Enter the ${domain} side`}
        className="group absolute inset-0 flex items-end overflow-hidden focus:outline-none active:opacity-95"
      >
        {/* keyboard focus frame — inset far enough to survive the scene's 1.02
            scale + frame clipping; a real element so it paints above the imagery */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 z-40 hidden border-2 border-cream/80 group-focus-visible:block"
        />
        <motion.div
          className="absolute inset-0"
          style={{ x: imgX }}
          animate={{ scale: imgScale, opacity: active || chosen ? 1 : 0.9 }}
          transition={visualTransition}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imageFocus }}
          />
        </motion.div>

        <div className="scrim-bottom pointer-events-none absolute inset-0 opacity-80" />
        {/* the world you didn't pick darkens as the wave washes over it */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-ink"
          animate={{ opacity: dim }}
          transition={committing ? { duration: 0.4, ease: GENTLE } : SPRING_PANEL}
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
          } ${right ? "right-[6%]" : "left-[6%]"}`}
        >
          {index}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: GENTLE }}
          className={`relative z-10 w-full max-w-[85%] p-8 sm:p-10 md:w-[19rem] md:max-w-none lg:w-[21rem] lg:p-12 xl:w-[24rem] xl:p-14 ${
            right ? "md:ml-auto md:text-right" : "max-md:mb-[47svh]"
          }`}
        >
          {/* fade (not clip) the text as the wave takes this side: out fast
              (before the shoreline reaches the column), back in after it recedes */}
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
  // The takeover is a pointer-and-desktop flourish: gate it off below md so
  // stacked touch layouts never shift (WCAG 1.4.13 double-tap trap).
  const foldEnabled = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      foldEnabled.current = mq.matches;
      // crossing into the stacked layout with a side open would strand the
      // seam at 85% — collapse to neutral instead
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

  // Esc collapses the takeover (focus/hover parity).
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
  // Counter-directional idle drift: the two worlds slide a few px in opposite
  // directions against the cursor, so they read as two worlds, not one plane.
  const parallax = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), {
    stiffness: 60,
    damping: 20,
  });
  const parallaxInv = useTransform(parallax, (v) => -v);

  // ——— The shoreline ———
  // The seam between the two worlds is a living wave: it idles with a slow
  // drift, swells while it travels (amplitude follows the seam's velocity),
  // and washes across the frame on hover/commit. Drawn every frame straight
  // into clip-path — no React renders, no layout, compositor-only.
  const seamTarget = useMotionValue(50); // % of the frame owned by the left world
  // Water physics: slightly underdamped so the shoreline sloshes a touch past
  // its target and settles back — liquid momentum, not a mechanical stop.
  const seamSpring = useSpring(seamTarget, { stiffness: 64, damping: 15, mass: 1 });
  const frameRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const mistRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return; // reduced motion: straight 50/50 seam, crossfade commit
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

  const lastWave = useRef(0);
  const lastSize = useRef(0);
  // Frame-relative cursor for the water dip; active only while idling in neutral.
  const cursor = useRef({ x: 0, y: 0, active: false });
  // Low-passed wave state: amplitude and the cursor dip ease toward their
  // targets a few % per frame, so the water breathes instead of snapping.
  const ampS = useRef(0);
  const dipS = useRef(0);
  const dipYS = useRef(0);
  // Whether the open side was triggered from a center identity word: the words
  // stay interactive only then — otherwise the faded identity must be inert, or
  // its invisible links flip the fold and can navigate to the wrong world.
  const openedByWord = useRef(false);
  const [wordFocused, setWordFocused] = useState(false);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useAnimationFrame((t) => {
    const frame = frameRef.current;
    const panel = rightPanelRef.current;
    if (!frame || !panel) return;
    const W = frame.clientWidth;
    const H = frame.clientHeight;
    const vel = Math.abs(seamSpring.getVelocity()) / 100;
    // While the seam travels, redraw every frame; at idle the drift is ~1px/s,
    // so 30fps is indistinguishable and halves the ambient paint cost. Under
    // reduced motion the seam is static — draw once, again only on resize.
    const nearSeam =
      cursor.current.active &&
      Math.abs(cursor.current.x - (seamSpring.get() / 100) * W) < 320;
    const horizontal = foldEnabled.current; // md+: vertical shoreline; below: stacked, horizontal
    const pos = (reduce ? NEUTRAL_SEAM : seamSpring.get()) / 100;
    const tt = reduce ? 0 : t / 1000;
    // The wave flattens as the shoreline nears either edge, so the commit
    // flood exits clean with no crest poking back into the frame.
    const edgeCalm = Math.max(0, Math.min(1, Math.min(pos, 1 - pos) * 12));
    // The idle sea itself breathes on a slow cycle — calm spells, then swells.
    const tide = 5 * Math.sin(tt * 0.09 + 2.1);
    const ampTarget =
      (reduce
        ? 0
        : horizontal
          ? Math.min(15 + tide + vel * W * 0.055, 40)
          : Math.min(9 + tide * 0.5 + vel * H * 0.055, 24)) * edgeCalm;
    // The water yields around the cursor — pushed gently away from it, fading
    // with the cursor's distance to the shoreline. A finger resting on water.
    let dipTarget = 0;
    if (horizontal && !reduce && cursor.current.active) {
      const dxc = cursor.current.x - pos * W;
      dipTarget = -Math.sign(dxc) * 16 * Math.exp(-(dxc * dxc) / (2 * 230 * 230));
    }
    const settled =
      Math.abs(ampTarget - ampS.current) < 0.4 && Math.abs(dipTarget - dipS.current) < 0.3;
    const sizeKey = W * 100000 + H;
    if (sizeKey === lastSize.current) {
      if (reduce && lastWave.current === -1) return;
      if (!reduce && vel < 0.02 && !nearSeam && settled && t - lastWave.current < 33) return;
    }
    lastSize.current = sizeKey;
    lastWave.current = reduce ? -1 : t;
    // Everything breathes: amplitude swells and subsides over ~1/4s, the dip
    // eases in and trails the cursor like displaced water.
    ampS.current += (ampTarget - ampS.current) * 0.07;
    dipS.current += (dipTarget - dipS.current) * 0.11;
    dipYS.current += (cursor.current.y - dipYS.current) * 0.13;
    const amp = ampS.current;
    // Water, not metronome — and never the same water twice. Three swell
    // layers (the middle one travelling against the others) whose WEIGHTS and
    // WAVELENGTHS drift on independent slow cycles, plus a long meander that
    // comes and goes: the shoreline keeps re-composing itself — calm and
    // nearly straight one minute, billowing the next. The swell leans harder
    // while being dragged.
    const drag = Math.min(vel * 1.8, 2);
    const m1 = 0.52 + 0.2 * Math.sin(tt * 0.11 + 1.3);
    const m2 = 0.26 + 0.12 * Math.sin(tt * 0.073 + 4.1);
    const m3 = 0.13 + 0.07 * Math.sin(tt * 0.157 + 2.2);
    const meander = (0.5 + 0.5 * Math.sin(tt * 0.045 + 0.7)) * 0.42;
    const wl1 = 230 + 55 * Math.sin(tt * 0.05);
    const wl2 = 96 + 24 * Math.sin(tt * 0.083 + 2.9);
    const surface = (u: number, span: number) => {
      const env = 0.68 + 0.32 * Math.sin((u / span) * Math.PI * 1.2 + tt * 0.3);
      let w =
        (Math.sin(u / wl1 + tt * 0.7 + drag) * m1 +
          Math.sin(u / wl2 - tt * 1.05 - drag * 0.6) * m2 +
          Math.sin(u / 47 + tt * 1.5) * m3 +
          Math.sin(u / 540 + tt * 0.22 + 5.6) * meander) *
        amp *
        env;
      if (Math.abs(dipS.current) > 0.2) {
        const dyc = u - dipYS.current;
        w += Math.exp(-(dyc * dyc) / 52000) * dipS.current;
      }
      return w;
    };

    const N = 36;
    const pts: string[] = [];
    let d = "";
    if (horizontal) {
      const x0 = pos * W;
      for (let i = 0; i <= N; i++) {
        const y = (H * i) / N;
        const x = x0 + surface(y, H);
        pts.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
        d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      panel.style.clipPath = `polygon(${pts.join(",")}, 100% 100%, 100% 0%)`;
    } else {
      const y0 = pos * H;
      for (let i = 0; i <= N; i++) {
        const x = (W * i) / N;
        const y = y0 + surface(x, W);
        pts.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
        d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      panel.style.clipPath = `polygon(${pts.join(",")}, 100% 100%, 0% 100%)`;
    }
    for (const m of mistRefs.current) m?.setAttribute("d", d);
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || side || committing) {
      cursor.current.active = false;
      return; // hold still while a side is expanded
    }
    const fr = frameRef.current?.getBoundingClientRect();
    if (fr) {
      cursor.current = { x: e.clientX - fr.left, y: e.clientY - fr.top, active: true };
    }
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Enter fast, leave forgiving: opening is instant; collapsing back to neutral
  // waits a beat so grazing the shoreline doesn't ping-pong the layout. Opening
  // a side also glides the tilt back to straight-on.
  const focusSide = (s: SideId, viaWord = false) => {
    hasHovered.current = true;
    setShowHint(false);
    if (committing || !foldEnabled.current) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    openedByWord.current = viaWord;
    cursor.current.active = false;
    setSide(s);
    mx.set(0);
    my.set(0);
  };
  const blurSide = () => {
    if (committing) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setSide(null), 180);
  };

  // Hover performs the click, reversibly; the click completes it: the wave
  // floods the frame, the letterbox dissolves, and the route changes mid-move.
  const commit = (s: SideId, href: string) => {
    if (committing) return;
    hasHovered.current = true;
    setShowHint(false);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
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

  return (
    <motion.main
      onMouseMove={onMove}
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
        {/* Scene — gentle settle on load, tightened so the frame is still by ~1.9s */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.02 }}
          transition={{ duration: 1.4, delay: 0.05, ease: GENTLE }}
          style={{
            rotateX: reduce ? 0 : rotX,
            rotateY: reduce ? 0 : rotY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0"
        >
          <Door
            id="left"
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
            onCommit={() => commit("left", "/playful")}
            imageSrc={MEDIA.city.src}
            imageFocus={MEDIA.city.focus}
            imgX={parallax}
            className="z-0"
          />
          <Door
            id="right"
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
            onCommit={() => commit("right", "/editorial")}
            imageSrc={MEDIA.bridge.src}
            imageFocus={MEDIA.bridge.focus}
            imgX={parallaxInv}
            panelRef={rightPanelRef}
            className="z-10 [clip-path:inset(57%_0_0_0)] md:[clip-path:inset(0_0_0_57%)]"
          />

          {/* the shoreline is not a line — it's a band of mist where the worlds
              dissolve into each other: stacked soft strokes riding the wave */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          >
            <g
              style={{
                opacity: committing ? 0 : 1,
                transition: "opacity 0.4s ease-out",
              }}
            >
              {[
                { w: 100, o: 0.035 },
                { w: 62, o: 0.055 },
                { w: 30, o: 0.1 },
                { w: 10, o: 0.16 },
              ].map((m, i) => (
                <path
                  key={m.w}
                  ref={(el) => {
                    mistRefs.current[i] = el;
                  }}
                  fill="none"
                  stroke={`rgb(226 232 244 / ${m.o})`}
                  strokeWidth={m.w}
                  strokeLinecap="round"
                />
              ))}
            </g>
          </svg>
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
          <p className="label hidden text-cream/50 sm:block">
            San Francisco · Portfolio
          </p>
        </motion.div>

        {/* Centered identity — fades back while a side is expanded. Kept
            half-visible when a WORD holds keyboard focus, so the focused link
            never disappears from under its own focus. */}
        <motion.div
          animate={{
            opacity: committing ? 0 : side ? (wordFocused ? 0.55 : 0) : 1,
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
            <motion.h1
              variants={introItem}
              className="mt-3 font-serif text-4xl font-light leading-[0.95] tracking-tight text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl"
            >
              {config.author}.
            </motion.h1>
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
                  commit("left", "/playful");
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
                  commit("right", "/editorial");
                }}
                className={`font-serif text-xl italic transition-colors duration-500 hover:text-cream sm:text-3xl ${role("right")}`}
              >
                Researcher
              </Link>
            </motion.div>
            {/* Appears only after 4s of hesitation; suppressed forever once a door is touched */}
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
