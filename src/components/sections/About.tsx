"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { aboutImage, stats } from "@/data/site";
import { resolveImageSrc } from "@/lib/image-utils";

interface AboutProps {
  image?: string;
}

export function About({ image = aboutImage }: AboutProps) {
  const imageSrc = resolveImageSrc(image);
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image
                src={imageSrc}
                alt="Creative workspace with laptop and camera equipment"
                width={600}
                height={480}
                className="h-[400px] w-full object-cover md:h-[480px]"
                unoptimized={imageSrc.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold shadow-lg">
              SY
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
              About SY
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-white">
              Ideas that get attention.{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Strategies that drive growth.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              SY Media &amp; Marketing is a full-service digital agency focused on
              helping brands grow through data-driven marketing, compelling content
              and creative storytelling.
            </p>
            <div className="mt-8">
              <Button href="#contact" variant="outline">Learn More →</Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-surface-elevated/40 p-8 text-center backdrop-blur-sm"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
              />
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
