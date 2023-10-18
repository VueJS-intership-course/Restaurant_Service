module.exports = {
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    // "^.+\\.jsx?$": "babel-jest",
    // "^.+\\.ts$": "babel-jest",
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [],
  },
};
