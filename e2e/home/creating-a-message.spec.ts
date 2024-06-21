import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  let url = 'http://localhost:3000';
  // Go to the starting url before each test.
  if (process.env.CI) {
    url = 'https://nextjs-dashboard-eosin-three-42.vercel.app/';
  }

  await page.goto(url);
});

test.describe('Creating a message', () => {
  test('Displays the message in the list', async ({ page }) => {
    page.getByTestId('messageText');
    await page.getAttribute('[data-testid="sendButton"]', 'sendButton', {
      strict: true,
    });
  });
});

test.describe('Codegen usage', () => {
  test('test', async ({ page }) => {
    // await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter password').click();
    await page.getByPlaceholder('Enter your email address').click();
    await expect(page.getByPlaceholder('Enter your email address')).toBeEmpty();
    await expect(page.getByRole('heading')).toContainText(
      'Please log in to continue.',
    );
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await page.getByText('Email').click();
    await expect(page.locator('form')).toContainText('Email');
  });
});
