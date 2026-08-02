import HeroSection from "@/components/editorial/hero";
import PublicationsSection from "@/components/editorial/publications";
import PageReady from "@/components/chooser/PageReady";

export const metadata = {
  title: "Research | Nicholas Chen",
  description:
    "Machine-learning research by Nicholas Chen — reinforcement learning, human decision-making, and generative models for protein design. Publications and Google Scholar.",
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
