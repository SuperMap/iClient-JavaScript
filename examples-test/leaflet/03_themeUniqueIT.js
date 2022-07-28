var commonTools = require('../base/commonTools');
module.exports = {
    after: function (browser) {
        console.log('Closing down...');
        browser.end();
    },
    'leaflet_03_themeUnique': function (browser) {
        var type = 'leaflet';
        var exampleName = '03_themeUnique';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-map-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-tile-pane', 10000);
        browser.waitForElementPresent('.leaflet-layer', 10000);
        browser.elements('css selector', '.leaflet-layer', function (result) {
            console.log('----Hope number of leaflet-layer to be 2, actual is '+ result.value.length)
        })
        browser.elements('css selector', '.leaflet-tile-container', function (result) {
            console.log('----Hope number of leaflet-tile-container to be 2, actual is '+ result.value.length)
        })
        browser.expect.element('.leaflet-layer:nth-child(2)').to.be.visible.before(10000);
        browser.expect.element('.leaflet-pane .leaflet-layer:nth-child(2) .leaflet-tile-container').to.be.visible.before(10000);

        // browser.pause(3000);
        // browser.elements('css selector', '.leaflet-layer', function (result) {
        //     this.assert.equal(result.value.length, 2, "expect Number of leaflet-layer to be 2, actual is " + result.value.length);
        // });
        // browser.elements('css selector', '.leaflet-tile-container', function (result) {
        //     this.assert.equal(result.value.length, 2, "expect Number of leaflet-tile-container to be 2, actual is " + result.value.length);
        // });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};