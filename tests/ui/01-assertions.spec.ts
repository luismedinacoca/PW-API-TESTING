import { test, expect } from "@playwright/test";

test.use({
  baseURL: 'https://conduit.bondaracademy.com/',
})

test('has title', async ({ page }) => {
  await page.goto('/');
  const titleLocator = page.locator('.banner h1');

  // Generic assertion
  const text = await titleLocator.textContent();
  expect(text).toBe('conduit');

  // Locator assertion 👈🏽 ✅ 🔥
  await expect(titleLocator).toHaveText('conduit');

})

test('why locator assertion is better', async({ page }) => {
  await page.goto('/');
  const listOfarticles = page.locator('app-article-list');

  const allText = await listOfarticles.textContent();
  console.log("🤔 allText = await listOfarticles.textContent(): ", allText);
  // expect(allText).toContain('Bondar Academy'); // 👈🏽 🔥 🔥 🔥 🔥 🔥 🔥

  // Locator assertion 👈🏽 ✅ 🔥
  console.log("\n🔥 listOfarticles: ", listOfarticles);

  await expect(listOfarticles).toContainText('Bondar Academy');
  console.log("\n🤔 🤔 await listOfarticles.textContent(): ", await listOfarticles.textContent());
})