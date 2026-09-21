"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles } from "lucide-react";
import type { PopupOffer } from "@/types";

const STORAGE_KEY = "sy_consultation_popup_dismissed";

interface ConsultationPopupProps {
  popup: PopupOffer;
}

export function ConsultationPopup({ popup }: ConsultationPopupProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!popup.enabled || pathname.startsWith("/admin")) return;

    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, [popup.enabled, pathname]);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible || !popup.enabled) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-label="Close popup"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-popup-title"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-accent-blue/30 bg-surface shadow-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" />

        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:text-white"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="p-8 pt-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-blue">
            <Sparkles size={14} />
            Limited Offer
          </div>

          <h2 id="consultation-popup-title" className="font-display text-2xl font-bold text-white">
            {popup.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{popup.message}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={popup.ctaHref}
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white"
            >
              {popup.ctaText}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted hover:text-white"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
