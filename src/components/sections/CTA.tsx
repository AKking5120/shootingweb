"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ctaBackground } from "@/data/site";

export function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl border border-border"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-center p-10 md:p-16">
              <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-white">
                READY TO GROW
                <br />
                YOUR BRAND?
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted">
                Let&apos;s make something people remember.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="#contact">Start a Project →</Button>
                <Button href="#contact" variant="outline">Talk to Us</Button>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src={ctaBackground}
                alt="Cinematic mountain landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:from-background lg:via-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
