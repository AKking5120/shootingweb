import { connection } from "next/server";
import { getSiteContent } from "@/lib/site-content";
import { ContentManager } from "@/components/admin/ContentManager";

export default async function AdminContentPage() {
  await connection();
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="text-3xl font-bold">Content</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Manage FAQ, process steps, and the free consultation popup. Changes
        appear on the live website immediately.
      </p>
      <ContentManager initialContent={content} />
    </div>
  );
}
