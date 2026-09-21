import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blogs";

export async function BlogPreview() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Insights"
            title="Latest from Our Blog"
            description="Marketing tips, growth strategies, and creative insights to help your brand stay ahead."
            className="!mb-0"
          />
          <Link
            href="/blogs"
            className="text-sm font-semibold text-accent-blue transition-colors hover:text-accent-purple"
          >
            View All Articles →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
