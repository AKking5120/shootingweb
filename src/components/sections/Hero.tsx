"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroImages, siteConfig } from "@/data/site";
import { resolveImageSrc } from "@/lib/image-utils";
import type { HeroCollageItem } from "@/types";

interface HeroProps {
  heroBackground?: string;
  heroCollage?: HeroCollageItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

export function Hero({
  heroBackground = heroImages.background,
  heroCollage = heroImages.collage,
}: HeroProps) {
  const backgroundSrc = resolveImageSrc(heroBackground);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt="Cinematic videographer filming city skyline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized={backgroundSrc.startsWith("http")}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-glow opacity-60" />

      <div className="relative z-10 mx-auto grid w-full max-w-content items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue"
          >
            {siteConfig.positioning}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
          >
            WE TURN
            <br />
            ATTENTION INTO
            <br />
            <span className="bg-gradient-text bg-clip-text text-transparent">
              GROWTH.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-lg text-lg text-muted"
          >
            {siteConfig.mainMessage}
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 font-[family-name:var(--font-caveat)] text-2xl text-white/90"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="#contact">Start a Project →</Button>
            <Button href="#work" variant="outline">View Our Work</Button>
          </motion.div>
        </div>

        <div className="relative hidden h-[480px] lg:block">
          {heroCollage.map((item, i) => {
            const collageSrc = resolveImageSrc(item.src);
            const positions = [
              "left-0 top-0 w-[220px]",
              "right-0 top-12 w-[200px]",
              "left-16 bottom-16 w-[240px]",
              "right-8 bottom-0 w-[190px]",
            ];
            const delays = ["", "animation-delay-1000", "animation-delay-2000", ""];

            return (
              <motion.div
                key={item.alt}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
                className={`absolute ${positions[i]} animate-float ${delays[i]} overflow-hidden rounded-2xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-sm`}
              >
                <div className="relative h-28 overflow-hidden">
                  <Image
                    src={collageSrc}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="240px"
                    unoptimized={collageSrc.startsWith("http")}
                  />
                </div>
                <p className="px-4 py-3 text-xs font-semibold text-muted">
                  {item.label}
                </p>
              </motion.div>
            );
          })}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-4 right-4 font-[family-name:var(--font-caveat)] text-xl text-white/60 -rotate-6"
          >
            Better Ideas, Bigger Impact
          </motion.p>
        </div>
      </div>
    </section>
  );
}
