import data from '../fixtures/data.json';

class FramesPage {

    getIframeBody(selector) {
        return cy.get(selector)
            .its('0.contentDocument.body').should('not.be.empty')
            .then(cy.wrap);
    }

    validateStandardFrames() {
        this.getIframeBody('#frame1')
            .find('#sampleHeading')
            .should('have.text', data.framesData.sampleHeading);

        this.getIframeBody('#frame2')
            .find('#sampleHeading')
            .should('have.text', data.framesData.sampleHeading);
    }

    validateNestedFrames() {
        this.getIframeBody('#frame1').then($parentBody => {
            cy.wrap($parentBody)
                .should('contain.text', data.framesData.parentFrameText);

            cy.wrap($parentBody)
                .find('iframe')
                .its('0.contentDocument.body').should('not.be.empty')
                .then(cy.wrap)
                .find('p')
                .should('have.text', data.framesData.childFrameText);
        });
    }

    validateModalDialogs() {
        cy.get('#showSmallModal').click();
        cy.get('.modal-body').should('contain', data.framesData.smallModalText);
        cy.get('#closeSmallModal').click();
        cy.get('#showLargeModal').click();
        cy.get('.modal-body').should('contain', data.framesData.largeModalText);
        cy.get('#closeLargeModal').click();
    }
}

export default new FramesPage();