var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_mathExpressionAnalysisService': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_mathExpressionAnalysisService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-map-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-tile-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-layer').to.be.present.before(10000);
        browser.waitForElementPresent('.leaflet-layer', 20000, function () {
            browser.pause(8000);
            browser.elements('class name', 'leaflet-layer', function (result) {
                browser.assert.equal(result.value.length, 2, "expect Number of leaflet-layer to be 2, actual is " + result.value.length);
            });
            browser.elements('class name', 'leaflet-tile-container', function (result) {
                browser.assert.equal(result.value.length, 2, "expect Number of leaflet-tile-container to be 2, actual is " + result.value.length);
            });
        }, 'element .leaflet-layer present in 20000ms');
        browser.pause(1000);
        browser.end();
    }
};