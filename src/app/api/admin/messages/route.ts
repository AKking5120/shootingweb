import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getMessages } from "@/lib/store";
import { isSupabaseEnabled } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getMessages();

    if (messages.length === 0 && !isSupabaseEnabled()) {
      return NextResponse.json(
        {
          error:
            "Database not connected. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on Vercel.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Admin getMessages error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load messages from database",
      },
      { status: 500 }
    );
  }
}
