var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_thiessenAnalystService_geometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_thiessenAnalystService_geometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(5000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 10, "expect Number of thiessen polygon(geometry) to be 10, actual is " + result.value.length);
        });
        browser.pause(1000);
        browser.end();
    }
};
