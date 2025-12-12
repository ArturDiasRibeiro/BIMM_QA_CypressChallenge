import FormsPage from '../pages/FormsPage';
import data from "../fixtures/data.json"
import commonsPage from '../pages/CommonsPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Form Submission', () => {
    beforeEach(() => {
        FormsPage.practiceFormsUrl();
    });

    it("HappyPath - Identify and fulfill all fields ", () => {
        commonsPage.accessUrl(data.endpoints.formsPageUrl);
        commonsPage.insertName();
        commonsPage.fillEmail();
        FormsPage.selectGender();
        FormsPage.fillMobileNumber();
        FormsPage.fillBirthDate();
        FormsPage.fillSubjects();
        FormsPage.selectHobbies();
        FormsPage.uploadPicture();
        commonsPage.addressInput();
        FormsPage.selectState();
        FormsPage.selectCity();
        commonsPage.pressBtnSubmit();
        FormsPage.validateSuccessMessage();
    });

    it("Empty submission attempt", () => {
        FormsPage.submit();
        FormsPage.checkForEmptyFieldError()
    });

    it('Refuse a invalid email', () => {
        FormsPage.fillFirstName();
        FormsPage.fillLastName();
        FormsPage.selectGender();
        FormsPage.fillMobileNumber();
        commonsPage.inputInvalidEmail();
        FormsPage.submit();
        FormsPage.wrongEmailError();
    });

    it("City field dependency on State field ", () => {
        FormsPage.selectState();
        FormsPage.checksForCorrectCity();
    });

});