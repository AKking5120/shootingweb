"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/site";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          title="Trusted by brands, chosen for results."
          align="center"
        />

        {/* Desktop grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-surface-elevated/40 p-8 backdrop-blur-sm"
            >
              <Quote size={28} className="mb-4 text-accent-blue/60" />
              <p className="flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-white">{item.role}</p>
                <p className="text-xs text-muted">{item.industry}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated/40 p-8 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Quote size={28} className="mb-4 text-accent-blue/60" />
                <p className="text-sm leading-relaxed text-muted">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-white">
                    {testimonials[current].role}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonials[current].industry}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-white transition-colors hover:border-accent-blue"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-accent-blue"
                      : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-white transition-colors hover:border-accent-blue"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
