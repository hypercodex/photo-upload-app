module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/mocks/*',
    '!**/coverage/**/*',
    '!**/*.config.js',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

