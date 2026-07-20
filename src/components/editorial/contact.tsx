"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import CinematicPanel from "@/components/motion/cinematic-panel";
import DecodeText from "@/components/motion/decode-text";
import SocialHandles from "@/components/site/social-handles";
import { config } from "@/data/config";
import { MEDIA } from "@/data/media";

const viewport = { once: true, margin: "-15% 0px" } as const;

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <CinematicPanel
      id="contact"
      media={MEDIA.contact}
      scrim="both"
      contentClassName="justify-center py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <DecodeText as="p" text="SAY HI" className="label" />
        <h2 className="mt-6 font-serif text-6xl font-light leading-none text-cream sm:text-7xl">
          Get in touch.
        </h2>
        <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/75 text-pretty">
          I read every email. Whether it&apos;s research, a role, or a good
          problem worth chasing — reach out and I&apos;ll get back to you.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`mailto:${config.email}`}
            className="link-underline font-serif text-2xl text-cream sm:text-3xl"
          >
            {config.email}
          </Link>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-cream/60 transition-colors hover:border-cream/50 hover:text-cream"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <SocialHandles className="mt-10" />
      </motion.div>
    </CinematicPanel>
  );
};

export default ContactSection;
