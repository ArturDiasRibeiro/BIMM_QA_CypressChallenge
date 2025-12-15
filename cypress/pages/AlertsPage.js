import data from '../fixtures/data.json';

class AlertsPage {

    validateSimpleAlert() {
        const stub = cy.stub().as('simpleAlertStub');
        cy.on('window:alert', stub);
        
        cy.get('#alertButton', { timeout: 10000 }).click();
        
        cy.get('@simpleAlertStub').should('have.been.calledWith', data.alertsData.simpleAlert);
        
        cy.on('window:alert', () => {}); 
    }

    validateTimerAlert() {
        const stub = cy.stub().as('timerAlertStub');
        cy.on('window:alert', stub);

        cy.get('#timerAlertButton', { timeout: 10000 }).click();

        cy.get('@timerAlertStub', { timeout: 15000 })
            .should('have.been.calledWith', data.alertsData.timerAlert);

        cy.on('window:alert', () => {}); 
    }

    validateConfirmAlert(result) {
        const isOk = result === data.alertsData.ok;
        const stub = cy.stub().returns(isOk).as('confirmAlertStub');
        
        cy.on('window:confirm', stub);

        cy.get('#confirmButton').click();

        cy.get('@confirmAlertStub').should('have.been.calledWith', data.alertsData.confirmAlert);

        if (isOk) {
            cy.get('#confirmResult').should('contain', data.alertsData.confirmResultCancel);
        } else {
            cy.get('#confirmResult').should('contain', data.alertsData.confirmResultCancel);
        }
        
        cy.on('window:confirm', () => {}); 
    }

    validatePromptAlert() {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(data.alertsData.promptText);
        });

        cy.get('#promtButton').click();
        cy.get('#promptResult').should('contain', data.alertsData.promptResult);
    }
}

export default new AlertsPage();