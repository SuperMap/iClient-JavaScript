import {
    CommonContainer
} from '../../../../src/common/components/templates/CommonContainer';


describe('CommonContainer', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it('appendContent', () => {

        var tab = document.createElement("div");
        tab.innerHTML = "testappend";

        // navTabs.content = citySelect
        var coomoncon = new CommonContainer({
            title: "testTitle"
        });
        coomoncon.appendContent(tab);
        expect(coomoncon.content.innerHTML).toContain("testappend");
    });
});