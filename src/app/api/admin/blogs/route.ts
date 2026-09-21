import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBlogs, saveBlog, slugify, parseContentText } from "@/lib/store";
import type { BlogPost } from "@/types";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const blogs = await getBlogs({ all: true });
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = body.slug || slugify(body.title);
  const content =
    typeof body.contentText === "string"
      ? parseContentText(body.contentText)
      : body.content || [];

  const post: BlogPost = {
    slug,
    title: body.title,
    excerpt: body.excerpt,
    category: body.category,
    author: body.author || "SY Media Team",
    date: body.date || new Date().toISOString().split("T")[0],
    readTime: body.readTime || "5 min read",
    image: body.image,
    featured: Boolean(body.featured),
    status: body.status || "published",
    tags: Array.isArray(body.tags)
      ? body.tags
      : String(body.tags || "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
    content,
  };

  await saveBlog(post);
  return NextResponse.json(post);
}
