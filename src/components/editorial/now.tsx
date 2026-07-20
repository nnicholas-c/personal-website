"use client";

import { motion } from "framer-motion";
import CinematicPanel from "@/components/motion/cinematic-panel";
import DecodeText from "@/components/motion/decode-text";
import { MEDIA } from "@/data/media";
import { NOW_INTRO, NOW_ITEMS } from "@/data/now";

const viewport = { once: true, margin: "-15% 0px" } as const;

const NowSection = () => {
  return (
    <CinematicPanel
      id="now"
      media={MEDIA.now}
      scrim="both"
      contentClassName="justify-center py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <DecodeText as="p" text="CURRENTLY" className="label" />

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl font-light leading-tight text-cream sm:text-6xl"
            >
              What I&apos;m
              <br />
              working on.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 max-w-md font-serif text-xl italic leading-relaxed text-cream/70"
            >
              {NOW_INTRO}
            </motion.p>
          </div>

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {NOW_ITEMS.map((it, i) => (
              <motion.li
                key={it.meta}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: 0.12 * i }}
              >
                <p className="label mb-2 text-cream/45">{it.meta}</p>
                <p className="font-serif text-lg leading-relaxed text-cream/85 text-pretty">
                  {it.text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </CinematicPanel>
  );
};

export default NowSection;
