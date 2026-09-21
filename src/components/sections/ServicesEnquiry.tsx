"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Contact } from "@/components/sections/Contact";
import { getServiceById } from "@/data/site";

export function ServicesEnquiry() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const selectedService = serviceId ? getServiceById(serviceId) : undefined;

  return (
    <section id="enquire" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="relative mx-auto max-w-content px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
            Start Your Project
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            {selectedService
              ? `Enquire about ${selectedService.title}`
              : "Tell us what you need"}
          </h2>
          {selectedService && (
            <p className="mx-auto mt-3 max-w-lg text-muted">
              {selectedService.adTagline} — we&apos;ll get back within 24 hours.
            </p>
          )}
        </motion.div>

        <Contact
          defaultService={selectedService?.title}
          compact
        />
      </div>
    </section>
  );
}
