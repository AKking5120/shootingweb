import Link from "next/link";
import { FileText, Mail, Star, Inbox } from "lucide-react";
import { getDashboardStats } from "@/lib/store";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Total Blogs",
      value: stats.totalBlogs,
      icon: FileText,
      href: "/admin/blogs",
      color: "text-accent-blue",
    },
    {
      label: "Featured Blogs",
      value: stats.featuredBlogs,
      icon: Star,
      href: "/admin/blogs",
      color: "text-yellow-400",
    },
    {
      label: "Total Messages",
      value: stats.totalMessages,
      icon: Inbox,
      href: "/admin/messages",
      color: "text-green-400",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessages,
      icon: Mail,
      href: "/admin/messages",
      color: "text-red-400",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted">Welcome back! Here&apos;s your overview.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-border bg-surface-elevated p-6 transition-colors hover:border-accent-blue/30"
            >
              <div className="flex items-center justify-between">
                <Icon size={24} className={card.color} />
                <span className="text-3xl font-bold">{card.value}</span>
              </div>
              <p className="mt-4 text-sm text-muted">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-elevated p-6">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin/blogs/new"
              className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold"
            >
              + New Blog Post
            </Link>
            <Link
              href="/admin/messages"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent-blue"
            >
              View Messages
            </Link>
            <Link
              href="/admin/settings"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent-blue"
            >
              Edit Settings
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-6">
          <h2 className="text-lg font-bold">Admin Access</h2>
          <p className="mt-3 text-sm text-muted">
            Manage blogs, view client enquiries, and update site settings from
            this panel. Changes appear on the live website immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
