import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Stubbed - File upload would be handled here
    // For MVP, just return a mock URL
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Mock return
    const mockUrl = `/uploads/${Date.now()}-mock-file`;
    return NextResponse.json({ url: mockUrl });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
