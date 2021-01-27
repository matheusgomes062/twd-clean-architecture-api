module.exports = {
  roots: ['<rootDir>/test'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameWrapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  }
}
