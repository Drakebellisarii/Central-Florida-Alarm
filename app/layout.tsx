import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteFrame } from "@/components/SiteFrame";
import { SITE_URL, BUSINESS } from "@/lib/seo";

// Gloock — heavy display serif, reserved for the hero and page h1s.
const gloock = localFont({
  src: [
    {
      path: "./fonts/Noto_Serif_Display/DM_Serif_Text,Gloock/Gloock/Gloock-Regular.woff2",
      style: "normal",
    },
  ],
  variable: "--font-gloock",
  display: "swap",
});

// DM Serif Text — the secondary serif used for the rest of the headings.
const dmSerifText = localFont({
  src: [
    {
      path: "./fonts/Noto_Serif_Display/DM_Serif_Text,Gloock/DM_Serif_Text/DMSerifText-Regular.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Noto_Serif_Display/DM_Serif_Text,Gloock/DM_Serif_Text/DMSerifText-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});

// Plus Jakarta Sans — body and all smaller UI text.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  // 700 intentionally omitted — nothing on the site uses font-bold.
  weight: ["300", "400", "500", "600"],
});

// M PLUS Rounded 1c — soft rounded display, reserved for oversized numerals.
// Self-hosted (Latin subset only, weights 100/300 as used) rather than
// next/font/google: that font's fallback-metrics lookup fails locally (no
// entry in Next's bundled metrics DB) and its CSS payload is large enough
// that the dev-mode 3s fetch timeout would repeatedly abort and retry,
// spamming "The user aborted a request." during `next dev` startup.
const mPlusRounded = localFont({
  src: [
    {
      path: "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-numeral",
  display: "swap",
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
    <html
      lang="en"
      className={`${gloock.variable} ${dmSerifText.variable} ${jakarta.variable} ${mPlusRounded.variable}`}
    >
      <body className="bg-white font-sans text-navy-deep antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-bone focus:px-5 focus:py-3 focus:font-sans focus:text-[0.8125rem] focus:uppercase focus:tracking-wide2 focus:text-ink"
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
