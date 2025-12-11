# BIMM_QA_CypressChallenge - Cypress & JavaScript 🚀
This repository contains the automated testing solution for the QA Cypress Challenge for BIMM - Toronto. The project was built to demonstrate best practices in QA automation, focusing on maintainability, scalability, and robust error handling.

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 📋 Project Overview


### 🛠 Tech Stack
* **Framework:** Cypress (E2E Testing)
* **Language:** JavaScript
* **Design Pattern:** Page Object Model (POM)
* **Reporting:** Cypress Mochawesome Reporter
* **Data Management:** JSON Fixtures

## ✨ Key Features
* **Page Object Model (POM):** Separation of page elements (`FormsPage.js`, `CommonsPage.js`) from test logic for better maintainability.
* **Data-Driven Testing:** All test data is isolated in `fixtures/data.json`, allowing for easy scenario updates.
* **Robust Selectors:** Handling of dynamic elements (e.g., React Select for State/City logic) and complex widgets (Datepicker).
* **Unhappy Path Coverage:** Validation of mandatory fields and error states.
* **Automated Reporting:** Generates HTML reports with screenshots attached upon failure.
* **CI/CD Ready:** Configured to run in headless mode via `npm` scripts.

## 📂 Project Structure
```text
cypress/
├── e2e/
│   └── formSubmission.cy.js    # Main test execution file
├── fixtures/
│   ├── data.json               # Test data (Happy/Unhappy paths)
│   └── media/                  # Files for upload testing
├── pages/
│   ├── CommonsPage.js          # Shared methods
│   └── FormsPage.js            # Page Object for Registration Form
├── support/
│   ├── e2e.js                  # Global configurations & plugins
│   └── commands.js             # Custom commands
└── reports/                    # HTML Reports (generated after run)
