var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_05_findLocationService': function (browser) {
        var type = 'leaflet';
        var exampleName = '05_findLocationService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(5000);
        browser.elements('class name', 'leaflet-marker-icon', function (result) {
            this.assert.equal(result.value.length, 8, "expect Number of marker to be 8, actual is " + result.value.length);
        });
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(5000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 372, "expect Number of findLocationService result to be 372, actual is " + result.value.length);
        });
        browser.pause(1000);
        browser.end();
    }
};