import { getSelectedText, insertTextInNewDocument, showErrorMessage, showInformationMessage } from '../vscode-utils';

export type TextTransformFn = (value: string) => string;
export const transformSelectedText = async (fn: TextTransformFn, operation: string) => {
  const selectedText = getSelectedText();
  if (!selectedText) {
    await showInformationMessage(`Select a text to ${operation}`);
    return;
  }

  try {
    const result = fn(selectedText);
    await insertTextInNewDocument(result);
  } catch (e) {
    console.error(e);
    await showErrorMessage(`Unable to ${operation} selected text`);
  }
};
