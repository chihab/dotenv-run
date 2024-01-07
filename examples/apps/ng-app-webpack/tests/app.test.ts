import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/%NGX_VERSION%/);
  await expect(page.locator('h1')).toHaveText('production 16.1.1');
});
