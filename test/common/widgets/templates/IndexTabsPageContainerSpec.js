import {
    IndexTabsPageContainer
} from '../../../../src/common/widgets/templates/IndexTabsPageContainer';
// import {
//     GeometryType
// } from '../../../src/common/REST';

describe('IndexTabsPageContainer', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it('setTabs,removeTab,appendTabs', () => {

        var tab = document.createElement("div");
        tab.title = "testappend";
        // var content=document.createTextNode("test");
        var content = document.createElement("span");
        tab.content = content;
        var tabs = [tab];
        var indexTabs = new IndexTabsPageContainer();
        indexTabs.setTabs(tabs);
        expect(indexTabs.header.innerText).toContain(tabs[0].title);
        expect(indexTabs.content.firstChild).not.toBeNull();

        indexTabs.removeTab(0);

        expect(indexTabs.header.innerText).not.toContain(tabs[0].title);
        expect(indexTabs.content.firstChild).toBeNull;

    });
});