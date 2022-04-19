import { gzipText } from './gzipText';
import { transformSelectedText } from './transformSelectedText';
import { unzipText } from './unzipText';

export const gzipSelectedText = () => transformSelectedText(gzipText, 'Gzip');
export const unzipSelectedText = () => transformSelectedText(unzipText, 'Gzip');
