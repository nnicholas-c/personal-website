"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SECTIONS } from "@/data/sections";
import { config } from "@/data/config";
import { useScrollTo } from "@/components/motion/use-scroll-to";
import { cn } from "@/lib/utils";

const NAV = SECTIONS.filter((s) => s.nav);

export default function SiteHeader() {
  const scrollTo = useScrollTo();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    if (document.getElementById(id)) scrollTo(id);
    else router.push(`/#${id}`);
  };

  const [first, last] = config.author.split(" ");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-colors duration-500",
        scrolled
          ? "border-b border-cream/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-cream transition-opacity hover:opacity-70"
          aria-label="Home — choose experience"
        >
          {first}
          <span className="text-cream/45"> {last}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              className="label text-cream/55 transition-colors hover:text-cream"
            >
              {s.label}
            </button>
          ))}
          <Link
            href="/research"
            className="label text-cream/55 transition-colors hover:text-cream"
          >
            Research
          </Link>
          <Link
            href={config.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="label rounded-full border border-cream/25 px-4 py-1.5 text-cream/80 transition-colors hover:border-cream/60 hover:text-cream"
          >
            Résumé
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center text-cream md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-cream/10 bg-ink/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {NAV.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(s.id)}
                className="label border-b border-cream/5 py-3 text-left text-cream/70"
              >
                {s.label}
              </button>
            ))}
            <Link
              href="/research"
              onClick={() => setMenuOpen(false)}
              className="label border-b border-cream/5 py-3 text-left text-cream/70"
            >
              Research
            </Link>
            <Link
              href={config.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="label py-3 text-left text-cream/70"
            >
              Résumé ↗
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
