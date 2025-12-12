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
        const stateName = data.formData.states.nCR.name;
        cy.get('#state input').type(`${stateName}{enter}`, { force: true });
        cy.get('#state').should('contain', stateName);
    }

    selectCity() {
        cy.get("#city").scrollIntoView().should('not.be.disabled').click();
        cy.get('div#city div[class$="placeholder"]').press(Cypress.Keyboard.Keys.TAB)
    }

    checksForCorrectCity() {
        const invalidCity = data.formData.states.uttarPradesh.cities.agra;
        const validCity = data.formData.states.nCR.cities.delhi;
        cy.get('#state').should('contain', data.formData.states.nCR.name);
        cy.get('#city').scrollIntoView().click().should('not.be.disabled');
        cy.contains(validCity).should('exist').press(Cypress.Keyboard.Keys.ENTER)
        cy.contains(invalidCity).should('not.exist');
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
}
    

export default new FormsPage();