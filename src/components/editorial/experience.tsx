"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, SKILLS, SkillNames } from "@/data/constants";
import DecodeText from "@/components/motion/decode-text";

const DOI = "DOI: 10.36838/v7i4.29";
const PAPER_URL =
  "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume7-issue4/IJHSR_2025_74_29.pdf";

const viewport = { once: true, margin: "-12% 0px" } as const;

function renderPoint(point: string) {
  if (!point.includes(DOI)) return point;
  const [before, after] = point.split(DOI);
  return (
    <>
      {before}
      <a
        href={PAPER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-cream"
      >
        {DOI}
      </a>
      {after}
    </>
  );
}

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-5xl px-6 py-28 sm:px-10 md:py-36"
    >
      <DecodeText as="p" text="EXPERIENCE" className="label" />
      <h2 className="mt-6 max-w-2xl font-serif text-5xl font-light leading-tight text-cream sm:text-6xl">
        Where I&apos;ve
        <span className="text-cream/45"> worked.</span>
      </h2>

      <div className="mt-16 flex flex-col">
        {EXPERIENCE.map((exp, i) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.2) }}
            className="hairline grid gap-4 border-t py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10"
          >
            <div className="label pt-1 text-cream/45">
              {exp.startDate} — {exp.endDate}
            </div>

            <div>
              <h3 className="font-serif text-2xl font-normal leading-snug text-cream sm:text-3xl">
                {exp.title}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cream/55">
                {exp.company}
              </p>

              <ul className="mt-5 space-y-3">
                {exp.description.map((point, j) => (
                  <li
                    key={j}
                    className="relative pl-5 font-serif text-lg leading-relaxed text-cream/75 text-pretty before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-cream/35"
                  >
                    {renderPoint(point)}
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-wider text-cream/40">
                {exp.skills
                  .map((name) => SKILLS[name as SkillNames].label)
                  .join(" · ")}
              </p>
            </div>
          </motion.article>
        ))}
        <div className="hairline border-t" />
      </div>
    </section>
  );
};

export default ExperienceSection;
