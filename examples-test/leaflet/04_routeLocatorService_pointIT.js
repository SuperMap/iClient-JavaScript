var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_routeLocatorService_point': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_routeLocatorService_point';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(5000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 1, "expect Number of routeLocatorService_point result to be 1, actual is " + result.value.length);
        });
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-tooltip-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top').to.be.present.before(5000);
        var info = "查询到的里程为\ 200\ 的点";
        browser.expect.element('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top').text.to.equal(info);
        browser.pause(1000);
        browser.end();
    }
};
