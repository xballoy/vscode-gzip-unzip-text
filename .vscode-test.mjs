import { readFileSync } from 'node:fs';
import { defineConfig } from '@vscode/test-cli';

const { engines } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const minimumVersion = engines.vscode.replace(/^\^/, '');

const shared = {
  files: 'out/test/**/*.test.js',
  mocha: { timeout: 10_000 },
};

export default defineConfig([
  { ...shared, label: 'minimum', version: minimumVersion },
  { ...shared, label: 'stable', version: 'stable' },
]);
