"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteBlogButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-red-400 hover:border-red-400"
    >
      <Trash2 size={16} />
    </button>
  );
}
