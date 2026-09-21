"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/types";

interface FAQProps {
  items: FaqItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (!items.length) return null;

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Questions"
          description="Quick answers about our services, process, and how we help brands grow."
          align="center"
        />

        <div className="mx-auto mt-4 max-w-3xl space-y-3">
          {items.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-border bg-surface-elevated/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-white">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-accent-blue transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-border px-6 py-5 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
