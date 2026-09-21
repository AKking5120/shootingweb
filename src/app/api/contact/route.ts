import { NextResponse } from "next/server";
import { addMessage } from "@/lib/store";
import { isSupabaseEnabled } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (process.env.VERCEL && !isSupabaseEnabled()) {
      return NextResponse.json(
        {
          error:
            "Contact form is not connected to database. Add Supabase environment variables on Vercel.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, message, company, phone, service, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { error: "Please select a service" },
        { status: 400 }
      );
    }

    await addMessage({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      company: company ? String(company).trim() : "",
      phone: phone ? String(phone).trim() : "",
      service: String(service).trim(),
      budget: budget ? String(budget).trim() : "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to save message";

    return NextResponse.json(
      {
        error:
          message.includes("Supabase") || message.includes("fetch failed")
            ? "Unable to save your message right now. Please try again or email us directly."
            : "Failed to save message. Please try again.",
      },
      { status: 500 }
    );
  }
}
