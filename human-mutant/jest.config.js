module.exports = {
  "roots": [
    "<rootDir>/test"
  ],
  "testMatch": [
    "**/__test__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(@ts-jest)/)"
  ]
}