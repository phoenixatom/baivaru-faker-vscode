import * as vscode from 'vscode';

const baivarufaker = require('./baivarufaker');

function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('baivarufaker.baivaruFake', baivarufaker.baivaruFakeCommand)
  );
}

module.exports = {
  activate
};