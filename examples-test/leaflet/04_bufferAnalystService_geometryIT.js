var commonTools = require('../base/commonTools');
module.exports = {
    after: function (browser) {
        console.log('Closing down...');
        browser.end();
    },
    'leaflet_04_bufferAnalystService_geometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_bufferAnalystService_geometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.expect.elements('path').count.to.equal(35).before(5000);
        browser.elements('css selector', 'path', function (result) {
            console.log('----Hope number of bufferAnalystServices(geometry) path to be 35 , actual is '+ result.value.length)
        })
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        // 测试版权点击的正确性
        // commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
