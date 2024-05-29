import { commands } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { gzipSelectedText, unzipSelectedText } from './core';

export const activate = (context: ExtensionContext) => {
  context.subscriptions.push(commands.registerCommand('gzip-unzip-text.gzip', gzipSelectedText));
  context.subscriptions.push(commands.registerCommand('gzip-unzip-text.unzip', unzipSelectedText));
};
