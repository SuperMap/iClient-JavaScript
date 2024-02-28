var commonTools = require('../base/commonTools');
module.exports = {
    after: function (browser) {
        console.log('Closing down...');
        browser.end();
    },
    'leaflet_04_bufferAnalystService': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_bufferAnalystService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.expect.elements('path').count.to.equal(2).before(10000);
        browser.elements('css selector', 'path', function (result) {
            console.log('----Hope number of bufferAnalystServices path to be 2 , actual is '+ result.value.length)
        })

        // browser.pause(10000);
        // browser.elements('tag name', 'path', function (result) {
        //     this.assert.equal(result.value.length, 2, "expect Number of bufferAnalystServices path to be 2, actual is " + result.value.length);
        // });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
