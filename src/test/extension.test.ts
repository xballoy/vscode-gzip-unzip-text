import { strictEqual } from 'node:assert';
import fc from 'fast-check';
import { gzipText } from '../core/gzipText';
import { unzipText } from '../core/unzipText';

suite('Gzip / Unzip text Test Suite', () => {
  test('should be reversible', () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        strictEqual(unzipText(gzipText(text)), text);
      }),
    );
  });
});
