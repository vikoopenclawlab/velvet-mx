import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
  });

  test("should display hero section", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
  });

  test("should display stats bar", async ({ page }) => {
    await expect(page.locator("section").nth(1)).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to models catalog", async ({ page }) => {
    await page.locator("text=Explorar Modelos").click();
    await expect(page).toHaveURL(/\/models/);
  });

  test("should navigate to login page", async ({ page }) => {
    await page.locator("text=Iniciar Sesión").first().click();
    await expect(page).toHaveURL(/\/login/);
  });
});
