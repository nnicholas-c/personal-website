import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import ScrollProgress from "@/components/ui/scroll-progress";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  return {
    title: `${post.metadata.title} | Nicholas Chen`,
    description: post.metadata.summary,
  };
}

function formatDate(input: string) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

const components = {
  h1: (props: any) => (
    <h2
      className="mt-12 font-serif text-3xl font-normal text-cream sm:text-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-10 font-serif text-2xl font-normal text-cream sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 font-serif text-xl font-normal text-cream/90 sm:text-2xl"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="mt-5 font-serif text-lg leading-relaxed text-cream/75 text-pretty sm:text-xl"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="mt-5 space-y-2 pl-5 font-serif text-lg text-cream/75" {...props} />
  ),
  ol: (props: any) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 font-serif text-lg text-cream/75"
      {...props}
    />
  ),
  li: (props: any) => (
    <li
      className="relative font-serif text-lg leading-relaxed before:absolute before:-left-5 before:top-[0.7em] before:h-px before:w-2.5 before:bg-cream/35"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="my-6 border-l border-cream/30 pl-5 font-serif text-xl italic text-cream/70"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded bg-cream/10 px-1.5 py-0.5 font-mono text-sm text-cream/90"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="my-6 overflow-x-auto rounded-md border border-cream/10 bg-black/40 p-4 font-mono text-sm"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="link-underline text-cream"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  return (
    <main className="relative z-10 min-h-screen font-serif">
      {/* Keeps the reading surface dark if the site is toggled to light mode. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[1] bg-[#0a0a0c] dark:hidden"
      />
      <ScrollProgress className="bg-cream/70" />

      <article className="mx-auto max-w-2xl px-6 pb-28 pt-32 sm:px-8">
        <Link
          href="/blogs"
          className="label inline-flex items-center gap-2 text-cream/55 transition-colors hover:text-cream"
        >
          <ArrowLeft size={13} /> All writing
        </Link>

        <p className="label mt-12 text-cream/45">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
          {post.metadata.title}
        </h1>
        {post.metadata.summary && (
          <p className="mt-4 font-serif text-xl italic leading-relaxed text-cream/70">
            {post.metadata.summary}
          </p>
        )}
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-wider text-cream/40">
            {post.metadata.tags.join(" · ")}
          </p>
        )}
        <div className="hairline mt-8 border-t" />

        <div className="mt-2">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
    </main>
  );
}
