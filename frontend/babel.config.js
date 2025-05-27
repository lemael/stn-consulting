module.exports = {
  preset: [
    "ts-jest",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
