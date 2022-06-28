export default {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: [
        "**/tests/*.ts"
    ],
    testEnvironment: "node",
  };