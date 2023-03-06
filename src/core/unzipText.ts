import { unzipSync } from 'node:zlib';
import type { TextTransformFn } from './transformSelectedText';

export const unzipText: TextTransformFn = (value: string) => {
  const buffer = Buffer.from(value, 'base64');
  const unzipBuff = unzipSync(buffer);

  return unzipBuff.toString('utf-8');
};
