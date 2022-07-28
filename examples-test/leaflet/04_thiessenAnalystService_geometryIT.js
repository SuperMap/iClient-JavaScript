var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },
    'leaflet_04_thiessenAnalystService_geometry': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_thiessenAnalystService_geometry';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);

        browser.expect.elements('path').count.to.equal(10).before(5000);
        browser.elements('css selector', 'path', function (result) {
            console.log('----Hope number of thiessen polygon(geometry) path to be 10, actual is '+ result.value.length)
        })

        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
