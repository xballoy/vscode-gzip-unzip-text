import * as vscode from 'vscode';

export const getSelectedText = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }

  return editor.document.getText(editor.selection);
};

export const insertTextInNewDocument = async (value: string) => {
  const textDocument = await vscode.workspace.openTextDocument();
  const textEditor = await vscode.window.showTextDocument(textDocument);
  await textEditor.edit((edit) => {
    edit.insert(new vscode.Position(0, 0), value);
  });
};

export const showInformationMessage = (message: string) => vscode.window.showInformationMessage(message);
export const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message);
