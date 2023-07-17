module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    "type": "module",
    transformIgnorePatterns: [
        'node_modules/(?!(@testing-library/jest-dom)/)',
      ],

  };