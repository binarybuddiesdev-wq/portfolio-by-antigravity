import { test } from '@playwright/test';

test('take screenshot of portfolio', async ({ page }) => {
  await page.goto('/');
  // Wait for 3 seconds to let the intro animations settle
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'preview.png' });
});
