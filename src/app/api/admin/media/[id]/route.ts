import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteMediaFile } from "@/lib/store";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteMediaFile(id);
  return NextResponse.json({ success: true });
}
