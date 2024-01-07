import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('0.0.0');
  await expect(page.locator('h1')).toHaveText('production');
});
