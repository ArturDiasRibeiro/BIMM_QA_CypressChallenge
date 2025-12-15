import data from '../fixtures/data.json';
import commonsPage from './CommonsPage';

class BookStorePage {

    performLogin() {
        cy.get('#userName').should('be.visible');
        commonsPage.insertName(data.bookStoreData.validUser);
        cy.get('#password').type(data.bookStoreData.validPassword);
        cy.get('#login').click();

        cy.url({ timeout: 15000 }).should('contain', 'profile');
        cy.get('#userName-value', { timeout: 15000 }).should('have.text', data.bookStoreData.validUser);
    }


    verifyLoggedInUser() {
        cy.get('#userName-value').should('have.text', data.bookStoreData.validUser);
    }

    performLogout() {
        cy.get('#submit').contains('Log out').click(); 
        cy.get('#login').should('be.visible'); 
    }


    searchBook() {
        cy.get('#searchBox').should('be.visible').type(data.bookStoreData.bookTitle);
    }

    validateBookInResults() {
        cy.get('.rt-tbody').contains(data.bookStoreData.bookTitle).should('be.visible');
        cy.get('.rt-tbody').contains(data.bookStoreData.authorName).should('be.visible');
    }

    validateEmptySearch() {
        cy.get('#searchBox').clear().type('LivroInexistenteXYZ');
        cy.get('.rt-noData').should('be.visible');
    }
}

export default new BookStorePage();