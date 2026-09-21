"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { services } from "@/data/site";

export function Services() {
  const featuredCount = services.filter((s) => s.featured).length;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
      />

      <div className="relative mx-auto max-w-content px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything Your Brand Needs"
            description="From Google & Meta ads to creative content — 7 core services, all designed to grow your brand and drive real results."
            className="mb-0"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex shrink-0 flex-col gap-3 sm:flex-row"
          >
            <div className="flex items-center gap-2 rounded-xl border border-accent-blue/30 bg-accent-blue/10 px-4 py-2.5">
              <Megaphone size={18} className="text-accent-blue" />
              <span className="text-sm font-semibold text-white">
                {services.length} Services · {featuredCount} Featured for Ads
              </span>
            </div>
            <Button href="/services" variant="outline" className="whitespace-nowrap">
              View All Services
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        </div>

        <ServicesGrid />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-accent-blue/20 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-blue/10 p-8 text-center md:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
            Ready to run ads?
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
            Launch Google & Meta campaigns that convert
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Use our dedicated services page as your ad landing URL. Every service
            is highlighted with clear CTAs for leads.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/services#enquire">Get Free Consultation</Button>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline"
            >
              Open ad landing page
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
