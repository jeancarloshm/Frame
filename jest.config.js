module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    verbose: true,
    testURL: "http://localhost/",
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    moduleFileExtensions: ['js', 'json', 'node'],
    
  };