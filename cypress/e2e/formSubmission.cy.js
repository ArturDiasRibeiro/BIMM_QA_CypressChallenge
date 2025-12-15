import data from "../fixtures/data.json";
import formsPage from '../pages/FormsPage';
import commonsPage from '../pages/CommonsPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Form Submission', () => {

    beforeEach(() => {
        commonsPage.accessUrl(data.endpoints.practiceFormsUrl);
    });

    context('Successful Submission Scenarios', () => {
        it("Should identify and fulfill all fields successfully", () => {
            commonsPage.insertName();
            commonsPage.inputEmail();
            formsPage.selectGender();
            formsPage.fillMobileNumber();
            formsPage.fillBirthDate();
            formsPage.fillSubjects();
            formsPage.selectHobbies();
            
            commonsPage.uploadPic(); 
            
            commonsPage.addressInput();
            formsPage.selectState();
            formsPage.selectCity();
            commonsPage.pressBtnSubmit();
            formsPage.validateSuccessMessage();
        });
    });

    context('Validation & Error Handling', () => {
        it("Should show error borders on empty submission attempt", () => {
            commonsPage.pressBtnSubmit();
            formsPage.checkForEmptyFieldError();
        });

        it('Should refuse submission with invalid email format', () => {
            commonsPage.insertName();
            formsPage.selectGender();
            formsPage.fillMobileNumber();
            commonsPage.inputInvalidEmail();
            commonsPage.pressBtnSubmit();
            formsPage.wrongEmailError();
        });
    });

    context('Field Dependency Scenarios', () => {
        it("Should enable City dropdown only after State selection", () => {
            formsPage.selectState();
            formsPage.checksForCorrectCity();
        });
    });
});