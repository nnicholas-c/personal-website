import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, GraduationCap } from "lucide-react";
import { config } from "@/data/config";
import { MEDIA } from "@/data/media";
import {
  APPOINTMENTS,
  HIGHLIGHTS,
  PUBLICATIONS,
  RESEARCH_INTRO,
  TALKS,
} from "@/data/research";
import Reveal from "@/components/motion/reveal";
import DrawUnderline from "@/components/motion/draw-underline";
import CountUp from "@/components/motion/count-up";
import ScrollTimeline, {
  TimelineNode,
} from "@/components/motion/scroll-timeline";

export const metadata = {
  title: "Research | Nicholas Chen",
  description:
    "Publications, research appointments, and talks by Nicholas Chen — GPU-accelerated simulation and ML, models of human judgment, and reliable AI agents.",
};

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen font-serif">
      {/* Cinematic misty-forest backdrop, held in the inset frame */}
      <div
        aria-hidden
        className="cine-frame fixed inset-3 -z-10 sm:inset-4 md:inset-5"
      >
        <Image
          src={MEDIA.research.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover brightness-[0.42] contrast-[1.2] grayscale"
          style={{ objectPosition: MEDIA.research.focus }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.62) 48%, rgba(10,10,12,0.88) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10">
        <Link
          href="/"
          className="label inline-flex items-center gap-2 text-cream/55 transition-colors hover:text-cream"
        >
          <ArrowLeft size={13} /> Home
        </Link>

        {/* Hero */}
        <div className="min-h-[46vh]">
          <p className="label mt-12">Research</p>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-cream sm:text-7xl">
            Work{" "}
            <span className="italic text-cream/50">
              in <DrawUnderline>progress.</DrawUnderline>
            </span>
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/75 text-pretty">
            {RESEARCH_INTRO}
          </p>
          <a
            href={config.social.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-7 inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-1.5 text-cream/70 transition-colors hover:border-cream/50 hover:text-cream"
          >
            <GraduationCap size={13} /> Google Scholar{" "}
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Highlights: count up as they scroll in */}
        <section
          aria-label="Highlights"
          className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} index={i}>
              <CountUp
                value={h.value}
                suffix={h.suffix}
                className="block font-serif text-3xl font-light tabular-nums text-cream sm:text-4xl"
              />
              <p className="mt-2 font-mono text-[0.62rem] uppercase leading-relaxed tracking-wider text-cream/50">
                {h.label}
              </p>
            </Reveal>
          ))}
        </section>

        {/* Publications */}
        <section className="mt-16">
          <p className="label text-cream/45">Publications</p>
          <div className="mt-6 flex flex-col">
            {PUBLICATIONS.map((pub, i) => (
              <Reveal
                as="article"
                index={i}
                key={pub.title}
                className="group hairline flex flex-col border-t py-8"
              >
                <p className="label mb-3 text-cream/45">
                  {pub.status === "Accepted · Spotlight" && (
                    <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cream align-middle" />
                  )}
                  {pub.status} · {pub.venue} · {pub.year}
                </p>
                <h2 className="font-serif text-2xl font-normal leading-snug text-cream sm:text-3xl">
                  {pub.title}
                  {pub.workingTitle && (
                    <span className="ml-2 align-middle font-mono text-[0.6rem] uppercase tracking-wider text-cream/35">
                      working title
                    </span>
                  )}
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-cream/55">
                  {pub.authors}
                </p>
                <p className="mt-4 font-serif text-lg leading-relaxed text-cream/70 text-pretty">
                  {pub.abstract}
                </p>
                {pub.links && pub.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    {pub.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label inline-flex items-center gap-1 text-cream/55 transition-colors hover:text-cream"
                      >
                        {l.label} <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
            <div className="hairline border-t" />
          </div>
        </section>

        {/* Appointments */}
        <section className="mt-20">
          <p className="label text-cream/45">Appointments</p>
          <div className="mt-6">
            <ScrollTimeline>
              {APPOINTMENTS.map((a, i) => (
                <Reveal
                  as="article"
                  index={i}
                  key={a.lab}
                  className="relative grid gap-3 py-8 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10"
                >
                  <TimelineNode />
                  <div className="label pt-1 text-cream/45">{a.period}</div>
                  <div>
                    <h3 className="font-serif text-xl font-normal leading-snug text-cream sm:text-2xl">
                      {a.role}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cream/55">
                      {a.lab}
                    </p>
                    <p className="mt-3 font-serif text-lg leading-relaxed text-cream/70 text-pretty">
                      {a.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ScrollTimeline>
          </div>
        </section>

        {/* Talks */}
        {TALKS.length > 0 && (
          <section className="mt-20">
            <p className="label text-cream/45">Talks</p>
            <div className="mt-6 flex flex-col">
              {TALKS.map((t) => (
                <article key={t.title} className="hairline border-t py-8">
                  <p className="label mb-2 text-cream/45">{t.year}</p>
                  <h3 className="font-serif text-xl font-normal italic leading-snug text-cream sm:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-cream/55">
                    {t.venue}
                  </p>
                </article>
              ))}
              <div className="hairline border-t" />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
