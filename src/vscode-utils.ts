import * as vscode from 'vscode';

export const getSelectedText = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }

  return editor.document.getText(editor.selection);
};

export const insertTextInNewDocument = (value: string) => {
  vscode.workspace.openTextDocument().then((textDocument) => {
    vscode.window.showTextDocument(textDocument).then((textEditor) => {
      textEditor.edit((edit) => {
        edit.insert(new vscode.Position(0, 0), value);
      });
    });
  });
};

export const showInformationMessage = (message: string) => vscode.window.showInformationMessage(message);
export const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message);
