import type { Metadata, Viewport } from "next";
import { Figtree, Marcellus } from "next/font/google";
import "./globals.css";
import { BRAND, SITE_URL } from "@/lib/constants";
import { HERO } from "@/lib/seo";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Discover Our Products | mettä muse",
  description:
    "Shop handcrafted fashion, accessories and home goods from independent artisans. Premium quality, fair trade, thoughtfully made.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Discover Our Products | mettä muse",
    description: HERO.description,
    url: "/",
    siteName: BRAND.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Our Products | mettä muse",
    description: HERO.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${marcellus.variable}`}>
      <body>{children}</body>
    </html>
  );
}
