"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio } from "@/data/site";
import { resolveImageSrc } from "@/lib/image-utils";
import type { PortfolioItem } from "@/types";

interface PortfolioProps {
  items?: PortfolioItem[];
}

export function Portfolio({ items = portfolio }: PortfolioProps) {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Work"
            title="Selected Work"
            className="!mb-0"
          />
          <Link
            href="https://www.instagram.com/symediamarketing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent-blue transition-colors hover:text-accent-purple"
          >
            View All Projects →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((project, i) => {
            const imageSrc = resolveImageSrc(project.image);
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  unoptimized={imageSrc.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{project.category}</p>
                </div>

                <span
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-gradient-brand group-hover:border-transparent"
                  aria-hidden="true"
                >
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
