import commonsPage from '../pages/CommonsPage';
import widgetsPage from '../pages/WidgetsPage';
import data from '../fixtures/data.json';

describe('DemoQA - Widgets Interactions', () => {

    context('Accordian Scenarios', () => {
        it('Should toggle visibility of accordian sections', () => {
            commonsPage.accessUrl(data.endpoints.accordianUrl);
            widgetsPage.validateAccordian();
        });
    });

    context('Auto Complete Scenarios', () => {
        it('Should handle multi-value and single-value inputs', () => {
            commonsPage.accessUrl(data.endpoints.autoCompleteUrl);
            widgetsPage.validateAutoComplete();
        });
    });

    context('Progress Bar Scenarios', () => {
        it('Should wait for progress bar to reach 100% completion', () => {
            commonsPage.accessUrl(data.endpoints.progressBarUrl);
            widgetsPage.validateProgressBar();
        });
    });

    context('Tabs Scenarios', () => {
        it('Should switch tabs and display correct content', () => {
            commonsPage.accessUrl(data.endpoints.tabsUrl);
            widgetsPage.validateTabs();
        });
    });

    context('Slider Scenarios', () => {
        it('Should move slider to specific value', () => {
            commonsPage.accessUrl(data.endpoints.sliderUrl);
            widgetsPage.validateSlider();
        });
    });

    context('Date Picker Scenarios', () => {
        it('Should select dates by typing directly into inputs', () => {
            commonsPage.accessUrl(data.endpoints.datePickerUrl);
            widgetsPage.validateDatePicker();
        });
    });
});