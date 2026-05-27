import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeaturedModels } from "@/components/sections/featured-models";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { SEED_MODELS } from "@/lib/seed-data";
import type { ModelProfile } from "@/lib/types";
import { SEED_CITIES } from "@/lib/seed-data";

export default function HomePage() {
  // Use seed data for demo
  const featuredModels: any[] = SEED_MODELS.slice(0, 6).map((m) => ({
    ...m,
    city: SEED_CITIES.find((c) => c.id === m.cityId),
  }));

  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedModels models={featuredModels} />
      <Testimonials />
      <CTASection />
    </>
  );
}
