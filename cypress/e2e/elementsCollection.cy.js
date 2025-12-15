import elementsPage from '../pages/ElementsPage';
import commonsPage from '../pages/CommonsPage';
import data from "../fixtures/data.json";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Elements Interactions', () => {

    context('Text Box Scenarios', () => {
        it('Should submit valid personal information and verify output', () => {
            commonsPage.accessUrl(data.endpoints.textBoxUrl);
            commonsPage.insertName();
            commonsPage.inputEmail();
            commonsPage.addressInput();
            elementsPage.permanentAdressInput();
            commonsPage.pressBtnSubmit();
            elementsPage.checkForValidation();
        });
    });

    context('Check Box Scenarios', () => {
        it('Should select all options using the Home toggle', () => {
            commonsPage.accessUrl(data.endpoints.checkBoxUrl);
            elementsPage.clickExpandAll();
            elementsPage.clickCollapseAll();
            elementsPage.toggleHomeCheckbox();
            elementsPage.validateAllSelected();
            elementsPage.toggleHomeCheckbox();
            elementsPage.validateNoneSelected();
        });

        it('Should persist expansion state when toggling parent options', () => {
            commonsPage.accessUrl(data.endpoints.checkBoxUrl);
            elementsPage.toggleHomeCheckbox();
            elementsPage.clickExpandAll();
            elementsPage.validFile(data.radioBtnData.elementExists.isVisible);
            elementsPage.clickCollapseAll();
            elementsPage.validFile(data.radioBtnData.elementExists.nonexistent);
        });
    });

    context('Radio Button Scenarios', () => {
        it('Should verify selection capability and disabled options', () => {
            commonsPage.accessUrl(data.endpoints.radioBtnUrl);
            elementsPage.validateCheckedOption(data.radioBtnData.radioBtnID);
        });
    });

    context('Web Tables Scenarios', () => {
        it('Should add a new user record to the table', () => {
            commonsPage.accessUrl(data.endpoints.webTables);
            elementsPage.checkOpenRegForm();
            commonsPage.insertName();
            commonsPage.inputEmail();
            elementsPage.ageFieldInput();
            elementsPage.salaryFieldInput();
            elementsPage.departamentFieldInput();
            commonsPage.pressBtnSubmit();
        });

        it('Should search for a user and edit their details', () => {
            commonsPage.accessUrl(data.endpoints.webTables);
            elementsPage.searchBoxField(data.webTables.searchBoxNames.Cierra);
            elementsPage.checkOpenRegForm();
            elementsPage.registrationFormEditing();
            commonsPage.pressBtnSubmit();
            elementsPage.searchBoxField(data.webTables.searchBoxNames.Artur);
            elementsPage.validateRecord(data.webTables.editValidation);
        });

        it('Should delete a user record and verify removal', () => {
            commonsPage.accessUrl(data.endpoints.webTables);
            elementsPage.searchBoxField(data.webTables.searchBoxNames.Cierra);
            elementsPage.deleteRecord(data.webTables.rowNotFoundMessage);
        });
    });

    context('Buttons Scenarios', () => {
        it('Should validate Click, Double Click, and Right Click actions', () => {
            commonsPage.accessUrl(data.endpoints.btnUrl);
            elementsPage.buttonValidations();
        });
    });

    context('Links Scenarios', () => {
        it('Should verify API response status for dynamic links', () => {
            commonsPage.accessUrl(data.endpoints.linksUrl);
            elementsPage.linksValidation();
        });

        it('Should handle server errors (500) on broken links', () => {
            commonsPage.accessUrl(data.endpoints.brokenLinksUrl);
            elementsPage.validateBrokenLink();
            elementsPage.validateValidLink();
        });
    });

    context('Upload & Download Scenarios', () => {
        it('Should download a file and upload it successfully', () => {
            commonsPage.accessUrl(data.endpoints.uploadDownloadUrl);
            elementsPage.downloadFile();
            elementsPage.validateDownload();
            commonsPage.uploadFile();
            elementsPage.validateUpload();
        });
    });

    context('Dynamic Properties Scenarios', () => {
        it('Should handle delayed visibility and state changes', () => {
            commonsPage.accessUrl(data.endpoints.dynamicPropertiesUrl);
            elementsPage.dynamicPropertiesValidation();
        });
    });
});