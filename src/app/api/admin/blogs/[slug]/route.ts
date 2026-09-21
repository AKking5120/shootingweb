import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getBlogBySlug,
  saveBlog,
  deleteBlog,
  parseContentText,
} from "@/lib/store";
import type { BlogPost } from "@/types";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const existing = await getBlogBySlug(slug);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const content =
    typeof body.contentText === "string"
      ? parseContentText(body.contentText)
      : body.content || existing.content;

  const post: BlogPost = {
    ...existing,
    title: body.title ?? existing.title,
    excerpt: body.excerpt ?? existing.excerpt,
    category: body.category ?? existing.category,
    author: body.author ?? existing.author,
    date: body.date ?? existing.date,
    readTime: body.readTime ?? existing.readTime,
    image: body.image ?? existing.image,
    featured: body.featured ?? existing.featured,
    tags: body.tags
      ? Array.isArray(body.tags)
        ? body.tags
        : String(body.tags)
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
      : existing.tags,
    content,
    slug: body.newSlug && body.newSlug !== slug ? body.newSlug : slug,
  };

  if (body.newSlug && body.newSlug !== slug) {
    await deleteBlog(slug);
  }

  await saveBlog(post);
  return NextResponse.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  await deleteBlog(slug);
  return NextResponse.json({ success: true });
}
