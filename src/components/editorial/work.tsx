"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CinematicPanel from "@/components/motion/cinematic-panel";
import DecodeText from "@/components/motion/decode-text";
import projects, { Project } from "@/data/projects";
import { MEDIA } from "@/data/media";

const viewport = { once: true, margin: "-10% 0px" } as const;

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const primary = project.live || project.github;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
      className="hairline flex flex-col border-t pt-6"
    >
      <p className="label mb-3 text-cream/45">
        {project.category}
        {project.status ? ` · ${project.status}` : ""}
      </p>

      <h3 className="font-serif text-2xl font-normal leading-snug text-cream sm:text-3xl">
        {primary ? (
          <Link
            href={primary}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>

      <p className="mt-3 font-serif text-lg italic leading-relaxed text-cream/70 text-pretty">
        {project.description}
      </p>

      <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-wider text-cream/40">
        {project.tags.join(" · ")}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-1 text-cream/55 transition-colors hover:text-cream"
          >
            GitHub <ArrowUpRight size={12} />
          </Link>
        )}
        {project.live && (
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-1 text-cream/55 transition-colors hover:text-cream"
          >
            Live <ArrowUpRight size={12} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

const WorkSection = () => {
  return (
    <CinematicPanel
      id="work"
      media={MEDIA.work}
      scrim="bottom"
      credit={false}
      ambient={<div className="absolute inset-0 bg-ink/75" />}
      contentClassName="justify-center py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <DecodeText as="p" text="SELECTED WORK" className="label" />
        <h2 className="mt-6 max-w-2xl font-serif text-5xl font-light leading-tight text-cream sm:text-6xl">
          Things I&apos;ve
          <span className="text-cream/45"> built.</span>
        </h2>
        <p className="mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-cream/70">
          Research platforms, quant experiments, and a few things in between —
          from USACO Gold to shipped products.
        </p>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectEntry key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </CinematicPanel>
  );
};

export default WorkSection;
