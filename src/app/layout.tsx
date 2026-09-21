import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat } from "next/font/google";
import { siteConfig } from "@/data/site";
import { AdsTracking } from "@/components/AdsTracking";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SY Media & Marketing | Digital Marketing • Media • Creative",
  description: siteConfig.description,
  keywords: [
    "digital marketing",
    "social media management",
    "content creation",
    "video production",
    "photography",
    "Google Ads",
    "Meta Ads",
    "brand growth",
    "lead generation",
    "performance marketing",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "SY Media & Marketing | Digital Marketing • Media • Creative",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SY Media & Marketing | Digital Marketing • Media • Creative",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-white antialiased">
        <AdsTracking />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
