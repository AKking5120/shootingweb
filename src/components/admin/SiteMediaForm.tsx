"use client";

import { useEffect, useState, FormEvent } from "react";
import { ImagePicker } from "@/components/admin/ImagePicker";
import type { SiteMedia } from "@/types";

export function SiteMediaForm({ initialMedia }: { initialMedia: SiteMedia }) {
  const [media, setMedia] = useState<SiteMedia>(initialMedia);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMedia(initialMedia);
  }, [initialMedia]);

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white focus:border-accent-blue focus:outline-none";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const res = await fetch("/api/admin/site-media", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(media),
    });

    if (res.ok) setSaved(true);
    setLoading(false);
  };

  const updateCollage = (
    index: number,
    field: "src" | "alt" | "label",
    value: string
  ) => {
    const collage = [...media.heroCollage];
    collage[index] = { ...collage[index], [field]: value };
    setMedia({ ...media, heroCollage: collage });
  };

  const updatePortfolio = (
    index: number,
    field: "title" | "category" | "image" | "href",
    value: string
  ) => {
    const portfolio = [...media.portfolio];
    portfolio[index] = { ...portfolio[index], [field]: value };
    setMedia({ ...media, portfolio });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-4xl space-y-10">
      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">Hero Section</h2>
        <ImagePicker
          label="Hero Background"
          category="hero"
          value={media.heroBackground}
          onChange={(path) => setMedia({ ...media, heroBackground: path })}
          required
        />

        {media.heroCollage.map((item, index) => (
          <div key={index} className="space-y-3 rounded-xl border border-border/60 p-4">
            <p className="text-sm font-semibold text-white">Collage {index + 1}</p>
            <ImagePicker
              label="Image"
              category="hero"
              value={item.src}
              onChange={(path) => updateCollage(index, "src", path)}
              required
            />
            <input
              className={inputClass}
              value={item.label}
              onChange={(e) => updateCollage(index, "label", e.target.value)}
              placeholder="Label"
            />
            <input
              className={inputClass}
              value={item.alt}
              onChange={(e) => updateCollage(index, "alt", e.target.value)}
              placeholder="Alt text"
            />
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">About Section</h2>
        <ImagePicker
          label="About Image"
          category="about"
          value={media.aboutImage}
          onChange={(path) => setMedia({ ...media, aboutImage: path })}
          required
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">CTA Section</h2>
        <ImagePicker
          label="CTA Background"
          category="cta"
          value={media.ctaBackground}
          onChange={(path) => setMedia({ ...media, ctaBackground: path })}
          required
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">Portfolio / Our Work</h2>
        {media.portfolio.map((item, index) => (
          <div key={item.id} className="space-y-3 rounded-xl border border-border/60 p-4">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <ImagePicker
              label="Project Image"
              category="portfolio"
              value={item.image}
              onChange={(path) => updatePortfolio(index, "image", path)}
              required
            />
            <input
              className={inputClass}
              value={item.title}
              onChange={(e) => updatePortfolio(index, "title", e.target.value)}
              placeholder="Title"
            />
            <input
              className={inputClass}
              value={item.category}
              onChange={(e) => updatePortfolio(index, "category", e.target.value)}
              placeholder="Category"
            />
            <input
              className={inputClass}
              value={item.href}
              onChange={(e) => updatePortfolio(index, "href", e.target.value)}
              placeholder="Link URL"
            />
          </div>
        ))}
      </section>

      {saved && (
        <p className="text-sm text-green-400">Website images saved to Supabase!</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gradient-brand px-8 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Website Images"}
      </button>
    </form>
  );
}
