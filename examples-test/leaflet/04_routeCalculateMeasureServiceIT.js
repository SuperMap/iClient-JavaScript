var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },
    'leaflet_04_routeCalculateMeasureService': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_routeCalculateMeasureService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.expect.elements('path').count.to.equal(2).before(5000);
        browser.elements('css selector', 'path', function (result) {
            console.log('----Hope number of routeCalculateMeasureService path to be 2 , actual is '+ result.value.length)
        })
        browser.waitForElementPresent('.leaflet-pane.leaflet-tooltip-pane', 10000);
        browser.waitForElementPresent('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top', 10000);
        var info = "查询获取的M值为：627.9307113458588";
        browser.expect.element('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top').text.to.equal(info);
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
