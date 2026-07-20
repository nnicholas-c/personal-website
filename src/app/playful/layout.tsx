import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";

export default function PlayfulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <AppOverlays />
    </>
  );
}
