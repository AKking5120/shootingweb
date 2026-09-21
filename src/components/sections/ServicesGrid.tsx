"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Smartphone,
  PenTool,
  Video,
  Camera,
  Target,
  Rocket,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import type { Service, ServiceIcon } from "@/data/site";
import { services } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<ServiceIcon, typeof TrendingUp> = {
  "trending-up": TrendingUp,
  smartphone: Smartphone,
  "pen-tool": PenTool,
  video: Video,
  camera: Camera,
  target: Target,
  rocket: Rocket,
};

interface ServicesGridProps {
  variant?: "default" | "landing";
  showCta?: boolean;
}

export function ServicesGrid({
  variant = "default",
  showCta = true,
}: ServicesGridProps) {
  const isLanding = variant === "landing";

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        isLanding ? "lg:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3"
      )}
    >
      {services.map((service, i) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={i}
          showCta={showCta}
          large={isLanding}
        />
      ))}
    </div>
  );
}

function ServiceCard({
  service,
  index,
  showCta,
  large,
}: {
  service: Service;
  index: number;
  showCta: boolean;
  large: boolean;
}) {
  const Icon = iconMap[service.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-surface-elevated/80 backdrop-blur-sm transition-all duration-300",
        service.featured
          ? "border-white/15 shadow-[0_0_60px_rgba(59,130,246,0.08)]"
          : "border-border hover:border-white/12"
      )}
      style={{
        boxShadow: service.featured
          ? `0 8px 40px ${service.accent}18`
          : undefined,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${service.accent}, ${service.accent}88)`,
        }}
      />

      {service.featured && (
        <div
          className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: `${service.accent}33`, color: service.accent }}
        >
          <Sparkles size={10} />
          Featured
        </div>
      )}

      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: service.accent }}
      />

      <div className={cn("relative", large ? "p-8" : "p-7")}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${service.accent}22`,
              color: service.accent,
            }}
          >
            {service.highlight}
          </span>
        </div>

        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border transition-colors"
          style={{
            borderColor: `${service.accent}44`,
            backgroundColor: `${service.accent}15`,
            color: service.accent,
          }}
        >
          <Icon size={22} strokeWidth={1.5} />
        </div>

        <h3
          className={cn(
            "font-bold text-white",
            large ? "text-xl" : "text-lg"
          )}
        >
          {service.title}
        </h3>

        <p className="mt-1 text-sm font-medium" style={{ color: service.accent }}>
          {service.adTagline}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-white/80"
            >
              <Check
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: service.accent }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {showCta && (
          <Link
            href={`/services?service=${service.id}#enquire`}
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
            style={{ color: service.accent }}
          >
            Get a quote
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
