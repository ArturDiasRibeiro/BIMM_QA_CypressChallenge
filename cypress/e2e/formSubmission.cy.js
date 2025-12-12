import data from "../fixtures/data.json"
import formsPage from '../pages/FormsPage';
import commonsPage from '../pages/CommonsPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Form Submission', () => {
beforeEach(() => {
        commonsPage.accessUrl(data.endpoints.practiceFormsUrl);
    });

    // it("HappyPath - Identify and fulfill all fields ", () => {
    //     commonsPage.insertName();
    //     commonsPage.inputEmail();
    //     formsPage.selectGender();
    //     formsPage.fillMobileNumber();
    //     formsPage.fillBirthDate();
    //     formsPage.fillSubjects();
    //     formsPage.selectHobbies();
    //     commonsPage.uploadPic();
    //     commonsPage.addressInput();
    //     formsPage.selectState();
    //     formsPage.selectCity();
    //     commonsPage.pressBtnSubmit();
    //     formsPage.validateSuccessMessage();
    // });

    // it("Empty submission attempt", () => {
    //     commonsPage.accessUrl(data.endpoints.practiceFormsUrl);
    //     commonsPage.pressBtnSubmit();
    //     formsPage.checkForEmptyFieldError()
    // });

    // it('Refuse a invalid email', () => {
    //     commonsPage.insertName();
    //     formsPage.selectGender();
    //     formsPage.fillMobileNumber();
    //     commonsPage.inputInvalidEmail();
    //     commonsPage.pressBtnSubmit();
    //     formsPage.wrongEmailError();
    // });

    it("City field dependency on State field ", () => {
        formsPage.selectState();
        formsPage.checksForCorrectCity();
    });
});