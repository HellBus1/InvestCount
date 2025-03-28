module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};