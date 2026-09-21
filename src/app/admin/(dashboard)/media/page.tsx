import { getSiteMedia } from "@/lib/site-media";
import { MediaManager } from "@/components/admin/MediaManager";
import { SiteMediaForm } from "@/components/admin/SiteMediaForm";
import { imageCategories } from "@/data/media-defaults";

export default async function MediaPage() {
  const siteMedia = await getSiteMedia();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Media Manager</h1>
      <p className="mt-2 max-w-3xl text-muted">
        Upload images to GitHub folders, register paths here, then assign them
        to blogs and website sections. Paths are stored in Supabase.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {imageCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-border bg-surface-elevated/40 p-4"
          >
            <p className="text-sm font-semibold text-white">{category.label}</p>
            <p className="mt-1 text-xs text-muted">{category.description}</p>
            <code className="mt-2 block text-xs text-accent-blue">
              {category.folder}
            </code>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-12">
        <MediaManager />
      </div>

      <div className="mt-12 border-t border-border pt-12">
        <h2 className="text-xl font-bold text-white">Website Images</h2>
        <p className="mt-2 text-sm text-muted">
          Choose which registered images appear on the homepage sections.
        </p>
        <SiteMediaForm initialMedia={siteMedia} />
      </div>
    </div>
  );
}
