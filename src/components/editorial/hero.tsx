"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CinematicPanel from "@/components/motion/cinematic-panel";
import HeroAtmosphere from "@/components/motion/hero-atmosphere";
import DecodeText from "@/components/motion/decode-text";
import SocialHandles from "@/components/site/social-handles";
import { MEDIA } from "@/data/media";
import { config } from "@/data/config";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const [first, last] = config.author.split(" ");

  return (
    <CinematicPanel
      id="hero"
      media={MEDIA.heroLandscape}
      mediaMobile={MEDIA.heroPortrait}
      priority
      ambient={<HeroAtmosphere />}
      contentClassName="justify-end pb-28 sm:pb-32 md:justify-center md:pb-24"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl"
      >
        <motion.div variants={item}>
          <DecodeText
            as="p"
            text={`${config.author} — EECS @ UC Berkeley`.toUpperCase()}
            className="label"
          />
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-5 font-serif text-6xl font-light leading-[0.92] tracking-tight text-cream sm:text-7xl lg:text-8xl"
        >
          {first}
          <span className="text-cream/45"> {last}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-serif text-2xl italic text-cream/80 sm:text-3xl"
        >
          Machine learning &amp; quantitative research.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-cream/70 text-pretty sm:text-xl"
        >
          I build reinforcement-learning systems, market-data pipelines, and
          honest backtests — and I care about getting the science right, not
          just the result.
        </motion.p>

        <motion.div variants={item}>
          <SocialHandles className="mt-8" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="label text-[0.6rem]">Scroll</span>
        <ChevronDown size={16} className="animate-scroll-cue text-cream/60" />
      </motion.div>
    </CinematicPanel>
  );
};

export default HeroSection;
