import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteMedia } from "@/lib/site-media";
import { saveSiteMedia } from "@/lib/store";
import type { SiteMedia } from "@/types";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const media = await getSiteMedia();
  return NextResponse.json(media);
}

export async function PUT(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteMedia;
  await saveSiteMedia(body);
  return NextResponse.json(body);
}
