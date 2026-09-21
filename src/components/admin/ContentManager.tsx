"use client";

import { useState, FormEvent } from "react";
import type { FaqItem, PopupOffer, ProcessStep, SiteContent } from "@/types";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white focus:border-accent-blue focus:outline-none";

export function ContentManager({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setError("");

    const res = await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (res.ok) {
      setSaved(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save content");
    }
    setLoading(false);
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const faq = [...content.faq];
    faq[index] = { ...faq[index], [field]: value };
    setContent({ ...content, faq });
  };

  const addFaq = () => {
    setContent({
      ...content,
      faq: [
        ...content.faq,
        { id: `faq-${Date.now()}`, question: "", answer: "" },
      ],
    });
  };

  const removeFaq = (index: number) => {
    setContent({
      ...content,
      faq: content.faq.filter((_, i) => i !== index),
    });
  };

  const updateStep = (
    index: number,
    field: keyof ProcessStep,
    value: string
  ) => {
    const steps = [...content.processSteps];
    steps[index] = { ...steps[index], [field]: value };
    setContent({ ...content, processSteps: steps });
  };

  const updatePopup = (field: keyof PopupOffer, value: string | boolean) => {
    setContent({
      ...content,
      popup: { ...content.popup, [field]: value },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-4xl space-y-12">
      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">FAQ Manager</h2>
        <p className="text-sm text-muted">Edit common questions on the homepage.</p>

        {content.faq.map((item, index) => (
          <div key={item.id} className="space-y-3 rounded-xl border border-border/60 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Question {index + 1}</p>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-xs text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              className={inputClass}
              value={item.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
              placeholder="Question"
              required
            />
            <textarea
              className={inputClass}
              rows={3}
              value={item.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              placeholder="Answer"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addFaq}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted hover:text-white"
        >
          + Add Question
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">Process Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            className={inputClass}
            value={content.processEyebrow}
            onChange={(e) =>
              setContent({ ...content, processEyebrow: e.target.value })
            }
            placeholder="Section eyebrow"
          />
          <input
            className={inputClass}
            value={content.processTitle}
            onChange={(e) =>
              setContent({ ...content, processTitle: e.target.value })
            }
            placeholder="Section title"
          />
        </div>

        {content.processSteps.map((step, index) => (
          <div key={step.number} className="space-y-3 rounded-xl border border-border/60 p-4">
            <p className="text-sm font-semibold text-white">Step {step.number}</p>
            <input
              className={inputClass}
              value={step.title}
              onChange={(e) => updateStep(index, "title", e.target.value)}
              placeholder="Title"
            />
            <textarea
              className={inputClass}
              rows={2}
              value={step.description}
              onChange={(e) => updateStep(index, "description", e.target.value)}
              placeholder="Description"
            />
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-white">Popup / Offers</h2>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={content.popup.enabled}
            onChange={(e) => updatePopup("enabled", e.target.checked)}
            className="rounded"
          />
          Show &quot;Free Consultation&quot; popup on website
        </label>
        <input
          className={inputClass}
          value={content.popup.title}
          onChange={(e) => updatePopup("title", e.target.value)}
          placeholder="Popup title"
        />
        <textarea
          className={inputClass}
          rows={3}
          value={content.popup.message}
          onChange={(e) => updatePopup("message", e.target.value)}
          placeholder="Popup message"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            className={inputClass}
            value={content.popup.ctaText}
            onChange={(e) => updatePopup("ctaText", e.target.value)}
            placeholder="Button text"
          />
          <input
            className={inputClass}
            value={content.popup.ctaHref}
            onChange={(e) => updatePopup("ctaHref", e.target.value)}
            placeholder="Button link (e.g. /#contact)"
          />
        </div>
      </section>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && <p className="text-sm text-green-400">Content saved successfully!</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gradient-brand px-8 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save All Content"}
      </button>
    </form>
  );
}
