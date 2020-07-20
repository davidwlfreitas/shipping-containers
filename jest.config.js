module.exports = {
  verbose: true,
  moduleFileExtensions: ['android.js', 'ios.js', 'js', 'json', 'vue', 'ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    // Default NativeScript webpack aliases
    '~/(.*)$': '<rootDir>/app/$1',
    '@/(.*)$': '<rootDir>/app/$1',
    '^projectRoot/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,vue}'],
  coverageReporters: ['text-summary', 'html'],
  setupFiles: ['<rootDir>/jest/typescript-helpers.js', '<rootDir>/jest/nativescript-vue-stubs.js'],
};
