import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";
import { config } from "@/data/config";

const base = config.site.replace(/\/$/, "");
const url = `${base}/playful`;
const title = "Nicholas Chen — Builder";
const description =
  "Things Nicholas Chen has built — projects, experiments, and the occasional useful thing shipped end to end.";

// /playful/page.tsx is a client component and can't export metadata, so the
// distinct title/description and correct canonical/og:url live here instead of
// inheriting the homepage's verbatim (which mislabeled shares as the root).
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    images: [{ url: config.ogImg, width: 800, height: 600, alt: "Portfolio preview" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [config.ogImg],
  },
};

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
