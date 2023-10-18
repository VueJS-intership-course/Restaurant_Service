/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset:'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  testRegex: "(/src/tests/.*|(\\.|/)(test|spec))\\.(js|ts)$",
  moduleFileExtensions: ["vue", "js", "ts"],
  moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageReporters: ["text", "json-summary"],
  testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
  },
  transformIgnorePatterns: ["/node_modules/(?!vue-loading-spinner)"]
};