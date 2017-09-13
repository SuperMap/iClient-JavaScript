var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_getGridCellInfos': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_getGridCellInfos';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.click('#map');
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.waitForElementPresent('.leaflet-popup-content', 10000);
        browser.expect.element('.leaflet-popup-content').text.to.be.contain('栅格查询结果');
        browser.expect.element('.leaflet-popup-content').text.to.be.contain('column');
        browser.expect.element('.leaflet-popup-content').text.to.be.contain('row');
        browser.expect.element('.leaflet-popup-content').text.to.be.contain('value');
        browser.click('.leaflet-popup-close-button', function () {
            browser.waitForElementNotPresent('.leaflet-popup-content', 10000);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};



