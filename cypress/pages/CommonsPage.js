import data from "../fixtures/data.json"

class CommonsPage {

    accessUrl(url) {
        cy.visit(url, { failOnStatusCode: false });
    }

    insertName(nameOverride) {
        // Se nameOverride foi passado, usa ele. Se não, usa o Artur Dias do JSON.
        const textToType = nameOverride || (data.userData.name.firstName + " " + data.userData.name.lastName);

        cy.get('body').then(($body) => {
            if ($body.find('#firstName').length > 0) {
                cy.log('Filling first name field');
                cy.get('#firstName').clear().should('be.visible').type(data.userData.name.firstName);
                if ($body.find('#lastName').length > 0) {
                    cy.get('#lastName').clear().should('be.visible').type(data.userData.name.lastName);
                }
            } else if ($body.find('#userName').length > 0) {
                // CORREÇÃO: Usamos a variável textToType aqui
                cy.get('#userName').clear().type(textToType);
            } else {
                throw new Error('Name input field not found');
            }
        });
    }

    inputEmail() {
        cy.get('#userEmail').clear().type(data.userData.email);
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

    uploadFile() {
        cy.get('#uploadFile').selectFile(data.uploadDownloadData.uploadFilePath);
    }

    uploadPic() {
        cy.get('#uploadPicture').selectFile(data.uploadDownloadData.uploadFilePath);
    }
}

export default new CommonsPage();