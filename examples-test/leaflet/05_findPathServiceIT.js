var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_05_findPathService': function (browser) {
        var type = 'leaflet';
        var exampleName = '05_findPathService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(10000);
        browser.elements('class name', 'leaflet-marker-icon', function (result) {
            this.assert.equal(result.value.length, 34, "expect Number of marker to be 34, actual is " + result.value.length);
        });
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 31, "expect Number of findPathService path to be 31, actual is " + result.value.length);
        });
        browser.pause(1000);
        browser.end();
    }
};