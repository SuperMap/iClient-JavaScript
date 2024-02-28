var commonTools = require('../base/commonTools');
module.exports = {
    '@disabled': true,
    after: function(browser){
        browser.end();
    },
    'leaflet_05_findServiceAreas': function (browser) {
        var type = 'leaflet';
        var exampleName = '05_findServiceAreas';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.pause(1000);
        browser.elements('css selector', '.leaflet-marker-icon', function (result) {
            this.assert.equal(result.value.length, 1, "expect Number of marker to be 1, actual is " + result.value.length);
        });
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.expect.elements('path').count.to.equal(1).before(5000);
        browser.elements('css selector', '.leaflet-marker-icon', function (result) {
            console.log('----Hope number findServiceAreas path to be 1, actual is '+ result.value.length)
        })
        // 测试版权点击的正确性
        // commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
