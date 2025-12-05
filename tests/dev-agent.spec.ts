import { test, expect } from '@playwright/test';

test('GPT Dev Agent panel loads and reacts', async ({ page }) => {
  await page.goto('http://localhost:3000/wikisure-v2/dev-agent');
  await expect(page.getByText('🧠 GPT Dev Agent')).toBeVisible();
  await page.getByPlaceholder('Describe your component...').fill('Button that says Hello');
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(page.getByText('🧩 Generated Code:')).toBeVisible();
});
