"use client";

import { motion } from "framer-motion";
import { ChevronDown, GraduationCap, ArrowUpRight } from "lucide-react";
import CinematicPanel from "@/components/motion/cinematic-panel";
import HeroAtmosphere from "@/components/motion/hero-atmosphere";
import DecodeText from "@/components/motion/decode-text";
import SocialHandles from "@/components/site/social-handles";
import { MEDIA } from "@/data/media";
import { config } from "@/data/config";
import { RESEARCH_INTRO, RESEARCH_INTERESTS } from "@/data/research";

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
      contentClassName="justify-end pb-24 sm:pb-28 md:justify-center md:pb-24"
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
          className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/75 text-pretty sm:text-xl"
        >
          {RESEARCH_INTRO}
        </motion.p>

        <motion.ul
          variants={item}
          className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/55"
        >
          {RESEARCH_INTERESTS.map((interest, i) => (
            <li key={interest} className="flex items-center gap-3">
              {i > 0 && <span className="text-cream/25">/</span>}
              {interest}
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href={config.social.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-cream/80 transition-colors hover:border-cream/60 hover:text-cream"
          >
            <GraduationCap size={13} /> Google Scholar <ArrowUpRight size={12} />
          </a>
          <SocialHandles />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="label text-[0.6rem]">Publications below</span>
        <ChevronDown size={16} className="animate-scroll-cue text-cream/60" />
      </motion.div>
    </CinematicPanel>
  );
};

export default HeroSection;
