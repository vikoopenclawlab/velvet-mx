import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display hero section", async ({ page }) => {
    await expect(page.locator("text=Experiencias que seducen")).toBeVisible();
  });

  test("should display stats bar", async ({ page }) => {
    await expect(page.locator("text=247 modelos activas")).toBeVisible();
    await expect(page.locator("text=10 ciudades")).toBeVisible();
  });

  test("should navigate to models catalog", async ({ page }) => {
    await page.click("text=Explorar Modelos");
    await expect(page).toHaveURL(/\/models/);
    await expect(page.locator("h1:has-text('Nuestras Modelos')")).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page.click("text=Iniciar Sesión");
    await expect(page).toHaveURL(/\/login/);
  });
});
