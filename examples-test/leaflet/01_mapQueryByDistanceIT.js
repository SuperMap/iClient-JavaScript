var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },

    'leaflet_01_mapQueryByDistance': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_mapQueryByDistance';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane canvas', 10000);
        browser.waitForElementPresent('#toolbar .btn')
        .click('#toolbar .btn')
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.click('input[value="清除"]', function () {
            browser.waitForElementNotPresent('.leaflet-pane.leaflet-marker-pane img',10000);
        });
        // browser.elements('css selector', '.leaflet-marker-icon', function (result) {
        //     browser.assert.ok(result.value.length > 0, "expect Number of query result to be greater than 0, actual is " + result.value.length);
        // });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        
    }
};