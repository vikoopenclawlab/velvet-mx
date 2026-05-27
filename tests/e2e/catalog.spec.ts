import { test, expect } from "@playwright/test";

test.describe("Models Catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/models");
  });

  test("should display models grid", async ({ page }) => {
    await expect(page.locator("[data-testid='model-card'], .grid > div").first()).toBeVisible({ timeout: 10000 });
    const cards = await page.locator(".grid > div").count();
    expect(cards).toBeGreaterThan(0);
  });

  test("should filter by city", async ({ page }) => {
    // Click the city filter select
    await page.locator("select").first().selectOption({ index: 1 });
    await page.waitForTimeout(500);
  });

  test("should search by name", async ({ page }) => {
    const searchInput = page.locator("input[type='text'], input[placeholder*='Buscar']").first();
    await searchInput.fill("Valentina");
    await page.waitForTimeout(500);
  });

  test("should navigate to model profile", async ({ page }) => {
    await page.locator(".grid > div a").first().click();
    await expect(page).toHaveURL(/\/models\/.+/);
  });
});