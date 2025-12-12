import elementsPage from '../pages/ElementsPage';
import commonsPage from '../pages/CommonsPage';
import data from "../fixtures/data.json";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Elements', () => {

    it("HappyPath - Textbox", () => {
        commonsPage.accessUrl(textBoxPageUrl);
        commonsPage.insertName();
        commonsPage.inputEmail();
        commonsPage.addressInput();
        elementsPage.permanentAdressInput();
        commonsPage.pressBtnSubmit();
        elementsPage.checkForValidation();
    });

    it("HappyPath - CheckBoxes", () => {
        commonsPage.accessUrl(data.endpoints.checkBoxUrl);
        elementsPage.clickExpandAll();
        elementsPage.clickCollapseAll();
        elementsPage.toggleHomeCheckbox();
        elementsPage.validateAllSelected();
        elementsPage.toggleHomeCheckbox();
        elementsPage.validateNoneSelected();
    });

    it("Validating checked/unchecked selector boxes - CheckBoxes", () => {
        commonsPage.accessUrl(data.endpoints.checkBoxUrl);
        elementsPage.toggleHomeCheckbox();
        elementsPage.clickExpandAll();
        elementsPage.validFile(data.radioBtnData.elementExists.isVisible);
        elementsPage.clickCollapseAll();
        elementsPage.validFile(data.radioBtnData.elementExists.nonexistent);
    });
});

