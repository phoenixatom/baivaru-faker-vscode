const vscode = require('vscode');
const axios = require('axios');

async function baivaruFakeCommand() {
    const options = ['ބަސް', 'ޖުމުލަ', 'ޕެރެގްރާފް'];
    const placeHolderText = 'ކޯއްޗެއް ޖެނެރޭޓް ކުރަންވީ؟';

    const dhivehiToEnglish: { [key: string]: string } = {
        'ބަސް': 'word',
        'ޖުމުލަ': 'sentence',
        'ޕެރެގްރާފް': 'paragraph',
    };

    const selectedOption = await vscode.window.showQuickPick(options, {
        placeHolder: placeHolderText,
    });

    const selectedOptionEn = dhivehiToEnglish[selectedOption];

    const userInput = await vscode.window.showInputBox({
        prompt: 'ކިތަކެތި؟',
        promptIsReadonly: true,
        validateInput: (value: string) => {
            const num = parseInt(value);
            if (isNaN(num) || num < 0 || num >= 100) {
            return 'ސަކަރާތް ނުޖަހާ';
            }
            return null;
        },
    });

    if (selectedOption && userInput !== undefined) {
        const apiUrl = `https://faker.baivaru.net/api/${selectedOptionEn}/${userInput}`;
        try {
            const response = await axios.get(apiUrl);
            const responseData = response.data.full.toString();

            // Copy to clipboard
            vscode.env.clipboard.writeText(responseData);
            
            // Paste to editor cursor position as well
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const currentPosition = editor.selection.active;
                const edit = new vscode.WorkspaceEdit();
                edit.insert(editor.document.uri, currentPosition, responseData);
                vscode.workspace.applyEdit(edit);
            }

            // Notify the user that data has been copied.
            vscode.window.showInformationMessage('Fake has been pasted and copied to clipboard successfully.');
        } catch (error) {
            vscode.window.showErrorMessage('Error fetching data from the API.');
        }
    }
}

module.exports = {
  baivaruFakeCommand,
};
