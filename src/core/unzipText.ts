import { promisify } from 'node:util';
import { unzip } from 'node:zlib';
import type { TextTransformFn } from './transformSelectedText';

const unzipAsync = promisify(unzip);

export const unzipText: TextTransformFn = async (value: string) => {
  const buffer = Buffer.from(value, 'base64');
  const unzipBuff = await unzipAsync(buffer);

  return unzipBuff.toString('utf-8');
};
