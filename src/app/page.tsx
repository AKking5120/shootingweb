import { Navbar } from "@/components/sections/Navbar";
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
import { Footer } from "@/components/sections/Footer";
import { getSiteMedia } from "@/lib/site-media";

export default async function Home() {
  const media = await getSiteMedia();

  return (
    <>
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
        <Process />
        <Results />
        <CTA background={media.ctaBackground} />
        <Testimonials />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
