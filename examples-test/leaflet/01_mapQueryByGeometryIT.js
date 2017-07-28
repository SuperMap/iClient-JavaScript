var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_mapQueryByGeometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_mapQueryByGeometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(3000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(3000);
        browser.end();
    }
};



