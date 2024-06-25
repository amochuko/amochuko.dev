import { expect, test } from '@playwright/test';

test.describe(
  'Codegen usage',
  {
    annotation: {
      type: 'issue',
      description: 'https://github.com/microsoft/playwright/issues/23180',
    },
  },
  () => {
    test('Displays the message in the list', async ({ page }) => {
      await page.goto('/dashboard');

      // await expect(page.getByRole('heading')).toContainText(
      //   'Please log in to continue.',
      // );
      // await expect(page.locator('form')).toContainText('Email');
    });

    test('home page', async ({ page, browser }) => {
      await page.goto('/');

      const link = page.getByRole('link', { name: 'Log in' });
      await expect(link).toBeVisible();
    });

    test('attempt login', async ({ page }) => {
      await page.goto('/login');

      const email = page.getByPlaceholder('Enter your email address');
      await email.click();
      const password = page.getByPlaceholder('Enter password');
      await password.click();

      await expect(page.getByRole('heading')).toContainText(
        'Please log in to continue.',
      );
      await expect(page.locator('form')).toContainText('Email');
      await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
      expect(email).toBeEmpty();
      expect(password).toBeEmpty();
    });
  },
);
