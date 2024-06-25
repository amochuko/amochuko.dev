const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config}*/
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns:  ['<rootDir>/e2e'], // ignores e2e
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
