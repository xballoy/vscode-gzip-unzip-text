import { strictEqual } from 'node:assert';
import { gzipText } from '../../core/gzipText';
import { unzipText } from '../../core/unzipText';

suite('Gzip / Unzip text Test Suite', () => {
  test('should be reversible', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 👍';

    strictEqual(unzipText(gzipText(input)), input);
  });
});
