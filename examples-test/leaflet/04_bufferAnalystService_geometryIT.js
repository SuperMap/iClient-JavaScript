var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_bufferAnalystService_geometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_bufferAnalystService_geometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(5000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 35, "expect Number of bufferAnalystServices(geometry) path to be 35, actual is " + result.value.length);
        });
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(5000);
        browser.pause(1000);
        browser.end();
    }
};
