import { test, expect } from "@playwright/test";

test.describe("Model Profile", () => {
  test("should display model information", async ({ page }) => {
    await page.goto("/models/model-001");

    await expect(page.locator("h1:has-text('Valentina Noir')")).toBeVisible();
    await expect(page.locator("text=Verificada")).toBeVisible();
    await expect(page.locator("text=Ciudad de México")).toBeVisible();
  });

  test("should display services", async ({ page }) => {
    await page.goto("/models/model-001");

    await expect(page.locator("text=Citas companionship")).toBeVisible();
  });

  test("should display gallery", async ({ page }) => {
    await page.goto("/models/model-001");

    const galleryImages = page.locator("[class*='grid'] img").first();
    await expect(galleryImages).toBeVisible();
  });

  test("should have booking CTA", async ({ page }) => {
    await page.goto("/models/model-001");

    await expect(page.locator("button:has-text('Reservar Ahora')")).toBeVisible();
  });
});
