"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps as defaultSteps } from "@/data/site";
import type { ProcessStep } from "@/types";

interface ProcessProps {
  steps?: ProcessStep[];
  title?: string;
  eyebrow?: string;
}

export function Process({
  steps = defaultSteps,
  title = "Simple Steps. Big Results.",
  eyebrow = "Our Process",
}: ProcessProps) {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          align="center"
        />

        <div className="relative mt-4">
          <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative text-center lg:text-left"
              >
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent-blue bg-background text-xs font-bold text-accent-blue lg:mx-0">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
