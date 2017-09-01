var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_mapQueryByBounds': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_mapQueryByBounds';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(10000);
        browser.end();
    }
};



