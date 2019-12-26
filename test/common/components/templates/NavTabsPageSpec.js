import {
    NavTabsPage
} from '../../../../src/common/components/templates/NavTabsPage';


describe('NavTabsPage', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it('setTabs,removeTab', () => {

        var tab = document.createElement("div");
        tab.title = "testappend";
   
        var content = document.createElement("span");
        var citySelect = document.createElement("span");
        tab.content = content;
        var tabs = [tab];
   
        var navTabs = document.createElement("div");
        navTabs.title = "initial";
        navTabs.content=citySelect
        var indexTabs = new NavTabsPage({
            tabs: navTabs
        });
        indexTabs.setTabs(tabs);
        expect(indexTabs.navTabsTitle.innerText).toContain(tabs[0].title);
        expect(indexTabs.navTabsContent.firstChild).not.toBeNull();
        indexTabs.removeTab(0);
        expect(indexTabs.navTabsTitle.innerText).not.toContain(tabs[0].title);
        expect(indexTabs.navTabsContent.firstChild).toBeNull;

    });
});