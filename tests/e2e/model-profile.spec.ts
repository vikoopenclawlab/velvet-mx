import { test, expect } from "@playwright/test";

test.describe("Model Profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/models/model-001", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
  });

  test("should display model information", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("text=Valentina Noir")).toBeVisible();
  });

  test("should display services", async ({ page }) => {
    await expect(page.locator("text=$1,500")).toBeVisible({ timeout: 10000 });
  });

  test("should display gallery", async ({ page }) => {
    const images = page.locator("img[alt*='Valentina']");
    await expect(images.first()).toBeVisible({ timeout: 10000 });
  });

  test("should have booking CTA", async ({ page }) => {
    // Scroll down and look for the booking button
    await page.locator("main").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(page.getByRole("button", { name: /Reservar/i }).first()).toBeVisible({ timeout: 10000 });
  });
});
