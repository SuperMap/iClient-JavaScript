var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_mapQueryByDistance': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_mapQueryByDistance';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-popup-content').to.be.present.before(10000);
        var popupContent = 'distance\ =\ 10';
        browser.expect.element('.leaflet-popup-content').text.to.equal(popupContent);
        browser.pause(1000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(10000);
        browser.click('.leaflet-popup-close-button', function () {
            browser.pause(1000);
            browser.expect.element('.leaflet-popup-content').to.not.be.present.before(10000);
        });
        browser.pause(1000);
        browser.end();
    }
};
