import data from "../fixtures/data.json"

class FormsPage {

    practiceFormsUrl() {
        cy.visit(data.formsPageUrl, { failOnStatusCode: false });
    }

    checksFormsPageIsLoaded() {
        cy.contains(data.userData.studentRegistrationForm);
    }

    wrongEmailError() {
        cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

    selectGender() {
        const options = Object.values(data.userData.gender);
        for (const option of options) {
            cy.contains(option).click({ force: true });
        }
    }

    fillMobileNumber() {
        cy.get('#userNumber').type(data.userData.mobileNumber);
    }

    fillBirthDate() {
        cy.get('#dateOfBirthInput').click().type("{selectall}").type(data.userData.birthDate).get("#dateOfBirth-label").click();
    }

    fillSubjects() {
        const options = Object.values(data.userData.subjects);
        for (const option of options) {
            cy.get("#subjectsContainer").type(option).press(Cypress.Keyboard.Keys.TAB)
        }
    }

    selectHobbies() {
        Object.values(data.userData.hobbies).forEach(hobby => {
            cy.contains('label', hobby).click({ force: true });
        })
    }

    uploadPicture() {
        cy.get('#uploadPicture').selectFile('cypress/fixtures/media/' + data.userData.fileName);
    }

    addressInput() {
        cy.get("#currentAddress").type(data.userData.AddressInput)
    }

    selectState() {
        cy.get('#state').click();
        cy.contains(data.userData.state).press(Cypress.Keyboard.Keys.TAB);
    }

    selectCity() {
        cy.get("#city").scrollIntoView().should('not.be.disabled').click();
        cy.get('div#city div[class$="placeholder"]').press(Cypress.Keyboard.Keys.TAB)
    }

    validateSuccessMessage() {
        cy.get('.modal-content').should('be.visible');
        cy.get('#example-modal-sizes-title-lg').should('contain', data.userData.successMessage);
    }

    checkForEmptyFieldError() {
        cy.get('.modal-content').should('not.exist');
        cy.get('#userForm').should('have.class', 'was-validated');
        cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

    checksForCorrectCity() {
        const expectedCity = data.userData.state.suttarPradesh.agra
        cy.get('#city').click({ force: true });
        cy.contains(expectedCity).should('not.exist');
    }
}

export default new FormsPage();