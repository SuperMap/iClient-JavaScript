var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_05_findLocationService': function (browser) {
        var type = 'leaflet';
        var exampleName = '05_findLocationService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.pause(1000);
        browser.elements('class name', 'leaflet-marker-icon', function (result) {
            this.assert.equal(result.value.length, 8, "expect Number of marker to be 8, actual is " + result.value.length);
        });
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.pause(2000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 372, "expect Number of findLocationService result to be 372, actual is " + result.value.length);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};