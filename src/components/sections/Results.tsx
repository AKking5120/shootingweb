"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { results } from "@/data/site";
import { motion } from "framer-motion";

export function Results() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />

      <div className="relative mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Impact"
          title="Numbers that tell a story."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result, i) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-surface-elevated/60 p-8 text-center backdrop-blur-sm"
            >
              <AnimatedCounter
                value={result.value}
                prefix={result.prefix}
                suffix={result.suffix}
                decimals={result.decimals ?? 0}
              />
              <p className="mt-3 text-sm text-muted">{result.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted/70">
          Results vary by campaign, industry and objective.
        </p>
      </div>
    </section>
  );
}
