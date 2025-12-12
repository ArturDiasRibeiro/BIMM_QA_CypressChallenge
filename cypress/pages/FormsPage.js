import data from "../fixtures/data.json"


class FormsPage {

    checksFormsPageIsLoaded() {
        cy.contains(data.studentRegistrationForm.studentRegistrationForm);
    }

    wrongEmailError() {
        cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

    selectGender() {
        const options = Object.values(data.formData.gender);
        const randomGender = Cypress._.sample(options);
        cy.contains(randomGender).click({ force: true });
    }

    fillMobileNumber() {
        cy.get('#userNumber').type(data.userData.mobileNumber);
    }

    fillBirthDate() {
        cy.get('#dateOfBirthInput').click().type("{selectall}").type(data.userData.birthDate).get("#dateOfBirth-label").click();
    }

    fillSubjects() {
        const options = Object.values(data.formData.subjects);
        for (const option of options) {
            cy.get("#subjectsContainer").type(option).press(Cypress.Keyboard.Keys.TAB)
        }
    }

    selectHobbies() {
        Object.values(data.formData.hobbies).forEach(hobby => {
            cy.contains('label', hobby).click({ force: true });
        })
    }

    uploadPicture() {
        const file = data.formData.picName
        cy.get('#uploadPicture').selectFile("cypress/fixtures/media/" + `${file}`, { force: true });
    }

    addressInput() {
        cy.get("#currentAddress").type(data.userData.AddressInput)
    }

    selectState() {
        cy.get('#state').click().press(Cypress.Keyboard.Keys.TAB).should('exist', data.formData.states.nCR.name)
    }

    selectCity() {
        cy.get("#city").scrollIntoView().should('not.be.disabled').click();
        cy.get('div#city div[class$="placeholder"]').press(Cypress.Keyboard.Keys.TAB)
    }

    validateSuccessMessage() {
        cy.get('.modal-content').should('be.visible');
        cy.get('#example-modal-sizes-title-lg').should('have.text', data.formData.successMessage);
    }

    checkForEmptyFieldError() {
        cy.get('.modal-content').should('not.exist');
        cy.get('#userForm').should('have.class', 'was-validated');
        cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

    checksForCorrectCity() {
        const expectedCity = data.formData.states.uttarPradesh.cities.agra
        cy.get('#city').click({ force: true });
        cy.contains(expectedCity).should('not.exist');
    }
}

export default new FormsPage();