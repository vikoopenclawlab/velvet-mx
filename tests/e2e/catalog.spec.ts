import { test, expect } from "@playwright/test";

test.describe("Models Catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/models");
  });

  test("should display models grid", async ({ page }) => {
    const cards = page.locator("a[href^='/models/model-']");
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    await expect(cards).toHaveCount(24, { timeout: 5000 });
  });

  test("should filter by city", async ({ page }) => {
    // City filter is a Radix Select - click the button that opens it
    const cityFilter = page.locator("button[role='combobox']").filter({ hasText: "" }).first();
    await cityFilter.click();
    // Wait for dropdown
    await page.waitForTimeout(500);
  });

  test("should search by name", async ({ page }) => {
    const searchInput = page.locator("input[placeholder*='Buscar']");
    await searchInput.fill("Valentina");
    await page.waitForTimeout(500);
  });

  test("should navigate to model profile", async ({ page }) => {
    const firstCard = page.locator("a[href^='/models/model-']").first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/models\/model-\d+/);
  });
});
