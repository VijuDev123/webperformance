module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/mocks/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/src/mocks/fileMock.ts",
  },
  setupFiles: ["<rootDir>/src/setupTests.ts"],
  automock: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "^src/.*.d.ts$",
    "^src/index.tsx$",
    "^test/*/*.{ts,tsx}",
  ],
};
