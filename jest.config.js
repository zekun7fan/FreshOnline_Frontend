module.exports = {
    preset: 'ts-jest',
    setupFiles: ['./jest.setup.js'],
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        // "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\.(js|jsx)$": "babel-jest",
        "^.+\.(ts|tsx)$": "ts-jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: ["/node_modules/(?!react-file-drop)"]
}