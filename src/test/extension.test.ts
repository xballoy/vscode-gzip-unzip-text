import { strictEqual } from 'node:assert';
import { gzipText } from '../core/gzipText';
import { unzipText } from '../core/unzipText';
import fc from 'fast-check';

suite('Gzip / Unzip text Test Suite', () => {
  test('should be reversible', () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        strictEqual(unzipText(gzipText(text)), text);
      })
    )
  });
});
