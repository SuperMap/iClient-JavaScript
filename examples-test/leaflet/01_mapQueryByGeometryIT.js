var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_mapQueryByGeometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_mapQueryByGeometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane canvas', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.elements('class name', 'leaflet-marker-icon', function (result) {
            browser.assert.ok(result.value.length > 0, "expect Number of query result to be greater than 0, actual is " + result.value.length);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};



