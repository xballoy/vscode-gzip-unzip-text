import { promisify } from 'node:util';
import { gzip } from 'node:zlib';
import type { TextTransformFn } from './transformSelectedText';

const gzipAsync = promisify(gzip);

export const gzipText: TextTransformFn = async (value: string) => {
  const buffer = Buffer.from(value);
  const gzipBuffer = await gzipAsync(buffer);

  return gzipBuffer.toString('base64');
};
