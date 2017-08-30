var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_thiessenAnalystService_datasets': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_thiessenAnalystService_datasets';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g').to.be.present.before(5000);
        browser.expect.element('.leaflet-pane.leaflet-overlay-pane svg g path').to.be.present.before(5000);
        browser.elements('tag name', 'path', function (result) {
            this.assert.equal(result.value.length, 272, "expect Number of thiessen polygon(datasets) to be 272, actual is " + result.value.length);
        });
        browser.pause(1000);
        browser.end();
    }
};
