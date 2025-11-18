import { ok, strictEqual } from 'node:assert';
import * as vscode from 'vscode';
import { unzipText } from '../core/unzipText';

const COMMAND_DELAY_MS = 100;

async function createDocumentWithSelection(content: string, selectAll = true): Promise<{ document: vscode.TextDocument; editor: vscode.TextEditor }> {
  const document = await vscode.workspace.openTextDocument({
    content,
    language: 'plaintext',
  });
  const editor = await vscode.window.showTextDocument(document);

  if (selectAll) {
    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(content.length));
    editor.selection = new vscode.Selection(fullRange.start, fullRange.end);
  } else {
    editor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0));
  }

  return { document, editor };
}

async function executeCommandAndWait(commandId: string): Promise<void> {
  await vscode.commands.executeCommand(commandId);
  await new Promise((resolve) => setTimeout(resolve, COMMAND_DELAY_MS));
}

async function executeCommandWithoutWaiting(commandId: string): Promise<void> {
  void vscode.commands.executeCommand(commandId);
  await new Promise((resolve) => setTimeout(resolve, COMMAND_DELAY_MS));
}

suite('Gzip / Unzip Integration Test Suite', () => {
  const plainText = 'Hello world!';
  const gzippedBase64 = 'H4sIAAAAAAAAE/NIzcnJVyjPL8pJUQQAlRmFGwwAAAA=';

  teardown(async () => {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  test('should create new document with gzipped content when text is selected', async () => {
    const { editor } = await createDocumentWithSelection(plainText);
    const initialDocumentCount = vscode.workspace.textDocuments.length;

    await executeCommandAndWait('gzip-unzip-text.gzip');

    const newDocumentCount = vscode.workspace.textDocuments.length;
    strictEqual(newDocumentCount, initialDocumentCount + 1, 'New document should be created');

    const newEditor = vscode.window.activeTextEditor;
    ok(newEditor, 'New editor should be active');
    ok(newEditor !== editor, 'Active editor should be different from original');

    const result = newEditor.document.getText();
    const decompressed = unzipText(result);
    strictEqual(decompressed, plainText, 'Gzipped text should decompress to original content');
  });

  test('should create new document with unzipped content when gzipped text is selected', async () => {
    const { editor } = await createDocumentWithSelection(gzippedBase64);
    const initialDocumentCount = vscode.workspace.textDocuments.length;

    await executeCommandAndWait('gzip-unzip-text.unzip');

    const newDocumentCount = vscode.workspace.textDocuments.length;
    strictEqual(newDocumentCount, initialDocumentCount + 1, 'New document should be created');

    const newEditor = vscode.window.activeTextEditor;
    ok(newEditor, 'New editor should be active');
    ok(newEditor !== editor, 'Active editor should be different from original');

    const result = newEditor.document.getText();
    strictEqual(result, plainText, 'Unzipped text should match original plain text');
  });

  test('should not create document when no text is selected for gzip', async () => {
    await createDocumentWithSelection(plainText, false);
    const initialDocumentCount = vscode.workspace.textDocuments.length;

    await executeCommandWithoutWaiting('gzip-unzip-text.gzip');

    const finalDocumentCount = vscode.workspace.textDocuments.length;
    strictEqual(finalDocumentCount, initialDocumentCount, 'No new document should be created when no text selected');
  });

  test('should not create document when no text is selected for unzip', async () => {
    await createDocumentWithSelection(gzippedBase64, false);
    const initialDocumentCount = vscode.workspace.textDocuments.length;

    await executeCommandWithoutWaiting('gzip-unzip-text.unzip');

    const finalDocumentCount = vscode.workspace.textDocuments.length;
    strictEqual(finalDocumentCount, initialDocumentCount, 'No new document should be created when no text selected');
  });

  test('should not create document when unzip fails with invalid base64', async () => {
    await createDocumentWithSelection(plainText);
    const initialDocumentCount = vscode.workspace.textDocuments.length;

    await executeCommandWithoutWaiting('gzip-unzip-text.unzip');

    const finalDocumentCount = vscode.workspace.textDocuments.length;
    strictEqual(finalDocumentCount, initialDocumentCount, 'No new document should be created when unzip fails');
  });

  test('should not create document when gzipping empty content', async () => {
    await createDocumentWithSelection('');
    const initialDocumentCount = vscode.workspace.textDocuments.length;

    await executeCommandWithoutWaiting('gzip-unzip-text.gzip');

    const finalDocumentCount = vscode.workspace.textDocuments.length;
    strictEqual(finalDocumentCount, initialDocumentCount, 'No new document should be created for empty document');
  });
});
