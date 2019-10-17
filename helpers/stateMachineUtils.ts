import { browser, ExpectedConditions } from "protractor";
import { waitService } from "./wait-service";
import { simulateDragDrop, clearAndSendKeys } from './utils';
import { BLinePage } from "../page_objects/finstack/bLine.page";


let bLinePage = new BLinePage();

function moveLastBlock(x, y) {
    var index = app.get('blocks').length - 1;
    app.set('blocks.' + index  + '.x', x);
    app.set('blocks.' + index  + '.y', y);
}

export async function addBlock(block, x, y){
   await browser.executeScript(simulateDragDrop, block.getWebElement(), bLinePage.stage.getWebElement());
   await browser.executeScript(moveLastBlock, x, y);
}

export async function createLink(start, end) {
    await start.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.potentialLink);
    await end.click();
    await waitService.waitUntilThisElementDoesNotExistAnymore_Promise(bLinePage.potentialLink);
}

export async function setProperties(nameInput, addValueInput, addButton, name, values) {
    await waitService.waitForElementToBePresentVisibleClickable_Promise(nameInput);
    await nameInput.sendKeys(name);
    for(let i = 0; i < values.length; i++){
        let value = values[i];
        await addValueInput.sendKeys(value);
        await addButton.click();
    }
}

export async function createBooleanVar(name) {
    await bLinePage.addVariables.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.varOption);
    await bLinePage.varOption.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.varName);
    await bLinePage.varName.sendKeys(name);
    await clearAndSendKeys(bLinePage.varName, name);
    await bLinePage.variableTypeSelect.click();
    await bLinePage.selectBool.click();
    await bLinePage.varFirstOk.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.defaultValueLabel);
    await bLinePage.varApply.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.varSecondOk);
    await bLinePage.varSecondOk.click();
}

export async function createNumberVar(name) {    
    await bLinePage.addVariables.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.varOption);
    await bLinePage.varOption.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.varName);
    await clearAndSendKeys(bLinePage.varName, name);
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.typeSelect);
    await bLinePage.varFirstOk.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.numberInputField);
    await bLinePage.varApply.click();
    await waitService.waitForElementToBePresentVisibleClickable_Promise(bLinePage.varSecondOk);
    await bLinePage.varSecondOk.click();
}

