import data from '../fixtures/data.json';

class BrowserWindowsPage {

    validateNewTab() {
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
        });

        cy.get('#tabButton').click();
        cy.get('@windowOpen').should('be.calledWith', data.endpoints.samplePageUrl);

        cy.visit(data.endpoints.samplePageUrl);
        cy.get('#sampleHeading').should('have.text', data.browserWindowsData.sampleHeading);
        cy.go('back');
    }

    validateNewWindow() {
        cy.get('#windowButton').should('be.visible');
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
        });

        cy.get('#windowButton').click();
        cy.get('@windowOpen').should('be.calledWith', data.endpoints.samplePageUrl);
        
        cy.visit(data.endpoints.samplePageUrl);
        cy.get('#sampleHeading').should('have.text', data.browserWindowsData.sampleHeading);
        cy.go('back');
    }
}

export default new BrowserWindowsPage();