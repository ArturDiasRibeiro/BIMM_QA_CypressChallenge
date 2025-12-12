# 🐞 Exploratory Testing Log & Known Issues - Elements Section

During the manual exploratory testing phase, several issues were identified in the **Elements** module (Text Box, Check Box, Radio Button, Web Tables). Below is a list of defects, limitations, and environmental instability observed in the current version of the application.

## 🔴 High Severity (Critical)
| Component | Issue Description | Impact |
|-----------|-------------------|--------|
| **Environment / API** | **Server Instability (502/503):** The application frequently returns "502 Bad Gateway" or "Service Unavailable" errors during navigation. | **Blocker:** Prevents test execution and causes intermittent failures (flakiness) in automation. |
| **Links** | **Broken Links:** The "Broken Links - Images" page contains hardcoded links that return 500 status codes intentionally, but lack proper user feedback handling. | User encounters error pages instead of handled UI messages. |

## 🟠 Medium Severity (Major)
| Component | Issue Description | Impact |
|-----------|-------------------|--------|
| **Radio Button** | **Feature Disabled:** The "No" radio button is permanently disabled/unclickable without a clear reason displayed to the user. | User is restricted from selecting a valid negative option. |
| **Web Tables** | **Search Logic:** Searching for a record that doesn't exist does not display a "No rows found" message clearly; the table just becomes empty. | Poor User Experience (UX); user might think the table failed to load. |

## 🟡 Low Severity (Minor/Cosmetic)
| Component | Issue Description | Impact |
|-----------|-------------------|--------|
| **Text Box (Full Name)** | **Input Validation:** Field accepts numeric values and special characters (e.g., "Artur123", "!@#"). | Poor data quality. |
| **Text Box (Address)** | **Boundary Analysis:** No maximum character limit enforced for "Current Address" or "Permanent Address". | Potential UI overflow or database truncation issues. |
| **Check Box** | **UI/State:** When "Home" is unchecked, the expand/collapse state is sometimes reset unexpectedly. | Minor usability annoyance. |
| **Text Box (Email)** | **Validation Consistency:** The regex used for email validation is permissive with some edge cases (e.g., `email@domain` without top-level domain). | Potential invalid data entry. |

---
**Note:** The environmental instability (502 Errors) required the implementation of `failOnStatusCode: false` and retry logic in the automated test suite to ensure execution continuity.