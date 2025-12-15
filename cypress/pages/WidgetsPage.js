import data from '../fixtures/data.json';

class WidgetsPage {

    validateAccordian() {
        cy.get('#section1Heading').click();
        cy.get('#section1Content').should('be.visible')
            .and('contain', data.widgetsData.accordianContent);

        cy.get('#section2Heading').click();
        cy.get('#section1Content').should('not.be.visible');
        cy.get('#section2Content').should('be.visible');
    }

    validateAutoComplete() {
        const colors = data.widgetsData.colors;

        colors.forEach(color => {
            cy.get('#autoCompleteMultipleInput')
                .type(`${color}{enter}`);
        });

        cy.get('#autoCompleteMultipleContainer')
            .should('contain', colors[0])
            .and('contain', colors[1]);

        cy.get('#autoCompleteSingleInput')
            .type(`${data.widgetsData.singleColor}{enter}`);

        cy.get('#autoCompleteSingleContainer')
            .should('contain', data.widgetsData.singleColor);
    }

    validateProgressBar() {
        cy.get('#startStopButton').click();

        cy.get('#progressBar', { timeout: 15000 })
            .should('contain', data.widgetsData.progressBarFull);

        cy.get('.progress-bar')
            .should('have.css', 'background-color', data.widgetsData.successColor);

        cy.get('#resetButton').should('be.visible');
    }

    validateTabs() {
        cy.get('#demo-tab-what').click();
        cy.get('#demo-tabpane-what').should('be.visible');

        cy.get('#demo-tab-origin').click();
        cy.get('#demo-tabpane-origin').should('be.visible')
            .and('contain', data.widgetsData.tabsContentOrigin);

        cy.get('#demo-tabpane-what').should('not.be.visible');

        cy.get('#demo-tab-use').click();
        cy.get('#demo-tabpane-use').should('be.visible')
            .and('contain', data.widgetsData.tabsContentUse);
    }

    validateSlider() {
        cy.get('.range-slider')
            .invoke('val', data.widgetsData.sliderValue)
            .trigger('input', { force: true })
            .trigger('change', { force: true });

        cy.get('#sliderValue')
            .should('have.value', data.widgetsData.sliderValue);
    }

    validateDatePicker() {
        cy.get('#datePickerMonthYearInput')
            .clear()
            .type(`${data.widgetsData.dateToType}{enter}`);

        cy.get('#datePickerMonthYearInput')
            .should('have.value', data.widgetsData.dateToType);

        cy.get('#dateAndTimePickerInput')
            .clear()
            .type(`${data.widgetsData.dateTimeToType}{enter}`);

        cy.get('#dateAndTimePickerInput')
            .should('have.value', data.widgetsData.dateTimeToType);
    }
}

export default new WidgetsPage();