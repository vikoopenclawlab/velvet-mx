import { test, expect } from "@playwright/test";

test.describe("Model Profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/models/model-001");
  });

  test("should display model information", async ({ page }) => {
    await expect(page.locator("h1, [class*='text-3xl']").first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Valentina")).toBeVisible();
  });

  test("should display services", async ({ page }) => {
    await expect(page.locator("text=Citas, Encuentros, compañero").first()).toBeVisible({ timeout: 5000 });
  });

  test("should display gallery", async ({ page }) => {
    const gallery = page.locator("[class*='gallery'], [class*='grid'] img");
    await expect(gallery.first()).toBeVisible({ timeout: 5000 });
  });

  test("should have booking CTA", async ({ page }) => {
    await expect(page.locator("button:has-text('Reservar'), a:has-text('Reservar')").first()).toBeVisible({ timeout: 5000 });
  });
});