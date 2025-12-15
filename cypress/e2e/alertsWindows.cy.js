import commonsPage from '../pages/CommonsPage';
import alertsPage from '../pages/AlertsPage';
import browserWindowsPage from '../pages/BrowserWindowsPage';
import framesPage from '../pages/FramesPage';
import data from '../fixtures/data.json';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DemoQA - Alerts, Frame & Windows', () => {

    context('Alerts Scenarios', () => {
        it('Should validate native browser alerts interactions', () => {
            commonsPage.accessUrl(data.endpoints.alertsUrl);
            alertsPage.validateSimpleAlert();
            alertsPage.validateConfirmAlert(data.alertsData.ok);
            alertsPage.validateConfirmAlert(data.alertsData.cancel);
            alertsPage.validatePromptAlert();
            alertsPage.validateTimerAlert();
        });
    });

    context('Browser Windows Scenarios', () => {
        it('Should handle new tab and new window events', () => {
            commonsPage.accessUrl(data.endpoints.browserWindowsUrl);
            browserWindowsPage.validateNewTab();
            browserWindowsPage.validateNewWindow();
        });
    });

    context('Frames & Nested Frames Scenarios', () => {
        it('Should extract content from standard iframes', () => {
            commonsPage.accessUrl(data.endpoints.framesUrl);
            framesPage.validateStandardFrames();
        });

        it('Should extract content from nested iframes (Parent/Child)', () => {
            commonsPage.accessUrl(data.endpoints.nestedFramesUrl);
            framesPage.validateNestedFrames();
        });
    });

    context('Modal Dialogs Scenarios', () => {
        it('Should interact with Small and Large modal dialogs', () => {
            commonsPage.accessUrl(data.endpoints.modalDialogsUrl);
            framesPage.validateModalDialogs();
        });
    });
});