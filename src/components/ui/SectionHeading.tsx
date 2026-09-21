"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12 md:mb-16",
        isCenter && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
          {eyebrow}
        </span>
      )}
      <h2
        className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white"
        dangerouslySetInnerHTML={{
          __html: title.replace(
            /\*\*(.*?)\*\*/g,
            '<span class="bg-gradient-text bg-clip-text text-transparent">$1</span>'
          ),
        }}
      />
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
