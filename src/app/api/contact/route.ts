import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.errors },
        { status: 400 }
      );
    }

    // In production:
    // 1. Send email via Nodemailer
    // 2. Store in DB for admin dashboard
    // For MVP stubbed, just acknowledge

    console.log("Contact form submission:", validated.data);

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido. Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
