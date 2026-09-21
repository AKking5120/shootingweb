"use client";

import {
  TrendingUp,
  Smartphone,
  PenTool,
  Video,
  Camera,
  Target,
  Rocket,
} from "lucide-react";
import type { ServiceIcon } from "@/data/site";
import { services } from "@/data/site";

const iconMap: Record<ServiceIcon, typeof TrendingUp> = {
  "trending-up": TrendingUp,
  smartphone: Smartphone,
  "pen-tool": PenTool,
  video: Video,
  camera: Camera,
  target: Target,
  rocket: Rocket,
};

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {services.map((service) => {
        const Icon = iconMap[service.icon];
        return (
          <div
            key={service.id}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
          >
            <Icon size={16} style={{ color: service.accent }} strokeWidth={1.5} />
            <span className="text-sm font-semibold text-white">
              {service.title}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: service.accent }}
            >
              {service.highlight}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ServicesMarquee() {
  return (
    <section
      aria-label="Our services"
      className="relative z-20 border-y border-white/8 bg-surface/90 py-4 backdrop-blur-md"
    >
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee">
          <MarqueeTrack />
          <MarqueeTrack />
        </div>
      </div>
    </section>
  );
}
