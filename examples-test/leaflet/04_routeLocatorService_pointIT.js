var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_routeLocatorService_point': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_routeLocatorService_point';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.pause(2000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 1, "expect Number of routeLocatorService_point result to be 1, actual is " + result.value.length);
        });
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-tooltip-pane', 10000);
        browser.waitForElementPresent('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top', 10000);
        var info = "查询到的里程为\ 200\ 的点";
        browser.expect.element('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top').text.to.equal(info);
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};
