var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_surfaceAnalystService': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_surfaceAnalystService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.pause(8000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 22, "expect Number of surfaceAnalystService result to be 22, actual is " + result.value.length);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};
