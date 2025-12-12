import elementsPage from '../pages/ElementsPage';
import commonsPage from '../pages/CommonsPage';
import data from "../fixtures/data.json";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Elements', () => {

    it("HappyPath - Textbox", () => {
        commonsPage.accessUrl(data.endpoints.textBoxUrl);
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

    it("HappyPath - RadioBtn", () => {
        commonsPage.accessUrl(data.endpoints.radioBtnUrl);
        elementsPage.validateCheckedOption(data.radioBtnData.radioBtnID);
    });

    it("HappyPath - RegistrationForm", () => {
        commonsPage.accessUrl(data.endpoints.webTables);
        elementsPage.checkOpenRegForm();
        commonsPage.insertName();
        commonsPage.inputEmail();
        elementsPage.ageFieldInput();
        elementsPage.salaryFieldInput();
        elementsPage.departamentFieldInput();
        
    });

    it("Name Search/Editing - RegistrationForm", () => {
        commonsPage.accessUrl(data.endpoints.webTables);
        elementsPage.searchBoxField(data.webTables.searchBoxNames.Cierra);
        elementsPage.checkOpenRegForm();
        elementsPage.registrationFormEditing();
        commonsPage.pressBtnSubmit();
        elementsPage.searchBoxField(data.webTables.searchBoxNames.Artur);
        elementsPage.validateRecord(data.webTables.editValidation);
    })

    it("Deleting Record - RegistrationForm", () => {
        commonsPage.accessUrl(data.endpoints.webTables);
        elementsPage.searchBoxField(data.webTables.searchBoxNames.Cierra);
        elementsPage.deleteRecord(data.webTables.rowNotFoundMessage);
    });

    it("HappyPath - Buttons", () => {
        commonsPage.accessUrl(data.endpoints.btnUrl);
        elementsPage.buttonValidations();
    });

    it('HappyPath - Links', () => {
        commonsPage.accessUrl(data.endpoints.linksUrl);
        elementsPage.linksValidation();
    });

    it('Broken Links - Validate Server Error (500)', () => {
        commonsPage.accessUrl(data.endpoints.brokenLinksUrl);
        elementsPage.validateBrokenLink();
        elementsPage.validateValidLink();
    });

    it("HappyPath - Upload and Download", () => {
        commonsPage.accessUrl(data.endpoints.uploadDownloadUrl);
        elementsPage.downloadFile();
        elementsPage.validateDownload();
        elementsPage.uploadFile();
        elementsPage.validateUpload();
    });
})
