import { NextRequest, NextResponse } from "next/server";
import { SEED_MODELS, SEED_CITIES, SEED_REVIEWS, SEED_SERVICES } from "@/lib/seed-data";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const model = SEED_MODELS.find((m) => m.id === id);

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    const reviews = SEED_REVIEWS.filter((r) => r.modelId === id).map((r) => ({
      ...r,
      user: { name: r.userName },
    }));

    return NextResponse.json({
      ...model,
      city: SEED_CITIES.find((c) => c.id === model.cityId),
      services: SEED_SERVICES.slice(0, 4).map((s) => ({ ...s, modelId: id })),
      reviews,
    });
  } catch (error) {
    console.error("Model API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
