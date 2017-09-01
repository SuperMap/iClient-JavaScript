var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_routeLocatorService_line': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_routeLocatorService_line';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(10000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of routeLocatorService_line path to be 2, actual is " + result.value.length);
        });
        browser.pause(1000);
        browser.end();
    }
};
