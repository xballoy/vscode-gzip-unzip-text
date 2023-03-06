import { gzipSync } from 'node:zlib';
import type { TextTransformFn } from './transformSelectedText';

export const gzipText: TextTransformFn = (value: string) => {
  const buffer = Buffer.from(value);
  const gzipBuffer = gzipSync(buffer);

  return gzipBuffer.toString('base64');
};
