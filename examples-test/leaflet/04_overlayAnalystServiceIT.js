var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },
    'leaflet_04_overlayAnalystService': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_overlayAnalystService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.expect.elements('path').count.to.equal(45).before(5000);
        browser.elements('css selector', 'path', function (result) {
            console.log('----Hope number of overlay polygon path to be 45 , actual is '+ result.value.length)
        })

        // browser.pause(5000);
        // browser.elements('tag name', 'path', function (result) {
        //     this.assert.equal(result.value.length, 45, "expect Number of overlay polygon to be 45, actual is " + result.value.length);
        // });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
