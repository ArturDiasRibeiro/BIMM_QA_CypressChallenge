![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# BIMM_QA_CypressChallenge - Cypress & JavaScript 🚀

This repository contains the automated testing solution for the **QA Cypress Challenge for BIMM - Toronto**. focusing on maintainability, scalability, and robust error handling while testing the [DemoQA](https://demoqa.com/) application.

## 📋 Project Overview

This framework covers end-to-end testing scenarios ranging from basic form interactions to complex widgets, nested frames, and authenticated workflows (Book Store).

## 🛠 Tech Stack

- **Framework:** Cypress (E2E Testing)
- **Language:** JavaScript
- **Design Pattern:** Page Object Model (POM)
- **Reporting:** Cypress Mochawesome Reporter
- **Data Management:** JSON Fixtures (Externalized Data)
- **Architecture:** Modular & Scalable

## ✨ Key Features

- **Page Object Model (POM):** Strict separation of page elements (e.g., `BookStorePage.js`, `FormsPage.js`) from test logic, ensuring code reusability.
- **Data-Driven Testing:** All test data (inputs, expected text, colors, user credentials) is isolated in `fixtures/data.json`, allowing for easy scenario updates.
- **Robust Selectors & Waits:**
  - Handling of **Race Conditions** in React applications (e.g., Login redirection waits).
  - Manipulation of **native prototypes** for tricky components like Sliders (`nativeInputValueSetter`).
- **Complex Scenarios Covered:**
  - **Nested Iframes** and Modal Dialogs.
  - **Browser Windows** (Tabs/Popups) stubbing.
  - **Mouse Interactions** (Drag and Drop, Resizing).
  - **Authentication** flows (Login/Logout/Profile).
- **Automated Reporting:** Generates rich HTML reports with screenshots attached upon failure.
- **CI/CD Ready:** Configured to run in headless mode via npm scripts.
