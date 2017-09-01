var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_routeCalculateMeasureService': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_routeCalculateMeasureService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(10000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of routeCalculateMeasureService path to be 2, actual is " + result.value.length);
        });
        browser.expect.element('.leaflet-pane.leaflet-tooltip-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top').to.be.present.before(10000);
        var info = "查询获取的M值为:627.9307113458588";
        browser.expect.element('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top').text.to.equal(info);
        browser.pause(1000);
        browser.end();
    }
};
