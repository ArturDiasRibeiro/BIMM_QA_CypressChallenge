import data from '../fixtures/data.json';

class InteractionsPage {

    validateSortable() {
        cy.get('.vertical-list-container > :nth-child(1)').as('itemOne');
        cy.get('.vertical-list-container > :nth-child(2)').as('itemTwo');

        cy.get('@itemOne').trigger('mousedown', { which: 1 });
        cy.get('@itemTwo').trigger('mousemove').trigger('mouseup', { force: true });

        cy.get('.vertical-list-container > :nth-child(1)').should('contain', data.interactionsData.sortableItemTwo);
    }

    validateSelectable() {
        cy.get('#verticalListContainer > li').contains(data.interactionsData.selectableItemOne).click();
        cy.get('#verticalListContainer > li').contains(data.interactionsData.selectableItemTwo).click();

        cy.get('#verticalListContainer > li').contains(data.interactionsData.selectableItemOne)
            .should('have.class', 'active');
        cy.get('#verticalListContainer > li').contains(data.interactionsData.selectableItemTwo)
            .should('have.class', 'active');

        cy.get('#verticalListContainer > li').contains(data.interactionsData.selectableItemThree)
            .should('not.have.class', 'active');
    }

    validateResizable() {
        cy.get('#resizableBoxWithRestriction')
            .invoke('width').should('be.closeTo', data.interactionsData.initialBoxWidth, data.interactionsData.boxTolerance);

        cy.get('#resizableBoxWithRestriction span.react-resizable-handle-se')
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { clientX: data.interactionsData.resizeX, clientY: data.interactionsData.resizeY })
            .trigger('mouseup', { force: true });

        cy.get('#resizableBoxWithRestriction')
            .invoke('width').should('be.gt', data.interactionsData.initialBoxWidth);
    }

    validateDroppable() {
        cy.get('#draggable').trigger('mousedown', { which: 1 });
        cy.get('#droppable')
            .trigger('mousemove')
            .trigger('mouseup', { force: true });

        cy.get('#droppable')
            .should('contain', data.interactionsData.droppedText)
            .and('have.css', 'background-color', data.interactionsData.droppedColor);
    }
}

export default new InteractionsPage();