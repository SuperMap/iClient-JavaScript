var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_02_getGridCellInfos': function (browser) {
        var type = 'openlayers';
        var exampleName = '02_getGridCellInfos';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        browser.click('#map');
        browser.waitForElementPresent('#popup', 10000);
        browser.waitForElementPresent('#popup-content', 10000);
        browser.pause(2000);
        browser.expect.element('#popup-content').text.to.be.contain("栅格查询结果");
        browser.expect.element('#popup-content').text.to.be.contain('column');
        browser.expect.element('#popup-content').text.to.be.contain('row');
        browser.expect.element('#popup-content').text.to.be.contain('value');
        browser.end();
    }
};




