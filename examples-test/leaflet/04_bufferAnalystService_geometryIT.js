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
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(5000);
        browser.pause(1000);
        browser.end();
    }
};
