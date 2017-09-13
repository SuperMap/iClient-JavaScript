var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_thiessenAnalystService_geometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_thiessenAnalystService_geometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.pause(3000);
        browser.elements('tag name', 'path', function (result) {
            browser.assert.equal(result.value.length, 10, "expect Number of thiessen polygon(geometry) to be 10, actual is " + result.value.length);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};
