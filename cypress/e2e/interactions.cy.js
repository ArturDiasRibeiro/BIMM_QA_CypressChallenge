import commonsPage from '../pages/CommonsPage';
import interactionsPage from '../pages/InteractionsPage';
import data from '../fixtures/data.json';

describe('DemoQA - Interactions Scenarios', () => {

    context('Sortable List', () => {
        it('Should drag and reorder items in a list', () => {
            commonsPage.accessUrl(data.endpoints.sortableUrl);
            interactionsPage.validateSortable();
        });
    });

    context('Selectable Items', () => {
        it('Should select multiple items from a list', () => {
            commonsPage.accessUrl(data.endpoints.selectableUrl);
            interactionsPage.validateSelectable();
        });
    });

    context('Resizable Box', () => {
        it('Should resize the box restriction container', () => {
            commonsPage.accessUrl(data.endpoints.resizableUrl);
            interactionsPage.validateResizable();
        });
    });

    context('Droppable Area', () => {
        it('Should drag an element and drop it into a target area', () => {
            commonsPage.accessUrl(data.endpoints.droppableUrl);
            interactionsPage.validateDroppable();
        });
    });
});