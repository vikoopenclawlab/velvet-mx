import { test, expect } from "@playwright/test";

test.describe("Models Catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/models");
  });

  test("should display models grid", async ({ page }) => {
    const modelCards = page.locator("a[href^='/models/model-']");
    await expect(modelCards.first()).toBeVisible();
  });

  test("should filter by city", async ({ page }) => {
    await page.selectOption('[class*="SelectTrigger"]', { index: 0 });
    // Should show filtered results
    await expect(page.locator("text=modelos encontradas")).toBeVisible();
  });

  test("should search by name", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill("Valentina");
    await expect(page.locator("text=Valentina Noir")).toBeVisible();
  });

  test("should navigate to model profile", async ({ page }) => {
    await page.click("a[href='/models/model-001']");
    await expect(page).toHaveURL(/\/models\/model-001/);
    await expect(page.locator("h1:has-text('Valentina Noir')")).toBeVisible();
  });
});
