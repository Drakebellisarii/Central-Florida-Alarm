import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteFrame } from "@/components/SiteFrame";
import { SITE_URL, BUSINESS } from "@/lib/seo";

const notoSerifDisplay = localFont({
  src: [
    {
      path: "./fonts/Noto_Serif_Display/NotoSerifDisplay-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/Noto_Serif_Display/NotoSerifDisplay-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-noto-serif-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Smart Home Automation & Security in Orlando, FL | Central Florida Automation Services",
  description:
    "Premium smart home automation and security integration for Greater Orlando estates and businesses. More than 50,000 installations across Florida and Georgia since 1968.",
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_US",
    url: SITE_URL,
    title:
      "Smart Home Automation & Security in Orlando, FL | Central Florida Automation Services",
    description:
      "Premium smart home automation and security integration for Greater Orlando estates and businesses since 1968.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "A custom Orlando home integrated by Central Florida Automation Services",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/images/cfas-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${notoSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="bg-white font-sans text-navy-deep antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-bone focus:px-5 focus:py-3 focus:font-sans focus:text-[13px] focus:uppercase focus:tracking-wide2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteFrame />
        <Navbar />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
