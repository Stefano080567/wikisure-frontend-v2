import { expect, test } from '@playwright/test';

test('authenticated user can open the Lovable agent page', async ({ page }) => {
  await page.goto('/wikisure-v2/lovable-agent');

  await expect(page).toHaveURL(/\/wikisure-v2\/lovable-agent/);
  await expect(page.getByRole('heading', { name: /GPT Dev Agent/i })).toBeVisible();
});
