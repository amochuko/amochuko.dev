import { expect, test } from '@playwright/test';

test.beforeEach('Running setup before each test runs', async ({ page }) => {});

test.describe.only('Creating a message', () => {
  test('Displays the message in the list', async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const label = /message/i;
    const msg = 'New message';

    await page.getByLabel(label).fill(msg);
    await page.getByRole('button', { name: /send/i }).click();

    await expect(page.getByLabel(label)).toBeEmpty();
    await expect(page.getByText(msg)).toBeVisible();
  });
});

