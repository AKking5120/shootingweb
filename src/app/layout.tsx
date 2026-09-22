import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat } from "next/font/google";
import { siteConfig } from "@/data/site";
import { AdsTracking } from "@/components/AdsTracking";
import { ConsultationPopup } from "@/components/ConsultationPopup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSiteContent } from "@/lib/site-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
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
  metadataBase: new URL(getSiteUrl()),
  ...buildMetadata({
    title: `${siteConfig.name} | Digital Marketing • Media • Creative`,
    description: siteConfig.description,
    path: "/",
  }),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Digital Marketing",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.jpg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-white antialiased">
        <AdsTracking />
        {children}
        <ConsultationPopup popup={siteContent.popup} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
