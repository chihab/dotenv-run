import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('10');
  await expect(page.locator('h1')).toHaveText('production');
});
