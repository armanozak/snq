export default {
  displayName: 'snq',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  coverageDirectory: '../../coverage/packages/snq',
};
