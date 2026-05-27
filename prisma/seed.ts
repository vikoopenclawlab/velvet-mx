import { PrismaClient } from "@prisma/client";
import { SEED_CITIES, SEED_MODELS, SEED_REVIEWS, SEED_SERVICES } from "../src/lib/seed-data";
import { ModelType } from "../src/lib/types";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.modelSession.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.modelService.deleteMany();
  await prisma.model.deleteMany();
  await prisma.service.deleteMany();
  await prisma.zone.deleteMany();
  await prisma.city.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.giftCard.deleteMany();

  console.log("✓ Cleared existing data");

  // Create cities
  const cities: Record<string, string> = {};
  for (const city of SEED_CITIES) {
    const created = await prisma.city.create({ data: city });
    cities[city.id] = created.id;
  }
  console.log(`✓ Created ${SEED_CITIES.length} cities`);

  // Create services
  const serviceIds: Record<string, string> = {};
  for (const service of SEED_SERVICES) {
    const created = await prisma.service.create({ data: service });
    serviceIds[service.id] = created.id;
  }
  console.log(`✓ Created ${SEED_SERVICES.length} services`);

  // Create models with their user accounts
  for (const model of SEED_MODELS) {
    // Create user for model
    const user = await prisma.user.create({
      data: {
        email: `${model.name.toLowerCase().replace(/\s+/g, ".")}@velvetmx.com`,
        name: model.name,
        role: "MODEL",
        accounts: { create: [] },
      },
    });

    // Create model profile
    const created = await prisma.model.create({
      data: {
        id: model.id,
        userId: user.id,
        cityId: cities[model.cityId],
        name: model.name,
        tagline: model.tagline,
        bio: model.bio,
        age: model.age,
        type: model.type as ModelType,
        mainPhoto: model.mainPhoto,
        gallery: model.gallery,
        rating: model.rating,
        reviewCount: model.reviewCount,
        viewCount: model.viewCount,
        bookingCount: model.bookingCount,
        verified: model.verified,
        verifiedAt: model.verified ? new Date() : null,
      },
    });

    // Create model services (link existing services)
    for (const svc of SEED_SERVICES) {
      // Each model offers all services at slightly varied prices
      const priceVariation = 0.9 + Math.random() * 0.3; // 90% to 120%
      const basePrice = svc.price;
      await prisma.modelService.create({
        data: {
          modelId: created.id,
          serviceId: serviceIds[svc.id],
          price: Math.round(basePrice * priceVariation * 100) / 100,
          active: true,
        },
      });
    }
  }
  console.log(`✓ Created ${SEED_MODELS.length} models with profiles and services`);

  // Create reviews
  for (const review of SEED_REVIEWS) {
    const model = SEED_MODELS.find((m) => m.id === review.modelId);
    if (!model) continue;

    // Create a fake user for each review
    const reviewUser = await prisma.user.create({
      data: {
        email: `review-${review.id}@velvetmx.fake`,
        name: review.userName,
        role: "CLIENT",
        emailVerified: new Date(),
        accounts: { create: [] },
      },
    });

    await prisma.review.create({
      data: {
        id: review.id,
        userId: reviewUser.id,
        modelId: review.modelId,
        rating: review.rating,
        title: review.title,
        content: review.content,
      },
    });
  }
  console.log(`✓ Created ${SEED_REVIEWS.length} reviews`);

  // Create sample calendar events for first few models
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const model = SEED_MODELS[i];
    if (!model) continue;

    // Block some random future dates
    for (let j = 1; j <= 3; j++) {
      const date = new Date(today);
      date.setDate(today.getDate() + j * 7 + Math.floor(Math.random() * 5));
      await prisma.calendarEvent.create({
        data: {
          modelId: model.id,
          date: date,
          startTime: "00:00",
          endTime: "23:59",
          blocked: true,
          note: "No disponible",
        },
      });
    }
  }
  console.log("✓ Created sample calendar events");

  // Create admin user
  await prisma.user.create({
    data: {
      email: "admin@velvetmx.com",
      name: "Velvet MX Admin",
      role: "ADMIN",
      password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
      accounts: { create: [] },
    },
  });
  console.log("✓ Created admin user (password: 'password')");

  // Create gift cards
  await prisma.giftCard.createMany({
    data: [
      { code: "VELVET100", amount: 1000, balance: 1000, expiresAt: new Date("2027-12-31"), active: true },
      { code: "VELVET250", amount: 2500, balance: 2500, expiresAt: new Date("2027-12-31"), active: true },
      { code: "VIP500", amount: 5000, balance: 5000, expiresAt: new Date("2027-12-31"), active: true },
    ],
  });
  console.log("✓ Created gift cards");

  console.log("\n✅ Seeding complete!");
  console.log(`   - ${SEED_CITIES.length} cities`);
  console.log(`   - ${SEED_MODELS.length} models`);
  console.log(`   - ${SEED_SERVICES.length} services`);
  console.log(`   - ${SEED_REVIEWS.length} reviews`);
  console.log("\n📧 Admin login: admin@velvetmx.com / password");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
