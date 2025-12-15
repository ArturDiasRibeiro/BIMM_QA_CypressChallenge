import data from '../fixtures/data.json';

class AlertsPage {

    validateSimpleAlert() {
        cy.then(() => {
            const stub = cy.stub();
            cy.on('window:alert', stub);
            cy.get('#alertButton').click().then(() => {
                expect(stub.getCall(0)).to.be.calledWith(data.alertsData.simpleAlert);
            });
            cy.then(() => cy.off('window:alert', stub));
        });
    }

    validateTimerAlert() {
        cy.then(() => {
            const stub = cy.stub();
            cy.on('window:alert', stub);
            cy.get('#timerAlertButton').click();
            cy.wait(5500);
            cy.then(() => {
                expect(stub.lastCall).to.be.calledWith(data.alertsData.timerAlert);
            });
            cy.then(() => cy.off('window:alert', stub));
        });
    }

    validateConfirmAlert(choice) {
        cy.then(() => {
            const stub = cy.stub();
            const onConfirmAction = () => choice === data.alertsData.ok;

            cy.on('window:confirm', stub);
            cy.on('window:confirm', onConfirmAction);

            cy.get('#confirmButton').click().then(() => {
                expect(stub.getCall(0)).to.be.calledWith(data.alertsData.confirmAlert);
            });

            cy.then(() => {
                cy.off('window:confirm', onConfirmAction);
                cy.off('window:confirm', stub);
            });
        });

        const expectedMsg = choice === data.alertsData.ok
            ? data.alertsData.confirmResultOk
            : data.alertsData.confirmResultCancel;

        cy.get('#confirmResult').should('contain', expectedMsg);
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