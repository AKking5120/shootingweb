"use client";

import { useState, FormEvent } from "react";
import type { SiteSettings } from "@/types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white focus:border-accent-blue focus:outline-none";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) setSaved(true);
    setLoading(false);
  };

  const fields: { key: keyof SiteSettings; label: string }[] = [
    { key: "name", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "tagline", label: "Tagline" },
    { key: "positioning", label: "Positioning" },
    { key: "description", label: "Description" },
    { key: "instagram", label: "Instagram URL" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "youtube", label: "YouTube URL" },
  ];

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
      {fields.map(({ key, label }) => (
        <div key={key}>
          <label className="mb-2 block text-sm text-muted">{label}</label>
          <input
            className={inputClass}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}

      {saved && (
        <p className="text-sm text-green-400">Settings saved successfully!</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gradient-brand px-8 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
