// This will be used to delete the data from the database after all tests have run.

import { test as teardown } from '@playwright/test';

teardown('Tear down Global Setup', async ({}) => {
  // Deinitialize Global Setup here
  console.log('Tearing down Global Setup...');
});
