import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Writing | Nicholas Chen",
  description:
    "Notes and essays by Nicholas Chen on machine learning, markets, research, and ideas worth turning over.",
};

function formatDate(input: string) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

export default function WritingIndex() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-3xl px-6 pb-28 pt-32 font-serif sm:px-8">
      {/* Keeps the reading surface dark if the site is toggled to light mode. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[1] bg-[#0a0a0c] dark:hidden"
      />
      <Link
        href="/"
        className="label inline-flex items-center gap-2 text-cream/55 transition-colors hover:text-cream"
      >
        <ArrowLeft size={13} /> Back home
      </Link>

      <p className="label mt-12">Writing</p>
      <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] text-cream sm:text-6xl">
        Thinking <span className="italic text-cream/50">out loud.</span>
      </h1>
      <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/70 text-pretty">
        A place for notes, essays, and half-formed views — on machine learning,
        markets, research, and whatever else I&apos;m turning over. Some are
        conclusions; most are me thinking through a problem in public.
      </p>

      <div className="mt-16 flex flex-col">
        {posts.length === 0 && (
          <p className="hairline border-t pt-10 font-serif text-lg italic text-cream/55">
            First posts coming soon.
          </p>
        )}
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group hairline grid gap-3 border-t py-8 md:grid-cols-[130px_minmax(0,1fr)] md:gap-10"
          >
            <div className="label pt-1.5 text-cream/45">
              {formatDate(post.metadata.publishedAt)}
            </div>
            <div>
              <h2 className="flex items-start gap-2 font-serif text-2xl font-normal leading-snug text-cream sm:text-3xl">
                <span className="link-underline">{post.metadata.title}</span>
                <ArrowUpRight
                  size={18}
                  className="mt-2 shrink-0 text-cream/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream/80"
                />
              </h2>
              <p className="mt-2 font-serif text-lg italic leading-relaxed text-cream/65 text-pretty">
                {post.metadata.summary}
              </p>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-wider text-cream/40">
                  {post.metadata.tags.join(" · ")}
                </p>
              )}
            </div>
          </Link>
        ))}
        <div className="hairline border-t" />
      </div>
    </main>
  );
}
