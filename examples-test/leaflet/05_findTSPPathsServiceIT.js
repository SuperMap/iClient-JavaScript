var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },
    'leaflet_05_findTSPPathsService': function (browser) {
        var type = 'leaflet';
        var exampleName = '05_findTSPPathsService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);

        browser.expect.elements('.leaflet-marker-icon').count.to.equal(3).before(5000);
        browser.elements('css selector', '.leaflet-marker-icon', function (result) {
            console.log('----Hope number marker to be 3, actual is '+ result.value.length)
        })

        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);

        browser.expect.elements('path').count.to.equal(1).before(5000);
        browser.elements('css selector', 'path', function (result) {
            console.log('----Hope number findTSPPathsService path to be 1, actual is '+ result.value.length)
        })

       
        // 测试版权点击的正确性
        // commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};