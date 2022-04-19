import { getSelectedText, insertTextInNewDocument, showErrorMessage, showInformationMessage } from '../vscode-utils';

export type TextTransformFn = (value: string) => string;
export const transformSelectedText = (fn: TextTransformFn, operation: string) => {
  const selectedText = getSelectedText();
  if (!selectedText) {
    showInformationMessage(`Select a text to ${operation}`);
    return;
  }

  try {
    const result = fn(selectedText);
    insertTextInNewDocument(result);
  } catch (e) {
    console.error(e);
    showErrorMessage(`Unable to ${operation} selected text`);
  }
};
