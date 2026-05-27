import { NextRequest, NextResponse } from "next/server";
import { SEED_MODELS, SEED_CITIES, SEED_SERVICES } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const type = searchParams.get("type");
    const sortBy = searchParams.get("sortBy") || "bookingCount";
    const search = searchParams.get("search");

    // Add city to each model
    let models = SEED_MODELS.map((m) => ({
      ...m,
      city: SEED_CITIES.find((c) => c.id === m.cityId),
      services: SEED_SERVICES.slice(0, 3).map((s) => ({ ...s, modelId: m.id })),
    }));

    if (city && city !== "all") {
      models = models.filter((m) => m.cityId === city);
    }

    if (type && type !== "all") {
      models = models.filter((m) => m.type === type);
    }

    if (search) {
      const q = search.toLowerCase();
      models = models.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.city?.name.toLowerCase().includes(q) ||
          m.tagline?.toLowerCase().includes(q)
      );
    }

    models.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price_low":
          return Number(a.services?.[0]?.price ?? 0) - Number(b.services?.[0]?.price ?? 0);
        case "price_high":
          return Number(b.services?.[0]?.price ?? 0) - Number(a.services?.[0]?.price ?? 0);
        default:
          return b.bookingCount - a.bookingCount;
      }
    });

    return NextResponse.json(models);
  } catch (error) {
    console.error("Models API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
