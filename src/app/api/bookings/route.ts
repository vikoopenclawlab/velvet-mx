import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = bookingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.errors },
        { status: 400 }
      );
    }

    // In production, create reservation in DB
    const reservation = {
      id: `res-${Date.now()}`,
      ...validated.data,
      status: "PENDING",
      paymentStatus: "PENDING",
      totalAmount: 2000, // Calculate from services
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // In production, fetch reservations from DB
    return NextResponse.json([]);
  } catch (error) {
    console.error("Bookings API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
