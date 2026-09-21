import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { markMessageRead, deleteMessage } from "@/lib/store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { read } = await request.json();
  const message = await markMessageRead(id, Boolean(read));
  return NextResponse.json(message);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteMessage(id);
  return NextResponse.json({ success: true });
}
