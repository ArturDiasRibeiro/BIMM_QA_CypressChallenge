# 🐞 Exploratory Testing Log & Known Issues

During the manual exploratory testing phase, several issues were identified in the **Student Registration Form**. Below is a list of defects and limitations observed in the current version of the application (DemoQA).

## 🔴 High Severity (Critical)
| Component | Issue Description | Impact |
|-----------|-------------------|--------|
| **Subjects** | **Application Crash:** Attempting to remove a selected subject tag (clicking the 'x') freezes the application. | Blocks user flow; requires page reload. |

## 🟠 Medium Severity (Major)
| Component | Issue Description | Impact |
|-----------|-------------------|--------|
| **Date of Birth** | **Logic Error:** The calendar allows selection of future dates (e.g., 2026, 2050). | Data integrity violation. |
| **Mandatory Fields** | **Bypass Validation:** Ideally, *Hobbies* and *Subjects* should be mandatory for a complete profile, but the system accepts empty submissions. | Incomplete user data profiles. |

## 🟡 Low Severity (Minor/Cosmetic)
| Component | Issue Description | Impact |
|-----------|-------------------|--------|
| **Name / Last Name** | **Input Validation:** Fields accept numeric values and special characters (e.g., "User123", "@#$"). | Poor data quality. |
| **Name / Last Name** | **Boundary Analysis:** No maximum character limit enforced. | Potential UI overflow or database truncation issues. |
| **Email** | **Boundary Analysis:** No maximum character limit enforced. | Potential security or database issues. |
| **Picture** | **File Validation:** Allows submission without upload or upload of non-image files. | Potential system vulnerability. |
| **Address** | **Boundary Analysis:** No maximum character limit enforced. | UI formatting issues. |

---
**Note:** These findings helped shape the "Unhappy Path" automation scenarios implemented in this repository.