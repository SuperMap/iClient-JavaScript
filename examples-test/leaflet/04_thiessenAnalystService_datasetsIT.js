var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_thiessenAnalystService_datasets': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_thiessenAnalystService_datasets';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.pause(3000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 272, "expect Number of thiessen polygon(datasets) to be 272, actual is " + result.value.length);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};
