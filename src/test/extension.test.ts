import { strictEqual } from 'node:assert';
import fc from 'fast-check';
import { gzipText } from '../core/gzipText';
import { unzipText } from '../core/unzipText';

suite('Gzip / Unzip text Test Suite', () => {
  test('should be reversible', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async (text) => {
        strictEqual(await unzipText(await gzipText(text)), text);
      }),
    );
  });
});
