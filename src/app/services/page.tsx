import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Results } from "@/components/sections/Results";
import { ServicesEnquiry } from "@/components/sections/ServicesEnquiry";
import { siteConfig, services, stats } from "@/data/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name} — Digital Marketing & Creative`,
  description:
    "Google Ads, Meta Ads, social media, content, video, photography & lead generation. Full-service digital marketing for brands that want to grow.",
  keywords: [
    "Google Ads agency",
    "Meta Ads",
    "social media management",
    "content marketing",
    "video production",
    "product photography",
    "lead generation",
    "digital marketing India",
  ],
  openGraph: {
    title: `Our Services | ${siteConfig.name}`,
    description:
      "7 premium digital marketing services — from performance ads to creative content.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar solid />
      <main>
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.12),transparent_50%)]" />

          <div className="relative mx-auto max-w-content px-6 lg:px-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
              {services.length} Core Services
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white">
              Full-Service Marketing
              <span className="bg-gradient-text bg-clip-text text-transparent">
                {" "}
                Built to Scale
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              {siteConfig.mainMessage} Every service below is ready for your
              next campaign — use this page as your ad landing URL.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#enquire">Get Free Quote →</Button>
              <Button href="/#work" variant="outline">See Our Work</Button>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-surface-elevated/60 px-6 py-5 text-center backdrop-blur-sm"
                >
                  <p className="font-display text-3xl font-bold text-white">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesMarquee />

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
                All Highlights
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
                Pick the service you need
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Each card shows what&apos;s included, key benefits, and a direct
                quote CTA — perfect for ad traffic.
              </p>
            </div>

            <ServicesGrid variant="landing" />
          </div>
        </section>

        <Results />

        <Suspense fallback={null}>
          <ServicesEnquiry />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
