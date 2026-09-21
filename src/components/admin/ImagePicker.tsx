"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { resolveImageSrc } from "@/lib/image-utils";
import type { MediaFile } from "@/types";

interface ImagePickerProps {
  value: string;
  onChange: (path: string) => void;
  category?: string;
  label?: string;
  required?: boolean;
}

export function ImagePicker({
  value,
  onChange,
  category,
  label = "Image Path",
  required = false,
}: ImagePickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [customPath, setCustomPath] = useState(value);

  useEffect(() => {
    setCustomPath(value);
  }, [value]);

  useEffect(() => {
    const url = category
      ? `/api/admin/media?category=${category}`
      : "/api/admin/media";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setFiles(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [category]);

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white focus:border-accent-blue focus:outline-none";

  const previewSrc = resolveImageSrc(value);

  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted">{label}{required ? " *" : ""}</label>

      <input
        className={inputClass}
        value={customPath}
        onChange={(e) => {
          setCustomPath(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={category ? `/images/${category}/your-image.jpg` : "/images/blogs/your-image.jpg"}
        required={required}
      />

      <p className="text-xs text-muted">
        Upload image to GitHub folder, push, then pick from library below or paste path.
      </p>

      {previewSrc && (
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="relative h-40 w-full bg-surface">
            <Image
              src={previewSrc}
              alt="Selected image preview"
              fill
              className="object-cover"
              sizes="400px"
              unoptimized={previewSrc.startsWith("http")}
            />
          </div>
          <p className="px-3 py-2 text-xs text-muted">{previewSrc}</p>
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Image Library {category ? `(${category})` : ""}
        </p>

        {loading ? (
          <p className="text-sm text-muted">Loading images...</p>
        ) : files.length === 0 ? (
          <p className="text-sm text-muted">
            No images registered yet. Add them in Admin → Media.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {files.map((file) => {
              const src = resolveImageSrc(file.path);
              const selected = value === file.path;
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => {
                    setCustomPath(file.path);
                    onChange(file.path);
                  }}
                  className={`overflow-hidden rounded-xl border text-left transition-colors ${
                    selected
                      ? "border-accent-blue ring-2 ring-accent-blue/30"
                      : "border-border hover:border-white/20"
                  }`}
                >
                  <div className="relative h-24 w-full bg-surface">
                    <Image
                      src={src}
                      alt={file.alt || file.label}
                      fill
                      className="object-cover"
                      sizes="160px"
                      unoptimized={src.startsWith("http")}
                    />
                  </div>
                  <p className="truncate px-2 py-1.5 text-xs text-white">
                    {file.label}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
