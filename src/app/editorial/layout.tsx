import SiteHeader from "@/components/site/header";
import EditorialFooter from "@/components/editorial/footer";
import Cursor from "@/components/motion/cursor";

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-ink font-serif text-cream">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      {children}
      <EditorialFooter />
      <Cursor />
    </div>
  );
}
