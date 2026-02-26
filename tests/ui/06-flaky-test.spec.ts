import { test, expect } from "@playwright/test";

test("Flaky test", async ({ page }) => {
  await page.goto("https://petclinic.bondaracademy.com");
  await page.getByTitle("pettypes").click();
  await page.getByRole("button", { name: "Edit" }).first().click();

  await page.getByRole("textbox").fill("rabbit");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.locator('[id="0"]')).toHaveValue("rabbit");
});

test("Fixing flaky test", async ({ page }) => {
  await page.goto("https://petclinic.bondaracademy.com");
  await page.getByTitle("pettypes").click();
  await page.getByRole("button", { name: "Edit" }).first().click();

  await expect(page.getByRole("textbox")).toHaveValue("cat");// 👈🏽 ✅

  await page.getByRole("textbox").fill("rabbit");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.locator('[id="0"]')).toHaveValue("rabbit");
});

test("Second Fixing flaky test", async ({ page }) => {
  await page.goto("https://petclinic.bondaracademy.com");
  await page.getByTitle("pettypes").click();
  await page.getByRole("button", { name: "Edit" }).first().click();

  await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/33');// 👈🏽 ✅
  //await expect(page.getByRole("textbox")).toHaveValue("cat");

  await page.getByRole("textbox").fill("rabbit");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.locator('[id="0"]')).toHaveValue("rabbit");
});

