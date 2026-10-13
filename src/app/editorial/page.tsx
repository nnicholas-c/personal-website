import HeroSection from "@/components/editorial/hero";
import PublicationsSection from "@/components/editorial/publications";
import PageReady from "@/components/chooser/PageReady";

export const metadata = {
  title: "Nicholas Chen — Machine learning research",
  description:
    "Machine-learning research by Nicholas Chen — GPU-accelerated simulation and ML, models of human judgment, and reliable AI agents. Publications and Google Scholar.",
};

export default function EditorialHome() {
  return (
    <>
      <main className="relative">
        <HeroSection />
        <PublicationsSection />
      </main>
      <PageReady />
    </>
  );
}
