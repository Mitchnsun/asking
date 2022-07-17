// jest.config.js
module.exports = {
  rootDir: '.',
  resolver: '<rootDir>/.jest/resolver.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/atoms/(.*)': '<rootDir>/src/components/atoms/$1',
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/context/(.*)': '<rootDir>/src/context/$1',
    '^@/KYF/(.*)': '<rootDir>/src/knowyourfriends/$1',
    '^@/lib/(.*)': '<rootDir>/src/lib/$1',
    '^@/room/(.*)': '<rootDir>/src/room/$1',
    '^@/trivia/(.*)': '<rootDir>/src/trivia/$1',
    '^@/types/(.*)': '<rootDir>/src/types/$1',
    '^@/utils/(.*)': '<rootDir>/src/utils/$1',
  },
}
