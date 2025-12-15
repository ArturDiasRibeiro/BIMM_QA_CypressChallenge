import data from '../fixtures/data.json';

describe('DemoQA - API Testing Scenarios', () => {

    it('Should create a user successfully or handle existing user', () => {
        cy.request({
            method: 'POST',
            url: data.endpoints.api.user,
            failOnStatusCode: false,
            body: {
                userName: data.bookStoreData.validUser,
                password: data.bookStoreData.validPassword
            }
        }).then((response) => {
            expect(response.status).to.be.oneOf([201, 406]);
            
            if (response.status === 201) {
                expect(response.body.username).to.eq(data.bookStoreData.validUser);
            }
        });
    });

    it('Should generate an authorization token', () => {
        cy.request({
            method: 'POST',
            url: data.endpoints.api.token,
            body: {
                userName: data.bookStoreData.validUser,
                password: data.bookStoreData.validPassword
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('Success');
            expect(response.body.token).to.not.be.empty;
        });
    });

    it('Should list all available books', () => {
        cy.request({
            method: 'GET',
            url: data.endpoints.api.books
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.books).to.be.an('array');
            expect(response.body.books.length).to.be.greaterThan(0);
            
            const targetBook = response.body.books.find(book => book.title === data.bookStoreData.bookTitle);
            expect(targetBook).to.exist;
            expect(targetBook.author).to.eq(data.bookStoreData.authorName);
        });
    });
});