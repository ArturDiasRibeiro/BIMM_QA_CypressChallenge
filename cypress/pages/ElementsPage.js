import data from "../fixtures/data.json"
import commonsPage from "./CommonsPage";

class ElementsPage {

    checksFormsPageIsLoaded() {
        cy.contains(data.userData.studentRegistrationForm);
    }

    permanentAdressInput() {
        cy.get("#permanentAddress").type(data.userData.AddressInput);
    }

    checkForValidation() {
        const fullName = data.userData.name.firstName + " " + data.userData.name.lastName;
        cy.get("#output").scrollIntoView().should('be.visible').within(() => {
            cy.contains(fullName);
            cy.contains(data.userData.email);
            cy.contains(data.userData.AddressInput);
        })
    }

    clickExpandAll() {
        cy.get(".rct-option-expand-all").click();
        this.validFile(data.radioBtnData.elementExists.isVisible);
    }

    clickCollapseAll() {
        cy.get(".rct-option-collapse-all").click();
        this.validFile(data.radioBtnData.elementExists.nonexistent);
    }

    toggleHomeCheckbox() {
        cy.contains(".rct-title", "Home").click();
    }

    validateAllSelected() {
        cy.get("#result").should("be.visible")
            .and("contain", "home")
            .and("contain", "desktop")
            .and("contain", "notes")
            .and("contain", "commands")
            .and("contain", "documents")
            .and("contain", "workspace")
            .and("contain", "office")
            .and("contain", "downloads")
            .and("contain", "wordFile")
            .and("contain", "excelFile");
    }

    validFile(option) {
        const file = data.checkBoxData.folderStructure.Downloads.wordFile;
        if (option === "be.visible") {
            cy.contains(file).should("be.visible");
        } else if (option === "not.exist") {
            cy.contains(file).should("not.exist");
        }
    }

    validateNoneSelected() {
        cy.get("#result").should("not.exist");
    }

    validateCheckedOption(options) {
        const radioArray = Object.values(options);
        for (let index = 0; index < radioArray.length; index++) {
            this.validateOption(radioArray, index);
        }
    }

    validateOption(radioArray, index) {
        const content = radioArray[index];
        if (content === data.radioBtnData.radioBtnID.opt3) {
            cy.get(`#${content}`).click({ force: true });
            cy.get('.text-success').should('have.text', data.radioBtnData.radioBtnLabels.yes)
        } else if (content === data.radioBtnData.radioBtnID.opt2) {
            cy.get(`#${content}`).click({ force: true });
            cy.get('.text-success').should('have.text', data.radioBtnData.radioBtnLabels.impressive)
        } else if (content === data.radioBtnData.radioBtnID.opt1) {
            cy.log('Btn disabled, skipping click action');
            cy.contains(`#${content}`).should('not.exist', data.radioBtnData.radioBtnLabels.no)
        } else {
            throw new Error("Invalid radio button ID");
        }
    }

    checkOpenRegForm() {
        cy.get("#addNewRecordButton").click({ force: true });
        cy.get("#userForm").should("be.visible")
    }

    ageFieldInput() {
        cy.get("#age").clear().type(data.userData.age);
    }

    salaryFieldInput() {
        cy.get("#salary").clear().type(data.webTables.salary);
    }

    departamentFieldInput() {
        cy.get("#department").clear().type(data.webTables.department);
    }

    searchBoxField(input) {
        cy.get('#searchBox').clear().type(input);
    }

    registrationFormEditing() {
        cy.get("#edit-record-1").click({ force: true });
        commonsPage.insertName();
        commonsPage.inputEmail();
        this.ageFieldInput();
        this.salaryFieldInput();
        this.departamentFieldInput();
    }

    validateRecord(recordObject) {
        const values = Object.values(recordObject);
        cy.contains('.rt-tr-group', values[0]).within(() => {
            values.forEach((value) => {
                cy.contains(value).should('be.visible');
            });
        });
    }

    deleteRecord(option) {
        cy.get("#delete-record-1").click({ force: true });
        cy.contains(option).should('be.visible')
    }


    buttonValidations() {
        this.doubleClickButton();
        this.rightClickButton();
        this.dynamicClickButton();
    }

    doubleClickButton() {
        cy.get('#doubleClickBtn').dblclick();
        cy.get('#doubleClickMessage').should('have.text', data.buttonsData.doubleClickMessage);
    }

    rightClickButton() {
        cy.get('#rightClickBtn').rightclick();
        cy.get('#rightClickMessage').should('have.text', data.buttonsData.rightClickMessage);
    };

    dynamicClickButton() {
        cy.contains(/^Click Me$/).click();
        cy.get('#dynamicClickMessage').should('have.text', data.buttonsData.dynamicClickMessage);
    }

    linksValidation() {
        const linkScenarios = [
            { id: '#simpleLink', validStatus: [200] },
            { id: '#dynamicLink', validStatus: [200] },
            { id: '#created', validStatus: [200, 201] },
            { id: '#no-content', validStatus: [200, 204] },
            { id: '#moved', validStatus: [200, 301] },
            { id: '#bad-request', validStatus: [200, 400] },
            { id: '#unauthorized', validStatus: [200, 401] },
            { id: '#forbidden', validStatus: [200, 403] },
            { id: '#invalid-url', validStatus: [200, 404] }
        ];

        linkScenarios.forEach(scenario => {
            cy.get(scenario.id).click().then(link => {
                const url = link.prop('href');

                cy.request({
                    url: url,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.oneOf(scenario.validStatus);
                });
            });
        });
    }

    brokenLinkValidation() {
        cy.contains().click().then(link => {
            const url = link.prop('href');
            cy.request({
                url: url,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(400);
            });
        });
    }

    validateBrokenLink() {
        cy.contains("Click Here for Broken Link")
            .should('have.attr', 'href')
            .then((href) => {
                cy.request({
                    url: href,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(500);
                    cy.log('Sucesso: O link retornou erro 500 conforme esperado.');
                });
            });
    }

    validateValidLink() {
        cy.contains("Click Here for Valid Link")
            .should('have.attr', 'href')
            .then((href) => {
                cy.request(href).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
    }


    downloadFile() {
        cy.get('#downloadButton').click();
    }

    validateDownload() {
        const fileName = data.uploadDownloadData.downloadFileName;
        cy.readFile(`cypress/downloads/${fileName}`).should('exist');
    }

    validateUpload() {
        cy.get('#uploadedFilePath').should('contain', data.uploadDownloadData.uploadFileName);
    }
}
export default new ElementsPage();