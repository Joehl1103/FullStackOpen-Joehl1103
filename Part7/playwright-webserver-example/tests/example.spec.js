// @ts-check
import { test, expect } from '@playwright/test';

test('has test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText("JSON-Server-test")).toBeVisible();
});
