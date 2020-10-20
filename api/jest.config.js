module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/__mocks__/*',
    '!**/coverage/**/*',
    '!**/*.config.js',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

