module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // 👈 indique à Jest de transformer axios
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
