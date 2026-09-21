import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NATALIE SAX HAIR & BEAUTY | Luxury Hair Salon & Atelier Kungsbacka",
  description:
    "An exclusive, woman-owned luxury salon at Rosengatan 19 C, Kungsbacka. Bespoke balayage, precision haircutting, blonde transformations, and restorative hair spa rituals.",
  keywords: [
    "Natalie Sax",
    "hair salon Kungsbacka",
    "luxury beauty salon",
    "bespoke balayage",
    "blonde specialist",
    "haute bridal updo",
    "hair spa ritual",
    "Rosengatan 19 C",
  ],
  openGraph: {
    title: "NATALIE SAX HAIR & BEAUTY | Luxury Hair Salon & Atelier",
    description:
      "Exclusive hair salon dedicated to confidence, blonde artistry, precision cutting, and hair wellness at Rosengatan 19 C, Kungsbacka.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#09080b] text-[#f4efe6] antialiased selection:bg-[#e61c5d] selection:text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
