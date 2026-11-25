module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          resolveJsonModule: true,
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*']
          }
        }
      }
    ]
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}
