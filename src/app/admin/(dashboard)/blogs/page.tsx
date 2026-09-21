import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getBlogs } from "@/lib/store";
import { getBlogStatusLabel } from "@/lib/blog-utils";
import { DeleteBlogButton } from "@/components/admin/DeleteBlogButton";

export default async function AdminBlogsPage() {
  const blogs = await getBlogs({ all: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="mt-2 text-muted">Manage all blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-elevated">
            <tr>
              <th className="px-6 py-4 font-semibold text-muted">Title</th>
              <th className="px-6 py-4 font-semibold text-muted">Category</th>
              <th className="px-6 py-4 font-semibold text-muted">Date</th>
              <th className="px-6 py-4 font-semibold text-muted">Status</th>
              <th className="px-6 py-4 font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.slug} className="border-b border-border/50">
                <td className="px-6 py-4">
                  <p className="font-medium text-white">{blog.title}</p>
                  {blog.featured && (
                    <span className="text-xs text-accent-blue">Featured</span>
                  )}
                </td>
                <td className="px-6 py-4 text-muted">{blog.category}</td>
                <td className="px-6 py-4 text-muted">{blog.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      (blog.status ?? "published") === "published"
                        ? "bg-green-500/10 text-green-400"
                        : (blog.status ?? "published") === "scheduled"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-white/10 text-muted"
                    }`}
                  >
                    {getBlogStatusLabel(blog)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blogs/${blog.slug}/edit`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-accent-blue"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteBlogButton slug={blog.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <p className="p-8 text-center text-muted">No blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
