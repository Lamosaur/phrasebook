// This file runs before each test file, setting up the test environment.

// Mock modules that don't work in a Node.js environment (Jest's environment)
jest.mock('expo-file-system', () => ({
  documentDirectory: 'file:///mock-dir/',
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: true })),
  makeDirectoryAsync: jest.fn(() => Promise.resolve()),
  downloadAsync: jest.fn(() => Promise.resolve({ md5: 'mock-md5', uri: 'file:///mock-db-uri' })),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn(() => ({
      uri: 'mock-asset-uri',
      downloadAsync: jest.fn(() => Promise.resolve()),
    })),
  },
}));