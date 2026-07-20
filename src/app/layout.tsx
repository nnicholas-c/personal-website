import type { Metadata } from "next";
import {
  Inter,
  Archivo_Black,
  Cormorant_Garamond,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Script from "next/script";
import { Providers } from "@/components/providers";
import SmoothScroll from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Editorial pair, used by the Writing / reading pages.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, archivoBlack.variable, serif.variable, mono.variable, "font-display"].join(" ")} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {process.env.UMAMI_DOMAIN && process.env.UMAMI_SITE_ID && (
          <Script
            defer
            src={process.env.UMAMI_DOMAIN}
            data-website-id={process.env.UMAMI_SITE_ID}
          ></Script>
        )}
        {/* <Analytics /> */}
      </head>
      <body>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
