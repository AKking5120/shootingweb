import { NextResponse } from "next/server";
import { addMessage } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, company, phone, service, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    await addMessage({
      name,
      email,
      message,
      company: company || "",
      phone: phone || "",
      service: service || "",
      budget: budget || "",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
