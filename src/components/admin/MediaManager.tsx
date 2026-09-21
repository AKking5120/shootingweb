"use client";

import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";
import { Trash2 } from "lucide-react";
import { imageCategories } from "@/data/media-defaults";
import { resolveImageSrc } from "@/lib/image-utils";
import type { MediaFile } from "@/types";

export function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    category: "blogs",
    path: "",
    label: "",
    alt: "",
  });

  const loadFiles = async () => {
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setFiles(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ category: form.category, path: "", label: "", alt: "" });
      await loadFiles();
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from library?")) return;
    await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    await loadFiles();
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white focus:border-accent-blue focus:outline-none";

  const selectedCategory = imageCategories.find((c) => c.id === form.category);

  return (
    <div className="grid gap-10 xl:grid-cols-2">
      <div>
        <h2 className="text-lg font-bold text-white">Register GitHub Image</h2>
        <p className="mt-2 text-sm text-muted">
          After uploading to{" "}
          <code className="text-accent-blue">{selectedCategory?.folder}</code>,
          register the path here so it appears in pickers.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-muted">Category</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value, path: "" })
              }
            >
              {imageCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">Image Path *</label>
            <input
              className={inputClass}
              value={form.path}
              onChange={(e) => setForm({ ...form, path: e.target.value })}
              placeholder={`${selectedCategory?.pathPrefix}/filename.jpg`}
              required
            />
            <p className="mt-1 text-xs text-muted">
              Example: {selectedCategory?.pathPrefix}/my-image.jpg
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">Label</label>
            <input
              className={inputClass}
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Display name in admin"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">Alt Text</label>
            <input
              className={inputClass}
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              placeholder="Image description for accessibility"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-brand px-8 py-3 text-sm font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add to Library"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white">Image Library</h2>
        <p className="mt-2 text-sm text-muted">
          {files.length} image{files.length === 1 ? "" : "s"} registered
        </p>

        {loading ? (
          <p className="mt-6 text-sm text-muted">Loading...</p>
        ) : files.length === 0 ? (
          <p className="mt-6 text-sm text-muted">No images yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {imageCategories.map((category) => {
              const categoryFiles = files.filter(
                (file) => file.category === category.id
              );
              if (categoryFiles.length === 0) return null;

              return (
                <div key={category.id}>
                  <h3 className="mb-2 text-sm font-semibold text-accent-blue">
                    {category.label}
                  </h3>
                  <div className="space-y-2">
                    {categoryFiles.map((file) => {
                      const src = resolveImageSrc(file.path);
                      return (
                        <div
                          key={file.id}
                          className="flex items-center gap-3 rounded-xl border border-border p-3"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
                            <Image
                              src={src}
                              alt={file.alt || file.label}
                              fill
                              className="object-cover"
                              sizes="56px"
                              unoptimized={src.startsWith("http")}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                              {file.label}
                            </p>
                            <p className="truncate text-xs text-muted">
                              {file.path}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDelete(file.id)}
                            className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400"
                            aria-label="Delete image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
