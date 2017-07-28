var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_getFeatureBySQL': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_getFeatureBySQL';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(3000);
        browser.expect.element('.leaflet-zoom-animated').to.be.present.before(3000);
        browser.pause(1000);
        browser.end();
    }
};



