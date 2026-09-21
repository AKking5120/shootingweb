import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { addMediaFile, getMediaFiles } from "@/lib/store";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const files = await getMediaFiles();

  if (category) {
    return NextResponse.json(files.filter((file) => file.category === category));
  }

  return NextResponse.json(files);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.category || !body.path) {
    return NextResponse.json(
      { error: "Category and path are required" },
      { status: 400 }
    );
  }

  const file = await addMediaFile({
    category: body.category,
    path: body.path,
    label: body.label || body.path.split("/").pop() || "Image",
    alt: body.alt || "",
  });

  return NextResponse.json(file);
}
