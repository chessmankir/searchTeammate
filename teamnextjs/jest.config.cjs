module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "\\.(css|scss|sass)$": "identity-obj-proxy"
    }
};