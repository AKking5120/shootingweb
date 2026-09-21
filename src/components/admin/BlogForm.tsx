"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/types";
import { contentToText } from "@/lib/blog-utils";
import { ImagePicker } from "@/components/admin/ImagePicker";

const categories = [
  "Digital Marketing",
  "Social Media",
  "Content Strategy",
  "Paid Advertising",
  "Branding",
  "Video & Media",
];

interface BlogFormProps {
  post?: BlogPost;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    category: post?.category || "Digital Marketing",
    author: post?.author || "SY Media Team",
    date: post?.date || new Date().toISOString().split("T")[0],
    readTime: post?.readTime || "5 min read",
    image: post?.image || "",
    featured: post?.featured || false,
    status: post?.status || "published",
    tags: post?.tags.join(", ") || "",
    contentText: post ? contentToText(post.content) : "",
  });

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white focus:border-accent-blue focus:outline-none";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = post
      ? `/api/admin/blogs/${post.slug}`
      : "/api/admin/blogs";
    const method = post ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/blogs");
      router.refresh();
    } else {
      setError("Failed to save blog post");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-muted">Title *</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-muted">Excerpt *</label>
          <textarea
            className={inputClass}
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">Category</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">Author</label>
          <input
            className={inputClass}
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">Publish Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">Status</label>
          <select
            className={inputClass}
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "draft" | "published" | "scheduled",
              })
            }
          >
            <option value="published">Published (live now)</option>
            <option value="scheduled">Scheduled (live on publish date)</option>
            <option value="draft">Draft (hidden)</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">Read Time</label>
          <input
            className={inputClass}
            value={form.readTime}
            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <ImagePicker
            label="Cover Image"
            category="blogs"
            value={form.image}
            onChange={(path) => setForm({ ...form, image: path })}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-muted">Tags (comma separated)</label>
          <input
            className={inputClass}
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded"
            />
            Featured post
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-muted">Content *</label>
          <p className="mb-2 text-xs text-muted">
            Use ## for headings. Separate paragraphs with blank lines. Use - for bullet lists.
          </p>
          <textarea
            className={inputClass}
            rows={12}
            value={form.contentText}
            onChange={(e) => setForm({ ...form, contentText: e.target.value })}
            required
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-brand px-8 py-3 text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : post ? "Update Post" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-muted hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
