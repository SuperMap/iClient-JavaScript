var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_03_themeDotDensity': function (browser) {
        var type = 'leaflet';
        var exampleName = '03_themeDotDensity';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-map-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-tile-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-layer').to.be.present.before(5000);
        browser.elements('class name', 'leaflet-layer', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of leaflet-layer to be 2, actual is " + result.value.length);
        });
        browser.elements('class name', 'leaflet-tile-container', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of leaflet-tile-container to be 2, actual is " + result.value.length);
        });
        browser.pause(1000);
        browser.end();
    }
};