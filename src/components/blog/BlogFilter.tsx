"use client";

import { useMemo, useState } from "react";
import { blogCategories } from "@/data/blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

interface BlogFilterProps {
  posts: BlogPost[];
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featured =
    activeCategory === "All" ? posts.find((p) => p.featured) : null;

  const gridPosts = featured
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {blogCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                : "border-border text-muted hover:border-white/20 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {featured && (
        <div className="mb-8">
          <BlogCard post={featured} featured />
        </div>
      )}

      {gridPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">
          No articles found in this category yet.
        </p>
      )}
    </div>
  );
}
