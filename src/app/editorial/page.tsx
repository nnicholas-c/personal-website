import HeroSection from "@/components/editorial/hero";
import NowSection from "@/components/editorial/now";
import ExperienceSection from "@/components/editorial/experience";
import WorkSection from "@/components/editorial/work";
import WritingSection, { WritingEntry } from "@/components/editorial/writing";
import ContactSection from "@/components/editorial/contact";
import SectionPager from "@/components/motion/section-pager";
import { getBlogPosts } from "@/lib/mdx";

export default function EditorialHome() {
  const posts: WritingEntry[] = getBlogPosts()
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title,
      publishedAt: p.metadata.publishedAt,
      summary: p.metadata.summary,
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <>
      <main className="relative">
        <HeroSection />
        <NowSection />
        <ExperienceSection />
        <WorkSection />
        <WritingSection posts={posts} />
        <ContactSection />
      </main>
      <SectionPager />
    </>
  );
}
