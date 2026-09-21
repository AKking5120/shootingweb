import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import type { SiteContent } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteContent;
  await saveSiteContent(body);
  return NextResponse.json(body);
}
