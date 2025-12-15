import commonsPage from '../pages/CommonsPage';
import bookStorePage from '../pages/BookStorePage';
import data from '../fixtures/data.json';

describe('DemoQA - Book Store Application', () => {

    context('Authentication Scenarios', () => {
        it('Should perform login and logout successfully', () => {
            commonsPage.accessUrl(data.endpoints.bookStoreEndpoints.loginUrl);
            bookStorePage.performLogin();
            bookStorePage.verifyLoggedInUser();
            bookStorePage.performLogout();
        });
    });

    context('Book Search Scenarios', () => {
        beforeEach(() => {
            commonsPage.accessUrl(data.endpoints.bookStoreEndpoints.booksUrl);
        });

        it('Should search for an existing book', () => {
            bookStorePage.searchBook();
            bookStorePage.validateBookInResults();
        });

        it('Should display empty message for non-existing book', () => {
            bookStorePage.validateEmptySearch();
        });
    });
});