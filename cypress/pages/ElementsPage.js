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
        const fullName = commonsPage.ValidateFullName();
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


}

export default new ElementsPage();