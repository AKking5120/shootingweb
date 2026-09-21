import "server-only";
import { getBlogs, getBlogBySlug as getStoreBlogBySlug } from "@/lib/store";
import type { BlogPost } from "@/types";

export async function getAllPosts(): Promise<BlogPost[]> {
  return getBlogs();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getStoreBlogBySlug(slug);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  if (category === "All") return posts;
  return posts.filter((post) => post.category === category);
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<BlogPost[]> {
  const current = await getPostBySlug(currentSlug);
  const posts = await getAllPosts();
  if (!current) return posts.slice(0, limit);

  return posts
    .filter(
      (post) =>
        post.slug !== currentSlug && post.category === current.category
    )
    .slice(0, limit);
}
