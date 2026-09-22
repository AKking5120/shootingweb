import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import {
  buildMetadata,
  getLocalBusinessSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { CTA } from "@/components/sections/CTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { getSiteMedia } from "@/lib/site-media";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description:
    "SY Media & Marketing is a Noida-based digital marketing agency offering Google Ads, Meta Ads, social media, content, video, photography, and lead generation services.",
  path: "/",
});

export default async function Home() {
  const [media, siteContent] = await Promise.all([
    getSiteMedia(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          getOrganizationSchema(),
          getLocalBusinessSchema(),
          getWebSiteSchema(),
        ]}
      />
      <Navbar />
      <main>
        <Hero
          heroBackground={media.heroBackground}
          heroCollage={media.heroCollage}
        />
        <ServicesMarquee />
        <Services />
        <About image={media.aboutImage} />
        <Portfolio items={media.portfolio} />
        <Process
          steps={siteContent.processSteps}
          title={siteContent.processTitle}
          eyebrow={siteContent.processEyebrow}
        />
        <Results />
        <CTA background={media.ctaBackground} />
        <Testimonials />
        <FAQ items={siteContent.faq} />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
