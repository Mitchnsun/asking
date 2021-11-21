// jest.config.js
module.exports = {
  rootDir: '.',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/atoms/(.*)': '<rootDir>/src/components/atoms/$1',
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/context/(.*)': '<rootDir>/src/context/$1',
    '^@/lib/(.*)': '<rootDir>/src/lib/$1',
    '^@/utils/(.*)': '<rootDir>/src/utils/$1',
  },
}
