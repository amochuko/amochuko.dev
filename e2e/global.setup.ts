// This will be used to create the data and insert into the database before all tests will run.

import { test as setup, chromium, type FullConfig } from '@playwright/test';

setup('Initialize Global Setup', async ({ page, baseURL, browser }) => {
  // Initialize Global Setup here
  console.log('Initializing Global Setup...');
  console.log('baseUrl: ', baseURL);

  await page.goto('/');
  await page.getByRole('link', { name: /log in/i }).click();

  await page.getByLabel('Email').fill('user@nextmail.com');
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: /log in/i }).click();
});
