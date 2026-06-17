import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ReactLenis";
import GrainOverlay from "@/components/GrainOverlay";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "LifeOS — The Operating System for Ambitious Lives",
  description: "Run your life with the same intentionality you bring to your work. A design concept unifying goals, projects, focus, energy, reflection, and decisions into one calm, sophisticated system.",
  metadataBase: new URL("https://lifeos-showcase.vercel.app"),
  openGraph: {
    title: "LifeOS — The Operating System for Ambitious Lives",
    description: "Run your life with the same intentionality you bring to your work. A design concept unifying goals, projects, focus, energy, reflection, and decisions into one calm, sophisticated system.",
    url: "https://lifeos-showcase.vercel.app",
    siteName: "LifeOS Showcase",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeOS — The Operating System for Ambitious Lives",
    description: "Run your life with the same intentionality you bring to your work. A design concept unifying goals, projects, focus, energy, reflection, and decisions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} antialiased bg-brand-bg text-foreground`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <GrainOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
