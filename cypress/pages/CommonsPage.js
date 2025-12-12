import data from "../fixtures/data.json"

class CommonsPage {
    
    accessUrl(url) {
        cy.visit(url, { failOnStatusCode: false });
    }
    
    insertName() {
        const fullName = data.userData.name.firstName + " " + data.userData.name.lastName;
        
        if (cy.get('#userName').should('have.attr', 'placeholder', 'Full Name')) {
            cy.get('#userName', { timeout: 10000 }).should('be.visible').type(fullName)
            return fullName;
        } 

        else if (cy.get('#firstName').should('have.attr', 'placeholder', 'First Name')) {
        cy.get('#firstName').type(data.userData.name.firstName);
            return data.userData.name.firstName;
        } 

        else if (cy.get('#lastName').should('have.attr', 'placeholder', 'Last Name')) {
            cy.get('#lastName').type(data.userData.name.lastName);
            return data.userData.name.lastName;
        }
    }

    ValidateFullName() {
        const fullName = data.userData.name.firstName + " " + data.userData.name.lastName;
        return fullName;
    }

    inputEmail() {
        cy.get('#userEmail').type(data.userData.email);
    }

    addressInput() {
        cy.get("#currentAddress").type(data.userData.AddressInput)
    }

    pressBtnSubmit() {
        cy.get('#submit').click({ force: true });
    }

    inputInvalidEmail() {
        cy.get('#userEmail').type(data.userData.invalidEmail);
    }
}

export default new CommonsPage();