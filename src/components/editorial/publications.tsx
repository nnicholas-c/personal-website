import { ArrowUpRight } from "lucide-react";
import { PUBLICATIONS, APPOINTMENTS } from "@/data/research";

export default function PublicationsSection() {
  return (
    <section id="publications" className="relative bg-ink">
      <div className="mx-auto max-w-3xl px-6 pb-28 pt-24 sm:px-10">
        <p className="label text-cream/45">Publications</p>
        <div className="mt-6 flex flex-col">
          {PUBLICATIONS.map((pub) => (
            <article
              key={pub.title}
              className="hairline flex flex-col border-t py-8"
            >
              <p className="label mb-3 text-cream/45">
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
            </article>
          ))}
          <div className="hairline border-t" />
        </div>

        {APPOINTMENTS.length > 0 && (
          <div className="mt-20">
            <p className="label text-cream/45">Research appointments</p>
            <div className="mt-6 flex flex-col">
              {APPOINTMENTS.map((a) => (
                <article
                  key={a.lab}
                  className="hairline grid gap-3 border-t py-8 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10"
                >
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
                </article>
              ))}
              <div className="hairline border-t" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
