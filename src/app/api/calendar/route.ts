import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const modelId = searchParams.get("modelId");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    // Stubbed - Would return calendar events from DB
    // For demo, return empty array (no blocked dates)
    return NextResponse.json([]);
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Stubbed - Would create calendar event in DB
    return NextResponse.json({ id: `event-${Date.now()}`, ...body }, { status: 201 });
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
