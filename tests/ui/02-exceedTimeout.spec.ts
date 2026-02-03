import { test, expect } from "@playwright/test";

test.use({
  baseURL: 'https://playground.bondaracademy.com/',
})

test('has title', async ({ page }) => {
  await page.goto('/');
  
  await page.getByText('Forms').click();
  await page.waitForTimeout(1000);
  await page.getByText('Datepickers').click();
})


test('', async({ page }) => {
  test.setTimeout(80000);
  await page.goto('http://uitestingplayground.com');

  for(let i = 0; i < 5; i++) {
    await page.getByText('Load Delay').click();
    await page.getByRole('button', {name: 'Button Appearing After Delay'}).click();
    //console.log("🤔 i: ", i)
    await page.waitForTimeout(1000);
    await page.getByText('Home').first().click();
  }
})

// https://bondaracademy.com/blog/playwright-timeout-30000ms-exceeded
