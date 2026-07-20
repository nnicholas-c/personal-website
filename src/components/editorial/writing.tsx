"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import DecodeText from "@/components/motion/decode-text";

export type WritingEntry = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
};

const viewport = { once: true, margin: "-12% 0px" } as const;

function formatDate(input: string) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

const WritingSection = ({ posts }: { posts: WritingEntry[] }) => {
  return (
    <section
      id="writing"
      className="relative mx-auto w-full max-w-5xl px-6 py-28 sm:px-10 md:py-36"
    >
      <DecodeText as="p" text="WRITING" className="label" />
      <h2 className="mt-6 max-w-2xl font-serif text-5xl font-light leading-tight text-cream sm:text-6xl">
        Notes &amp;
        <span className="text-cream/45"> essays.</span>
      </h2>
      <p className="mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-cream/70">
        Occasional writing on machine learning, markets, and the things I get
        curious about.
      </p>

      <div className="mt-14 flex flex-col">
        {posts.length === 0 && (
          <p className="hairline border-t pt-10 font-serif text-lg italic text-cream/55">
            More soon.
          </p>
        )}
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.24) }}
          >
            <Link
              href={`/blogs/${post.slug}`}
              className="group hairline grid gap-3 border-t py-8 md:grid-cols-[140px_minmax(0,1fr)] md:gap-10"
            >
              <div className="label pt-1 text-cream/45">
                {formatDate(post.publishedAt)}
              </div>
              <div>
                <h3 className="flex items-start gap-2 font-serif text-2xl font-normal leading-snug text-cream transition-colors sm:text-3xl">
                  <span className="link-underline">{post.title}</span>
                  <ArrowUpRight
                    size={18}
                    className="mt-2 shrink-0 text-cream/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cream/80"
                  />
                </h3>
                <p className="mt-2 font-serif text-lg italic leading-relaxed text-cream/65 text-pretty">
                  {post.summary}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="hairline border-t" />
      </div>
    </section>
  );
};

export default WritingSection;
