var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_measure_distance': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_measure_distance';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(10000);
        browser.expect.element('.leaflet-popup-content').to.be.present.before(10000);
        /*check the info showing in leaflet-popup is equal to our expectation*/
        var distanceInfo = '距离：\ 2115093.3333095433\ 米';
        browser.expect.element('.leaflet-popup-content').text.to.equal(distanceInfo);
        browser.pause(1000);
        browser.click('.leaflet-popup-close-button', function () {
            browser.pause(1000);
            browser.expect.element('.leaflet-popup-content').to.not.be.present.before(10000);
        });
        browser.pause(1000);
        browser.end();
    }
};
